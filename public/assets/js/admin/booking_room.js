$(document).ready(function () {
    const bookingData = [
        {
            id: "ORD_91583457",
            name: "Quang Huy",
            phone: "0888131067",
            room: "Phòng Bình Dân",
            checkIn: "2023-05-19",
            checkOut: "2023-05-25",
            status: "Đã Thanh Toán"
        },
        {
            id: "ORD_91493479",
            name: "Nguyễn Văn A",
            phone: "0888000001",
            room: "Phòng Vip 3",
            checkIn: "2023-05-14",
            checkOut: "2023-05-17",
            status: "Đã Thanh Toán"
        },
        {
            id: "ORD_91367634",
            name: "Lê Thị B",
            phone: "0888999999",
            room: "Phòng Vip 3",
            checkIn: "2023-05-14",
            checkOut: "2023-05-16",
            status: "Đã Hủy"
        }
    ];

    let currentStatus = "all";
    let currentPage = 1;
    const rowsPerPage = 5;

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

            let actions = `<button class='btn btn-sm btn-outline-info me-1' onclick='viewBooking("${item.id}")'>
                <i class='fa fa-eye'></i>
            </button>`;

            if (item.status === "Đã Thanh Toán") {
                actions += `<button class='btn btn-sm btn-outline-success me-1' onclick='previewInvoice("${item.id}")'>
                    <i class='fa fa-print'></i> In Hóa đơn
                </button>`;
            } else if (currentStatus === "all") {
                actions += `
                    <button class='btn btn-sm btn-outline-primary me-1' onclick='confirmBooking("${item.id}")'>
                        <i class='fa fa-check'></i> Xác nhận
                    </button>
                    <button class='btn btn-sm btn-outline-danger' onclick='cancelBooking("${item.id}")'>
                        <i class='fa fa-times'></i> Hủy
                    </button>`;
            }

            row.innerHTML = `
                <td>${start + index + 1}</td>
                <td>
                    <span class="badge bg-primary">ID: ${item.id}</span><br>
                    <strong>${item.name}</strong><br>
                    <small>${item.phone}</small>
                </td>
                <td>${item.room}</td>
                <td>${item.checkIn}</td>
                <td>${item.checkOut}</td>
                <td>
                    <span class="badge ${item.status === 'Đã Thanh Toán' ? 'bg-success' : 'bg-danger'}">
                        ${item.status}
                    </span>
                </td>
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
            filtered = filtered.filter(item => item.status === currentStatus);
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

    renderBookingTable(bookingData);

    document.getElementById("bookingSearch").addEventListener("keyup", function () {
        currentPage = 1;
        applyBookingFilters();
    });

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

    window.previewInvoice = function (id) {
        const booking = bookingData.find(b => b.id === id);
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
                    <tr><th scope="row">Phòng:</th><td>${booking.room}</td></tr>
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
            <title>HoaDon_${booking.id}</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
            <style>@media print { button { display: none !important; } }</style>
        </head>
        <body>${htmlContent}</body>
        </html>
    `);
        win.document.close();
    };

    window.confirmBooking = function (id) {
        alert(`✅ Đã xác nhận đặt phòng cho đơn ${id}`);
    };

    window.cancelBooking = function (id) {
        alert(`❌ Đã hủy đơn đặt phòng ${id}`);
    };

    window.viewBooking = function (id) {
        const booking = bookingData.find(b => b.id === id);
        alert(`👁️ Chi tiết đặt phòng:\n\nID: ${booking.id}\nKhách hàng: ${booking.name}\nSĐT: ${booking.phone}\nPhòng: ${booking.room}\nTừ: ${booking.checkIn} đến ${booking.checkOut}`);
    };
});
