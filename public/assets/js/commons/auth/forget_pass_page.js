$(document).ready(function () {
    const $form = $("#forget-form");
    const $alertBox = $("#forget-alert");
    const $successBox = $("#forget-success");
    const $emailInput = $("#email");
    const $submitButton = $("#btn-forget-pass");


    function showLoading() {
        $('#loadingSpinner').show();
        $('#btn-forget-pass').hide();
    }
    function hideLoading() {
        $('#loadingSpinner').hide();
        $('#btn-forget-pass').show();
    }


    $submitButton.on("click", function () {
        $alertBox.addClass("d-none").text('');
        $successBox.addClass("d-none").text('');

        const email = $emailInput.val().trim();

        if (!email) {
            showErrorBox("Vui lòng nhập email.");
            return;
        }

        showLoading();

        ajaxRequest({
            url: "/api/otp/send",
            method: "POST",
            data: { email },
            success: function (res) {
                hideLoading();

                if (res.success) {
                    window.location.href = `/verify-otp?success=true&email=${encodeURIComponent(email)}`;
                } else {
                    showErrorBox(res.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
                }
            },
            error: function ({ message }) {
                hideLoading();

                if (message && message.email && Array.isArray(message.email)) {
                    showErrorBox(message.email[0]);
                } else {
                    showErrorBox("Lỗi kết nối. Vui lòng thử lại.");
                }
            }
        });
    });

    function showErrorBox(message) {
        $alertBox.text(message).removeClass("d-none");
    }
});
