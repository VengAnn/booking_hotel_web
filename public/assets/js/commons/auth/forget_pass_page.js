document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("forget-form");
    const alertBox = document.getElementById("forget-alert");
    const successBox = document.getElementById("forget-success");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        alertBox.classList.add("d-none");
        successBox.classList.add("d-none");

        const email = document.getElementById("email").value.trim();

        if (!email) {
            showError("Vui lòng nhập email.");
            return;
        }

        // Send AJAX request
        fetch("/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify({ email })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    successBox.textContent = data.message || "Liên kết đặt lại mật khẩu đã được gửi!";
                    successBox.classList.remove("d-none");
                    form.reset();
                } else {
                    showError(data.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
                }
            })
            .catch(() => {
                showError("Lỗi kết nối. Vui lòng thử lại.");
            });
    });

    function showError(message) {
        alertBox.textContent = message;
        alertBox.classList.remove("d-none");
    }
});
