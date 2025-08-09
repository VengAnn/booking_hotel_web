$(document).ready(function () {
    const $form = $("#otp-form");
    const $alertBox = $("#otp-alert");
    const $successBox = $("#otp-success");
    const $resendBtn = $("#resend-otp");
    const $otpInput = $("#otp");
    const $verifyBtn = $("#verify-btn");

    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const isSuccess = urlParams.get("success") === "true";

    if (isSuccess && email) {
        showSuccessBox(`✅ Mã OTP đã được gửi đến email: ${email}`);
        localStorage.setItem("otpEmail", email);
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
    }

    // Remove previous handler and add click for verify button
    $verifyBtn.off("click").on("click", function (e) {
        e.preventDefault();
        clearMessages();

        const otp = $otpInput.val().trim();
        const otpEmail = localStorage.getItem("otpEmail");

        if (!otp || otp.length !== 6) {
            showErrorBox("❌ Vui lòng nhập mã OTP hợp lệ gồm 6 chữ số.");
            return;
        }

        if (!otpEmail) {
            showErrorBox("❌ Không tìm thấy email để xác minh OTP.");
            return;
        }

        $verifyBtn.prop('disabled', true);

        ajaxRequest({
            url: "/api/otp/verify",
            method: "POST",
            data: {
                email: otpEmail,
                otp: otp,
            },
            success: function (data) {
                showSuccessBox(data.message || "✅ Xác minh thành công!");
                $otpInput.val("");

                window.location.href = "/reset-pass-page?success=true";
            },
            error: function (xhr) {
                const response = xhr.responseJSON || {};
                const message = response.message || "❌ Mã OTP không hợp lệ hoặc đã hết hạn.";
                showErrorBox(message);
            },
            complete: function () {
                $verifyBtn.prop('disabled', false);
            }
        });
    });

    // Remove previous handler and add click for resend link
    $resendBtn.off("click").on("click", function (e) {
        e.preventDefault();
        clearMessages();

        const resendEmail = localStorage.getItem("otpEmail") || email;

        if (!resendEmail) {
            showErrorBox("❌ Không tìm thấy email để gửi lại mã OTP.");
            return;
        }

        $resendBtn.prop('disabled', true);

        ajaxRequest({
            url: "/api/otp/resend",
            method: "POST",
            data: {
                email: resendEmail,
            },
            success: function (data) {
                if (data.success) {
                    showSuccessBox(data.message || "✅ Mã OTP mới đã được gửi!");
                } else {
                    showErrorBox(data.message || "❌ Không thể gửi lại mã OTP.");
                }
            },
            error: function (xhr) {
                const response = xhr.responseJSON || {};
                const message = response.message || getFirstError(response.errors) || "❌ Không thể gửi lại mã OTP. Vui lòng thử lại.";
                showErrorBox(message);
            },
            complete: function () {
                $resendBtn.prop('disabled', false);
            }
        });
    });

    function showErrorBox(message) {
        $alertBox.text(message).removeClass("d-none");
    }

    function showSuccessBox(message) {
        $successBox.text(message).removeClass("d-none");
    }

    function clearMessages() {
        $alertBox.addClass("d-none").text("");
        $successBox.addClass("d-none").text("");
    }

    function getFirstError(errors) {
        if (!errors) return null;
        for (let key in errors) {
            if (Array.isArray(errors[key])) {
                return errors[key][0];
            }
        }
        return null;
    }
});
