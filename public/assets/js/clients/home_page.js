$(function () {
    getUrlAlertLoginSucess();
    initSelectOptions();
    setupSearchHandler();
    setupDateValidation();
});

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
