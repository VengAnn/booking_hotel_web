$(document).ready(function () {
    const $roomContainer = $('#roomContainer');
    let roomsTypeGl = [];

    function getAllRooms() {
        ajaxRequest({
            url: `/api/room-types`,
            method: 'GET',
            success: (res) => {
                if (!Array.isArray(res.data)) return;

                roomsTypeGl = [...res.data];
                renderGroupedByRoomType(roomsTypeGl);
            },
            error: (err) => {
                console.error(err);
                alert(`❌ Không thể lấy danh sách phòng: ${err.message || ''}`);
            }
        });
    }

    function renderGroupedByRoomType(roomTypes) {
        $roomContainer.empty();

        if (!roomTypes.length) {
            $roomContainer.append(`
                <div class="col-12 text-center text-muted">
                    Không có loại phòng nào được hiển thị
                </div>
            `);
            return;
        }

        roomTypes.forEach(roomType => {
            const roomImage = roomType.images?.length
                ? roomType.images[0].img_url
                : 'assets/images/slide_hotel_1.png';

            const amenitiesList = (roomType.amenities || []).map(a => `
                <span class="badge bg-light text-dark fw-normal me-2 mb-2">${a.name}</span>
            `).join('');

            const facilitiesList = (roomType.facilities || []).map(f => `
                <span class="badge bg-light text-dark fw-normal me-2 mb-2">${f.name}</span>
            `).join('');

            const card = `
                <div class="col-md-4 mb-4">
                    <div class="card room-card shadow-sm h-100 border-0 rounded-4">
                        <img src="/storage/${roomImage}" class="w-100 object-fit-cover rounded-top-4" style="height:220px;" alt="${roomType.name}">
                        <div class="card-body">
                            <h5 class="card-title fw-bold text-primary">${roomType.name}</h5>
                            <p class="text-muted mb-1"><strong>Giá:</strong> ${parseInt(roomType.price_per_night).toLocaleString()} VND / đêm</p>
                            <p class="mb-1"><strong>Sức chứa:</strong> ${roomType.adults_capacity} người lớn, ${roomType.children_capacity} trẻ em</p>
                            <p class="mb-1"><strong>Số giường:</strong> ${roomType.bed_count}</p>
                           
                            <p class="mt-2 mb-1"><strong>Tiện nghi:</strong></p>
                            <div class="d-flex flex-wrap">${amenitiesList || '<span class="text-muted">Không có</span>'}</div>

                            <p class="mt-2 mb-1"><strong>Cơ sở vật chất:</strong></p>
                            <div class="d-flex flex-wrap">${facilitiesList || '<span class="text-muted">Không có</span>'}</div>

                            <div class="d-flex justify-content-between mt-3">
                                <a href="/detail-roomtype?id=${roomType.id}" class="btn btn-sm btn-outline-info">Chi tiết</a>
                                <a href="/booking-page?roomTypeId=${roomType.id}" class="btn btn-sm btn-success">Đặt ngay</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            $roomContainer.append(card);
        });
    }

    // Init
    getAllRooms();

    // ✅ Add this block at the end
    $(document).on('click', '.btn-success', function (e) {
        const userData = localStorage.getItem('user-data');

        if (!userData) {
            e.preventDefault();
            showWarning('⚠️ Vui lòng đăng nhập để đặt phòng!');
        }
    });
});
