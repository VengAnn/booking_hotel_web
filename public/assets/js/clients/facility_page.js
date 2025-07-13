$(document).ready(function () {
    function renderCards(data, containerId, useImage = false) {
        const container = $(containerId);
        container.empty();

        if (!Array.isArray(data) || data.length === 0) {
            container.append(`<div class="col-12 text-center text-muted">Không có dữ liệu.</div>`);
            return;
        }

        data.forEach(item => {
            let visual = '';

            if (useImage && item.img_url) {
                const imageUrl = `/storage/${item.img_url}`;
                visual = `
                            <div class="d-flex justify-content-center mb-3">
                                <img src="${imageUrl}" alt="${item.name}" 
                                     style="width: 60px; height: 60px; object-fit: contain;">
                            </div>`;
            } else {
                const icon = item.icon || 'fa fa-star';
                visual = `
                            <div class="d-flex justify-content-center mb-3">
                                <i class="${icon} text-primary" style="font-size: 2.2rem; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;"></i>
                            </div>`;
            }

            const card = `
                        <div class="col-sm-6 col-md-4">
                            <div class="card p-3 h-100 text-center shadow-sm">
                                ${visual}
                                <h5 class="fw-semibold">${item.name}</h5>
                                <p class="text-muted">${item.description || ''}</p>
                            </div>
                        </div>`;
            container.append(card);
        });
    }

    // Load amenities (with image)
    ajaxRequest({
        url: '/api/amenity',
        method: 'GET',
        success: res => renderCards(res.data, '#amenitiesContainer', true),
        error: () => toastr.error('❌ Không thể tải tiện nghi.')
    });

    // Load facilities (with icon)
    ajaxRequest({
        url: '/api/facility',
        method: 'GET',
        success: res => renderCards(res.data, '#facilitiesContainer'),
        error: () => toastr.error('❌ Không thể tải cơ sở vật chất.')
    });
});