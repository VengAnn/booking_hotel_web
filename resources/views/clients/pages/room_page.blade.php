@extends('clients.layouts.app')

@section('content')
    <div id="div-room-page-client">
        <div class="container my-4">
            <h2 class="text-center mb-2 font-pacifico">PHÒNG</h2>
            <div class="text-center mb-4">
                <hr class="w-25 mx-auto border border-dark border-2 opacity-100">
            </div>

            <div class="row">
                <!-- Sidebar Filter -->
                <aside class="col-lg-3 mb-4">
                    <div class="bg-light p-3 rounded shadow-sm">
                        <h6 class="fw-bold mb-3">
                            <i class="fas fa-search me-1 text-primary"></i> Tìm kiếm phòng
                        </h6>

                        <!-- Ngày nhận và trả -->
                        <label for="checkIn" class="form-label">Ngày nhận phòng:</label>
                        <input type="date" class="form-control mb-2" id="checkIn">

                        <label for="checkOut" class="form-label">Ngày trả phòng:</label>
                        <input type="date" class="form-control mb-3" id="checkOut">

                        <!-- Người lớn -->
                        <label for="adults" class="form-label">Người lớn:</label>
                        <div class="input-group mb-2">
                            <select class="form-select" id="adults">
                                <option value="">-- Chọn --</option>
                            </select>
                            <button class="btn btn-outline-secondary" type="button" id="resetAdults">❌</button>
                        </div>

                        <!-- Trẻ em -->
                        <label for="children" class="form-label">Trẻ em:</label>
                        <div class="input-group mb-3">
                            <select class="form-select" id="children">
                                <option value="">-- Chọn --</option>
                            </select>
                            <button class="btn btn-outline-secondary" type="button" id="resetChildren">❌</button>
                        </div>

                        <!-- Tiện nghi -->
                        <h6 class="fw-bold mt-3 mb-2">
                            <i class="fas fa-filter me-1 text-secondary"></i> Tiện nghi
                        </h6>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="filterWifi">
                            <label class="form-check-label" for="filterWifi">
                                <i class="fas fa-wifi me-1"></i> Wifi miễn phí
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="filterTv">
                            <label class="form-check-label" for="filterTv">
                                <i class="fas fa-tv me-1"></i> Tivi
                            </label>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" id="filterAc">
                            <label class="form-check-label" for="filterAc">
                                <i class="fas fa-snowflake me-1"></i> Điều hòa
                            </label>
                        </div>

                        <!-- Nút tìm kiếm -->
                        <button class="btn btn-primary w-100" id="btnSearch">
                            <i class="fas fa-search me-1"></i> Tìm kiếm
                        </button>
                    </div>
                </aside>

                <!-- Room List -->
                <section class="col-lg-9">
                    <div class="row" id="roomList">
                        <!-- JavaScript sẽ render các phòng -->
                    </div>
                    <div id="searchResultMessage" class="mt-3 text-center text-muted"></div>
                </section>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('assets/js/clients/room_page.js') }}"></script>
@endpush
