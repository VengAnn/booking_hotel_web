$(document).ready(function () {
    const feedbackData = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            content: "Dịch vụ tuyệt vời! Nhân viên thân thiện, phòng sạch sẽ.",
            date: "2023-07-01",
            read: false
        },
        {
            id: 2,
            name: "Trần Thị B",
            content: "Khá ổn nhưng cần cải thiện về wifi.",
            date: "2023-07-02",
            read: true
        },
        {
            id: 3,
            name: "Lê Văn C",
            content: "Phòng hơi nhỏ, dịch vụ tốt.",
            date: "2023-07-03",
            read: false
        }
    ];

    function renderFeedbackList(data) {
        const list = $("#feedbackList");
        list.empty();

        if (data.length === 0) {
            list.append(`<div class="col-12 text-center text-muted">Không có phản hồi nào.</div>`);
            return;
        }

        data.forEach(item => {
            const bgColor = item.read ? "" : "background-color: #fff9db;"; // Vàng nhạt cho chưa đọc

            const card = `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card shadow-sm h-100 ${item.read ? 'border-success' : 'border-warning'}" style="${bgColor}">
          <div class="card-body">
            <h5 class="card-title text-primary mb-1">${item.name}</h5>
            <p class="mb-1"><strong>Ngày:</strong> ${item.date}</p>
            <p class="card-text mt-2">${item.content}</p>
            <div class="d-flex justify-content-between mt-3">
              <button class="btn btn-sm ${item.read ? 'btn-outline-secondary' : 'btn-outline-success'}" onclick="toggleRead(${item.id})">
                <i class="fa ${item.read ? 'fa-eye-slash' : 'fa-eye'}"></i> ${item.read ? 'Đã đọc' : 'Chưa đọc'}
              </button>
              <button class="btn btn-sm btn-outline-danger" onclick="deleteFeedback(${item.id})">
                <i class="fa fa-trash"></i> Xóa
              </button>
            </div>
          </div>
        </div>
      </div>`;
            list.append(card);
        });
    }


    window.toggleRead = function (id) {
        const fb = feedbackData.find(f => f.id === id);
        if (fb) {
            fb.read = !fb.read;
            renderFeedbackList(feedbackData);
        }
    };

    window.deleteFeedback = function (id) {
        if (confirm("Bạn có chắc chắn muốn xóa phản hồi này?")) {
            const index = feedbackData.findIndex(f => f.id === id);
            if (index !== -1) {
                feedbackData.splice(index, 1);
                renderFeedbackList(feedbackData);
            }
        }
    };

    $("#feedbackForm").on("submit", function (e) {
        e.preventDefault();
        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const subject = $("#subject").val().trim();
        const message = $("#message").val().trim();

        if (!name || !email || !subject || !message) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const newFeedback = {
            id: feedbackData.length + 1,
            name: name,
            content: `<strong>${subject}</strong><br>${message}`,
            date: new Date().toISOString().split("T")[0],
            read: false
        };

        feedbackData.unshift(newFeedback);
        $("#feedbackForm")[0].reset();
        renderFeedbackList(feedbackData);
    });

    renderFeedbackList(feedbackData);
});
