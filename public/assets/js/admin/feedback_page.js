$(document).ready(function () {
    let feedbackData = [];

    // Fetch from API and render
    function loadFeedbacks() {
        ajaxRequest({
            url: '/api/feedbacks',
            method: 'GET',
            success: (res) => {
                feedbackData = res.data || [];
                renderFeedbackList(feedbackData);
            },
            error: (err) => {
                toastr.error("❌ Không thể tải phản hồi", err);
                console.error('❌ Lỗi khi tải danh sách phản hồi:', err);
            }
        });
    }

    // Render function
    function renderFeedbackList(data) {
        const list = $("#feedbackList");
        list.empty();

        if (!Array.isArray(data) || data.length === 0) {
            list.append(`<div class="col-12 text-center text-muted">Không có phản hồi nào.</div>`);
            return;
        }

        data.forEach(item => {
            const bgColor = item.is_read ? "" : "background-color: #fff9db;";
            const card = `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card shadow-sm h-100 ${item.is_read ? 'border-success' : 'border-warning'}" style="${bgColor}">
                        <div class="card-body">
                            <h5 class="card-title text-primary mb-1">${item.name}</h5>
                            <p class="mb-1"><strong>Email:</strong> ${item.email}</p>
                            <p class="mb-1"><strong>Ngày:</strong> ${new Date(item.created_at).toLocaleDateString()}</p>
                            <p class="card-text mt-2">${item.message}</p>
                            <div class="d-flex justify-content-between mt-3">
                                <button class="btn btn-sm ${item.is_read ? 'btn-outline-secondary' : 'btn-outline-success'}" onclick="toggleRead(${item.id})">
                                    <i class="fa ${item.is_read ? 'fa-eye-slash' : 'fa-eye'}"></i> ${item.is_read ? 'Đã đọc' : 'Chưa đọc'}
                                </button>
                                <button class="btn btn-sm btn-outline-danger" onclick="deleteFeedback(${item.id})">
                                    <i class="fa fa-trash"></i> Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
            list.append(card);
        });
    }

    // Search filter
    $('#feedbackSearch').on('input', function () {
        const keyword = $(this).val().toLowerCase();
        const filtered = feedbackData.filter(f =>
            f.name.toLowerCase().includes(keyword) ||
            f.email.toLowerCase().includes(keyword) ||
            f.message.toLowerCase().includes(keyword)
        );
        renderFeedbackList(filtered);
    });

    // Global functions
    window.toggleRead = function (id) {
        ajaxRequest({
            url: `/api/feedbacks/${id}`,
            method: 'PUT',
            success: () => {
                toastr.success("✅ Đã đánh dấu là đã đọc");
                loadFeedbacks();
            },
            error: () => toastr.error("❌ Cập nhật trạng thái thất bại")
        });
    };

    window.deleteFeedback = function (id) {
        if (!confirm("Bạn có chắc muốn xóa phản hồi này?")) return;
        ajaxRequest({
            url: `/api/feedbacks/${id}`,
            method: 'DELETE',
            success: () => {
                toastr.success("🗑️ Đã xóa phản hồi");
                loadFeedbacks();
            },
            error: () => toastr.error("❌ Xóa phản hồi thất bại")
        });
    };

    // Init
    loadFeedbacks();
});
