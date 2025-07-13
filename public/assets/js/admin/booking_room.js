$(document).ready(function () {
    let bookingData = [];
    let currentStatus = "all";
    let currentPage = 1;
    const rowsPerPage = 5;

    function getBookingData() {
        ajaxRequest({
            url: '/api/bookings',
            method: 'GET',
            success: (res) => {
                bookingData = Array.isArray(res.data) ? res.data.map(transformBookingData) : [];
                applyBookingFilters();
            },
            error: function (err) {
                console.error('❌ Lỗi khi tải danh sách đặt phòng:', err);
                toastr.error('Không thể tải danh sách đặt phòng');
            }
        });
    }

    function transformBookingData(item) {
        const statusMap = {
            booked: "Đã Đặt",
            checked_in: "Đã Nhận Phòng",
            completed: "Hoàn Tất",
            cancelled: "Đã Hủy"
        };

        return {
            id: `#${item.id}`,
            raw_id: item.id,
            name: item.user?.username ?? 'Không rõ',
            phone: item.user?.phone ?? '',
            room: item.room?.room_type?.name ?? 'Không rõ',
            room_number: item.room?.room_number ?? 'Không rõ',
            checkIn: item.check_in_date,
            checkOut: item.check_out_date,
            status: statusMap[item.status] || 'Không xác định',
            raw_status: item.status
        };
    }

    function renderBookingTable(data) {
        const body = document.getElementById("bookingTableBody");
        body.innerHTML = "";

        const start = (currentPage - 1) * rowsPerPage;
        const paginatedData = data.slice(start, start + rowsPerPage);

        if (paginatedData.length === 0) {
            body.innerHTML = `<tr><td colspan="7" class="text-center text-muted">Không có dữ liệu</td></tr>`;
            return;
        }

        paginatedData.forEach((item, index) => {
            const row = document.createElement("tr");

            const badgeColor = {
                "Đã Đặt": "bg-warning",
                "Đã Nhận Phòng": "bg-primary",
                "Hoàn Tất": "bg-success",
                "Đã Hủy": "bg-secondary"
            }[item.status] ?? 'bg-light';

            let actions = `<button class='btn btn-sm btn-outline-info me-1' onclick='viewBooking("${item.id}")'>
                <i class='fa fa-eye'></i>
            </button>`;

            if (item.raw_status === "booked") {
                actions += `
                    <button class='btn btn-sm btn-outline-primary me-1' onclick='confirmBooking("${item.id}")'>
                        <i class='fa fa-check'></i> Xác nhận
                    </button>
                    <button class='btn btn-sm btn-outline-danger' onclick='cancelBooking("${item.id}")'>
                        <i class='fa fa-times'></i> Hủy
                    </button>`;
            }

            if (item.raw_status === "checked_in") {
                actions += `
                    <button class='btn btn-sm btn-outline-success me-1' onclick='completeBooking("${item.id}")'>
                        <i class='fa fa-door-closed'></i> Trả phòng
                    </button>`;
            }

            if (item.raw_status === "completed") {
                actions += `<button class='btn btn-sm btn-outline-success ms-1' onclick='previewInvoice("${item.id}")'>
                    <i class='fa fa-print'></i> In Hóa đơn
                </button>`;
            }

            row.innerHTML = `
                <td>${start + index + 1}</td>
                <td>
                    <span class="badge bg-dark">ID: ${item.id}</span><br>
                    <strong>${item.name}</strong><br>
                    <small>${item.phone}</small>
                </td>
                <td>${item.room}</td>
                <td>${item.checkIn}</td>
                <td>${item.checkOut}</td>
                <td><span class="badge ${badgeColor}">${item.status}</span></td>
                <td>${actions}</td>
            `;
            body.appendChild(row);
        });

        renderPagination(data.length);
    }

    function renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / rowsPerPage);
        const container = document.getElementById("pagination-booking");
        container.innerHTML = "";

        if (totalPages <= 1) return;

        const createButton = (label, page, disabled = false, bold = false) => {
            const btn = document.createElement("button");
            btn.textContent = label;
            btn.className = `btn btn-sm mx-1 ${bold ? 'btn-primary' : 'btn-outline-primary'}`;
            btn.disabled = disabled;
            btn.addEventListener("click", () => {
                currentPage = page;
                applyBookingFilters();
            });
            return btn;
        };

        container.appendChild(createButton("<<", 1, currentPage === 1));
        container.appendChild(createButton("<", currentPage - 1, currentPage === 1));
        for (let i = 1; i <= totalPages; i++) {
            container.appendChild(createButton(i, i, false, i === currentPage));
        }
        container.appendChild(createButton(">", currentPage + 1, currentPage === totalPages));
        container.appendChild(createButton(">>", totalPages, currentPage === totalPages));
    }

    function applyBookingFilters() {
        const search = document.getElementById("bookingSearch").value.toLowerCase();
        let filtered = [...bookingData];

        if (currentStatus !== "all") {
            filtered = filtered.filter(item => item.raw_status === currentStatus);
        }

        if (search) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(search) ||
                item.phone.includes(search) ||
                item.room.toLowerCase().includes(search) ||
                item.status.toLowerCase().includes(search)
            );
        }

        const totalPages = Math.ceil(filtered.length / rowsPerPage);
        if (currentPage > totalPages) currentPage = totalPages || 1;

        renderBookingTable(filtered);
    }

    document.querySelectorAll("#bookingTabs .nav-link").forEach(tab => {
        tab.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelectorAll("#bookingTabs .nav-link").forEach(t => t.classList.remove("active"));
            this.classList.add("active");
            currentStatus = this.dataset.status;
            currentPage = 1;
            applyBookingFilters();
        });
    });

    document.getElementById("bookingSearch").addEventListener("keyup", function () {
        currentPage = 1;
        applyBookingFilters();
    });

    window.viewBooking = function (id) {
        const booking = bookingData.find(b => b.id === id);
        if (!booking) return;

        const html = `
        <div class="text-start">
            <p><strong>Mã đơn:</strong> ${booking.id}</p>
            <p><strong>Tên khách:</strong> ${booking.name}</p>
            <p><strong>SĐT:</strong> ${booking.phone}</p>
            <p><strong>Phòng:</strong> ${booking.room} - ${booking.room_number}</p>
            <p><strong>Ngày đến:</strong> ${booking.checkIn}</p>
            <p><strong>Ngày đi:</strong> ${booking.checkOut}</p>
            <p><strong>Trạng thái:</strong> ${booking.status}</p>
        </div>
    `;

        showConfirmDialog({
            title: `👁️ Chi tiết đơn ${booking.id}`,
            content: html,
            icon: 'fa fa-info-circle',
            type: 'blue',
            size: 'medium',
            confirmText: 'Đóng',
            cancelText: '',
            confirmBtnClass: 'btn-primary',
            cancelBtnClass: '',
            backgroundDismiss: true,
            closeIcon: true,
            buttons: {
                confirm: {
                    text: 'Đóng',
                    btnClass: 'btn-primary',
                    action: function () {
                        // Just close
                    }
                }
            }
        });
    };


    window.confirmBooking = function (id) {
        const booking = bookingData.find(b => b.id === id);
        if (!booking) return;
        if (confirm(`Bạn có chắc muốn xác nhận đơn ${booking.id} không?`)) {
            ajaxRequest({
                url: '/api/bookings/update-status',
                method: 'POST',
                data: {
                    id: booking.raw_id,
                    status: 'checked_in'
                },
                success: () => {
                    booking.raw_status = "checked_in";
                    booking.status = "Đã Nhận Phòng";
                    toastr.success(`✅ Đã xác nhận đơn ${booking.id}`);
                    applyBookingFilters();
                },
                error: (err) => {
                    console.error('❌ Lỗi khi xác nhận đơn:', err);
                    toastr.error(`❌ Không thể xác nhận đơn ${booking.id}`);
                }
            });
        }
    };

    window.cancelBooking = function (id) {
        const booking = bookingData.find(b => b.id === id);
        if (!booking) return;
        if (confirm(`Bạn có chắc muốn hủy đơn ${booking.id} không?`)) {
            ajaxRequest({
                url: '/api/bookings/update-status',
                method: 'POST',
                data: {
                    id: booking.raw_id,
                    status: 'cancelled'
                },
                success: () => {
                    booking.raw_status = "cancelled";
                    booking.status = "Đã Hủy";
                    toastr.error(`❌ Đã hủy đơn ${booking.id}`);
                    applyBookingFilters();
                },
                error: (err) => {
                    console.error('❌ Lỗi khi hủy đơn:', err);
                    toastr.error(`❌ Không thể hủy đơn ${booking.id}`);
                }
            });
        }
    };

    window.completeBooking = function (id) {
        const booking = bookingData.find(b => b.id === id);
        if (!booking) return;
        if (confirm(`Bạn có chắc muốn hoàn tất/trả phòng đơn ${booking.id} không?`)) {
            ajaxRequest({
                url: '/api/bookings/update-status',
                method: 'POST',
                data: {
                    id: booking.raw_id,
                    status: 'completed'
                },
                success: () => {
                    booking.raw_status = "completed";
                    booking.status = "Hoàn Tất";
                    toastr.success(`🏁 Đã hoàn tất đơn ${booking.id}`);
                    applyBookingFilters();
                },
                error: (err) => {
                    console.error('❌ Lỗi khi hoàn tất đơn:', err);
                    toastr.error(`❌ Không thể hoàn tất đơn ${booking.id}`);
                }
            });
        }
    };

    window.previewInvoice = function (id) {
        const booking = bookingData.find(b => b.id === id);
        if (!booking) return;

        const htmlContent = `
        <div class="container mt-4" style="font-family: Arial, sans-serif; max-width: 800px;">
            <div class="text-center mb-4">
                <img src="assets/images/PSV_LOGO_Final_outline_ai.avif" alt="Hotel Logo" style="height: 80px;">
                <h3 class="mt-3">Phongsavath Boutique Hotel</h3>
                <p class="text-muted">Nơi nghỉ dưỡng lý tưởng với phong cách hiện đại và dịch vụ tận tâm</p>
            </div>
            <div class="card p-4 shadow-sm">
                <h4 class="mb-3 text-center text-uppercase">Hóa Đơn Đặt Phòng</h4>
                <table class="table table-borderless">
                    <tr><th scope="row">Mã đơn:</th><td>${booking.id}</td></tr>
                    <tr><th scope="row">Tên khách:</th><td>${booking.name}</td></tr>
                    <tr><th scope="row">SĐT:</th><td>${booking.phone}</td></tr>
                    <tr><th scope="row">Phòng:</th><td>${booking.room} - ${booking.room_number}</td></tr>
                    <tr><th scope="row">Ngày đến:</th><td>${booking.checkIn}</td></tr>
                    <tr><th scope="row">Ngày đi:</th><td>${booking.checkOut}</td></tr>
                    <tr><th scope="row">Trạng thái:</th><td><span class="badge bg-success">${booking.status}</span></td></tr>
                </table>
            </div>
            <div class="text-center mt-4">
                <button onclick="window.print()" class="btn btn-primary"><i class="fa fa-print"></i> In Hóa Đơn</button>
            </div>
            <footer class="mt-5 text-center small text-muted">
                &copy; ${new Date().getFullYear()} Phongsavath Boutique Hotel. All rights reserved.
            </footer>
        </div>
        `;

        const win = window.open('', '_blank');
        win.document.write(`
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <title>Hóa Đơn ${booking.id}</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
            <style>@media print { button { display: none !important; } }</style>
        </head>
        <body>${htmlContent}</body>
        </html>
        `);
        win.document.close();
    };

    getBookingData();
});
