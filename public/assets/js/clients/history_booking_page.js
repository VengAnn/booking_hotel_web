$(document).ready(function () {
    const $grid = $('#bookingGrid');
    const $loading = $('#loading');
    const $noBooking = $('#noBooking');
    let bookings = [];

    const userData = JSON.parse(localStorage.getItem('user-data') || '{}');
    const userId = userData.user_id;

    if (!userId) {
        $loading.remove();
        $noBooking.removeClass('d-none').text('❌ Không xác định được người dùng!');
        return;
    }

    // ✅ 1. Fetch bookings
    function loadBookings() {
        $grid.empty(); // clear old
        $noBooking.addClass('d-none');
        $loading.removeClass('d-none');

        ajaxRequest({
            url: `/api/bookings/get-by-user?user_id=${userId}`,
            method: 'GET',
            success: (res) => {
                $loading.addClass('d-none');
                bookings = res.data;
                renderBookings(bookings);
            },
            error: function (err) {
                console.error('❌ Lỗi khi tải danh sách đặt phòng:', err);
                $loading.addClass('d-none');
                toastr.error('Không thể tải danh sách đặt phòng');
            }
        });
    }

    loadBookings();

    // ✅ 2. Render bookings
    function renderBookings(list = []) {
        if (!Array.isArray(list) || list.length === 0) {
            $noBooking.removeClass('d-none');
            return;
        }

        list.forEach(b => $grid.append(makeCard(b)));
    }

    // ✅ 3. Build card
    function makeCard(b) {
        const badgeMap = {
            booked: { text: 'Đã đặt', color: 'warning' },
            checked_in: { text: 'Đã nhận phòng', color: 'primary' },
            completed: { text: 'Hoàn tất', color: 'info' },
            cancelled: { text: 'Đã huỷ', color: 'secondary' }
        };
        const badge = badgeMap[b.status] ?? { text: 'Không xác định', color: 'dark' };

        const cancelBtn = b.status === 'booked'
            ? `<button class="btn btn-danger btn-sm w-100 mt-2 js-cancel" data-id="${b.id}">Huỷ Đặt Phòng</button>`
            : '';

        const reviewBtn = b.status === 'completed' && !b.is_reviewed
            ? `<button class="btn btn-outline-primary btn-sm w-100 mt-2 js-review" data-id="${b.id}">Đánh giá</button>`
            : '';

        const roomName = b.room?.room_number ?? 'Không rõ';
        const roomType = b.room?.room_type?.name ?? 'Không rõ';
        const checkIn = b.check_in_date ?? '-';
        const checkOut = b.check_out_date ?? '-';
        const total = b.total ? Number(b.total).toLocaleString() + ' VND' : '0 VND';
        const code = b.id ?? '#';
        const created = b.created_at
            ? new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium' }).format(new Date(b.created_at))
            : '-';

        return `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="shadow-sm border rounded p-3 booking-card d-flex flex-column mb-4">
                <h5 class="fw-bold mb-2">${roomType} - Phòng ${roomName}</h5>
                <p class="mb-1 text-muted">${total}</p>

                <ul class="list-unstyled small mb-2">
                    <li><strong>Ngày vào:</strong> ${checkIn}</li>
                    <li><strong>Ngày trả:</strong> ${checkOut}</li>
                    <li><strong>Tổng:</strong> ${total}</li>
                    <li><strong>Mã đơn:</strong> #${code}</li>
                    <li><strong>Ngày đặt:</strong> ${created}</li>
                </ul>

                <span class="badge bg-${badge.color} badge-status">${badge.text}</span>
                ${cancelBtn}
                ${reviewBtn}
            </div>
        </div>`;
    }

    // ✅ 4. Cancel booking
    $grid.on('click', '.js-cancel', function () {
        const bookingId = $(this).data('id');
        const $btn = $(this);

        Swal.fire({
            title: 'Bạn có chắc muốn huỷ?',
            text: 'Hành động này không thể hoàn tác!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Huỷ đơn',
            cancelButtonText: 'Đóng',
            reverseButtons: true
        }).then(({ isConfirmed }) => {
            if (!isConfirmed) return;

            $btn.prop('disabled', true).text('Đang huỷ...');

            ajaxRequest({
                url: `/api/bookings/cancel/${bookingId}`,
                method: 'POST',
                success: function (res) {
                    if (!res.success) {
                        toastr.error(res.message || '❌ Huỷ không thành công');
                        $btn.prop('disabled', false).text('Huỷ Đặt Phòng');
                        return;
                    }

                    toastr.success('✅ Huỷ phòng thành công');
                    loadBookings();
                },
                error: function (err) {
                    toastr.error('❌ Lỗi máy chủ');
                    console.error('❌ Cancel error:', err);
                    $btn.prop('disabled', false).text('Huỷ Đặt Phòng');
                }
            });
        });
    });

    // ✅ 5. Submit review
    $grid.on('click', '.js-review', function () {
        const bookingId = $(this).data('id');
        const booking = bookings.find(b => b.id === bookingId);
        const roomId = booking?.room?.id;

        if (!roomId) {
            toastr.error('❌ Không xác định được phòng để đánh giá!');
            return;
        }

        showConfirmDialog({
            title: 'Đánh giá phòng',
            content: `
            <div class="form-group mb-2">
                <label>Chọn số sao:</label>
                <select class="form-control" id="reviewRating">
                    <option value="">-- Chọn --</option>
                    <option value="5">⭐⭐⭐⭐⭐ Tuyệt vời</option>
                    <option value="4">⭐⭐⭐⭐ Tốt</option>
                    <option value="3">⭐⭐⭐ Trung bình</option>
                    <option value="2">⭐⭐ Kém</option>
                    <option value="1">⭐ Rất tệ</option>
                </select>
            </div>
            <div class="form-group">
                <label>Nhận xét:</label>
                <textarea class="form-control" id="reviewContent" rows="4" placeholder="Chia sẻ trải nghiệm của bạn..."></textarea>
            </div>`,
            type: 'blue',
            icon: 'fa fa-star',
            size: 'medium',
            confirmText: 'Gửi đánh giá',
            onConfirm: function () {
                const reviewText = this.$content.find('#reviewContent').val().trim();
                const rating = parseInt(this.$content.find('#reviewRating').val());

                if (!rating || rating < 1 || rating > 5) {
                    toastr.warning('Vui lòng chọn số sao hợp lệ!');
                    return false;
                }
                if (!reviewText) {
                    toastr.warning('Vui lòng nhập nhận xét!');
                    return false;
                }

                ajaxRequest({
                    url: `/api/reviews`,
                    method: 'POST',
                    data: {
                        booking_id: bookingId,
                        user_id: userId,
                        room_id: roomId,
                        rating: rating,
                        comment: reviewText
                    },
                    success: function (res) {
                        if (res.success) {
                            toastr.success('✅ Gửi đánh giá thành công!');
                            loadBookings();
                        } else {
                            toastr.error('❌ Gửi đánh giá thất bại!');
                        }
                    },
                    error: function (err) {
                        toastr.error('❌ Lỗi khi gửi đánh giá');
                        console.error('Review error:', err);
                    }
                });
            }
        });
    });
});
