$(document).ready(function () {
    let roomTypes = [];

    function loadRoomTypes(callback) {
        ajaxRequest({
            url: "/api/room-types",
            method: "GET",
            success: (res) => {
                roomTypes = Array.isArray(res.data) ? res.data : [];
                callback?.();
            },
            error: (err) => console.error("Lỗi tải loại phòng:", err.message)
        });
    }

    function buildTableBody() {
        if (!roomTypes.length) {
            return `<tr><td colspan="8" class="text-center text-muted">Không có loại phòng</td></tr>`;
        }

        return roomTypes.map(rt => `
            <tr data-id="${rt.id}">
                <td>${rt.name}</td>
                <td>${rt.capacity}</td>
                <td>${rt.price_per_night}</td>
                <td>${rt.adults_capacity}</td>
                <td>${rt.children_capacity}</td>
                <td>${rt.bed_count}</td>
                <td>${rt.description || ''}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary btn-edit" data-id="${rt.id}">Sửa</button>
                    <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${rt.id}">Xoá</button>
                </td>
            </tr>
        `).join('');
    }

    function renderRoomTypeTable($container) {
        setTimeout(() => {
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
                    <div id="roomTypeTablePaginationControls" class="mt-2"></div>
                </div>
            `;

            $wrapper.html(html);

            MyDataTable("#roomTypeTable", 10, {
                searchContainer: '#roomTypeTableSearchControls',
                paginationContainer: '#roomTypeTablePaginationControls',
            });

            attachRowEvents($container);
        }, 50);
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
    }

    function getFormData(form) {
        const data = new FormData(form);
        return Object.fromEntries(data.entries());
    }

    function openRoomTypeDialog() {
        loadRoomTypes(() => {
            const html = `
                <form id="roomTypeForm" class="mb-3">${buildFormFields()}</form>
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
                        success: () => {
                            loadRoomTypes(() => renderRoomTypeTable(this.$content));
                            form.reset();
                        },
                        error: err => alert(err.message || "Lỗi thêm loại phòng")
                    });

                    return false; // prevent auto-close
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

    function buildFormFields(data = {}) {
        const val = (f) => data[f] ?? '';
        return `
            <div class="form-group mb-2"><label>Tên loại phòng</label>
                <input name="name" type="text" class="form-control" required value="${val('name')}">
            </div>
            <div class="form-group mb-2"><label>Sức chứa</label>
                <input name="capacity" type="number" class="form-control" required value="${val('capacity')}">
            </div>
            <div class="form-group mb-2"><label>Giá mỗi đêm</label>
                <input name="price_per_night" type="number" class="form-control" required value="${val('price_per_night')}">
            </div>
            <div class="form-group mb-2"><label>Sức chứa người lớn</label>
                <input name="adults_capacity" type="number" class="form-control" required value="${val('adults_capacity')}">
            </div>
            <div class="form-group mb-2"><label>Sức chứa trẻ em</label>
                <input name="children_capacity" type="number" class="form-control" required value="${val('children_capacity')}">
            </div>
            <div class="form-group mb-2"><label>Số lượng giường</label>
                <input name="bed_count" type="number" class="form-control" required value="${val('bed_count')}">
            </div>
            <div class="form-group mb-2"><label>Mô tả</label>
                <textarea name="description" class="form-control" rows="2">${val('description')}</textarea>
            </div>
        `;
    }

    $("#addTypeRoomButton").on("click", openRoomTypeDialog);
});
