$(document).ready(function () {
    function getAlertFromRegisterPage() {
        const params = new URLSearchParams(window.location.search);
        const success = params.get('success');

        if (success === 'true') {
            showSuccess('Xác minh thành công!');
        }

        if (params.has('success')) {
            params.delete('success');
            const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
            window.history.replaceState({}, document.title, newUrl);
        }
    }

    // Call the alert function on page load
    getAlertFromRegisterPage();

    const $form = $('#resetPasswordForm');
    const $btn = $('#resetBtn');
    const $spinner = $('#loadingSpinner');
    const $btnText = $('#btnText');
    const $errorAlert = $('#errorAlert');
    const $successAlert = $('#successAlert');

    $btn.on('click', function () {
        // Clear alerts
        $errorAlert.addClass('d-none').html('');
        $successAlert.addClass('d-none').html('');

        // Show spinner & disable button
        $spinner.removeClass('d-none');
        $btn.prop('disabled', true);
        $btnText.text('Đang xử lý...');

        const data = {
            email: localStorage.getItem('otpEmail'),
            password: $('#password').val(),
            confirm_password: $('#password_confirmation').val(),
        };

        $.ajax({
            url: '/api/auth/update-password',
            type: 'PUT',
            data: data,
            success: function (res) {
                if (res.success) {
                    localStorage.removeItem("otpEmail");
                    $successAlert.html(res.message || 'Đặt lại mật khẩu thành công!')
                        .removeClass('d-none');
                    $form[0].reset();

                    // Redirect to login page 
                    window.location.href = '/login?success-reset=true';
                } else {
                    showError(res.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
                }
            },
            error: function (xhr) {
                let message = 'Đã xảy ra lỗi. Vui lòng thử lại.';
                if (xhr.responseJSON?.message) {
                    message = xhr.responseJSON.message;
                } else if (xhr.responseJSON?.errors) {
                    const errors = xhr.responseJSON.errors;
                    message = Object.values(errors).flat().join('<br>');
                }
                showError(message);
            },
            complete: function () {
                $spinner.addClass('d-none');
                $btn.prop('disabled', false);
                $btnText.text('Đặt lại mật khẩu');
            }
        });

        function showError(msg) {
            $errorAlert.html(msg).removeClass('d-none');
        }
    });
});