@extends('clients.layouts.app')

@section('content')
    <div class="container py-5">
        {{-- Breadcrumb + Title --}}
        <h2 class="fw-bold text-uppercase mb-4">Xác Nhận Đặt Phòng</h2>

        <nav class="mb-4" aria-label="breadcrumb">
            <ol class="breadcrumb bg-white p-0">
                <li class="breadcrumb-item"><a href="/">Trang Chủ</a></li>
                <li class="breadcrumb-item active" aria-current="page">Xác Nhận</li>
            </ol>
        </nav>


        <div id="bookingConfirmSection" class="row g-4">

            {{-- ①  Room card ------------------------------------------------ --}}
            <div class="col-12 col-lg-6">
                <div class="card shadow-sm">
                    <img id="roomImage" src="" class="card-img-top" alt="Room Image">
                    <div class="card-body">
                        <h5 id="roomName" class="card-title fw-bold"></h5>
                        <p class="card-text text-muted mb-0">
                            Giá: <span id="roomPrice"></span> VND / đêm
                        </p>
                    </div>
                </div>
            </div>

            {{-- ②  Details / form card -------------------------------------- --}}
            <div class="col-12 col-lg-6">
                <div class="card shadow-sm h-100 p-3">
                    <h5 class="fw-bold mb-3">Thông Tin Đặt Phòng</h5>

                    <form id="bookingForm" novalidate class="needs-validation">

                        {{-- Name + Phone --}}
                        <div class="row g-2 mb-2">
                            <div class="col">
                                <label for="customerName" class="form-label">Tên khách hàng</label>
                                <input type="text" class="form-control" id="customerName" required>
                            </div>
                            <div class="col">
                                <label for="customerPhone" class="form-label">Số điện thoại</label>
                                <input type="text" class="form-control" id="customerPhone" required>
                            </div>
                        </div>

                        {{-- Address --}}
                        <div class="mb-2">
                            <label for="customerAddress" class="form-label">Địa chỉ</label>
                            <input type="text" class="form-control" id="customerAddress" required>
                        </div>

                        {{-- Check‑in / Check‑out --}}
                        <div class="row g-2 mb-2">
                            <div class="col">
                                <label for="checkIn" class="form-label">Ngày vào</label>
                                <input type="date" class="form-control" id="checkIn" required>
                            </div>
                            <div class="col">
                                <label for="checkOut" class="form-label">Ngày trả</label>
                                <input type="date" class="form-control" id="checkOut" required>
                            </div>
                        </div>


                        {{-- Totals --}}
                        <ul class="list-unstyled mb-3">
                            <li><strong>Số phòng trống: </strong>7</li>
                            <li><strong>Số đêm:</strong> <span id="totalNights">0</span></li>
                            <li><strong>Tổng tiền:</strong>
                                <strong id="totalAmount" class="text-danger">0</strong> VND
                            </li>
                        </ul>

                        <button id="btnBookNow" type="submit" class="btn btn-primary w-100">
                            Xác Nhận Đặt Phòng
                        </button>
                    </form>
                </div>
            </div>

        </div>

    </div>
@endsection

@push('scripts')
    <script src="{{ asset('assets/js/clients/booking_room.js') }}"></script>
@endpush
