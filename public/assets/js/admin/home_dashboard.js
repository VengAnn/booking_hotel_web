$(document).ready(function () {

    // Sidebar toggle
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });

    function closeSidebar() {
        if ($(window).width() < 968) {
            $('.sidebar, .content').removeClass("open");
        }
    }

    closeSidebar();

    function Loading() {
        $('#IDSpinner').removeClass('my-hidden');
    }

    function hideLoading() {
        $('#IDSpinner').addClass('my-hidden');
    }

    function getUserData() {
        const raw = localStorage.getItem('user-data');
        if (!raw) return null;

        try {
            const data = JSON.parse(raw);

            const required = ['username', 'user_id', 'token', 'expires_at'];
            for (const k of required) {
                if (!(k in data)) throw new Error(`Missing ${k}`);
            }

            if (new Date(data.expires_at) <= new Date()) {
                // token expired – clear cache
                localStorage.removeItem('user-data');
                return null;
            }
            return data;
        } catch (err) {
            console.error('Corrupt localStorage user-data:', err);
            localStorage.removeItem('user-data');
            return null;
        }
    }

    const user = getUserData();

    function logoutBtn() {
        $('#id-logout',).click(function (e) {
            e.preventDefault();

            if (!user) return;

            ajaxRequest({
                url: '/api/auth/logout',
                method: 'POST',
                data: { token: user.token },

                success() {
                    localStorage.removeItem('user-data');
                    window.location.href = '/login?successLogout=true';
                },

                error(err) {
                    console.error(err);
                    alert(err?.message || 'Đăng xuất không thành công.');
                }
            });
        })
    }
    logoutBtn();
});