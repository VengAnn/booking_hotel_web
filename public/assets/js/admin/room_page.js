$(document).ready(function () {
    let roomData = [];
    let roomTypes = [];

    function loadAllData(callback) {
        let done = 0;
        const checkDone = () => (++done === 2 && typeof callback === "function" && callback());

        ajaxRequest({
            url: "/api/room",
            method: "GET",
            success: (res) => {
                roomData = res.data || [];
                checkDone();
            },
            error: (err) => console.error("Lỗi tải phòng:", err),
        });

        ajaxRequest({
            url: "/api/room-types",
            method: "GET",
            success: (res) => {
                roomTypes = res.data || [];
                checkDone();
            },
            error: (err) => console.error("Lỗi tải loại phòng:", err),
        });
    }

    $('#addRoomButton').on('click', function () {
        showConfirmDialog({
            title: "Thêm phòng mới",
            size: 'large',
            content: `<div class="text-center p-3">Đang tải dữ liệu...</div>`,
            onContentReady: function () {
                const dialog = this;
                loadAllData(() => {
                    const typeOptions = roomTypes.map(rt => `<option value="${rt.id}">${rt.name}</option>`).join('');

                    dialog.$content.html(`
                        <form id="addRoomForm">
                            <div class="form-group">
                                <label>Số phòng</label>
                                <input type="text" id="addRoomNumber" class="form-control" required>
                            </div>
                            <div class="form-group mt-3">
                                <label>Loại phòng</label>
                                <select id="addRoomType" class="form-select">${typeOptions}</select>
                            </div>
                           
                        </form>
                    `);
                });
            },
            confirmText: 'Thêm phòng',
            onConfirm: function () {
                const $form = $('#addRoomForm');
                const basicData = {
                    room_number: $form.find('#addRoomNumber').val().trim(),
                    room_type_id: $form.find('#addRoomType').val(),
                    status: 'available'
                };

                ajaxRequest({
                    url: '/api/room',
                    method: 'POST',
                    data: basicData,
                    success: function (res) {
                        const roomId = res.data?.id;
                        if (!roomId) return alert("Không lấy được ID phòng mới");

                        const files = $('#addRoomImages')[0].files;
                        if (files.length > 0) {
                            const formData = new FormData();
                            for (let i = 0; i < files.length; i++) {
                                formData.append('images[]', files[i]);
                            }

                            ajaxRequest({
                                url: `/api/room/${roomId}/images`,
                                method: 'POST',
                                data: formData,
                                processData: false,
                                contentType: false,
                                success: () => loadAllData(() => renderRoomTable(roomData)),
                                error: (err) => alert("Tải ảnh thất bại: " + (err.message || "Lỗi không xác định"))
                            });
                        } else {
                            loadAllData(() => renderRoomTable(roomData));
                        }
                    },
                    error: (err) => alert("Thêm phòng thất bại: " + (err.message || "Lỗi không xác định"))
                });
            }
        });
    });

    function translateRoomStatus(status) {
        const translations = {
            "available": "Còn trống",
            "in use": "Đang sử dụng",
            "maintenance": "Bảo trì"
        };
        return translations[status] || "Không rõ";
    }

    function renderRoomTable(data) {
        const body = $("#roomTableBody");
        body.empty();

        if (!data.length) {
            return body.append(`<tr><td colspan="6" class="text-center text-muted">Không có phòng</td></tr>`);
        }

        data.forEach((room, index) => {
            const roomType = room.room_type?.name || room.type || "Không rõ";
            const price = room.price || room.room_type?.price_per_night || 0;
            const statusBadge = {
                "available": "bg-success",
                "in use": "bg-warning",
                "maintenance": "bg-danger"
            }[room.status] || "bg-secondary";

            body.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${room.room_number || room.name}</td>
                    <td>${roomType}</td>
                    <td>${parseInt(price).toLocaleString()} đ</td>
                    <td>
                        <span class="badge ${statusBadge}" style="cursor:pointer" onclick="changeStatus(${room.id})">${translateRoomStatus(room.status)}</span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="viewRoom(${room.id})">
                            <i class="fa fa-eye"></i> Xem
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteRoom(${room.id})">
                            <i class="fa fa-trash"></i> Xóa
                        </button>
                    </td>
                </tr>
            `);
        });
    }

    function filterRooms() {
        const keyword = $("#roomSearch").val().toLowerCase();
        const filtered = roomData.filter(r =>
            r.room_number?.toLowerCase().includes(keyword) ||
            r.room_type?.name?.toLowerCase().includes(keyword) ||
            r.status?.toLowerCase().includes(keyword)
        );

        renderRoomTable(filtered);
    }

    $("#roomSearch").on("keyup", filterRooms);

    window.viewRoom = function (id) {
        const room = roomData.find(r => r.id === id);
        if (!room) return alert("Không tìm thấy phòng");

        showConfirmDialog({
            title: `Chi tiết phòng: ${room.room_number}`,
            size: 'large',
            content: `
                <div class="container">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <strong>Loại phòng:</strong> ${room.room_type?.name || "Không rõ"}<br>
                            <strong>Giá:</strong> ${parseInt(room.room_type?.price_per_night || 0).toLocaleString()} đ<br>
                            <strong>Trạng thái:</strong> ${room.status}<br>
                        </div>
                        <div class="col-md-6">
                            <strong>Sức chứa:</strong><br>
                            Người lớn: ${room.room_type?.adults_capacity || 0}<br>
                            Trẻ em: ${room.room_type?.children_capacity || 0}<br>
                        </div>
                    </div>
                    
                </div>
            `,
            showCancelButton: false,
            confirmText: "Đóng"
        });
    };

    window.changeStatus = function (id) {
        const roomIndex = roomData.findIndex(r => r.id === id);
        if (roomIndex === -1) return alert("Phòng không tồn tại");

        const currentStatus = roomData[roomIndex].status;

        // ⛔ Prevent changing status if room is in use
        if (currentStatus === "in use") {
            alert("❌ Không thể cập nhật trạng thái khi phòng đang được sử dụng");
            return;
        }

        const nextStatus = {
            "available": "maintenance",
            "maintenance": "available",
        }[currentStatus] || "available";

        ajaxRequest({
            url: "/api/room/update-status",
            method: "POST",
            data: {
                id: id,
                status: nextStatus
            },
            success: () => {
                roomData[roomIndex].status = nextStatus;
                renderRoomTable(roomData);
            },
            error: (err) => {
                console.error("Lỗi cập nhật trạng thái:", err);
                alert("Không thể cập nhật trạng thái: " + (err.message || "Lỗi không xác định"));
            }
        });
    };

    window.deleteRoom = function (id) {
        showConfirmDialog({
            title: "Xóa phòng",
            content: "Bạn có chắc chắn muốn xóa phòng này?",
            onConfirm: function () {
                ajaxRequest({
                    url: `/api/room/${id}`,
                    method: "DELETE",
                    success: () => loadAllData(() => renderRoomTable(roomData)),
                    error: (err) => alert(err.message || "Xoá thất bại")
                });
            }
        });
    };

    loadAllData(() => renderRoomTable(roomData));
});
