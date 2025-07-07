@extends('clients.layouts.app')

@section('content')
    <div class="container my-5">
        <!-- Heading -->
        <div class="text-center mb-5">
            <h2 class="fw-bold">VỀ CHÚNG TÔI</h2>
            <p class="text-muted">
                Khám phá Phongsavath Boutique Hotel – nơi nghỉ dưỡng lý tưởng với phong cách hiện đại và dịch vụ tận tâm.
            </p>
        </div>

        <div class="row g-4 align-items-center">
            <!-- Main Image -->
            <div class="col-lg-6">
                <div class="rounded overflow-hidden shadow-sm">
                    <img src="assets/images/about/hotel_1.jpg" alt="Phongsavath Boutique Hotel" class="img-fluid w-100">
                </div>
            </div>

            <!-- Hotel Info -->
            <div class="col-lg-6">
                <h4 class="fw-semibold mb-3">Chào mừng đến với Phongsavath Boutique Hotel</h4>
                <p class="text-muted mb-3">
                    Tọa lạc tại trung tâm thành phố, khách sạn chúng tôi mang đến không gian hiện đại, yên tĩnh và phong
                    cách.
                    Với thiết kế tinh tế, tiện nghi sang trọng cùng đội ngũ nhân viên chuyên nghiệp, bạn sẽ có một kỳ nghỉ
                    đáng nhớ.
                </p>
                <p class="text-muted">
                    Hãy đến và cảm nhận sự khác biệt – ngôi nhà thứ hai của bạn tại Lào.
                </p>
            </div>
        </div>

        <!-- Icon Features -->
        <div class="row g-4 mt-5 text-center">
            <div class="col-md-4">
                <div class="shadow-sm p-4 rounded h-100">
                    <div class="mb-3">
                        <i class="fas fa-location-dot fs-2 text-primary"></i> <!-- fa-map-marker-alt / fa-location-dot -->
                    </div>
                    <h5 class="fw-semibold">Vị trí thuận tiện</h5>
                    <p class="text-muted">Gần các điểm du lịch nổi tiếng, thuận tiện cho việc tham quan và di chuyển.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="shadow-sm p-4 rounded h-100">
                    <div class="mb-3">
                        <i class="fas fa-headset fs-2 text-primary"></i>
                    </div>
                    <h5 class="fw-semibold">Dịch vụ tận tâm</h5>
                    <p class="text-muted">Hỗ trợ 24/7 với đội ngũ nhân viên thân thiện, chuyên nghiệp.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="shadow-sm p-4 rounded h-100">
                    <div class="mb-3">
                        <i class="fas fa-house-circle-check fs-2 text-primary"></i> <!-- fa-house-check in FA6 -->
                    </div>
                    <h5 class="fw-semibold">Tiện nghi hiện đại</h5>
                    <p class="text-muted">Trang bị tiện nghi cao cấp, đảm bảo sự thoải mái tối đa cho khách hàng.</p>
                </div>
            </div>
        </div>


        <!-- Gallery -->
        <div class="mt-5">
            <h4 class="text-center fw-semibold mb-4">Hình ảnh khách sạn</h4>
            <div class="row g-3" id="image-gallery">
                <!-- Images injected via JavaScript -->
            </div>
        </div>
    </div>
@endsection

@push('styles')
    <!-- Lightbox2 CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.4/css/lightbox.min.css" rel="stylesheet">

    <!-- Lightbox2 JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.4/js/lightbox.min.js"></script>

    <link rel="stylesheet" href="{{ asset('assets/css/clients/about_page.css') }}">
@endpush
@push('scripts')
    <script src="{{ asset('assets/js/clients/about_page.js') }}"></script>
@endpush
