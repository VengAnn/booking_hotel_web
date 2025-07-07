$(document).ready(function () {

    /* -------------------------------------------------
     * Read & validate user‑data in localStorage
     * ------------------------------------------------- */
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
    updateNavbar();
    bindLogout();


    /* -------------------------------------------------
     *  Show either guest buttons or user dropdown
     * ------------------------------------------------- */
    function updateNavbar() {

        if (user) {
            // ✅ user
            $('#guest-buttons').addClass('d-none');
            $('#user-profile').removeClass('d-none');

            $('#nav-username').text(user.username);

            const avatar = (user.user_profile && user.user_profile.trim())
                ? user.user_profile
                : '/assets/icons/logo_profile.png';

            $('#nav-avatar').attr('src', avatar);

        } else {
            // 🚫 guest                                        
            $('#guest-buttons').removeClass('d-none');
            $('#user-profile').addClass('d-none');
        }
    }


    /* -------------------------------------------------
     * Logout – only bind if user exists
     * ------------------------------------------------- */
    function bindLogout() {
        $('#btnLogout').on('click', function (e) {
            e.preventDefault();

            if (!user) return;

            // OPTIONAL: disable button / spinner here
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
        });
    }
});
