
$(document).ready(function () {
    loadDashboardStats();

    function loadDashboardStats() {
        $.ajax({
            url: '/api/admin/dashboard/summary',
            method: 'GET',
            success: function (res) {
                const data = res.data;

                const stats = [
                    { title: 'Tổng số loại phòng', value: data.room_types?.length || 0, icon: 'fa-door-open', color: 'primary' },
                    { title: 'Tổng số phòng', value: data.rooms?.length || 0, icon: 'fa-bed', color: 'success' },
                    { title: 'Tổng số khách hàng', value: data.total_customers || 0, icon: 'fa-user-check', color: 'info' },
                    { title: 'Phòng đang đặt hôm nay', value: data.today_bookings ?? 0, icon: 'fa-calendar-check', color: 'warning' },
                    { title: 'Phòng đang trống', value: data.available_rooms ?? 0, icon: 'fa-bed', color: 'secondary' },
                    {
                        title: 'Xếp hạng & đánh giá',
                        value: `${parseFloat(data.average_rating ?? 0).toFixed(1)} ★`,
                        icon: 'fa-star',
                        color: 'dark'
                    },
                    { title: 'Phản hồi & góp ý', value: data.feedback_count ?? 0, icon: 'fa-comment-dots', color: 'info' },
                    { title: 'Phòng bị huỷ hôm nay', value: data.today_cancellations ?? 0, icon: 'fa-ban', color: 'danger' },
                    {
                        title: 'Tổng doanh thu',
                        value: formatCurrency(data.total_revenue),
                        icon: 'fa-money-bill-wave',
                        color: 'success'
                    },
                    {
                        title: 'Doanh thu hôm nay',
                        value: formatCurrency(data.today_revenue),
                        icon: 'fa-sack-dollar',
                        color: 'primary'
                    },
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
            },
            error: function (err) {
                toastr.error(err.responseJSON?.message || "Không thể tải thống kê");
            }
        });
    }

    function formatCurrency(amount) {
        const parsed = parseFloat(amount);
        if (isNaN(parsed)) return '₫0';

        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(parsed);
    }

});

