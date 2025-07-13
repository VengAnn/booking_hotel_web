@extends('clients.layouts.app')

@section('content')
    <div class="container py-5">

        {{-- breadcrumb + title --}}
        <h2 class="fw-bold text-uppercase mb-4">Danh sách Đơn Đặt Phòng</h2>

        <nav class="mb-4" aria-label="breadcrumb">
            <ol class="breadcrumb bg-white p-0">
                <li class="breadcrumb-item"><a href="/">Trang Chủ</a></li>
                <li class="breadcrumb-item active" aria-current="page">Phòng Đặt</li>
            </ol>
        </nav>

        {{-- Grid container – cards will be injected here --}}
        <div id="bookingGrid" class="row g-4">
            <div class="col-12 text-center" id="loading">
                <div class="spinner-border text-info" role="status"></div>
            </div>
        </div>

        {{-- Empty state --}}
        <div id="noBooking" class="alert alert-info text-center d-none mt-4">
            Bạn chưa có đơn đặt phòng nào.
        </div>
    </div>
@endsection

@push('styles')
    <link rel="stylesheet" href="{{ asset('assets/css/clients/history_booking_page.css') }}">
@endpush

@push('scripts')
    <script src="{{ asset('assets/js/clients/history_booking_page.js') }}"></script>
@endpush
