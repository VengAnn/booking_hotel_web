$(document).ready(function () {
    const images = [
        'hotel_1.jpg',
        'hotel_2.jpg',
        'hotel_3.jpg',
        'hotel_4.jpg',
        'hotel_5.jpg',
        'hotel_7.jpg',
        'hotel_8.jpg',
        'hotel_9.jpg',
        'hotel_10.jpg',
        'hotel_11.jpg',
        'hotel_12.jpg',
        'hotel_13.jpg',
        'hotel_14.jpg',
        'hotel_15.jpg',
    ];

    const basePath = 'assets/images/about/';
    const $gallery = $('#image-gallery');

    images.forEach(function (file) {
        const imgElement = `
            <div class="col-6 col-md-4 col-lg-3">
                <a href="${basePath + file}" data-lightbox="hotel-gallery">
                    <div class="rounded overflow-hidden shadow-sm">
                        <img src="${basePath + file}" class="img-fluid w-100" alt="Hotel Image">
                    </div>
                </a>
            </div>
        `;
        $gallery.append(imgElement);
    });
});
