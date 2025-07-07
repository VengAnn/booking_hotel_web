/*  ===== History Booking Page =====
 *  Requires:
 *  - jQuery (already included in your layout)
 *  - SweetAlert2  (for the confirm dialog)
 *  - Toastr       (for toast notifications)
 *  - CSRF <meta>  tag in the master layout
 *  - Endpoints:
 *      GET  /api/my-bookings
 *      POST /api/bookings/{id}/cancel
 *  ---------------------------------------------- */

$(document).ready(function () {

    const $grid = $('#bookingGrid');
    const $loading = $('#loading');
    const $noBooking = $('#noBooking');

    /* 1. Fetch data */
    fetch('/api/my-bookings')
        .then(r => r.json())
        .then(renderBookings)
        .catch(() => toastr.error('Không thể tải danh sách đặt phòng'));

    /* 2. Render */
    function renderBookings(list = []) {
        $loading.remove();

        if (!list.length) {
            $noBooking.removeClass('d-none');
            return;
        }

        list.forEach(b => $grid.append(makeCard(b)));
    }

    /* 3. Build a card */
    function makeCard(b) {

        const badgeMap = {
            booked: { text: 'Đã đặt', color: 'warning' },
            paid: { text: 'Đã thanh toán', color: 'success' },
            cancelled: { text: 'Đã huỷ', color: 'secondary' }
        };
        const badge = badgeMap[b.status] ?? badgeMap.booked;

        const cancelBtn = b.status === 'booked'
            ? `<button class="btn btn-danger btn-sm w-100 mt-2 js-cancel" data-id="${b.id}">Huỷ Đặt Phòng</button>`
            : '';

        return `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="shadow-sm border rounded p-3 booking-card d-flex flex-column">
                <h5 class="fw-bold mb-2">${b.room_name}</h5>
                <p class="mb-1 text-muted">${Number(b.price).toLocaleString()} VND</p>

                <ul class="list-unstyled small mb-2">
                    <li><strong>Ngày vào:</strong> ${b.check_in}</li>
                    <li><strong>Ngày trả:</strong> ${b.check_out}</li>
                    <li><strong>Tổng:</strong> ${Number(b.total).toLocaleString()} VND</li>
                    <li><strong>ID đơn:</strong> ${b.code}</li>
                    <li><strong>Ngày đặt:</strong> ${b.created_at}</li>
                </ul>

                <span class="badge bg-${badge.color} badge-status">${badge.text}</span>
                ${cancelBtn}
            </div>
        </div>`;
    }

    /* 4. Cancel booking */
    $grid.on('click', '.js-cancel', function () {

        const id = $(this).data('id');
        const $btn = $(this);

        Swal.fire({
            title: 'Huỷ đặt phòng?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Huỷ',
            cancelButtonText: 'Đóng'
        }).then(({ isConfirmed }) => {

            if (!isConfirmed) return;

            $btn.prop('disabled', true).text('Huỷ...');

            fetch(`/api/bookings/${id}/cancel`, {
                method: 'POST',
                headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
            })
                .then(r => r.json())
                .then(json => {
                    if (!json.success) throw new Error(json.message);

                    toastr.success('Huỷ phòng thành công');

                    const $card = $btn.closest('.booking-card');
                    $card.find('.badge-status')
                        .removeClass('bg-warning')
                        .addClass('bg-secondary')
                        .text('Đã huỷ');
                    $btn.remove();
                })
                .catch(err => {
                    toastr.error(err.message || 'Lỗi máy chủ');
                    $btn.prop('disabled', false).text('Huỷ Đặt Phòng');
                });
        });
    });
});
