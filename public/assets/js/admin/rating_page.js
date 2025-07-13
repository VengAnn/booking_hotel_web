$(document).ready(function () {
    let ratingData = [];

    // Render stars (★)
    function renderStars(stars) {
        return '<span class="text-warning fw-bold">' +
            "★".repeat(stars) +
            '<span class="text-muted">' + "★".repeat(5 - stars) + '</span>' +
            '</span>';
    }

    // Render rating cards
    function renderRatingList(data) {
        const list = $("#ratingList");
        list.empty();

        if (!data.length) {
            list.append(`<div class="col-12 text-center text-muted">Không có đánh giá nào.</div>`);
            return;
        }

        data.forEach(item => {
            const card = `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card border-0 shadow-sm h-100">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5 class="text-primary mb-1">${item.user?.username || 'Ẩn danh'}</h5>
                            <p class="mb-1"><strong>Phòng:</strong> ${item.room?.room_number || 'Không rõ'}</p>
                            <p class="mb-1"><strong>Ngày:</strong> ${new Date(item.created_at).toLocaleDateString()}</p>
                            <p class="mb-1"><strong>Đánh giá:</strong> ${renderStars(item.rating)}</p>
                            <p class="mt-2">${item.comment || ''}</p>
                        </div>
                        <div class="d-flex justify-content-end mt-3">
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteRating(${item.id})">
                                <i class="fa fa-trash"></i> Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
            list.append(card);
        });
    }

    function fetchRatings() {
        ajaxRequest({
            url: "/api/reviews",
            method: "GET",
            success: (res) => {
                ratingData = Array.isArray(res.data) ? res.data : [];
                renderRatingList(ratingData);
            },
            error: (err) => {
                toastr.error("❌ Không thể tải đánh giá");
                console.error(err);
            }
        });
    }

    // Filter ratings by keyword
    function filterRating() {
        const keyword = $("#ratingSearch").val().toLowerCase();
        const filtered = ratingData.filter(r =>
            (r.user?.name || '').toLowerCase().includes(keyword) ||
            (r.room?.room_number || '').toLowerCase().includes(keyword) ||
            (r.comment || '').toLowerCase().includes(keyword)
        );
        renderRatingList(filtered);
    }

    // Delete a rating
    window.deleteRating = function (id) {
        if (!confirm("Bạn có chắc muốn xóa đánh giá này?")) return;

        ajaxRequest({
            url: `/api/reviews/${id}`,
            method: "DELETE",
            success: () => {
                toastr.success("✅ Đã xóa đánh giá");
                fetchRatings();
            },
            error: () => toastr.error("❌ Không thể xóa đánh giá")
        });
    };

    // Search filter event
    $("#ratingSearch").on("keyup", filterRating);

    // Initial load
    fetchRatings();
});