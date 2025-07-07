$(document).ready(function () {
    let facilities = [];
    let amenities = [];

    // Load facilities from API
    function loadFacilities() {
        ajaxRequest({
            url: "/api/facility",
            method: "GET",
            success: (res) => {
                facilities = res.data;
                renderFacilities();
            },
            error: (err) => {
                console.error("Facility load failed:", err.message);
                alert("Không thể tải cơ sở vật chất.");
            }
        });
    }

    // Load amenities from API
    function loadAmenities() {
        ajaxRequest({
            url: "/api/amenity",
            method: "GET",
            success: (res) => {
                amenities = res.data;
                renderAmenities();
            },
            error: (err) => {
                console.error("Amenity load failed:", err.message);
                alert("Không thể tải tiện nghi.");
            }
        });
    }

    // Render facility list to table
    function renderFacilities() {
        const list = $("#facilityList").empty();
        if (facilities.length === 0) {
            list.append(`<tr><td colspan="3" class="text-center text-muted">Chưa có cơ sở vật chất.</td></tr>`);
            return;
        }

        facilities.forEach((item, index) => {
            list.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning" onclick="editFacility(${item.id}, '${item.name}')">
                            <i class="fa fa-edit"></i> Sửa
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="removeFacility(${item.id})">
                            <i class="fa fa-trash"></i> Xoá
                        </button>
                    </td>
                </tr>
            `);
        });
    }

    // Render amenity list to table
    function renderAmenities() {
        const list = $("#amenityList").empty();
        if (amenities.length === 0) {
            list.append(`<tr><td colspan="4" class="text-center text-muted">Chưa có tiện nghi.</td></tr>`);
            return;
        }

        amenities.forEach((item, index) => {
            list.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td><img src="/storage/${item.img_url}" width="40" height="40" alt="${item.name}"></td>
                    <td>${item.name}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning" onclick="editAmenity(${item.id}, '${item.name}')">
                            <i class="fa fa-edit"></i> Sửa
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="removeAmenity(${item.id})">
                            <i class="fa fa-trash"></i> Xoá
                        </button>
                    </td>
                </tr>
            `);
        });
    }

    // Submit new facility
    $("#facilityForm").on("submit", function (e) {
        e.preventDefault();
        const name = $("#facilityName").val().trim();
        if (!name) return alert("Vui lòng nhập tên cơ sở vật chất.");

        ajaxRequest({
            url: "/api/facility",
            method: "POST",
            data: { name },
            success: () => {
                $("#facilityForm")[0].reset();
                loadFacilities();
            },
            error: (err) => {
                console.error("Facility add failed:", err.message);
                alert(err.message || "Lỗi thêm cơ sở vật chất.");
            }
        });
    });

    // Submit new amenity
    $("#amenityForm").on("submit", function (e) {
        e.preventDefault();

        const name = $("#amenityName").val().trim();
        const image = $("#amenityImage")[0].files[0];

        if (!name) return alert("Vui lòng nhập tên tiện nghi.");
        if (!image) return alert("Vui lòng chọn hình ảnh tiện nghi.");

        const formData = new FormData();
        formData.append("name", name);
        if (image) formData.append("img_file", image);

        ajaxRequest({
            url: "/api/amenity",
            method: "POST",
            data: formData,
            success: () => {
                $("#amenityForm")[0].reset();
                loadAmenities();
            },
            error: (err) => {
                console.error("Amenity add failed:", err);
                alert(err.message || "Lỗi thêm tiện nghi.");
            }
        });
    });

    // Delete facility
    window.removeFacility = function (id) {
        if (!confirm("Xoá cơ sở này?")) return;

        ajaxRequest({
            url: `/api/facility/${id}`,
            method: "DELETE",
            success: () => loadFacilities(),
            error: (err) => {
                console.error("Facility delete failed:", err.message);
                alert(err.message || "Xoá thất bại");
            }
        });
    };

    // Delete amenity
    window.removeAmenity = function (id) {
        if (!confirm("Xoá tiện nghi này?")) return;

        ajaxRequest({
            url: `/api/amenity/${id}`,
            method: "DELETE",
            success: () => loadAmenities(),
            error: (err) => {
                console.error("Amenity delete failed:", err.message);
                alert(err.message || "Xoá thất bại");
            }
        });
    };


    window.editFacility = function (id, currentName) {
        showConfirmDialog({
            title: 'Chỉnh sửa cơ sở',
            content: `
            <form id="editFacilityForm">
                <div class="form-group">
                    <label>Tên cơ sở:</label>
                    <input type="text" id="editFacilityName" class="form-control" value="${currentName}" required>
                </div>
            </form>
        `,
            size: 'small',
            onConfirm: function () {
                const newName = $('#editFacilityName').val().trim();
                if (!newName || newName === currentName) return;

                ajaxRequest({
                    url: `/api/facility/${id}`,
                    method: "PUT",
                    data: { name: newName },
                    success: () => {
                        alert("Cập nhật cơ sở thành công!");
                        loadFacilities();
                    },
                    error: (err) => {
                        console.error("Facility update failed:", err.message);
                        alert(err.message || "Lỗi cập nhật cơ sở.");
                    }
                });
            }
        });
    };

    window.editAmenity = function (id, currentName) {
        showConfirmDialog({
            title: 'Chỉnh sửa tiện nghi',
            content: `
            <form id="editAmenityForm" enctype="multipart/form-data">
                <div class="form-group">
                    <label>Tên tiện nghi:</label>
                    <input type="text" id="editAmenityName" class="form-control" value="${currentName}" required>
                </div>
                <div class="form-group mt-2">
                    <label>Ảnh (tuỳ chọn):</label>
                    <input type="file" id="editAmenityImage" accept="image/*" class="form-control">
                </div>
            </form>
        `,
            size: 'medium',
            onConfirm: function () {
                const newName = $('#editAmenityName').val().trim();
                const newImage = $('#editAmenityImage')[0].files[0];

                if (!newName) return alert("Tên tiện nghi không được để trống.");

                const formData = new FormData();
                formData.append("name", newName);
                if (newImage) formData.append("img_file", newImage);

                ajaxRequest({
                    url: `/api/amenity/${id}`,
                    method: "POST",
                    data: formData,
                    headers: { 'X-HTTP-Method-Override': 'PUT' },
                    success: () => {
                        alert("Cập nhật tiện nghi thành công!");
                        loadAmenities();
                    },
                    error: (err) => {
                        console.error("Amenity update failed:", err.message);
                        alert(err.message || "Lỗi cập nhật tiện nghi.");
                    }
                });
            }
        });
    };

    // Initial load
    loadFacilities();
    loadAmenities();
});
