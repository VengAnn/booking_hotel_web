$(document).ready(function () {
    const $roomContainer = $('#roomList');

    // Load values from URL if available
    const urlParams = new URLSearchParams(window.location.search);
    const checkin = urlParams.get('checkin');
    const checkout = urlParams.get('checkout');
    const adults = urlParams.get('adults');
    const children = urlParams.get('children');

    if (checkin) $('#checkIn').val(checkin);
    if (checkout) $('#checkOut').val(checkout);
    if (adults) $('#adults').val(adults);
    if (children) $('#children').val(children);

    // Fetch room types
    function getAllRooms() {
        showLoader();

        ajaxRequest({
            url: `/api/room-types`,
            method: 'GET',
            success: (res) => {
                hideLoader();

                if (!Array.isArray(res.data)) return;
                renderGroupedRoomTypes(res.data);
            },
            error: (err) => {
                hideLoader();
                console.error(err);
                alert(`❌ Không thể tải danh sách phòng: ${err.message || ''}`);
            }
        });
    }

    // Render room cards grouped by room type
    function renderGroupedRoomTypes(roomTypes) {
        $roomContainer.html('');

        const wifiFilter = $('#filterWifi').prop('checked');
        const tvFilter = $('#filterTv').prop('checked');
        const acFilter = $('#filterAc').prop('checked');

        roomTypes.forEach(rt => {
            const amenities = (rt.amenities || []).map(a => a.name.toLowerCase());
            const hasWifi = amenities.some(a => a.includes("wifi") || a.includes("wi-fi"));
            const hasTv = amenities.some(a => a.includes("tv") || a.includes("tivi"));
            const hasAc = amenities.some(a => a.includes("lạnh") || a.includes("điều hòa"));

            // Skip room type if it doesn't match filter
            if ((wifiFilter && !hasWifi) || (tvFilter && !hasTv) || (acFilter && !hasAc)) {
                return;
            }

            const amenitiesList = (rt.amenities || []).map(a =>
                `<span class="badge bg-light text-dark fw-normal me-2 mb-2">${a.name}</span>`
            ).join('');

            const facilitiesList = (rt.facilities || []).map(f =>
                `<span class="badge bg-light text-dark fw-normal me-2 mb-2">${f.name}</span>`
            ).join('');

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
                                    <p><strong>Giá:</strong> ${parseInt(rt.price_per_night).toLocaleString()} VND / đêm</p>
                                    <p><strong>Sức chứa:</strong> ${rt.adults_capacity} người lớn, ${rt.children_capacity} trẻ em</p>
                                    <p><strong>Số giường:</strong> ${rt.bed_count}</p>

                                    <p class="mt-2 mb-1"><strong>Tiện nghi:</strong></p>
                                    <div class="d-flex flex-wrap">${amenitiesList || '<span class="text-muted">Không có</span>'}</div>

                                    <p class="mt-2 mb-1"><strong>Cơ sở vật chất:</strong></p>
                                    <div class="d-flex flex-wrap">${facilitiesList || '<span class="text-muted">Không có</span>'}</div>
                                </div>

                                <!-- Two buttons detail room type and booking now -->
                                <div class="text-end mt-3">
                                   <button class="btn btn-primary btn-sm btn-detail" data-type-id="${rt.id}" data-type-name="${rt.name}">
                                        <i class="fas fa-info-circle me-1"></i> Chi tiết
                                    </button>

                                    <button class="btn btn-success btn-sm btn-book" data-type-id="${rt.id}" data-type-name="${rt.name}">
                                        <i class="fas fa-cart-plus me-1"></i> Đặt ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            $roomContainer.append(card);
        });

        attachBookNowEvents(roomTypes);
        attachDetailEvents(roomTypes);
    }

    // Handle detail button
    function attachDetailEvents(roomTypes) {
        $('.btn-detail').off('click').on('click', function () {
            const typeId = $(this).data('type-id');
            const selectedType = roomTypes.find(rt => rt.id == typeId);

            if (!selectedType || !selectedType.rooms?.length) {
                alert("Không có phòng cho loại này.");
                return;
            }

            // ✅ Redirect to room detail page with room + filters
            const query = new URLSearchParams({
                checkin: $('#checkIn').val(),
                checkout: $('#checkOut').val(),
                adults: $('#adults').val(),
                children: $('#children').val(),
                roomTypeId: typeId,
            }).toString();

            window.location.href = `/detail-roomtype?${query}`;
        });
    }

    // Handle book button
    function attachBookNowEvents(roomTypes) {
        $('.btn-book').off('click').on('click', function () {
            const typeId = $(this).data('type-id');
            const selectedType = roomTypes.find(rt => rt.id == typeId);

            if (!selectedType || !selectedType.rooms?.length) {
                alert("Không có phòng cho loại này.");
                return;
            }

            // ✅ Redirect to booking page with room + filters
            const query = new URLSearchParams({
                checkin: $('#checkIn').val(),
                checkout: $('#checkOut').val(),
                adults: $('#adults').val(),
                children: $('#children').val(),
                roomTypeId: typeId
            }).toString();

            window.location.href = `/booking-page?${query}`;
        });
    }

    // Handle filter button click
    $('#btnSearch').on('click', function () {
        getAllRooms();

        if (typeof toastr !== 'undefined') {
            toastr.info('🔍 Đang tìm kiếm phòng phù hợp...');
        }
    });

    // Initial load
    getAllRooms();
});
