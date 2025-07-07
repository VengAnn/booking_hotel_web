$(document).ready(function () {
    // 1. Dummy example data (replace with real server data)
    const bookingData = {
        room: {
            name: "Phòng Deluxe Hướng Biển",
            image: "assets/images/Superior_Double_1.avif",
            price: 1000000
        },
        customer: {
            name: "Nguyễn Văn A",
            phone: "0901234567",
            address: "123 Đường ABC, Quận 1, TP.HCM"
        },
        check_in: "2025-07-05",
        check_out: "2025-07-08",
        quantity: 2
    };

    // 2. Calculate total nights and total amount
    const checkInDate = new Date(bookingData.check_in);
    const checkOutDate = new Date(bookingData.check_out);
    const totalNights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalAmount = bookingData.room.price * totalNights * bookingData.quantity;

    // 3. Fill data to DOM
    $('#roomImage').attr('src', bookingData.room.image);
    $('#roomName').text(bookingData.room.name);
    $('#roomPrice').text(bookingData.room.price.toLocaleString());

    $('#customerName').text(bookingData.customer.name);
    $('#customerPhone').text(bookingData.customer.phone);
    $('#customerAddress').text(bookingData.customer.address);
    $('#checkIn').text(bookingData.check_in);
    $('#checkOut').text(bookingData.check_out);
    $('#roomQty').text(bookingData.quantity);
    $('#totalNights').text(totalNights);
    $('#totalAmount').text(totalAmount.toLocaleString());

    // 4. Handle booking confirmation
    $('#btnBookNow').click(function () {
        $(this).prop('disabled', true).text('Đang xử lý...');

        $.ajax({
            url: '/api/book-room',
            method: 'POST',
            data: {
                room_id: 1, // replace with dynamic ID if needed
                check_in: bookingData.check_in,
                check_out: bookingData.check_out,
                quantity: bookingData.quantity,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            success: function (res) {
                if (res.success) {
                    toastr.success("Đặt phòng thành công!");
                    window.location.href = '/my-bookings';
                } else {
                    toastr.error(res.message || "Lỗi đặt phòng");
                }
            },
            error: function () {
                toastr.error("Không thể kết nối máy chủ");
                $('#btnBookNow').prop('disabled', false).text('Xác Nhận Đặt Phòng');
            }
        });
    });
});


