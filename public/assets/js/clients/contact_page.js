$(document).ready(function () {
    $("#btnSendFeedback").on("click", function () {
        const name = $("#fbName").val().trim();
        const email = $("#fbEmail").val().trim();
        const message = $("#fbMessage").val().trim();

        if (!name || !email || !message) {
            toastr.warning("⚠️ Vui lòng điền đầy đủ thông tin!");
            return;
        }

        ajaxRequest({
            url: '/api/feedbacks',
            method: 'POST',
            data: { name, email, message },
            success: () => {
                toastr.success("✅ Cảm ơn bạn đã gửi phản hồi!");
                $("#fbName").val('');
                $("#fbEmail").val('');
                $("#fbMessage").val('');
            },
            error: (err) => {
                console.error('Lỗi gửi feedback:', err);
                toastr.error(err.message || "❌ Gửi phản hồi thất bại");
            }
        });
    });
});
