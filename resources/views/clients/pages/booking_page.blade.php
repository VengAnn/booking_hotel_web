@extends('clients.layouts.app')

@section('content')
    <div class="container py-5">
        <h2 class="fw-bold text-uppercase mb-4">Xác Nhận Đặt Phòng</h2>

        <div id="bookingSection" class="row g-4">
            {{-- ROOM TYPE CARD --}}
            <div class="col-md-6">
                <div class="card shadow-sm">
                    <img id="roomImage" src="" class="card-img-top" alt="Room Image">
                    <div class="card-body">
                        <h5 id="roomName" class="card-title fw-bold"></h5>
                        <p class="card-text text-muted mb-0">
                            Giá: <span id="roomPrice"></span> VND / đêm
                        </p>

                        <div id="roomDetails" class="mt-3 small text-muted" style="line-height: 1.6">
                            <p><strong>Sức chứa:</strong> <span id="roomCapacity">--</span></p>
                            <p><strong>Số giường:</strong> <span id="roomBed">--</span></p>
                            <p><strong>Tiện nghi:</strong> <span id="roomAmenities">--</span></p>
                            <p><strong>Cơ sở vật chất:</strong> <span id="roomFacilities">--</span></p>
                        </div>
                    </div>
                </div>

            </div>

            {{-- BOOKING FORM --}}
            <div class="col-md-6">
                <div class="card shadow-sm h-100 p-3">
                    <h5 class="fw-bold mb-3">Chọn phòng trống</h5>
                    <div id="roomList" class="d-flex flex-wrap gap-3 mb-3"></div>

                    <form id="bookingForm">
                        <input type="hidden" id="selectedRoomId" required>

                        <div class="row g-2 mb-3">
                            <div class="col">
                                <label class="form-label">Ngày nhận phòng</label>
                                <input type="date" class="form-control" id="checkIn" required>
                            </div>
                            <div class="col">
                                <label class="form-label">Ngày trả phòng</label>
                                <input type="date" class="form-control" id="checkOut" required>
                            </div>
                        </div>

                        <ul class="list-unstyled mb-3">
                            <li><strong>Số đêm:</strong> <span id="totalNights">0</span></li>
                            <li><strong>Tổng tiền:</strong> <span id="totalAmount" class="text-danger fw-bold">0</span> VND
                            </li>
                        </ul>

                        <button id="btnBookNow" type="submit" class="btn btn-primary w-100">Xác Nhận Đặt Phòng</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('styles')
    <link rel="stylesheet" href="{{ asset('assets/css/clients/booking_page.css') }}">
@endpush

@push('scripts')
    <script src="{{ asset('assets/js/clients/booking_room.js') }}"></script>
@endpush
