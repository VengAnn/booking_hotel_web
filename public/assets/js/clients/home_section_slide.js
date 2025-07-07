$(document).ready(function () {
    startSlideshow();

    // Start hotel slideshow
    function startSlideshow() {
        const $slideshowImage = $('#slideshowImage');
        const images = [
            '/assets/images/slide_hotel_1.png',
            '/assets/images/slide_hotel_2.png',
            '/assets/images/slide_hotel_3.png'
        ];

        let current = 0;
        $slideshowImage.attr('src', images[current]);

        setInterval(() => {
            current = (current + 1) % images.length;
            $slideshowImage.fadeOut(300, function () {
                $slideshowImage.attr('src', images[current]).fadeIn(300);
            });
        }, 5000);
    }

});