$(document).ready(function () {
    let accountData = [];
    let isEditMode = false;
    let editingUserId = null;

    const roleMap = {
        admin: 'Quản trị viên',
        user: 'Người dùng',
        staff: 'Nhân viên'
    };

    const reverseRoleMap = Object.fromEntries(
        Object.entries(roleMap).map(([key, value]) => [value.toLowerCase(), key])
    );

    function loadAccounts() {
        ajaxRequest({
            url: '/api/auth/users',
            method: 'GET',
            success: (res) => {
                accountData = res.data || [];
                renderAccounts(accountData);
            },
            error: (err) => {
                console.error("Lỗi khi tải danh sách tài khoản:", err);
                alert("Không thể tải danh sách người dùng");
            }
        });
    }

    function renderAccounts(accounts) {
        const body = document.getElementById("accountTableBody");
        body.innerHTML = "";

        if (!accounts.length) {
            body.innerHTML = `<tr><td colspan="7" class="text-center text-muted">Không có tài khoản</td></tr>`;
            return;
        }

        accounts.forEach((acc, index) => {
            const statusBadge = acc.is_active
                ? `<span class="badge bg-success">Hoạt động</span>`
                : `<span class="badge bg-secondary">Vô hiệu</span>`;

            const roleLabel = roleMap[acc.user_role] || acc.user_role;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${acc.username}</td>
                <td>${acc.email}</td>
                <td>${acc.phone || '-'}</td>
                <td>${roleLabel}</td>
                <td>${statusBadge}</td>
                <td>
                    <button class="btn btn-sm btn-outline-info me-1" onclick="editAccount(${acc.id})">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-warning me-1" onclick="resetPassword(${acc.id})">
                        <i class="fa fa-key"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger me-1" onclick="toggleStatus(${acc.id})">
                        <i class="fa ${acc.is_active ? 'fa-user-slash' : 'fa-user-check'}"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-dark" onclick="deleteAccount(${acc.id})">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            `;
            body.appendChild(row);
        });
    }

    $('#addUserButton').on('click', () => {
        isEditMode = false;
        editingUserId = null;
        showUserFormDialog({ title: 'Thêm tài khoản', data: {} });
    });

    window.editAccount = function (id) {
        const acc = accountData.find(u => u.id === id);
        if (!acc) return alert("Không tìm thấy người dùng");

        isEditMode = true;
        editingUserId = id;

        showUserFormDialog({
            title: 'Chỉnh sửa tài khoản',
            data: acc
        });
    };

    function showUserFormDialog({ title, data }) {
        const isEdit = !!data.id;

        const contentHtml = `
            <form id="userForm">
                <div class="mb-2">
                    <input type="text" id="username" class="form-control" placeholder="Tên người dùng" value="${data.username || ''}" required>
                </div>
                <div class="mb-2">
                    <input type="email" id="email" class="form-control" placeholder="Email" value="${data.email || ''}" required>
                </div>
                <div class="mb-2">
                    <input type="text" id="phone" class="form-control" placeholder="Số điện thoại" value="${data.phone || ''}">
                </div>
                ${!isEdit ? `
                <div class="mb-2">
                    <input type="password" id="password" class="form-control" placeholder="Mật khẩu" required>
                </div>` : ''}
                <div class="mb-2">
                    <input type="file" id="user_profile" class="form-control" accept=".jpg,.jpeg,.png,.webp">
                </div>
                <div class="mb-2">
                    <select id="user_role" class="form-control">
                        ${Object.entries(roleMap).map(([key, label]) => `
                            <option value="${key}" ${data.user_role === key ? 'selected' : ''}>${label}</option>
                        `).join('')}
                    </select>
                </div>
            </form>
        `;

        showConfirmDialog({
            title,
            size: 'medium',
            content: contentHtml,
            confirmText: isEdit ? 'Cập nhật' : 'Thêm mới',
            confirmBtnClass: 'btn-primary',
            onConfirm: function () {
                const username = this.$content.find('#username').val();
                const email = this.$content.find('#email').val();
                const phone = this.$content.find('#phone').val();
                const user_role = this.$content.find('#user_role').val();
                const password = this.$content.find('#password').val();
                const user_profile = this.$content.find('#user_profile')[0]?.files[0];

                if (!username || !email || (!isEdit && !password)) {
                    alert("❌ Vui lòng điền đầy đủ thông tin");
                    return false;
                }

                const formData = new FormData();
                formData.append("username", username);
                formData.append("email", email);
                formData.append("phone", phone);
                formData.append("user_role", user_role);

                if (user_profile) {
                    formData.append("user_profile", user_profile);
                }

                if (isEdit) {
                    formData.append("id", data.id);
                } else {
                    formData.append("password", password);
                    formData.append("confirm_password", password);
                }

                ajaxRequest({
                    url: isEdit ? '/api/auth/update-profile' : '/api/auth/register',
                    method: 'POST',
                    data: formData,
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('access_token')
                    },
                    success: () => {
                        alert(isEdit ? "✅ Cập nhật thành công" : "✅ Thêm tài khoản thành công");
                        loadAccounts();
                    },
                    error: (err) => {
                        console.error(err);
                        alert("❌ Lỗi khi lưu dữ liệu. " + (err.message || ''));
                    }
                });
            }
        });
    }

    window.resetPassword = function (id) {
        const acc = accountData.find(u => u.id === id);
        if (!acc) return alert("Không tìm thấy người dùng");

        ajaxRequest({
            url: '/api/auth/reset-default-password',
            method: 'POST',
            data: { id: id },
            success: () => alert(`✅ Mật khẩu của ${acc.email} đã được đặt lại`),
            error: (err) => alert(`❌ Lỗi: ${err.message || 'Không thể đặt lại mật khẩu'}`)
        });
    };

    window.toggleStatus = function (id) {
        ajaxRequest({
            url: '/api/auth/toggle-status',
            method: 'POST',
            data: { id: id },
            success: (res) => {
                const u = res.data;
                alert(`✅ ${u.username} đã được ${u.is_active ? 'kích hoạt' : 'vô hiệu hóa'}`);
                loadAccounts();
            },
            error: (err) => alert("❌ Không thể thay đổi trạng thái")
        });
    };

    window.deleteAccount = function (id) {
        const acc = accountData.find(u => u.id === id);
        if (!acc) return alert("Không tìm thấy người dùng");

        showConfirmDialog({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa tài khoản <strong>${acc.username}</strong>?`,
            type: 'red',
            confirmText: 'Xóa',
            confirmBtnClass: 'btn-danger',
            onConfirm: function () {
                ajaxRequest({
                    url: `/api/auth/users`,
                    method: 'DELETE',
                    data: { id },
                    success: () => {
                        alert(`✅ Tài khoản ${acc.username} đã bị xóa`);
                        loadAccounts();
                    },
                    error: (err) => {
                        console.error(err);
                        alert(`❌ Không thể xóa tài khoản: ${err.message || ''}`);
                    }
                });
            }
        });
    };

    document.getElementById("accountSearch").addEventListener("keyup", function () {
        const query = this.value.toLowerCase();
        const filtered = accountData.filter(acc =>
            acc.username.toLowerCase().includes(query) ||
            acc.email.toLowerCase().includes(query) ||
            (roleMap[acc.user_role]?.toLowerCase() || '').includes(query)
        );
        renderAccounts(filtered);
    });

    loadAccounts();
});
