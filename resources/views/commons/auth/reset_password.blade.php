@extends('commons.layouts.app')

@section('content')
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow rounded">
                    <div class="card-header bg-info text-white text-center">
                        <h4>Đặt lại mật khẩu</h4>
                    </div>
                    <div class="card-body">
                        <div class="alert alert-danger d-none" id="errorAlert"></div>
                        <div class="alert alert-success d-none" id="successAlert"></div>

                        <form id="resetPasswordForm">
                            <div class="mb-3">
                                <label for="password" class="form-label">Mật khẩu mới</label>
                                <input type="password" id="password" name="password" class="form-control" required
                                    minlength="6">
                            </div>

                            <div class="mb-3">
                                <label for="password_confirmation" class="form-label">Xác nhận mật khẩu</label>
                                <input type="password" id="password_confirmation" name="password_confirmation"
                                    class="form-control" required minlength="6">
                            </div>

                            <button type="button" class="btn btn-info w-100" id="resetBtn">
                                <span class="spinner-border spinner-border-sm d-none" id="loadingSpinner" role="status"
                                    aria-hidden="true"></span>
                                <span id="btnText">Đặt lại mật khẩu</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('assets/js/commons/auth/reset_pass_page.js') }}"></script>
@endpush
