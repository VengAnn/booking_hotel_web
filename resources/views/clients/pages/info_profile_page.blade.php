@extends('clients.layouts.app')

@section('content')
    <div class="container mt-4">
        <h3 class="mb-4">👤 Thông Tin Cá Nhân</h3>

        <div class="row">
            <div class="col-md-4 text-center">
                <img id="previewImage" alt="Ảnh đại diện" class="img-thumbnail rounded-circle"
                    style="width: 150px; height: 150px; object-fit: cover;">
            </div>


            <div class="col-md-8">
                <form id="profileForm">
                    <div class="mb-3">
                        <label for="username" class="form-label">Tên người dùng</label>
                        <input type="text" class="form-control" id="username" value="{{ auth()->user()->username }}">
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" value="{{ auth()->user()->email }}"
                            readonly>
                    </div>

                    <div class="mb-3">
                        <label for="phone" class="form-label">Số điện thoại</label>
                        <input type="text" class="form-control" id="phone" value="{{ auth()->user()->phone }}">
                    </div>

                    <div class="mb-3">
                        <label for="profileImage" class="form-label">Ảnh đại diện mới</label>
                        <input type="file" class="form-control" id="profileImage" accept="image/*">
                    </div>

                    <div class="d-flex gap-2 mb-3">
                        <button type="button" class="btn btn-primary" id="updateProfileBtn"><i class="fa fa-save"></i> Cập
                            nhật thông
                            tin</button>
                        <button type="button" class="btn btn-warning" id="changePasswordBtn"><i class="fa fa-key"></i> Thay
                            đổi mật khẩu</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('assets/js/clients/info_profile_page.js') }}"></script>
@endpush
