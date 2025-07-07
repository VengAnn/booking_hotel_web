$(document).ready(function () {
    renderAmenities();

    // Render hotel-wide amenities section
    function renderAmenities() {
        const amenities = [
            { name: 'Điều hòa', image: '/assets/images/amenities/air-conditioner.png' },
            { name: 'Máy sưởi', image: '/assets/images/amenities/heater.png' },
            { name: 'Tivi', image: '/assets/images/amenities/smart-tv.png' },
            { name: 'Spa', image: '/assets/images/amenities/spa.png' },
            { name: 'Wi-Fi', image: '/assets/images/amenities/wifi.png' }
        ];

        const grid = document.getElementById('amenitiesGrid');
        if (!grid) return;

        amenities.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col text-center';

            col.innerHTML = `
            <div class="d-flex flex-column align-items-center p-3 border rounded-4 h-100 shadow-sm bg-white">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: contain;" class="mb-2">
                <h6 class="mb-0 text-capitalize">${item.name}</h6>
            </div>
        `;
            grid.appendChild(col);
        });
    }

});