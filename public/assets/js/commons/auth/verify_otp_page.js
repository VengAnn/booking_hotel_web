$(document).ready(function () {
    const form = $("#otp-form");
    const alertBox = $("#otp-alert");
    const successBox = $("#otp-success");
    const resendBtn = $("#resend-otp");

    form.on("submit", function (e) {
        e.preventDefault();
        alertBox.addClass("d-none");
        successBox.addClass("d-none");

        const otp = $("#otp").val().trim();

        if (!otp || otp.length !== 6) {
            showError("Vui lòng nhập mã OTP hợp lệ gồm 6 chữ số.");
            return;
        }

        $.ajax({
            url: "/verify-otp",
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            contentType: "application/json",
            data: JSON.stringify({ otp }),
            success: function (data) {
                if (data.success) {
                    successBox.text(data.message || "Xác minh thành công!").removeClass("d-none");
                    setTimeout(() => {
                        window.location.href = data.redirect || "/login";
                    }, 1500);
                } else {
                    showError(data.message || "Mã OTP không hợp lệ hoặc đã hết hạn.");
                }
            },
            error: function () {
                showError("Có lỗi xảy ra. Vui lòng thử lại.");
            }
        });
    });

    resendBtn.on("click", function (e) {
        e.preventDefault();
        alertBox.addClass("d-none");
        successBox.addClass("d-none");

        $.ajax({
            url: "/resend-otp",
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            success: function (data) {
                if (data.success) {
                    successBox.text(data.message || "Mã OTP mới đã được gửi!").removeClass("d-none");
                } else {
                    showError(data.message || "Không thể gửi lại mã OTP.");
                }
            },
            error: function () {
                showError("Không thể gửi lại mã OTP. Vui lòng thử lại.");
            }
        });
    });

    function showError(message) {
        alertBox.text(message).removeClass("d-none");
    }
});
