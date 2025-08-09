$(document).ready(function () {
    const defaultImage = "/assets/icons/logo_profile.png";
    const userData = JSON.parse(localStorage.getItem("user-data") || '{}');

    // Load and show current user profile
    function fetchCurrentUser(user) {
        ajaxRequest({
            url: `/api/auth/current-user`,
            method: 'POST',
            data: { id: user.user_id },
            success: function (res) {
                const userData = res.data;
                const imageUrl = userData.user_profile
                    ? `/storage/${userData.user_profile}`
                    : defaultImage;

                $("#previewImage").attr("src", imageUrl);
                $("#username").val(userData.username || '');
                $("#phone").val(userData.phone || '');
                $("#email").val(userData.email || '');
            },
            error: function (err) {
                console.error('Failed to fetch user profile:', err);
                $("#previewImage").attr("src", defaultImage);
            }
        });
    }

    // Image preview
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

    // Update profile info
    $("#updateProfileBtn").on("click", function () {
        if (!userData?.user_id) {
            toastr.error("❌ Không tìm thấy thông tin người dùng!");
            return;
        }

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
            processData: false,
            contentType: false,
            success: () => {
                toastr.success("✅ Cập nhật thông tin thành công");
                fetchCurrentUser(userData);
            },
            error: function (err) {
                console.error('Failed to update profile:', err);
                toastr.error("❌ Có lỗi xảy ra khi cập nhật");
            }
        });
    });

    // 🔁 Reset password to default
    $("#changePasswordBtn").on("click", function () {
        if (!userData?.user_id) {
            toastr.error("❌ Không tìm thấy thông tin người dùng!");
            return;
        }

        Swal.fire({
            title: "⚠️ Bạn có chắc muốn đặt lại mật khẩu mặc định?",
            text: "Mật khẩu sẽ được đặt lại theo mặc định hệ thống!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đặt lại",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/api/auth/reset-default-password",
                    method: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({ id: userData.user_id }),
                    success: (res) => {

                        Swal.fire({
                            icon: "success",
                            title: "✅ Thành công",
                            text: "Mật khẩu đã được đặt lại mặc định.(1234567)"
                        });
                    },
                    error: (err) => {
                        console.error(err);
                        Swal.fire({
                            icon: "error",
                            title: "❌ Lỗi",
                            text: err.responseJSON?.message || "Đặt lại mật khẩu thất bại"
                        });
                    }
                });
            }
        });
    });

    // Initial profile load
    if (userData?.user_id) {
        fetchCurrentUser(userData);
    } else {
        $("#previewImage").attr("src", defaultImage);
    }
});
