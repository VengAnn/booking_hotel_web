$(function () {
    checkUserRoleAndRedirect();

    getUrlAlertLoginSucess();
    initSelectOptions();
    setupSearchHandler();
    setupDateValidation();
});

function checkUserRoleAndRedirect() {
    const rawUserData = localStorage.getItem('user-data');

    if (!rawUserData) {
        console.warn('⚠️ No user-data found. User is not logged in.');
        return;
    }

    let token;
    try {
        const userData = JSON.parse(rawUserData);
        token = userData.token;

        if (!token) {
            console.warn('⚠️ Token missing in user-data object.');
            return;
        }
    } catch (e) {
        console.error('❌ Failed to parse user-data from localStorage:', e);
        return;
    }

    $.ajax({
        url: '/api/check-role',
        type: 'GET',
        dataType: 'json',
        cache: false,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function (response) {
            if (response.status === 'success') {
                if (response.role === 'admin') {
                    window.location.href = '/home-dashboard';
                }
                // Non-admin stays on current page
            } else {
                console.warn('⚠️ Unexpected response from server:', response);
            }
        },
        error: function (xhr) {
            if (xhr.status === 401) {
                localStorage.removeItem('user-data');
                window.location.href = '/login';
            } else {
                console.error('❌ Role check failed:', xhr);
            }
        }
    });
}


function getUrlAlertLoginSucess() {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');

    if (success === 'true') {
        showSuccess('Đăng nhập thành công!');
    }

    // Remove success=true from URL without reload
    const url = new URL(window.location.href);
    url.searchParams.delete('success');
    window.history.replaceState({}, document.title, url.pathname);
}

function initSelectOptions() {
    for (let i = 1; i <= 3; i++) {
        $('#adults').append(`<option value="${i}">${i}</option>`);
    }

    for (let i = 0; i <= 2; i++) {
        $('#children').append(`<option value="${i}">${i}</option>`);
    }
}

function setupSearchHandler() {
    $('#searchBtn').click(function () {
        const checkin = $('#checkin').val();
        const checkout = $('#checkout').val();
        const adults = $('#adults').val();
        const children = $('#children').val();

        if (!checkin || !checkout) {
            alert("❗ Vui lòng chọn ngày nhận và trả phòng.");
            return;
        }

        if (checkout <= checkin) {
            alert("❗ Ngày trả phòng phải sau ngày nhận phòng.");
            return;
        }

        // showSuccess(`🔍 Tìm phòng từ ${checkin} đến ${checkout} cho ${adults} người lớn và ${children} trẻ em.`);
        // delay 300ms
        setTimeout(function () {
            window.location.href = `/room?checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}`;
        }, 300);
    });
}

function setupDateValidation() {
    const today = new Date().toISOString().split("T")[0];
    $('#checkin').attr('min', today);

    // when change checkin, reset checkout
    $('#checkin').on('change', function () {
        const checkinDate = $(this).val();
        $('#checkout').val('');
        $('#checkout').attr('min', checkinDate);
    });

    // when change checkout
    $('#checkout').on('change', function () {
        const checkin = $('#checkin').val();
        const checkout = $(this).val();
        if (checkout <= checkin) {
            alert("❌ Ngày trả phòng phải sau ngày nhận phòng.");
            $(this).val('');
        }
    });
}
