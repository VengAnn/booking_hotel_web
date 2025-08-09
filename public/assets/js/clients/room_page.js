$(document).ready(function () {
    const $roomContainer = $('#roomList');
    const $searchMessage = $('#searchResultMessage');

    initSelectOptions();
    setupResetButtons();

    const t = {
        loginToBook: "⚠️ Vui lòng đăng nhập để đặt phòng.",
        noRooms: "Không có phòng nào thuộc loại này.",
        searching: "🔍 Đang tìm kiếm phòng phù hợp...",
        price: "Giá",
        capacity: "Sức chứa",
        beds: "Giường",
        amenities: "Tiện nghi",
        facilities: "Cơ sở vật chất",
        details: "Chi tiết",
        bookNow: "Đặt ngay",
        none: "Không có"
    };

    const urlParams = new URLSearchParams(window.location.search);
    $('#checkIn').val(urlParams.get('checkin') || '');
    $('#checkOut').val(urlParams.get('checkout') || '');
    $('#adults').val(urlParams.get('adults') || '');
    $('#children').val(urlParams.get('children') || '');

    $('#btnSearch').on('click', function () {
        getAllRooms();
        if (typeof toastr !== 'undefined') toastr.info(t.searching);
    });

    getAllRooms();

    function getAllRooms() {
        showLoader();
        $.ajax({
            url: `/api/room-types`,
            method: 'GET',
            success: function (res) {
                hideLoader();
                if (!Array.isArray(res.data)) return;
                renderGroupedRoomTypes(res.data);
            },
            error: function (err) {
                hideLoader();
                alert(`❌ ${err.message || 'Không thể tải danh sách phòng.'}`);
                console.error(err);
            }
        });
    }

    function renderGroupedRoomTypes(roomTypes) {
        $roomContainer.empty();
        $searchMessage.text('');

        const filters = {
            wifi: $('#filterWifi').prop('checked'),
            tv: $('#filterTv').prop('checked'),
            ac: $('#filterAc').prop('checked'),
            adults: parseInt($('#adults').val()),
            children: parseInt($('#children').val())
        };

        let found = false;

        roomTypes.forEach(rt => {
            const amenities = (rt.amenities || []).map(a => a.name.toLowerCase());
            const hasWifi = amenities.some(a => a.includes("wifi") || a.includes("wi-fi"));
            const hasTv = amenities.some(a => a.includes("tv") || a.includes("tivi"));
            const hasAc = amenities.some(a => a.includes("lạnh") || a.includes("điều hòa"));

            if ((filters.wifi && !hasWifi) || (filters.tv && !hasTv) || (filters.ac && !hasAc)) return;
            if (!isNaN(filters.adults) && rt.adults_capacity < filters.adults) return;
            if (!isNaN(filters.children) && rt.children_capacity < filters.children) return;

            found = true;

            const amenitiesList = rt.amenities?.map(a =>
                `<span class="badge bg-light text-dark fw-normal me-2 mb-2">${a.name}</span>`
            ).join('') || `<span class="text-muted">${t.none}</span>`;

            const facilitiesList = rt.facilities?.map(f =>
                `<span class="badge bg-light text-dark fw-normal me-2 mb-2">${f.name}</span>`
            ).join('') || `<span class="text-muted">${t.none}</span>`;

            const image = rt.images?.[0]?.img_url
                ? `/storage/${rt.images[0].img_url}`
                : 'https://placehold.co/800x200?text=No+Image';

            const card = `
                <div class="col-12 mb-4">
                    <div class="card shadow-sm border-0 h-100">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${image}" class="img-fluid h-100 w-100 object-fit-cover rounded-start" alt="${rt.name}">
                            </div>
                            <div class="col-md-8 d-flex flex-column justify-content-between p-3">
                                <div>
                                    <h5 class="fw-bold">${rt.name}</h5>
                                    <p><strong>${t.price}:</strong> ${parseInt(rt.price_per_night).toLocaleString()}$/ đêm</p>
                                    <p><strong>${t.capacity}:</strong> ${rt.adults_capacity} người lớn, ${rt.children_capacity} trẻ em</p>
                                    <p><strong>${t.beds}:</strong> ${rt.bed_count}</p>

                                    <p class="mt-2 mb-1"><strong>${t.amenities}:</strong></p>
                                    <div class="d-flex flex-wrap">${amenitiesList}</div>

                                    <p class="mt-2 mb-1"><strong>${t.facilities}:</strong></p>
                                    <div class="d-flex flex-wrap">${facilitiesList}</div>
                                </div>

                                <div class="text-end mt-3">
                                    <button class="btn btn-primary btn-sm btn-detail" data-type-id="${rt.id}">
                                        <i class="fas fa-info-circle me-1"></i> ${t.details}
                                    </button>
                                    <button class="btn btn-success btn-sm btn-book" data-type-id="${rt.id}">
                                        <i class="fas fa-cart-plus me-1"></i> ${t.bookNow}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $roomContainer.append(card);
        });

        if (!found) {
            $searchMessage.text(t.noRooms);
        }

        attachDetailEvents(roomTypes);
        attachBookNowEvents(roomTypes);
    }

    function attachDetailEvents(roomTypes) {
        $('.btn-detail').off('click').on('click', function () {
            const typeId = $(this).data('type-id');
            const selectedType = roomTypes.find(rt => rt.id == typeId);
            if (!selectedType?.rooms?.length) {
                alert(t.noRooms);
                return;
            }
            const query = buildQuery(typeId);
            window.location.href = `/detail-roomtype?${query}`;
        });
    }

    function attachBookNowEvents(roomTypes) {
        $('.btn-book').off('click').on('click', function () {
            const userData = localStorage.getItem('user-data');
            if (!userData) {
                alert(t.loginToBook);
                return;
            }

            const typeId = $(this).data('type-id');
            const selectedType = roomTypes.find(rt => rt.id == typeId);
            if (!selectedType?.rooms?.length) {
                alert(t.noRooms);
                return;
            }

            const query = buildQuery(typeId);
            window.location.href = `/booking-page?${query}`;
        });
    }

    function buildQuery(roomTypeId) {
        return new URLSearchParams({
            checkin: $('#checkIn').val(),
            checkout: $('#checkOut').val(),
            adults: $('#adults').val(),
            children: $('#children').val(),
            roomTypeId: roomTypeId
        }).toString();
    }

    function showLoader() {
        $roomContainer.html(`
            <div class="text-center my-4 w-100">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Đang tải...</span>
                </div>
            </div>
        `);
    }

    function hideLoader() {
        // No action needed as loader is replaced when results render
    }
});

function initSelectOptions() {
    const $adults = $('#adults').html('<option value="">-- Chọn --</option>');
    const $children = $('#children').html('<option value="">-- Chọn --</option>');

    for (let i = 1; i <= 3; i++) {
        $adults.append(`<option value="${i}">${i}</option>`);
    }

    for (let i = 0; i <= 2; i++) {
        $children.append(`<option value="${i}">${i}</option>`);
    }
}

function setupResetButtons() {
    $('#resetAdults').on('click', () => $('#adults').val(''));
    $('#resetChildren').on('click', () => $('#children').val(''));
}
