$(document).ready(function () {
    const ratingData = [
        {
            id: 1,
            name: "Nguyen Van A",
            room: "VIP Room 1",
            rating: 5,
            comment: "Excellent service! Professional staff.",
            date: "2023-07-01"
        },
        {
            id: 2,
            name: "Tran Thi B",
            room: "Room 102",
            rating: 4,
            comment: "Clean and comfortable.",
            date: "2023-07-02"
        },
        {
            id: 3,
            name: "Le Van C",
            room: "Room 205",
            rating: 3,
            comment: "Good, but the wifi was weak.",
            date: "2023-07-03"
        }
    ];

    // Render stars
    function renderStars(stars) {
        return '<span class="text-warning fw-bold">' +
            "★".repeat(stars) +
            '<span class="text-muted">' + "★".repeat(5 - stars) + '</span>' +
            '</span>';
    }

    // Render rating cards
    function renderRatingList(data) {
        const list = $("#ratingList");
        list.empty();

        if (data.length === 0) {
            list.append(`<div class="col-12 text-center text-muted">No reviews available.</div>`);
            return;
        }

        data.forEach(item => {
            const card = `
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 class="text-primary mb-1">${item.name}</h5>
                <p class="mb-1"><strong>Room:</strong> ${item.room}</p>
                <p class="mb-1"><strong>Date:</strong> ${item.date}</p>
                <p class="mb-1"><strong>Rating:</strong> ${renderStars(item.rating)}</p>
                <p class="mt-2">${item.comment}</p>
              </div>
              <div class="d-flex justify-content-end mt-3">
                <button class="btn btn-sm btn-outline-primary me-2" onclick="editRating(${item.id})">
                  <i class="fa fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteRating(${item.id})">
                  <i class="fa fa-trash"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>`;
            list.append(card);
        });
    }

    // Filter by search
    function filterRating() {
        const keyword = $("#ratingSearch").val().toLowerCase();
        const filtered = ratingData.filter(r =>
            r.name.toLowerCase().includes(keyword) ||
            r.room.toLowerCase().includes(keyword) ||
            r.comment.toLowerCase().includes(keyword)
        );
        renderRatingList(filtered);
    }

    // Delete review
    window.deleteRating = function (id) {
        if (confirm("Are you sure you want to delete this review?")) {
            const index = ratingData.findIndex(r => r.id === id);
            if (index !== -1) {
                ratingData.splice(index, 1);
                filterRating();
            }
        }
    };

    // Edit review
    window.editRating = function (id) {
        const review = ratingData.find(r => r.id === id);
        if (!review) return;

        const newComment = prompt("Edit your comment:", review.comment);
        if (newComment !== null && newComment.trim() !== "") {
            review.comment = newComment.trim();
            renderRatingList(ratingData);
        }
    };

    // Search event
    $("#ratingSearch").on("keyup", filterRating);

    // Initial render
    renderRatingList(ratingData);
});
