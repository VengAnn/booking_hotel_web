@extends('clients.layouts.app')

@section('content')
    <div class="container my-5" id="room-type-detail">
        <div class="row g-5">
            <!-- Gallery -->
            <div class="col-12 col-lg-6">
                <div id="roomImages" class="d-flex flex-column gap-3"></div>
            </div>

            <!-- Info -->
            <div class="col-12 col-lg-6">
                <h2 id="roomTypeName" class="fw-bold text-dark mb-3"></h2>
                <ul class="list-unstyled mb-3">
                    <li><strong>💰 Giá:</strong> <span id="roomTypePrice"></span> VND / đêm</li>
                    <li><strong>👪 Sức chứa:</strong> <span id="roomTypeCapacity"></span></li>
                    <li><strong>🛏️ Số giường:</strong> <span id="roomTypeBeds"></span></li>
                </ul>
                <p><strong>📝 Mô tả:</strong></p>
                <p id="roomTypeDescription" class="text-muted"></p>

                <div class="mt-4">
                    <p class="fw-bold">🧰 Tiện nghi:</p>
                    <div id="roomAmenities" class="d-flex flex-wrap gap-2 mb-3"></div>

                    <p class="fw-bold">🏢 Cơ sở vật chất:</p>
                    <div id="roomFacilities" class="d-flex flex-wrap gap-2 mb-3"></div>

                    <p class="fw-bold">🗂️ Danh sách phòng:</p>
                    <div class="row" id="roomList"></div>

                    <div id="bookingBtnContainer" class="text-end mt-4"></div>
                </div>
            </div>
        </div>

        <!-- Reviews -->
        <div class="mt-5 pt-4 border-top">
            <h4 class="fw-bold mb-3">🗣️ Đánh giá của khách hàng</h4>
            <input type="text" id="reviewSearch" class="form-control mb-3"
                placeholder="🔍 Tìm theo tên, phòng, nội dung...">
            <div class="row" id="reviewList">
                <div class="col-12 text-muted">Đang tải đánh giá...</div>
            </div>
        </div>
    </div>
@endsection

@push('styles')
    <link href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.4/css/lightbox.min.css" rel="stylesheet">
    <style>
        .badge {
            font-size: 0.85rem;
            padding: 0.4em 0.7em;
        }

        .img-thumb {
            width: 100%;
            max-height: 350px;
            object-fit: cover;
            border-radius: 12px;
            transition: transform 0.2s ease;
        }

        .img-thumb:hover {
            transform: scale(1.02);
        }

        .room-card {
            border: 1px solid #ddd;
            padding: 10px 15px;
            border-radius: 8px;
            background-color: #f9f9f9;
            margin-bottom: 10px;
        }
    </style>
@endpush

@push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.4/js/lightbox.min.js"></script>
    <script src="{{ asset('assets/js/clients/detail_room_type_page.js') }}"></script>
@endpush
