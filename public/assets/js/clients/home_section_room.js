$(document).ready(function () {
    const $roomContainer = $('#roomContainer');

    // Fetch rooms from API
    function getAllRooms() {
        ajaxRequest({
            url: `/api/room`,
            method: 'GET',
            success: (res) => {
                console.log('res all room:', res.data);
                renderRooms(res.data);
            },
            error: (err) => {
                console.error(err);
                alert(`❌ Không thể lấy danh sách phòng: ${err.message || ''}`);
            }
        });
    }

    // Render all rooms to the DOM
    function renderRooms(rooms) {
        $roomContainer.empty();

        if (!rooms.length) {
            $roomContainer.append(`
            <div class="col-12 text-center text-muted">
                Không có phòng nào được hiển thị
            </div>
        `);
            return;
        }

        const roomsToShow = rooms.slice(0, 3); // 👈 show only first 3

        roomsToShow.forEach(room => {
            const roomImage = room.images?.length ? room.images[0].image_url : 'assets/images/slide_hotel_1.png';

            const amenitiesList = (room.amenities || []).map(a => `
            <span class="badge bg-light text-dark fw-normal me-2 mb-2">${a.name}</span>
        `).join('');

            const facilitiesList = (room.facilities || []).map(f => `
            <span class="badge bg-light text-dark fw-normal me-2 mb-2">${f.name}</span>
        `).join('');

            const card = `
        <div class="col-md-4 mb-4">
            <div class="card room-card shadow-sm h-100 border-0 rounded-4">
                <img src="/storage/${roomImage}" class="h-100 w-100 object-fit-cover rounded-top-4" alt="${room.name}">
                <div class="card-body">
                    <h5 class="card-title fw-bold text-primary">Phòng ${room.room_number}</h5>
                    <p class="text-muted mb-1"><strong>Giá:</strong> ${parseInt(room.room_type.price_per_night).toLocaleString()} VND / đêm</p>
                    <p class="mb-1"><strong>Sức chứa:</strong> ${room.room_type.adults_capacity} người lớn, ${room.room_type.children_capacity} trẻ em</p>
                    
                    <p class="mb-1"><strong>Tiện nghi:</strong></p>
                    <div class="d-flex flex-wrap">${amenitiesList}</div>

                    <p class="mb-1 mt-2"><strong>Cơ sở vật chất:</strong></p>
                    <div class="d-flex flex-wrap">${facilitiesList}</div>

                    <div class="d-flex justify-content-between mt-3">
                        <a href="#" class="btn btn-sm btn-outline-info">Chi tiết</a>
                        <a href="#" class="btn btn-sm btn-success">Đặt ngay</a>
                    </div>
                </div>
            </div>
        </div>`;

            $roomContainer.append(card);
        });
    }

    // Init
    getAllRooms();
});
