@extends('clients.layouts.app')

@section('content')
    <div id="div-amenities-page-client">
        <div class="container my-5">
            <h2 class="text-center mb-2 fw-bold">CÁC TIỆN NGHI</h2>
            <p class="text-center mb-5 text-muted">
                Đến với chúng tôi, quý khách sẽ được trải nghiệm tất cả các tiện nghi của khách sạn,<br>
                bao gồm các tiện nghi như tivi, wifi, tủ lạnh, máy giặt, điều hoà và nhiều hơn nữa.
            </p>

            <div class="row g-4">
                <!-- Amenity Item -->
                <div class="col-md-4">
                    <div class="card p-3 h-100 text-center shadow-sm">
                        <div class="amenity-icon text-primary fs-2 mb-2">
                            <i class="fa fa-wifi"></i>
                        </div>
                        <h5 class="fw-semibold">Wifi miễn phí</h5>
                        <p class="text-muted">
                            Truy cập Internet tốc độ cao suốt thời gian lưu trú.
                        </p>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card p-3 h-100 text-center shadow-sm">
                        <div class="amenity-icon text-warning fs-2 mb-2">
                            <i class="fa fa-tv"></i>
                        </div>
                        <h5 class="fw-semibold">Tivi</h5>
                        <p class="text-muted">
                            Thưởng thức các chương trình truyền hình đa dạng và giải trí thoải mái.
                        </p>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card p-3 h-100 text-center shadow-sm">
                        <div class="amenity-icon text-info fs-2 mb-2">
                            <i class="fa-solid fa-snowflake"></i>
                        </div>
                        <h5 class="fw-semibold">Điều hòa</h5>
                        <p class="text-muted">
                            Duy trì nhiệt độ phòng dễ chịu trong mọi điều kiện thời tiết.
                        </p>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card p-3 h-100 text-center shadow-sm">
                        <div class="amenity-icon text-danger fs-2 mb-2">
                            <i class="fa-solid fa-spa"></i>
                        </div>
                        <h5 class="fw-semibold">Spa & Massage</h5>
                        <p class="text-muted">
                            Thư giãn và chăm sóc bản thân với dịch vụ spa chuyên nghiệp.
                        </p>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card p-3 h-100 text-center shadow-sm">
                        <div class="amenity-icon text-secondary fs-2 mb-2">
                            <i class="fa-solid fa-fire"></i>
                        </div>
                        <h5 class="fw-semibold">Máy sưởi</h5>
                        <p class="text-muted">
                            Mang lại sự ấm áp và thoải mái trong những ngày lạnh.
                        </p>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card p-3 h-100 text-center shadow-sm">
                        <div class="amenity-icon text-success fs-2 mb-2">
                            <i class="fa-solid fa-shower"></i>
                        </div>
                        <h5 class="fw-semibold">Nóng lạnh</h5>
                        <p class="text-muted">
                            Hệ thống nước nóng lạnh tiện lợi, hiện đại cho mọi nhu cầu.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('styles')
    <style>
        .amenity-icon {
            width: 50px;
            height: 50px;
            margin: 0 auto 10px;
        }

        .card:hover {
            transform: translateY(-3px);
            transition: 0.3s ease;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }
    </style>
@endpush
