$(document).ready(function () {
    let roomData = [];
    let roomTypes = [];
    let amenities = [];
    let facilities = [];

    function loadAllData(callback) {
        let done = 0;
        const checkDone = () => (++done === 4 && typeof callback === "function" && callback());

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

        ajaxRequest({
            url: "/api/amenity",
            method: "GET",
            success: (res) => {
                amenities = res.data || [];
                checkDone();
            },
            error: (err) => console.error("Lỗi tải tiện nghi:", err),
        });

        ajaxRequest({
            url: "/api/facility",
            method: "GET",
            success: (res) => {
                facilities = res.data || [];
                checkDone();
            },
            error: (err) => console.error("Lỗi tải cơ sở vật chất:", err),
        });
    }

    // Btn add new room
    $('#addRoomButton').on('click', function () {
        showConfirmDialog({
            title: "Thêm phòng mới",
            size: 'large',
            content: `<div class="text-center p-3">Đang tải dữ liệu...</div>`,
            onContentReady: function () {
                const dialog = this;
                loadAllData(() => {
                    const typeOptions = roomTypes.map(rt => `<option value="${rt.id}">${rt.name}</option>`).join('');
                    const amenityCheckboxes = amenities.map(a => `
                    <div class="col-md-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="${a.id}" id="add-amenity-${a.id}">
                            <label class="form-check-label" for="add-amenity-${a.id}">${a.name}</label>
                        </div>
                    </div>
                `).join('');
                    const facilityCheckboxes = facilities.map(f => `
                    <div class="col-md-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="${f.id}" id="add-facility-${f.id}">
                            <label class="form-check-label" for="add-facility-${f.id}">${f.name}</label>
                        </div>
                    </div>
                `).join('');

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
                        <div class="form-group mt-4">
                            <label class="fw-bold mb-2">Tiện nghi</label>
                            <div class="row">${amenityCheckboxes}</div>
                        </div>
                        <div class="form-group mt-4">
                            <label class="fw-bold mb-2">Cơ sở vật chất</label>
                            <div class="row">${facilityCheckboxes}</div>
                        </div>
                        <div class="form-group mt-4">
                            <label class="fw-bold mb-2">Hình ảnh</label>
                            <input type="file" id="addRoomImages" name="images[]" class="form-control" multiple accept="image/*">
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

                        // Step 2: Add amenities
                        const selectedAmenities = $form.find('input[id^="add-amenity-"]:checked').map(function () {
                            return $(this).val();
                        }).get();

                        if (selectedAmenities.length > 0) {
                            ajaxRequest({
                                url: `/api/rooms/${roomId}/amenities`,
                                method: 'POST',
                                data: { amenities: selectedAmenities },
                                success: () => console.log("✔ Tiện nghi đã thêm")
                            });
                        }

                        // Step 3: Add facilities
                        const selectedFacilities = $form.find('input[id^="add-facility-"]:checked').map(function () {
                            return $(this).val();
                        }).get();

                        if (selectedFacilities.length > 0) {
                            ajaxRequest({
                                url: `/api/rooms/${roomId}/facilities`,
                                method: 'POST',
                                data: { facilities: selectedFacilities },
                                success: () => console.log("✔ Cơ sở vật chất đã thêm")
                            });
                        }

                        // Step 4: Upload images
                        const files = $form.find('#addRoomImages')[0].files;
                        if (files.length > 0) {
                            const imageForm = new FormData();
                            for (let i = 0; i < files.length; i++) {
                                imageForm.append('images[]', files[i]);
                            }

                            $.ajax({
                                url: `/api/rooms/${roomId}/images`,
                                method: 'POST',
                                data: imageForm,
                                processData: false,
                                contentType: false,
                                success: () => console.log("✔ Hình ảnh đã được tải lên")
                            });
                        }

                        setTimeout(() => {
                            // Refresh UI
                            loadAllData(() => renderRoomTable(roomData));
                        }, 500);
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

        const amenitiesList = room.amenities?.map(a => `<li>${a.name}</li>`).join('') || '<li>Không có</li>';
        const facilitiesList = room.facilities?.map(f => `<li>${f.name}</li>`).join('') || '<li>Không có</li>';
        const images = room.images?.map(img => `<img src="storage/${img.image_url}" class="img-thumbnail me-2" style="max-height:100px">`).join('') || '<em>Không có hình ảnh</em>';

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
                    <div class="mb-3">
                        <strong>Tiện nghi:</strong><ul>${amenitiesList}</ul>
                        <strong>Cơ sở vật chất:</strong><ul>${facilitiesList}</ul>
                    </div>
                    <div>
                        <strong>Hình ảnh:</strong><br>${images}
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

        const nextStatus = {
            "available": "maintenance",
            "maintenance": "available",
        }[currentStatus] || "available";

        // console.log("Next status will be:", nextStatus);
        ajaxRequest({
            url: "/api/room/update-status",
            method: "POST",
            data: {
                id: id,
                status: nextStatus
            },
            success: () => {
                roomData[roomIndex].status = nextStatus;

                // ✅ Re-render without full reload
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
