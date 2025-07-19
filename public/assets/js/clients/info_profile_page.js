$(document).ready(function () {
    const defaultImage = "assets/icons/logo_profile.png";

    function fetchCurrentUser(user) {
        ajaxRequest({
            url: `/api/auth/current-user`,
            method: 'POST',
            data: { id: user.user_id },
            success: function (res) {
                const userData = res.data;
                const imageUrl = userData.user_profile ? userData.user_profile : defaultImage;

                $("#previewImage").attr("src", "storage/" + imageUrl);
                $("#username").val(userData.username || '');
                $("#phone").val(userData.phone || '');
            },
            error: function (err) {
                console.error('Failed to fetch user profile:', err);
                $("#previewImage").attr("src", defaultImage);
            }
        });
    }

    // 2️⃣ Preview selected image
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

    // Update profile
    $("#updateProfileBtn").on("click", function () {
        const formData = new FormData();

        formData.append('id', userData.user_id);
        formData.append('username', $("#username").val());
        formData.append('phone', $("#phone").val());
        formData.append('email', $("#email").val());

        const imageFile = $("#profileImage")[0].files[0];
        if (imageFile) {
            formData.append('user_profile', imageFile);
        }

        ajaxRequest({
            url: "/api/auth/update-profile",
            method: "POST",
            data: formData,
            success: () => {
                toastr.success("✅ Cập nhật thông tin thành công");

                // Refresh image after successful update
                const userData = JSON.parse(localStorage.getItem("user-data") || '{}');
                if (userData?.user_id) {
                    fetchCurrentUser(userData);
                }
            },
            error: function (err) {
                console.error('Failed to update profile:', err);
                toastr.error("❌ Có lỗi xảy ra khi cập nhật", err.message);
            }
        });
    });

    // Change password
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

    // 5️⃣ Init: load user image and info
    const userData = JSON.parse(localStorage.getItem("user-data") || '{}');
    if (userData?.user_id) {
        fetchCurrentUser(userData);
    } else {
        $("#previewImage").attr("src", defaultImage);
    }
});
