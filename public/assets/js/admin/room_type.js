$(document).ready(function () {
    let roomTypes = [];
    let amenities = [];
    let facilities = [];
    let allLoaded = 0;

    function loadRoomTypes(callback) {
        allLoaded = 0;

        ajaxRequest({
            url: "/api/room-types",
            method: "GET",
            success: (res) => {
                // console.log("res room types:", res.data);
                roomTypes = Array.isArray(res.data) ? res.data : [];
                checkDone(callback);
            },
            error: (err) => console.error("Lỗi tải loại phòng:", err.message)
        });

        ajaxRequest({
            url: "/api/amenity",
            method: "GET",
            success: (res) => {
                amenities = res.data || [];
                checkDone(callback);
            },
            error: (err) => console.error("Lỗi tải tiện nghi:", err),
        });

        ajaxRequest({
            url: "/api/facility",
            method: "GET",
            success: (res) => {
                facilities = res.data || [];
                checkDone(callback);
            },
            error: (err) => console.error("Lỗi tải cơ sở vật chất:", err),
        });
    }

    function checkDone(callback) {
        allLoaded++;
        if (allLoaded === 3 && typeof callback === 'function') {
            callback();
        }
    }

    function buildTableBody() {
        if (!roomTypes.length) {
            return `<tr><td colspan="8" class="text-center text-muted">Không có loại phòng</td></tr>`;
        }

        return roomTypes.map(rt => {
            const images = rt.images?.map(img => `<img src="${img.image_url}" class="img-thumbnail me-1 mb-1" width="50">`).join('') || 'Không có';
            return `
                <tr data-id="${rt.id}">
                    <td>${rt.name}</td>
                    <td>${rt.capacity}</td>
                    <td>${rt.price_per_night}</td>
                    <td>${rt.adults_capacity}</td>
                    <td>${rt.children_capacity}</td>
                    <td>${rt.bed_count}</td>
                    <td>${rt.description || ''}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-secondary btn-view" data-id="${rt.id}"><i class="fa fa-eye"></i></button>
                        <button class="btn btn-sm btn-outline-primary btn-edit" data-id="${rt.id}">Sửa</button>
                        <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${rt.id}">Xoá</button>
                    </td>
                </tr>`;
        }).join('');
    }

    function renderRoomTypeTable($container) {
        const $wrapper = $container.find(".table-container");
        if (!$wrapper.length) return;

        const html = `
            <div id="roomTypeTableSearchControls" class="mb-2"></div>
            <div class="table-responsive">
                <table id="roomTypeTable" class="table table-bordered table-striped">
                    <thead class="table-info text-nowrap">
                        <tr>
                            <th>Tên</th><th>Sức chứa</th><th>Giá/đêm</th><th>Người lớn</th>
                            <th>Trẻ em</th><th>Giường</th><th>Mô tả</th><th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>${buildTableBody()}</tbody>
                </table>
            </div>
        `;

        $wrapper.html(html);
        attachRowEvents($container);
    }

    function buildAmenityFacilityCheckboxes() {
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

        return `
            <div class="form-group mt-4">
                <label class="fw-bold mb-2">Tiện nghi</label>
                <div class="row">${amenityCheckboxes}</div>
            </div>
            <div class="form-group mt-4">
                <label class="fw-bold mb-2">Cơ sở vật chất</label>
                <div class="row">${facilityCheckboxes}</div>
            </div>
            <div class="form-group mt-3">
                <label class="fw-bold mb-2">Hình ảnh</label>
                <input type="file" id="addRoomTypeImages" name="images[]" class="form-control" accept="image/*" multiple>
            </div>
        `;
    }

    function attachRowEvents($container) {
        $container.find(".btn-edit").off("click").on("click", function () {
            const id = $(this).data("id");
            const roomType = roomTypes.find(rt => rt.id === id);
            if (roomType) openEditDialog(roomType, $container);
        });

        $container.find(".btn-delete").off("click").on("click", function () {
            const id = $(this).data("id");
            if (!confirm("Bạn có chắc chắn muốn xoá loại phòng này?")) return;

            ajaxRequest({
                url: `/api/room-types/${id}`,
                method: "DELETE",
                success: () => loadRoomTypes(() => renderRoomTypeTable($container)),
                error: err => alert(err.message || "Xoá thất bại")
            });
        });

        $container.find(".btn-view").off("click").on("click", function () {
            const id = $(this).data("id");
            const roomType = roomTypes.find(rt => rt.id === id);
            if (roomType) openDetailDialog(roomType);
        });
    }

    function getFormData(form) {
        const data = new FormData(form);
        return Object.fromEntries(data.entries());
    }

    function getCheckedValues(prefix) {
        return $(`input[id^="${prefix}"]:checked`).map(function () {
            return $(this).val();
        }).get();
    }

    function openRoomTypeDialog() {
        loadRoomTypes(() => {
            const html = `
                <form id="roomTypeForm" class="mb-3">${buildFormFields()}</form>
                ${buildAmenityFacilityCheckboxes()}
                <div class="table-container"></div>
            `;

            showConfirmDialog({
                title: "Quản lý Loại Phòng",
                content: html,
                size: "full",
                confirmText: "Thêm loại phòng",
                onContentReady: function () {
                    renderRoomTypeTable(this.$content);
                },
                onConfirm: function () {
                    const form = this.$content.find("#roomTypeForm")[0];
                    if (!form.checkValidity()) {
                        form.reportValidity();
                        return false;
                    }

                    const payload = getFormData(form);

                    ajaxRequest({
                        url: "/api/room-types",
                        method: "POST",
                        data: payload,
                        success: (res) => {
                            const roomTypeId = res.data?.id;
                            const selectedAmenities = getCheckedValues('add-amenity-');
                            const selectedFacilities = getCheckedValues('add-facility-');

                            if (roomTypeId) {
                                if (selectedAmenities.length > 0) {
                                    ajaxRequest({
                                        url: `/api/room-types/${roomTypeId}/amenities`,
                                        method: 'POST',
                                        data: { amenities: selectedAmenities }
                                    });
                                }

                                if (selectedFacilities.length > 0) {
                                    ajaxRequest({
                                        url: `/api/room-types/${roomTypeId}/facilities`,
                                        method: 'POST',
                                        data: { facilities: selectedFacilities }
                                    });
                                }

                                const files = $("#addRoomTypeImages")[0].files;
                                if (files.length > 0) {
                                    const formData = new FormData();
                                    for (let i = 0; i < files.length; i++) {
                                        formData.append('images[]', files[i]);
                                    }

                                    ajaxRequest({
                                        url: `/api/room-types/${roomTypeId}/images`,
                                        method: 'POST',
                                        data: formData,
                                        success: (res) => {
                                            console.log("✔ Hình ảnh đã được tải lên: ", res.data);

                                            // Find the matching room type by ID
                                            const roomType = roomTypes.find(rt => rt.id === roomTypeId);
                                            if (roomType) {
                                                // Initialize the images array if not present
                                                roomType.images = roomType.images || [];

                                                // Append new images to the existing images array
                                                roomType.images.push(...res.data);
                                            }
                                        },
                                    });
                                }
                            }

                            loadRoomTypes(() => renderRoomTypeTable(this.$content));

                            // clear all inputs
                            form.reset();
                            $(`input[id^="add-amenity-"]`).prop('checked', false);
                            $(`input[id^="add-facility-"]`).prop('checked', false);
                            $("#addRoomTypeImages").val('');
                        },
                        error: err => alert(err.message || "Lỗi thêm loại phòng")
                    });

                    return false;
                }
            });
        });
    }

    function openEditDialog(data, $container) {
        const html = `<form id="editRoomTypeForm">${buildFormFields(data)}</form>`;

        showConfirmDialog({
            title: "Chỉnh sửa loại phòng",
            size: "medium",
            content: html,
            confirmText: "Cập nhật",
            onConfirm: function () {
                const form = this.$content.find("#editRoomTypeForm")[0];
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return false;
                }

                const payload = getFormData(form);

                ajaxRequest({
                    url: `/api/room-types/${data.id}`,
                    method: "PUT",
                    data: payload,
                    success: () => {
                        this.close();
                        loadRoomTypes(() => renderRoomTypeTable($container));
                    },
                    error: err => alert(err.message || "Cập nhật thất bại")
                });
            }
        });
    }

    function openDetailDialog(data) {
        const images = data.images?.map(img =>
            `<img src="/storage/${img.img_url}" class="img-thumbnail me-2 mb-2" width="100">`
        ).join('') || 'Không có hình ảnh';

        // Tiện nghi
        const amenities = data.amenities?.map(a => {
            const icon = a.img_url ? `<img src="/storage/${a.img_url}" class="me-1" width="24" height="24">` : '';
            return `<li>${icon}${a.name}</li>`;
        }).join('') || '<li>Không có tiện nghi</li>';

        // Cơ sở vật chất
        const facilities = data.facilities?.map(f => {
            const icon = f.img_url ? `<img src="/storage/${f.img_url}" class="me-1" width="24" height="24">` : '';
            return `<li>${icon}${f.name}</li>`;
        }).join('') || '<li>Không có cơ sở vật chất</li>';

        const html = `
        <div>
            <p><strong>Tên:</strong> ${data.name}</p>
            <p><strong>Sức chứa:</strong> ${data.capacity}</p>
            <p><strong>Giá/đêm:</strong> ${data.price_per_night}</p>
            <p><strong>Người lớn:</strong> ${data.adults_capacity}</p>
            <p><strong>Trẻ em:</strong> ${data.children_capacity}</p>
            <p><strong>Giường:</strong> ${data.bed_count}</p>
            <p><strong>Mô tả:</strong> ${data.description || 'Không có mô tả'}</p>

            <div class="mb-3"><strong>Hình ảnh:</strong><br>${images}</div>

            <div class="mb-3">
                <strong>Tiện nghi:</strong>
                <ul>${amenities}</ul>
            </div>

            <div class="mb-3">
                <strong>Cơ sở vật chất:</strong>
                <ul>${facilities}</ul>
            </div>
        </div>
    `;

        showConfirmDialog({
            title: "Chi tiết loại phòng",
            content: html,
            size: "large",
            showCancelButton: false,
            confirmText: "Đóng"
        });
    }


    function buildFormFields(data = {}) {
        const val = (f) => data[f] ?? '';
        return `
            <div class="form-group mb-2"><label>Tên loại phòng</label>
                <input name="name" type="text" class="form-control" required value="${val('name')}">
            </div>
            <div class="form-group mb-2"><label>Sức chứa</label>
                <input name="capacity" type="number" min="1" class="form-control" required value="${val('capacity')}">
            </div>
            <div class="form-group mb-2"><label>Giá mỗi đêm</label>
                <input name="price_per_night" type="number" min="0" class="form-control" required value="${val('price_per_night')}">
            </div>
            <div class="form-group mb-2"><label>Sức chứa người lớn</label>
                <input name="adults_capacity" type="number" min="0" class="form-control" required value="${val('adults_capacity')}">
            </div>
            <div class="form-group mb-2"><label>Sức chứa trẻ em</label>
                <input name="children_capacity" type="number" min="0" class="form-control" required value="${val('children_capacity')}">
            </div>
            <div class="form-group mb-2"><label>Số lượng giường</label>
                <input name="bed_count" type="number" min="0" class="form-control" required value="${val('bed_count')}">
            </div>
            <div class="form-group mb-2"><label>Mô tả</label>
                <textarea name="description" class="form-control" rows="2">${val('description')}</textarea>
            </div>
        `;
    }

    $("#addTypeRoomButton").on("click", openRoomTypeDialog);
});
