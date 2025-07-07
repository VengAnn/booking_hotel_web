$(document).ready(function () {
    const $alertBox = $('#register-alert');
    const $btnRegister = $('#btnRegister');

    function showLoading() {
        $('#loadingSpinner').show();
        $('#btnRegister').hide();
    }
    function hideLoading() {
        $('#loadingSpinner').hide();
        $('#btnRegister').show();
    }

    $btnRegister.on('click', function (e) {
        e.preventDefault();

        showLoading();

        // Clear alert box
        $alertBox.addClass('d-none').text('');

        const username = $('#username').val().trim();
        const email = $('#email').val().trim();
        const phone = $('#phone').val().trim();
        const password = $('#password').val();
        const passwordConfirmation = $('#password_confirmation').val();

        if (!username || !email || !phone || !password || !passwordConfirmation) {
            hideLoading();
            return showAlert('Vui lòng nhập đầy đủ thông tin.');
        }

        if (password !== passwordConfirmation) {
            hideLoading();
            return showAlert('Mật khẩu xác nhận không khớp.');
        }

        $.ajax({
            url: '/api/auth/register',
            type: 'POST',
            data: {
                username: username,
                email: email,
                phone: phone,
                password: password,
                confirm_password: passwordConfirmation,
                user_role: 'user'
            },
            success: function (res) {
                hideLoading();
                if (res.success) {
                    // Redirect with success query string
                    window.location.href = '/login?success=true';
                } else {
                    showAlert(res.message || 'Đăng ký không thành công.');
                }

            },
            error: function (xhr) {
                hideLoading();

                let message = 'Đăng ký không thành công.';
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    message = xhr.responseJSON.message;
                }
                showAlert(message);
            }
        });
    });

    function showAlert(message) {
        $alertBox.removeClass('d-none').text(message);
    }
});
