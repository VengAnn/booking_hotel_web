@extends('commons.layouts.app')

@section('content')
    <div class="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div class="card shadow-lg border-0 rounded-4 p-4" style="width: 100%; max-width: 400px;">
            <div class="text-center mb-4">
                <i class="fas fa-user-circle fa-3x text-info"></i>
                <h4 class="fw-bold mt-2 text-info">Đăng nhập</h4>
            </div>

            <!-- Alert message -->
            <div id="login-alert" class="alert alert-danger d-none" role="alert"></div>

            <!-- Login form -->
            <form novalidate>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <div class="input-group">
                        <span class="input-group-text bg-info text-white"><i class="fas fa-envelope"></i></span>
                        <input type="text" id="email" name="email" class="form-control" required
                            placeholder="Nhập email">
                    </div>
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Mật khẩu</label>
                    <div class="input-group">
                        <span class="input-group-text bg-info text-white"><i class="fas fa-lock"></i></span>
                        <input type="password" id="password" name="password" class="form-control" required
                            placeholder="Nhập mật khẩu">
                    </div>
                </div>

                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="form-check">
                        <input type="checkbox" id="remember" class="form-check-input">
                        <label class="form-check-label" for="remember">Ghi nhớ</label>
                    </div>
                    <a class="small text-info text-decoration-none" href="/forgot-pass">Quên mật khẩu?</a>
                </div>


                <div class="d-flex justify-content-center">
                    <div id="loadingSpinner" class="spinner-border" role="status" style="display: none;">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <button id="btnLogin" class="btn btn-info w-100 fw-bold text-white">
                    <i class="fas fa-sign-in-alt me-1"></i> Đăng nhập
                </button>
            </form>

            <hr class="my-4">

            <div class="text-center">
                <p class="mb-0">Chưa có tài khoản?
                    <a class="text-info fw-semibold text-decoration-none" href="/register">Đăng ký</a>
                </p>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('assets/js/commons/auth/login_page.js') }}"></script>
@endpush
