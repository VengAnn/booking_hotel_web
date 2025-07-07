@extends('clients.layouts.app')

@section('content')
    <div class="container my-5">
        <h2 class="text-center fw-bold mb-2">LIÊN HỆ CHÚNG TÔI</h2>
        <p class="text-center text-muted mb-5">Liên hệ và góp ý với chúng tôi.</p>

        <div class="row g-4">
            <!-- Google Map with Marker -->
            <div class="col-md-6">
                <div class="ratio ratio-4x3 shadow-sm rounded">
                    <iframe src="https://www.google.com/maps?q=17.964338581493095,102.60676612371591&z=17&hl=vi&output=embed"
                        width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
                <div class="mt-3">
                    <h5 class="fw-bold">Địa chỉ</h5>
                    <p class="text-muted mb-0">Phongsavath Boutique Hotel, Luang Prabang, Lào</p>
                </div>
            </div>


            <!-- Contact Form -->
            <div class="col-md-6">
                <div class="card shadow-sm p-4">
                    <h5 class="fw-semibold mb-3">Gửi Tin Nhắn</h5>
                    <form>
                        <div class="mb-3">
                            <label class="form-label">Họ và Tên</label>
                            <input type="text" name="name" class="form-control" placeholder="Nhập họ và tên" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" name="email" class="form-control" placeholder="Nhập email" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Tiêu Đề</label>
                            <input type="text" name="subject" class="form-control" placeholder="Tiêu đề tin nhắn"
                                required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Tin Nhắn</label>
                            <textarea name="message" rows="5" class="form-control" placeholder="Nội dung tin nhắn" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Gửi Liên Hệ</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
