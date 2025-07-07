$(document).ready(function () {
    let slides = [];

    function loadSlides() {
        ajaxRequest({
            url: "/api/slide",
            method: "GET",
            success: (res) => {
                slides = res.data;
                renderSlides();
            },
            error: (err) => {
                console.error("Slide load failed:", err.message);
                $("#slideList").html('<div class="col-12 text-center text-danger">Lỗi tải slide.</div>');
            }
        });
    }

    function renderSlides() {
        const container = $("#slideList").empty();

        if (slides.length === 0) {
            container.append('<div class="col-12 text-center text-muted">Chưa có hình ảnh nào.</div>');
            return;
        }

        slides.forEach(slide => {
            container.append(`
                <div class="col-md-4 mb-3" data-id="${slide.id}">
                    <div class="card h-100 shadow-sm">
                        <img src="/storage/${slide.img_url}" class="card-img-top" alt="Slide" style="max-height: 200px; object-fit: cover;">
                        <div class="card-body text-center d-flex justify-content-center gap-2">
                            <button class="btn btn-sm btn-outline-primary" onclick="editSlide(${slide.id})">
                                <i class="fa fa-edit"></i> Sửa
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="removeSlide(${slide.id})">
                                <i class="fa fa-trash"></i> Xoá
                            </button>
                        </div>
                    </div>
                </div>
            `);
        });

        initSortable(); // Init drag after rendering
    }

    $("#slideForm").on("submit", function (e) {
        e.preventDefault();
        const image = $("#slideImage")[0].files[0];
        if (!image) return alert("Vui lòng chọn hình ảnh.");

        const formData = new FormData();
        formData.append("img_file", image);

        ajaxRequest({
            url: "/api/slide",
            method: "POST",
            data: formData,
            success: () => {
                $("#slideForm")[0].reset();
                loadSlides();
            },
            error: (err) => {
                console.error("Slide add failed:", err.message);
                alert(err.message || "Lỗi thêm slide.");
            }
        });
    });

    window.editSlide = function (id) {
        const input = $('<input type="file" accept="image/*">');
        input.on("change", function () {
            const file = this.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("img_file", file);

            ajaxRequest({
                url: `/api/slide/${id}`,
                method: "POST", // ⚠️ OR use PUT (RESTful)
                data: formData,
                success: () => {
                    alert("Cập nhật slide thành công!");
                    loadSlides();
                },
                error: (err) => {
                    console.error("Slide update failed:", err.message);
                    alert(err.message || "Lỗi cập nhật slide.");
                }
            });
        });
        input.trigger("click");
    };

    window.removeSlide = function (id) {
        if (!confirm("Bạn có chắc chắn muốn xoá slide này?")) return;

        ajaxRequest({
            url: `/api/slide/${id}`,
            method: "DELETE",
            success: () => loadSlides(),
            error: (err) => {
                console.error("Slide delete failed:", err.message);
                alert(err.message || "Xoá slide thất bại.");
            }
        });
    };

    function initSortable() {
        const el = document.getElementById('slideList');
        if (!el) return;

        new Sortable(el, {
            animation: 150,
            onEnd: function () {
                const orderedIds = [];
                $("#slideList > div").each(function () {
                    orderedIds.push($(this).data("id"));
                });

                ajaxRequest({
                    url: "/api/slide/reorder",
                    method: "POST",
                    data: { ordered_ids: orderedIds },
                    success: () => console.log("Thứ tự đã được cập nhật."),
                    error: (err) => console.error("Lỗi cập nhật thứ tự:", err.message)
                });

            }
        });
    }

    loadSlides();
});
