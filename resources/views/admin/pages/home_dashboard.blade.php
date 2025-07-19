@extends('admin.layouts.app')

@section('content')
    <div class="container-fluid position-relative d-flex p-0">
        <!-- Spinner -->
        <div id="IDSpinner" class="my-hidden">
            <div
                class="show bg-light position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
                <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>

        <!-- Sidebar -->
        <div id="idSideBar" class="sidebar pe-4 pb-3">
            <nav class="navbar navbar-dark">
                <a href="/home-dashboard" class="navbar-brand mx-4 mb-3">
                    <h3 class="text-dark">
                        <i class="fas fa-hotel me-2"></i> PBH Hotel
                    </h3>
                </a>

                <button type="button" class="sidebar-toggler btn btn-link position-absolute top-0 end-0"
                    style="margin-top: 0px; margin-right: -35px;">
                    <i class="fa fa-times"></i>
                </button>

                <div class="d-flex align-items-center ms-4 mb-4">
                    <div class="position-relative">
                        <img class="rounded-circle" src="{{ asset('assets/icons/logo_profile.png') }}" alt="Profile"
                            style="width: 40px; height: 40px;">
                        <div
                            class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1">
                        </div>
                    </div>
                    <div class="ms-3">
                        <h6 id="id-username" class="mb-0">Admin</h6>
                    </div>
                </div>

                <div class="navbar-nav w-100">
                    <a class="nav-item nav-link active" data-section="dashboard"><i class="fa fa-chart-pie me-2"></i>Thống
                        kê</a>
                    <a class="nav-item nav-link" data-section="booking"><i class="fa fa-calendar-check me-2"></i>Đặt
                        phòng</a>
                    <a class="nav-item nav-link" data-section="accounts"><i class="fa fa-user me-2"></i>Tài khoản</a>
                    <a class="nav-item nav-link" data-section="rooms"><i class="fa fa-bed me-2"></i>Phòng</a>
                    <a class="nav-item nav-link" data-section="feedback"><i class="fa fa-comment-dots me-2"></i>Phản hồi</a>
                    <a class="nav-item nav-link" data-section="rating"><i class="fa fa-star me-2"></i>Đánh giá</a>
                    <a class="nav-item nav-link" data-section="facilities-amenities">
                        <i class="fa fa-building me-2"></i>Cơ sở & Tiện nghi
                    </a>

                    <a class="nav-item nav-link" data-section="slide"><i class="fa fa-images me-2"></i>Slide</a>
                    {{-- <a class="nav-item nav-link" data-section="setup"><i class="fa fa-gear me-2"></i>Thiết lập</a> --}}
                </div>
            </nav>
        </div>

        <!-- Main Content -->
        <div class="content">
            <!-- Topbar -->
            <nav class="navbar navbar-expand navbar-dark px-4 py-0">
                <a href="#" class="sidebar-toggler flex-shrink-0" style="margin-left: -20px">
                    <i class="fa fa-bars"></i>
                </a>
                <div class="navbar-nav align-items-center ms-auto">
                    <div class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <img class="rounded-circle me-lg-1" src="{{ asset('assets/icons/logo_profile.png') }}"
                                alt="" style="width: 40px; height: 40px;">
                            <span id="id-username" class="d-none d-lg-inline-flex">Admin</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                            <a id="id-logout" class="dropdown-item">Đăng xuất</a>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- All Content Sections -->
            <div class="container-fluid" id="different-content">
                <div id="dashboard" class="section-content" style="display: block;">
                    <h2>Thống kê</h2>

                    <!-- Dashboard content -->
                    <div class="row g-4 mb-5 mt-2" id="dashboard-stats">
                        <!-- Dashboard stats will render here -->
                    </div>

                </div>

                <!-- Section Booking -->
                <div id="booking" class="section-content" style="display: none;">
                    <h2>Quản lý Đặt phòng</h2>

                    <!-- Tabs -->
                    <ul id="bookingTabs" class="nav nav-tabs">
                        <li class="nav-item"><a class="nav-link active" data-status="all" href="#">Tất cả</a></li>
                        <li class="nav-item"><a class="nav-link" data-status="booked" href="#">Đã Đặt</a></li>
                        <li class="nav-item"><a class="nav-link" data-status="checked_in" href="#">Đã Nhận</a>
                        </li>
                        <li class="nav-item"><a class="nav-link" data-status="completed" href="#">Hoàn Tất</a>
                        </li>
                        <li class="nav-item"><a class="nav-link" data-status="cancelled" href="#">Đã Hủy</a></li>
                    </ul>


                    <!-- Search -->
                    <input type="text" id="bookingSearch" class="form-control mb-3"
                        placeholder="Tìm kiếm đặt phòng..." />

                    <!-- Table -->
                    <div class="table-responsive">
                        <table id="booking-table" class="table table-striped text-nowrap">
                            <thead class="table-info">
                                <tr>
                                    <th>Nº</th>
                                    <th>Khách hàng</th>
                                    <th>Phòng</th>
                                    <th>Ngày đến</th>
                                    <th>Ngày đi</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody id="bookingTableBody"></tbody>
                        </table>
                    </div>

                    <!-- Pagination (optional) -->
                    <div id="pagination-booking" class="d-flex justify-content-center mt-4"></div>
                </div>


                <!-- Section Accounts -->
                <div id="accounts" class="section-content" style="display: none;">
                    <h2 class="mb-4">Quản lý Tài khoản</h2>
                    <!-- Add User Button -->
                    <button id="addUserButton" class="btn btn-primary mb-3">Thêm tài khoản</button>

                    <!-- Search -->
                    <input type="text" id="accountSearch" class="form-control mb-3"
                        placeholder="Tìm kiếm tài khoản...">

                    <!-- Table -->
                    <div class="table-responsive">
                        <table class="table table-striped text-nowrap align-middle">
                            <thead class="table-info">
                                <tr>
                                    <th>STT</th>
                                    <th>Tên người dùng</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Vai trò</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody id="accountTableBody"></tbody>
                        </table>

                        <!-- Pagination (optional) -->
                        <div id="pagination-booking" class="d-flex justify-content-center mt-4"></div>
                    </div>
                </div>

                <!-- Section Rooms -->
                <div id="rooms" class="section-content" style="display: none;">
                    <!-- Btn add Room & Btn Add type Room -->
                    <div class="d-flex justify-content-end">
                        <button id="addRoomButton" class="btn btn-primary mb-3">
                            <i class="fa fa-plus"></i> Thêm phòng
                        </button>

                        <button id="addTypeRoomButton" class="btn btn-primary mb-3 ms-3">
                            <i class="fa fa-plus"></i> Thêm loại phòng
                        </button>
                    </div>

                    <h2>Quản lý Phòng</h2>

                    <!-- Search -->
                    <input type="text" id="roomSearch" class="form-control mb-3" placeholder="Tìm kiếm phòng..." />

                    <!-- Room table -->
                    <div class="table-responsive">
                        <table class="table table-striped text-nowrap">
                            <thead class="table-info">
                                <tr>
                                    <th>Nº</th>
                                    <th>Tên phòng</th>
                                    <th>Loại</th>
                                    <th>Giá / đêm</th>
                                    <th>Trạng thái</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody id="roomTableBody"></tbody>
                        </table>
                    </div>
                </div>

                <!-- Section Feedback -->
                <div id="feedback" class="section-content" style="display: none;">
                    <h2 class="mb-4">📢 Phản hồi khách hàng</h2>

                    <!-- Search -->
                    <input type="text" id="feedbackSearch" class="form-control mb-4"
                        placeholder="🔎 Tìm theo tên, phòng, nội dung..." />

                    <!-- Feedback container -->
                    <div class="row" id="feedbackList"></div>
                </div>

                <!-- Section Rating -->
                <div id="rating" class="section-content" style="display: none;">
                    <h2>Đánh giá</h2>

                    <!-- Search Input -->
                    <input type="text" id="ratingSearch" class="form-control mb-3"
                        placeholder="Tìm theo tên, phòng, hoặc nội dung...">

                    <!-- Rating List -->
                    <div class="row" id="ratingList"></div>
                </div>

                <!-- Section: Facilities & Amenities -->
                <div id="facilities-amenities" class="section-content" style="display: none;">

                    <!-- Facilities Section -->
                    <div class="mb-4">
                        <h4 class="text-info">Cơ sở vật chất</h4>
                        <form id="facilityForm" class="row g-2 mb-3">
                            <div class="col-md-10">
                                <input type="text" id="facilityName" class="form-control"
                                    placeholder="Tên cơ sở vật chất">
                            </div>
                            <div class="col-md-2">
                                <button type="submit" class="btn btn-outline-info w-100">
                                    <i class="fa fa-plus"></i> Thêm
                                </button>
                            </div>
                        </form>

                        <table class="table table-bordered table-striped">
                            <thead class="table-info">
                                <tr>
                                    <th>#</th>
                                    <th>Tên</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody id="facilityList"></tbody>
                        </table>
                    </div>

                    <!-- Amenities Section -->
                    <div>
                        <h4 class="text-success">Tiện nghi</h4>
                        <form id="amenityForm" class="row g-2 mb-3" enctype="multipart/form-data">
                            <div class="col-md-4">
                                <input type="text" id="amenityName" class="form-control" placeholder="Tên tiện nghi">
                            </div>
                            <div class="col-md-4">
                                <input type="file" id="amenityImage" class="form-control" accept="image/*">
                            </div>
                            <div class="col-md-2">
                                <button type="submit" class="btn btn-outline-success w-100">
                                    <i class="fa fa-plus"></i> Thêm
                                </button>
                            </div>
                        </form>

                        <table class="table table-bordered table-striped">
                            <thead class="table-success">
                                <tr>
                                    <th>#</th>
                                    <th>Hình ảnh</th>
                                    <th>Tên</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody id="amenityList"></tbody>
                        </table>
                    </div>
                </div>

                <!-- Section: Slide -->
                <div id="slide" class="section-content" style="display: none;">
                    <h2 class="mb-3">Hình ảnh Slide</h2>

                    <!-- Add Slide Form -->
                    <form id="slideForm" class="row g-2 mb-4" enctype="multipart/form-data">
                        <div class="col-md-4">
                            <input type="file" id="slideImage" class="form-control" accept="image/*" required>
                        </div>
                        <div class="col-md-2">
                            <button type="submit" class="btn btn-primary w-100">Thêm</button>
                        </div>
                    </form>

                    <!-- Slide Items -->
                    <div class="row" id="slideList"></div>
                </div>

                {{-- <!-- Section: Setup -->
                <div id="setup" class="section-content" style="display: none;">
                    <!-- Setup content -->
                </div> --}}

            </div>
        </div>
    </div>
