$(document).ready(function () {
    const rooms = [
        {
            id: 1,
            name: "Phòng Deluxe 1",
            guests: 2,
            bed: "1 giường đôi",
            price: 500000,
            wifi: true,
            tv: true,
            ac: true,
            image: "https://placehold.co/800x200?text=Room+1"
        },
        {
            id: 2,
            name: "Phòng Deluxe 2",
            guests: 2,
            bed: "1 giường đôi",
            price: 550000,
            wifi: true,
            tv: false,
            ac: true,
            image: "https://placehold.co/800x200?text=Room+2"
        },
        {
            id: 3,
            name: "Phòng Standard 3",
            guests: 2,
            bed: "1 giường đôi",
            price: 450000,
            wifi: false,
            tv: true,
            ac: false,
            image: "https://placehold.co/800x200?text=Room+3"
        },
        {
            id: 4,
            name: "Phòng Suite 4",
            guests: 2,
            bed: "1 giường đôi",
            price: 650000,
            wifi: true,
            tv: true,
            ac: false,
            image: "https://placehold.co/800x200?text=Room+4"
        }
    ];

    function renderRooms(filteredRooms) {
        const container = document.getElementById('roomList');
        container.innerHTML = '';

        if (filteredRooms.length === 0) {
            container.innerHTML = '<div class="col-12"><p class="text-center text-muted">Không tìm thấy phòng phù hợp.</p></div>';
            return;
        }

        filteredRooms.forEach(room => {
            const roomWrapper = document.createElement('div');
            roomWrapper.className = 'mb-4 col-12';

            let amenities = [];
            if (room.wifi) amenities.push('<i class="fas fa-wifi text-success me-1"></i>Wi-Fi');
            if (room.tv) amenities.push('<i class="fas fa-tv text-warning me-1"></i>TV');
            if (room.ac) amenities.push('<i class="fas fa-snowflake text-info me-1"></i>Điều hòa');

            roomWrapper.innerHTML = `
                <div class="card flex-column flex-md-row shadow-sm border-0 h-100">
                    <img src="${room.image}" class="img-fluid rounded-start" style="max-width: 300px; object-fit: cover;" alt="${room.name}">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5 class="card-title fw-bold">${room.name}</h5>
                            <p class="mb-1"><i class="fas fa-users me-1 text-primary"></i><strong> Số khách:</strong> ${room.guests} người</p>
                            <p class="mb-1"><i class="fas fa-bed me-1 text-secondary"></i><strong> Loại giường:</strong> ${room.bed}</p>
                            <p class="mb-1"><i class="fas fa-check-circle me-1 text-success"></i><strong> Tiện nghi:</strong> ${amenities.join(', ')}</p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                            <strong class="text-danger fs-6">${room.price.toLocaleString()}đ / đêm</strong>
                            <div class="mt-2 mt-md-0">
                                <a href="#" class="btn btn-outline-secondary btn-sm me-2"><i class="fas fa-info-circle me-1"></i>Chi tiết</a>
                                <a href="#" class="btn btn-success btn-sm"><i class="fas fa-cart-plus me-1"></i>Đặt ngay</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            container.appendChild(roomWrapper);
        });
    }

    function applyFilters() {
        const wifi = document.getElementById('filterWifi').checked;
        const tv = document.getElementById('filterTv').checked;
        const ac = document.getElementById('filterAc').checked;

        const filtered = rooms.filter(room => {
            return (!wifi || room.wifi) &&
                (!tv || room.tv) &&
                (!ac || room.ac);
        });

        renderRooms(filtered);
    }

    // Initial render
    renderRooms(rooms);

    // Search button click
    $('#btnSearch').on('click', function () {
        applyFilters();
        if (typeof toastr !== 'undefined') {
            toastr.info('Đang tìm phòng phù hợp...');
        }
    });
});
