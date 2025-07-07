$(function () {
    getUrlAlertLoginSucess();

    initSelectOptions();
    setupSearchHandler();
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

// Initialize select options for adults & children
function initSelectOptions() {
    for (let i = 1; i <= 4; i++) {
        $('#adults').append(`<option value="${i}">${i}</option>`);
    }
    for (let i = 0; i <= 2; i++) {
        $('#children').append(`<option value="${i}">${i}</option>`);
    }
}





// Handle room search button
function setupSearchHandler() {
    $('#searchBtn').click(function () {
        const checkin = $('#checkin').val();
        const checkout = $('#checkout').val();
        const adults = $('#adults').val();
        const children = $('#children').val();

        if (!checkin || !checkout) {
            alert("Vui lòng chọn ngày nhận và trả phòng.");
            return;
        }

        alert(`Tìm phòng từ ${checkin} đến ${checkout} cho ${adults} người lớn và ${children} trẻ em.`);
    });
}

