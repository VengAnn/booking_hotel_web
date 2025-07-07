@extends('commons.layouts.app')

@section('content')
    <div class="container d-flex justify-content-center align-items-center min-vh-100 bg-light p-4">
        <div class="card shadow border-0 rounded-4 p-4 w-100" style="max-width: 500px;">
            <div class="text-center mb-4">
                <i class="fas fa-user-plus fa-3x text-info"></i>
                <h4 class="fw-bold mt-2 text-info">Đăng ký tài khoản</h4>
            </div>

            <!-- Alert message -->
            <div id="register-alert" class="alert alert-danger d-none" role="alert"></div>

            <!-- Register form -->
            <form id="register-form" novalidate>

                <div class="mb-3">
                    <label for="username" class="form-label text-info fw-semibold">Họ và tên</label>
                    <div class="input-group">
                        <span class="input-group-text bg-info text-white"><i class="fas fa-user"></i></span>
                        <input type="text" id="username" name="username" class="form-control" required
                            placeholder="Nhập họ và tên">
                    </div>
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label text-info fw-semibold">Email</label>
                    <div class="input-group">
                        <span class="input-group-text bg-info text-white"><i class="fas fa-envelope"></i></span>
                        <input type="email" id="email" name="email" class="form-control" required
                            placeholder="Nhập email">
                    </div>
                </div>

                <div class="mb-3">
                    <label for="phone" class="form-label text-info fw-semibold">Số điện thoại</label>
                    <div class="input-group">
                        <span class="input-group-text bg-info text-white"><i class="fas fa-phone"></i></span>
                        <input type="text" id="phone" name="phone" class="form-control" required
                            placeholder="Nhập số điện thoại">
                    </div>
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label text-info fw-semibold">Mật khẩu</label>
                    <div class="input-group">
                        <span class="input-group-text bg-info text-white"><i class="fas fa-lock"></i></span>
                        <input type="password" id="password" name="password" class="form-control" required
                            placeholder="Nhập mật khẩu">
                    </div>
                </div>

                <div class="mb-4">
                    <label for="password_confirmation" class="form-label text-info fw-semibold">Xác nhận mật khẩu</label>
                    <div class="input-group">
                        <span class="input-group-text bg-info text-white"><i class="fas fa-lock"></i></span>
                        <input type="password" id="password_confirmation" name="password_confirmation" class="form-control"
                            required placeholder="Nhập lại mật khẩu">
                    </div>
                </div>

                <div class="d-flex justify-content-center">
                    <div id="loadingSpinner" class="spinner-border" role="status" style="display: none;">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <button id="btnRegister" class="btn btn-info w-100 fw-bold text-white">
                    <i class="fas fa-user-plus me-1"></i> Đăng ký
                </button>
            </form>

            <hr class="my-4">

            <div class="text-center">
                <p class="mb-0 text-muted">Đã có tài khoản?
                    <a href="/login" class="text-info fw-semibold text-decoration-none">Đăng nhập</a>
                </p>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('assets/js/commons/auth/register_page.js') }}"></script>
@endpush
