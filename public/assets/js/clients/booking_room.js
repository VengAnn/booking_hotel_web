$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    const roomTypeId = params.get('roomTypeId');
    let pricePerNight = 0;

    const checkInInput = $('#checkIn');
    const checkOutInput = $('#checkOut');

    const initialCheckin = params.get('checkin') || '';
    const initialCheckout = params.get('checkout') || '';
    if (initialCheckin) checkInInput.val(initialCheckin);
    if (initialCheckout) checkOutInput.val(initialCheckout);

    if (!roomTypeId) {
        $('#bookingSection').html('<div class="text-danger">Thiếu thông tin đặt phòng.</div>');
        return;
    }

    setupDateValidation();
    renderRooms(initialCheckin, initialCheckout);

    function setupDateValidation() {
        const today = new Date().toISOString().split("T")[0];
        checkInInput.attr('min', today);
        checkOutInput.attr('min', today); // optional fallback

        checkInInput.on('input', function () {
            const checkinDate = $(this).val();

            if (checkinDate < today) {
                alert("❌ Không thể chọn ngày trong quá khứ.");
                $(this).val('');
                return;
            }

            checkOutInput.val('');
            checkOutInput.attr('min', checkinDate);
        });

        checkOutInput.on('input', function () {
            const checkin = checkInInput.val();
            const checkout = $(this).val();

            if (!checkin) {
                alert("❗ Vui lòng chọn ngày nhận phòng trước.");
                $(this).val('');
                return;
            }

            if (checkout <= checkin) {
                alert("❌ Ngày trả phòng phải sau ngày nhận phòng.");
                $(this).val('');
            }
        });
    }


    function calculateNights(checkin, checkout) {
        const inDate = new Date(checkin);
        const outDate = new Date(checkout);
        const diff = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 0;
    }

    function renderRooms(checkin, checkout) {
        ajaxRequest({
            url: `/api/room-types/${roomTypeId}`,
            method: 'GET',
            success: function (res) {
                const rt = res.data;
                if (!rt) return;

                $('#roomName').text(rt.name);
                $('#roomPrice').text(parseInt(rt.price_per_night).toLocaleString());
                $('#roomImage').attr('src', rt.images?.[0]?.img_url ? `/storage/${rt.images[0].img_url}` : 'https://placehold.co/400x200');
                $('#roomCapacity').text(rt.capacity || '2 người lớn, 1 trẻ em');
                $('#roomBed').text(rt.beds || '1');
                $('#roomAmenities').text(rt.amenities?.map(a => a.name).join(', ') || 'Máy sưởi, Smart TV, Spa, Wi-Fi miễn phí');
                $('#roomFacilities').text(rt.facilities?.map(f => f.name).join(', ') || 'Bể bơi, Phòng gym, Bãi đỗ xe');

                pricePerNight = rt.price_per_night;

                if (!checkin || !checkout) {
                    $('#roomList').html('<div class="alert alert-info">🔒 Vui lòng chọn ngày nhận và trả phòng để xem phòng trống.</div>');
                    $('#totalNights').text(0);
                    $('#totalAmount').text('0');
                    return;
                }

                const totalNights = calculateNights(checkin, checkout);
                $('#totalNights').text(totalNights);

                const roomIds = rt.rooms.map(r => r.id);

                $.ajax({
                    url: '/api/bookings/check-multiple-rooms',
                    method: 'POST',
                    data: {
                        room_ids: roomIds,
                        check_in_date: checkin,
                        check_out_date: checkout,
                        _token: $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (availabilityMap) {
                        const available = availabilityMap.data;

                        const statusMap = {
                            'available': { label: 'Còn trống', class: 'status-available', bgClass: 'bg-available' },
                            'in use': { label: 'Đang sử dụng', class: 'status-in-use', bgClass: 'bg-in-use' },
                            'maintenance': { label: 'Bảo trì', class: 'status-maintenance', bgClass: 'bg-maintenance' },
                            'unknown': { label: 'Không xác định', class: 'status-unknown', bgClass: 'bg-secondary' }
                        };

                        const roomHtml = rt.rooms.map(r => {
                            const status = available[r.id] || 'unknown';
                            const statusInfo = statusMap[status];

                            return `
                                <div class="room-box ${statusInfo.bgClass}" data-room-id="${r.id}" data-status="${status}">
                                    <div class="status-label ${statusInfo.class}">${statusInfo.label}</div>
                                    <div>Phòng ${r.room_number}</div>
                                </div>
                            `;
                        }).join('');

                        $('#roomList').html(roomHtml);

                        $('.room-box').on('click', function () {
                            const status = $(this).data('status');
                            if (status !== 'available') return;

                            $('.room-box').removeClass('selected');
                            $(this).addClass('selected');

                            const selectedRoomId = $(this).data('room-id');
                            $('#selectedRoomId').val(selectedRoomId);

                            const total = pricePerNight * totalNights;
                            $('#totalAmount').text(total.toLocaleString());
                        });
                    },
                    error: function () {
                        $('#roomList').html('<div class="text-danger">❌ Lỗi khi kiểm tra phòng trống.</div>');
                    }
                });
            },
            error: function () {
                $('#roomList').html('<div class="text-danger">❌ Không thể tải dữ liệu phòng.</div>');
            }
        });
    }

    checkInInput.add(checkOutInput).on('input', function () {
        const checkin = checkInInput.val();
        const checkout = checkOutInput.val();

        if (!checkin || !checkout) {
            $('#roomList').html('<div class="alert alert-info">🔒 Vui lòng chọn ngày nhận và trả phòng để xem phòng trống.</div>');
            $('#totalNights').text(0);
            $('#totalAmount').text('0');
            return;
        }

        if (checkout <= checkin) {
            alert("❗ Ngày trả phòng phải sau ngày nhận phòng.");
            return;
        }

        renderRooms(checkin, checkout);
    });

    $('#bookingForm').on('submit', function (e) {
        e.preventDefault();

        const checkin = checkInInput.val();
        const checkout = checkOutInput.val();
        const roomId = $('#selectedRoomId').val();

        if (!checkin || !checkout) {
            alert("❗ Vui lòng chọn ngày nhận và trả phòng.");
            return;
        }

        if (checkout <= checkin) {
            alert("❗ Ngày trả phòng phải sau ngày nhận phòng.");
            return;
        }

        if (!roomId) {
            toastr.warning("Vui lòng chọn phòng trống!");
            return;
        }

        const totalNights = calculateNights(checkin, checkout);
        const totalPrice = pricePerNight * totalNights;

        const userData = JSON.parse(localStorage.getItem('user-data'));
        const userId = userData?.user_id;

        const formData = {
            user_id: userId,
            room_id: roomId,
            check_in_date: checkin,
            check_out_date: checkout,
            status: 'booked',
            price_per_night: pricePerNight,
            total: totalPrice
        };

        $('#btnBookNow').prop('disabled', true).text("Đang xử lý...");

        $.ajax({
            url: '/api/bookings',
            method: 'POST',
            data: formData,
            success: function (res) {
                console.log('✅ Booking Response:', res);
                if (res.success) {
                    toastr.success("🎉 Đặt phòng thành công!");
                    window.location.href = "/history-booking";
                } else {
                    toastr.error(res.message || "Đặt phòng thất bại");
                    $('#btnBookNow').prop('disabled', false).text("Xác Nhận Đặt Phòng");
                }
            },
            error: function (err) {
                toastr.error("Lỗi kết nối máy chủ.");
                console.error('❌ Lỗi khi đặt phòng:', err);
                $('#btnBookNow').prop('disabled', false).text("Xác Nhận Đặt Phòng");
            }
        });
    });

});
