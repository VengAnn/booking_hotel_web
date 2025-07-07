$(document).ready(function () {
    const stats = [
        { title: 'Tổng số loại phòng', value: 12, icon: 'fa-door-open', color: 'primary' },
        { title: 'Tổng số phòng', value: 58, icon: 'fa-bed', color: 'success' },
        { title: 'Khách hàng mới đặt', value: 20, icon: 'fa-user-check', color: 'info' },
        { title: 'Phòng đang đặt', value: 10, icon: 'fa-calendar-check', color: 'warning' },
        { title: 'Phòng đang trống', value: 30, icon: 'fa-bed', color: 'secondary' },
        { title: 'Xếp hạng & đánh giá', value: '4.5 ★', icon: 'fa-star', color: 'dark' },
        { title: 'Khách hàng đăng ký', value: 250, icon: 'fa-users', color: 'danger' },
        { title: 'Phản hồi & góp ý', value: 15, icon: 'fa-comment-dots', color: 'info' },
        { title: 'Phòng bị huỷ', value: 5, icon: 'fa-ban', color: 'danger' },
        { title: 'Tổng doanh thu', value: '₫120,000,000', icon: 'fa-money-bill-wave', color: 'success' },
    ];

    const container = $('#dashboard-stats');
    container.empty();

    stats.forEach(stat => {
        const card = `
            <div class="col-md-6 col-xl-4">
                <div class="card border-start border-${stat.color} border-4 shadow-sm h-100">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="text-muted mb-1">${stat.title}</h6>
                            <h5 class="fw-bold">${stat.value}</h5>
                        </div>
                        <div class="icon fs-2 text-${stat.color}">
                            <i class="fas ${stat.icon}"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.append(card);
    });
});