@endsection

@push('styles')
    <link rel="stylesheet" href="{{ asset('assets/css/admin/home_dashboard.css') }}">
@endpush

@push('scripts')
    <script src="{{ asset('assets/js/admin/home_dashboard.js') }}"></script>
    <script src="{{ asset('assets/js/admin/dashboard_page.js') }}"></script>
    <script src="{{ asset('assets/js/admin/booking_room.js') }}"></script>
    <script src="{{ asset('assets/js/admin/account_page.js') }}"></script>
    <script src="{{ asset('assets/js/admin/room_page.js') }}"></script>
    <script src="{{ asset('assets/js/admin/feedback_page.js') }}"></script>
    <script src="{{ asset('assets/js/admin/rating_page.js') }}"></script>
    <script src="{{ asset('assets/js/admin/facilities_amenity_page.js') }}"></script>
    <script src="{{ asset('assets/js/admin/slide_page.js') }}"></script>
    <script src="{{ asset('assets/js/admin/setting_set_up.js') }}"></script>
    <script src="{{ asset('assets/js/admin/room_type.js') }}"></script>


    <script>
        // Handle sidebar navigation clicks
        document.querySelectorAll('.nav-link[data-section]').forEach(link => {
            link.addEventListener('click', () => {
                // Remove active from all links
                document.querySelectorAll('.nav-link[data-section]').forEach(l => l.classList.remove(
                    'active'));

                // Hide all sections
                document.querySelectorAll('.section-content').forEach(section => section.style.display =
                    'none');

                // Activate clicked link
                link.classList.add('active');

                // Show the correct section
                const sectionId = link.getAttribute('data-section');
                document.getElementById(sectionId).style.display = 'block';
            });
        });
    </script>
@endpush
