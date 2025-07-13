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
    if (user) {
        fetchCurrentUser(user);
    } else {
        updateNavbar(null);
    }

    bindLogout();

    /* -------------------------------------------------
     * Fetch current user full data from API using JWT
     * ------------------------------------------------- */
    function fetchCurrentUser(user) {
        ajaxRequest({
            url: `/api/auth/current-user`,
            method: 'POST',
            data: { id: user.user_id },
            success: function (res) {
                console.log('user is :', res.data);

                if (res && res.data) {
                    const updated = {
                        ...user,
                        username: res.data.username,
                        user_profile: res.data.user_profile
                            ? `/storage/${res.data.user_profile}`
                            : null
                    };

                    updateNavbar(updated);
                } else {
                    updateNavbar(user);
                }
            },
            error: function (err) {
                console.error('Failed to fetch user profile:', err);
                updateNavbar(user);
            }
        });
    }

    /* -------------------------------------------------
     * Update navbar for authenticated or guest user
     * ------------------------------------------------- */
    function updateNavbar(user) {
        if (user) {
            $('#guest-buttons').addClass('d-none');
            $('#user-profile').removeClass('d-none');

            $('#nav-username').text(user.username);

            const avatar = user.user_profile && user.user_profile.trim()
                ? user.user_profile
                : '/assets/icons/logo_profile.png';

            console.log('avatar is :', avatar);
            $('#nav-avatar').attr('src', avatar);
        } else {
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
