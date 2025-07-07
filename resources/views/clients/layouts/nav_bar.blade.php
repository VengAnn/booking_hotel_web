<!-- Navbar -->
<nav class="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
    <div class="container">
        <!-- Logo -->
        <a class="navbar-brand fw-bold" href="/"><img src="/assets/images/PSV_LOGO_Final_outline_ai.avif"
                alt="Logo" height="55">
        </a>

        <!-- Mobile toggle -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Nav links -->
        <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item"><a class="nav-link text-dark" data-section="home" href="/">Trang Chủ</a></li>
                <li class="nav-item"><a class="nav-link text-dark" data-section="room" href="/room">Phòng</a>
                </li>
                <li class="nav-item"><a class="nav-link text-dark" data-section="facilities" href="/facilities">Tiện
                        Nghi</a></li>
                <li class="nav-item"><a class="nav-link text-dark" data-section="contact" href="/contact">Liên Hệ</a>
                </li>
                <li class="nav-item"><a class="nav-link text-dark" data-section="about" href="/about">Giới Thiệu</a>
                </li>

            </ul>

            <!-- Login / Register buttons -->
            <div id="guest-buttons" class="d-none d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">
                <a class="btn btn-outline-primary rounded-pill px-4" href="/login">Đăng Nhập</a>
                <a class="btn btn-primary rounded-pill px-4" href="/register">Đăng Ký</a>
            </div>

            <!-- Profile dropdown (initially hidden) -->
            <div id="user-profile" class="dropdown mt-3 mt-lg-0 d-none">
                <a class="d-flex align-items-center text-decoration-none dropdown-toggle" href="#" role="button"
                    id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <img id="nav-avatar" class="rounded-circle me-2" width="40" height="40">
                    <span id="nav-username" class="fw-semibold text-dark">Username</span>
                </a>

                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                    <li><a class="dropdown-item" href="/info-profile">Thông tin</a></li>
                    <li><a class="dropdown-item" href="/history-booking">Phòng đã đặt</a></li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li>
                        <a id="btnLogout" class="dropdown-item">Đăng xuất</a>
                    </li>
                </ul>
            </div>

        </div>
    </div>
</nav>
