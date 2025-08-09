$(document).ready(function () {
    const $alertBox = $('#login-alert');
    const $emailInput = $('#email');
    const $passwordInput = $('#password');
    const $rememberCheckbox = $('#remember');

    init();

    function init() {
        getAlertFromRegisterPage();

        loadRememberedCredentials();
        btnLogin();
    }

    function showLoading() {
        $('#loadingSpinner').show();
        $('#btnLogin').hide();
    }
    function hideLoading() {
        $('#loadingSpinner').hide();
        $('#btnLogin').show();
    }

    function getAlertFromRegisterPage() {
        const params = new URLSearchParams(window.location.search);
        const success = params.get('success');
        const successLogout = params.get('successLogout');
        const successReset = params.get('success-reset');

        if (success === 'true') {
            showSuccess('Đăng ký thành công!');
        } else if (successLogout === 'true') {
            showSuccess('Đăng xuất thành công!');
        } else if (successReset === 'true') {
            showSuccess('Đặt lại mật khẩu thành công!');
        }

        // Remove success=true from URL without reload
        const url = new URL(window.location.href);
        url.searchParams.delete('success');
        window.history.replaceState({}, document.title, url.pathname);
    }


    function btnLogin() {
        $('#btnLogin').on('click', function (e) {
            e.preventDefault();

            showLoading();
            hideAlert();

            const email = $emailInput.val().trim();
            const password = $passwordInput.val();
            const remember = $rememberCheckbox.is(':checked');

            if (!email || !password) {
                hideLoading();
                showAlert('Vui lòng nhập đầy đủ thông tin.');
                return;
            }

            ajaxRequest({
                url: '/api/auth/login',
                method: 'POST',
                data: {
                    "email": email,
                    "password": password,
                },
                success: function (res) {
                    hideLoading();
                    const userRole = res.data.user.user_role;
                    const username = res.data.user.username;
                    const userId = res.data.user.id;
                    const user_profile = res.data.user.user_profile;
                    const token = res.data.token;

                    saveLocalStorage(username, userId, user_profile, token, userRole, res.data.expires_at);
                    if (res.success) {
                        handleRememberOption(email, password, remember);

                        if (userRole == 'user') {
                            window.location.href = '/?success=true'; // home page
                        } else if (userRole == 'admin') {
                            window.location.href = '/home-dashboard?success=true'; // home page
                        } else if (userRole == 'staff') {
                            window.location.href = '/?success=true'; // home page
                        }

                    } else {
                        showAlert(res.message || 'Đăng nhập không thành công.');
                    }
                },
                error: function (err) {
                    console.error(err);
                    hideLoading();

                    const message = err?.message || 'Đăng nhập không thành công.';
                    showAlert(message);
                }
            });
        });
    }

    function saveLocalStorage(username, id, user_profile, token, role, expires_at) {
        localStorage.removeItem('user-data');

        localStorage.setItem(
            'user-data',
            JSON.stringify({
                username: username,
                user_id: id,
                user_profile: user_profile,
                token: token,
                user_role: role,
                expires_at: expires_at
            })
        );
    }

    function handleRememberOption(email, password, remember) {
        if (remember) {
            localStorage.setItem('remembered_email', email);
            localStorage.setItem('remembered_password', password);
        } else {
            localStorage.removeItem('remembered_email');
            localStorage.removeItem('remembered_password');
        }
    }

    function loadRememberedCredentials() {
        const rememberedEmail = localStorage.getItem('remembered_email');
        const rememberedPassword = localStorage.getItem('remembered_password');

        if (rememberedEmail && rememberedPassword) {
            $emailInput.val(rememberedEmail);
            $passwordInput.val(rememberedPassword);
            $rememberCheckbox.prop('checked', true);
        }
    }

    function showAlert(message) {
        $alertBox.removeClass('d-none').text(message);
    }

    function hideAlert() {
        $alertBox.addClass('d-none').text('');
    }
});
