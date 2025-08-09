@extends('clients.layouts.app')


@section('content')
    <div>
        <!-- Carousel with Search Overlay -->
        <section class="position-relative overflow-visible" style="min-height: 60vh;">
            <!-- Carousel -->
            <div id="heroCarousel" class="carousel slide position-absolute top-0 start-0 w-100 h-100" data-ride="carousel"
                style="z-index: 0;">
                <ol class="carousel-indicators" id="carousel-indicators" style="bottom: 5rem;  position: absolute; ">
                </ol>
                <div class="carousel-inner" id="carousel-inner"></div>

                <!-- Controls -->
                <a class="carousel-control-prev" href="#heroCarousel" role="button" data-slide="prev" style="z-index: 3;">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                </a>
                <a class="carousel-control-next" href="#heroCarousel" role="button" data-slide="next" style="z-index: 3;">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                </a>
            </div>

            <!-- Search Box - aligned bottom center -->
            <div class="container position-absolute start-50 translate-middle-x px-3"
                style="bottom: -5rem; z-index: 5; width: 100%; max-width: 960px;">
                <div class="bg-white p-4 rounded shadow-lg w-100">
                    <h5 class="mb-3">Tìm Phòng</h5>
                    <div class="row g-3">
                        <div class="col-12 col-sm-6 col-md-3">
                            <label class="form-label">Ngày Nhận Phòng</label>
                            <input type="date" class="form-control" id="checkin">
                        </div>
                        <div class="col-12 col-sm-6 col-md-3">
                            <label class="form-label">Ngày Trả Phòng</label>
                            <input type="date" class="form-control" id="checkout">
                        </div>
                        <div class="col-6 col-sm-3 col-md-2">
                            <label class="form-label">Người Lớn</label>
                            <select class="form-select" id="adults">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </div>
                        <div class="col-6 col-sm-3 col-md-2">
                            <label class="form-label">Trẻ Em</label>
                            <select class="form-select" id="children">
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-2 d-grid">
                            <label class="form-label invisible">.</label>
                            <button type="button" id="searchBtn" class="btn btn-success w-100">Tìm Phòng</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>



        <!-- Room Section -->
        <section class="room-section">
            <div class="container">
                <h2 class="text-center mb-2 font-pacifico">PHÒNG</h2>
                <div class="text-center mb-4">
                    <hr class="w-25 mx-auto border border-dark border-2 opacity-100">
                </div>

                <div id="roomContainer" class="row g-4">
                    <!-- Room cards populated by JS -->
                </div>
            </div>

            <!-- See More Button -->
            <div class="text-center mt-2">
                <a href="/room" class="btn btn-outline-primary rounded-pill px-4">
                    Xem Thêm <i class="fas fa-angle-double-right ms-2"></i>
                </a>
            </div>
        </section>

        <!-- Amenities Section -->
        <section class="amenities-section py-4">
            <div class="container">
                <h2 class="text-center mb-2 font-pacifico">CÁC TIỆN NGHI</h2>
                <div class="text-center mb-4">
                    <hr class="w-25 mx-auto border border-dark border-2 opacity-100">
                </div>

                <!-- Amenities Grid to be filled by JS -->
                <div id="amenitiesGrid"
                    class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4 justify-content-center">
                    <!-- JS will inject items here -->
                </div>

                <!-- See More Button -->
                <div class="text-center mt-4">
                    <a href="/facilities" class="btn btn-outline-primary rounded-pill px-4">
                        Xem Thêm <i class="fas fa-angle-double-right ms-2"></i>
                    </a>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section class="contact-section py-5">
            <div class="container">
                <h2 class="text-center mb-2 font-pacifico">LIÊN HỆ</h2>
                <div class="text-center mb-4">
                    <hr class="w-25 mx-auto border border-dark border-2 opacity-100">
                </div>

                <div class="row g-4">
                    <!-- Google Map with Marker -->
                    <div class="col-md-7">
                        <div class="ratio ratio-4x3 rounded shadow">
                            <iframe
                                src="https://www.google.com/maps?q=17.96416508296428,102.60675539487949&z=17&output=embed"
                                style="border:0;" allowfullscreen loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>

                    <!-- Contact Info -->
                    <div class="col-md-5">
                        <div class="d-flex flex-column gap-3 h-100">
                            <!-- Contact Card -->
                            <div class="bg-white p-4 rounded shadow">
                                <h5 class="mb-3 fw-bold">Bạn cần hỗ trợ? Hãy liên hệ ngay</h5>
                                <p class="mb-2">
                                    <i class="fas fa-phone me-2 text-primary"></i> +856 20 5555 5555
                                </p>
                                <p class="mb-2">
                                    <i class="fas fa-envelope me-2 text-danger"></i> contact@phongsavathhotel.com
                                </p>
                                <p class="mb-2">
                                    <i class="fas fa-map-marker-alt me-2 text-success"></i> Ban Donnoun, Vientiane, Laos
                                </p>
                            </div>

                            <!-- Social Media Card -->
                            <div class="bg-white p-4 rounded shadow">
                                <h5 class="mb-3 fw-bold">Theo dõi chúng tôi</h5>
                                <div class="d-flex flex-column gap-2">
                                    <a href="https://facebook.com/" target="_blank"
                                        class="text-decoration-none text-primary fs-5 d-flex align-items-center">
                                        <i class="fab fa-facebook me-2 fs-4"></i> Facebook
                                    </a>

                                    <a href="https://instagram.com/" target="_blank"
                                        class="text-decoration-none text-danger fs-5 d-flex align-items-center">
                                        <i class="fab fa-instagram me-2 fs-4"></i> Instagram
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>


    <!-- Floating Chat Button -->
    <button class="chat-toggle" onclick="toggleChat()" aria-label="Open chat">💬</button>

    <!-- Chat Window -->
    <div class="chat-window" id="chatWindow" role="region" aria-live="polite" aria-label="Trợ lý khách sạn">
        <div class="chat-header">Trợ lý khách sạn</div>
        <div class="chat-body" id="chatBody">
            <div>
                <div class="chat-msg bot-msg">Xin chào! Tôi có thể hỗ trợ gì cho bạn hôm nay?</div>
            </div>
        </div>
        <div class="chat-footer">
            <textarea id="chatInput" rows="1" placeholder="Nhập tin nhắn..." aria-label="Nhập tin nhắn trò chuyện"></textarea>
            <button id="sendBtn" aria-label="Gửi tin nhắn">Gửi</button>
        </div>
    </div>
@endsection

@push('styles')
    <link rel="stylesheet" href="{{ asset('assets/css/clients/home_page.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/clients/home_slide_indicator.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/clients/home_page_section_chat_bot.css') }}">
@endpush

@push('scripts')
    <script src="{{ asset('assets/js/clients/home_page.js') }}"></script>
    <script src="{{ asset('assets/js/clients/home_section_amenity.js') }}"></script>
    <script src="{{ asset('assets/js/clients/home_section_room.js') }}"></script>
    <script src="{{ asset('assets/js/clients/home_section_slide.js') }}"></script>
    <script src="{{ asset('assets/js/clients/home_page_section_chat_bot.js') }}"></script>
@endpush
