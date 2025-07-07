@extends('commons.layouts.app')

@section('content')
    <div class="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div class="card shadow border-0 rounded-4 p-4" style="width: 100%; max-width: 420px;">
            <div class="text-center mb-4">
                <i class="fas fa-shield-alt fa-3x text-info"></i>
                <h4 class="fw-bold mt-2 text-info">Xác minh OTP</h4>
                <p class="text-muted small">Nhập mã OTP đã được gửi đến email hoặc số điện thoại của bạn.</p>
            </div>

            <!-- Alert messages -->
            <div id="otp-alert" class="alert alert-danger d-none" role="alert"></div>
            <div id="otp-success" class="alert alert-success d-none" role="alert"></div>

            <!-- OTP Form -->
            <form id="otp-form" novalidate>
                <div class="mb-3">
                    <label for="otp" class="form-label">Mã OTP</label>
                    <div class="input-group">
                        <span class="input-group-text bg-info text-white"><i class="fas fa-key"></i></span>
                        <input type="text" id="otp" name="otp" class="form-control" maxlength="6"
                            placeholder="Nhập mã OTP" required>
                    </div>
                </div>

                <button type="submit" class="btn btn-info w-100 fw-bold text-white">
                    <i class="fas fa-check-circle me-1"></i> Xác minh
                </button>
            </form>

            <div class="text-center mt-3">
                <p class="small">Không nhận được mã?
                    <a href="#" id="resend-otp" class="text-info fw-semibold text-decoration-none">Gửi lại</a>
                </p>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('assets/js/commons/auth/verify_otp_page.js') }}"></script>
@endpush
