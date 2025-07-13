$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || params.get('roomTypeId');

    const checkin = params.get('checkin') || '';
    const checkout = params.get('checkout') || '';
    const adults = params.get('adults') || '';
    const children = params.get('children') || '';

    if (!id) {
        $('#room-type-detail').html('<p class="text-danger">❌ Không có ID phòng trên URL.</p>');
        return;
    }

    ajaxRequest({
        url: `/api/room-types/${id}`,
        method: 'GET',
        success: function (res) {
            const rt = res.data;
            if (!rt) {
                $('#room-type-detail').html('<p class="text-danger">❌ Không tìm thấy dữ liệu phòng.</p>');
                return;
            }

            $('#roomTypeName').text(rt.name);
            $('#roomTypePrice').text(parseInt(rt.price_per_night).toLocaleString());
            $('#roomTypeCapacity').text(`${rt.adults_capacity} người lớn, ${rt.children_capacity} trẻ em`);
            $('#roomTypeBeds').text(rt.bed_count);
            $('#roomTypeDescription').text(rt.description || 'Không có mô tả');

            $('#roomImages').html(
                (rt.images || []).map(img => `
                    <a href="/storage/${img.img_url}" data-lightbox="room-gallery" data-title="${rt.name}">
                        <img src="/storage/${img.img_url}" class="img-thumb mb-3" alt="${rt.name}">
                    </a>
                `).join('') || '<div class="text-muted">Không có hình ảnh</div>'
            );

            $('#roomAmenities').html(
                (rt.amenities || []).map(a => `<span class="badge bg-primary">${a.name}</span>`).join('')
                || '<span class="text-muted">Không có tiện nghi</span>'
            );

            $('#roomFacilities').html(
                (rt.facilities || []).map(f => `<span class="badge bg-secondary">${f.name}</span>`).join('')
                || '<span class="text-muted">Không có cơ sở vật chất</span>'
            );

            $('#roomList').html(
                (rt.rooms || []).map(r => `
                    <div class="col-6 col-md-4">
                        <div class="room-card text-center">
                            <strong>Phòng ${r.room_number}</strong>
                        </div>
                    </div>
                `).join('') || '<p class="text-muted">Không có phòng</p>'
            );

            const query = new URLSearchParams({ roomTypeId: rt.id, checkin, checkout, adults, children }).toString();
            $('#bookingBtnContainer').html(`
                <a href="/booking-page?${query}" class="btn btn-success px-4 py-2">
                    <i class="fas fa-cart-plus me-1"></i> Đặt ngay
                </a>
            `);

            loadReviews(rt.id);
        },
        error: function () {
            $('#room-type-detail').html('<p class="text-danger">❌ Lỗi khi tải dữ liệu.</p>');
        }
    });

    function renderStars(rating) {
        return '<span class="text-warning fw-bold">' +
            '★'.repeat(rating) +
            '<span class="text-muted">' + '★'.repeat(5 - rating) + '</span>' +
            '</span>';
    }

    let allReviews = [];

    function loadReviews(roomTypeId) {
        ajaxRequest({
            url: `/api/reviews/room-type/${roomTypeId}`,
            method: 'GET',
            success: function (res) {
                allReviews = res.data || [];
                renderReviews(allReviews);
            },
            error: function () {
                $('#reviewList').html('<p class="text-danger">Không thể tải đánh giá.</p>');
            }
        });
    }

    function renderReviews(data) {
        const container = $('#reviewList').empty();

        if (!data.length) {
            container.html('<p class="text-muted">Chưa có đánh giá nào.</p>');
            return;
        }

        data.forEach(r => {
            container.append(`
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card h-100 shadow-sm border-0">
                        <div class="card-body">
                            <h6 class="mb-1 text-primary fw-bold">${r.user?.username || 'Khách'}</h6>
                            <p class="mb-1"><strong>Phòng:</strong> ${r.room?.room_number || '---'}</p>
                            <p class="mb-1"><strong>Ngày:</strong> ${new Date(r.created_at).toLocaleDateString()}</p>
                            <p class="mb-1"><strong>Đánh giá:</strong> ${renderStars(r.rating)}</p>
                            <p class="mt-2">${r.comment || ''}</p>
                        </div>
                    </div>
                </div>
            `);
        });
    }

    $('#reviewSearch').on('input', function () {
        const keyword = $(this).val().toLowerCase().trim();

        const filtered = allReviews.filter(r =>
            (r.user?.username || '').toLowerCase().includes(keyword) ||
            (r.room?.room_number || '').toLowerCase().includes(keyword) ||
            (r.comment || '').toLowerCase().includes(keyword)
        );

        renderReviews(filtered);
    });
});
