$(document).ready(function () {
    renderAmenities();

    function renderAmenities() {
        ajaxRequest({
            url: '/api/amenity',
            method: 'GET',
            success: (res) => {
                const amenities = (res.data || []).slice(0, 4); // ✅ Only take first 4 items
                const grid = document.getElementById('amenitiesGrid');
                if (!grid) return;

                grid.innerHTML = ''; // Clear previous content

                amenities.forEach(item => {
                    const imageUrl = `/storage/${item.img_url}`;
                    const name = item.name || 'Không tên';

                    const col = document.createElement('div');
                    col.className = 'col text-center';

                    col.innerHTML = `
                        <div class="d-flex flex-column align-items-center p-3 border rounded-4 h-100 shadow-sm bg-white">
                            <img src="${imageUrl}" alt="${name}" 
                                 style="width: 60px; height: 60px; object-fit: contain;" class="mb-2">
                            <h6 class="mb-0 text-capitalize">${name}</h6>
                        </div>
                    `;
                    grid.appendChild(col);
                });
            },
            error: () => {
                toastr.error('❌ Không thể tải dữ liệu tiện nghi từ API');
            }
        });
    }
});
