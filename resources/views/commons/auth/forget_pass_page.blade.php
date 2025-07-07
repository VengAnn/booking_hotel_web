@extends('commons.layouts.app')

@section('content')
    <div class="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div class="card shadow border-0 rounded-4 p-4" style="width: 100%; max-width: 400px;">
            <div class="text-center mb-4">
                <i class="fas fa-unlock-alt fa-3x text-info"></i>
                <h4 class="fw-bold mt-2 text-info">Quên mật khẩu</h4>
                <p class="text-muted small">Nhập email đã đăng ký để đặt lại mật khẩu.</p>
            </div>

            <!-- Alert message -->
            <div id="forget-alert" class="alert alert-danger d-none" role="alert"></div>
            <div id="forget-success" class="alert alert-success d-none" role="alert"></div>

            <!-- Forget password form -->
            <form id="forget-form" novalidate>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <div class="input-group">
                        <span class="input-group-text bg-info text-white"><i class="fas fa-envelope"></i></span>
                        <input type="email" id="email" name="email" class="form-control" required
                            placeholder="Nhập email">
                    </div>
                </div>

                <button type="submit" class="btn btn-info w-100 fw-bold text-white">
                    <i class="fas fa-paper-plane me-1"></i> Gửi yêu cầu
                </button>
            </form>

            <hr class="my-4">

            <div class="text-center">
                <p class="mb-0">Bạn đã nhớ mật khẩu?
                    <a href="/login" class="text-info fw-semibold text-decoration-none">Đăng nhập</a>
                </p>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('assets/js/commons/auth/forget_pass_page.js') }}"></script>
@endpush
