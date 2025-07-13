$(document).ready(function () {
    // Preview profile image
    $("#profileImage").on("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $("#previewImage").attr("src", e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Update profile button click
    $("#updateProfileBtn").on("click", function () {
        const formData = new FormData();
        formData.append('username', $("#username").val());
        formData.append('phone', $("#phone").val());

        const imageFile = $("#profileImage")[0].files[0];
        if (imageFile) {
            formData.append('user_profile', imageFile);
        }

        $.ajax({
            url: "/api/auth/update-profile",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: () => toastr.success("✅ Cập nhật thông tin thành công"),
            error: (err) => {
                console.error(err);
                toastr.error("❌ Có lỗi xảy ra khi cập nhật");
            }
        });
    });

    // Change password button click
    $("#changePasswordBtn").on("click", function () {
        const htmlForm = `
            <form id="passwordChangeForm" class="mt-3">
                <div class="mb-3">
                    <label for="old_pass">Mật khẩu hiện tại</label>
                    <input type="password" class="form-control" id="old_pass" required>
                </div>
                <div class="mb-3">
                    <label for="new_pass">Mật khẩu mới</label>
                    <input type="password" class="form-control" id="new_pass" required>
                </div>
                <div class="mb-3">
                    <label for="confirm_pass">Xác nhận mật khẩu mới</label>
                    <input type="password" class="form-control" id="confirm_pass" required>
                </div>
            </form>`;

        showConfirmDialog({
            title: "🔐 Đổi mật khẩu",
            content: htmlForm,
            type: "blue",
            confirmText: "Cập nhật",
            onConfirm: function () {
                const oldPassword = $("#old_pass").val();
                const newPassword = $("#new_pass").val();
                const confirmPassword = $("#confirm_pass").val();

                if (!oldPassword || !newPassword || !confirmPassword) {
                    toastr.error("❌ Vui lòng nhập đầy đủ thông tin mật khẩu");
                    return false;
                }

                if (newPassword !== confirmPassword) {
                    toastr.error("❌ Mật khẩu mới không khớp");
                    return false;
                }

                $.ajax({
                    url: "/api/auth/update-password",
                    method: "PUT",
                    contentType: "application/json",
                    data: JSON.stringify({
                        old_password: oldPassword,
                        new_password: newPassword
                    }),
                    success: () => toastr.success("✅ Đổi mật khẩu thành công"),
                    error: (err) => {
                        console.error(err);
                        toastr.error(err.responseJSON?.message || "❌ Đổi mật khẩu thất bại");
                    }
                });
            }
        });
    });
});
