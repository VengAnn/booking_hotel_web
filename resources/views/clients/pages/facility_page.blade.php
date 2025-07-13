@extends('clients.layouts.app')

@section('content')
    <div class="container my-5">
        <h2 class="text-center fw-bold mb-2">CÁC TIỆN NGHI</h2>
        <p class="text-center text-muted mb-5">
            Trải nghiệm dịch vụ tuyệt vời với các tiện nghi hiện đại của chúng tôi.
        </p>

        <div class="row g-4" id="amenitiesContainer">
            <!-- Amenities loaded via JS -->
        </div>

        <hr class="my-5">

        <h2 class="text-center fw-bold mb-2">CƠ SỞ VẬT CHẤT</h2>
        <p class="text-center text-muted mb-5">
            Khám phá những cơ sở vật chất tiện nghi hỗ trợ tốt nhất cho kỳ nghỉ của bạn.
        </p>

        <div class="row g-4" id="facilitiesContainer">
            <!-- Facilities loaded via JS -->
        </div>
    </div>
@endsection

@push('styles')
    <style>
        .icon-box {
            font-size: 2rem;
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

@push('scripts')
    <script src="{{ asset('assets/js/clients/facility_page.js') }}"></script>
@endpush
