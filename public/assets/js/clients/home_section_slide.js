$(document).ready(function () {
    loadSlides();

    function loadSlides() {
        ajaxRequest({
            url: '/api/slide',
            method: 'GET',
            success: function (res) {
                const slides = res.data || [];
                const $inner = $('#carousel-inner');
                const $indicators = $('#carousel-indicators');

                $inner.empty();
                $indicators.empty();

                if (slides.length > 0) {
                    slides.forEach((slide, index) => {
                        const activeClass = index === 0 ? 'active' : '';
                        $inner.append(`
                            <div class="carousel-item ${activeClass}">
                                <img src="/storage/${slide.img_url}" class="d-block w-100" style="object-fit: cover; height: 60vh;" />
                            </div>
                        `);
                        $indicators.append(`<li data-target="#heroCarousel" data-slide-to="${index}" class="${activeClass}"></li>`);
                    });

                    $('#heroCarousel').carousel(); // initialize carousel
                } else {
                    console.warn("No slides available.");
                }
            },
            error: function (err) {
                console.error('❌ Failed to load slides:', err);
            }
        });
    }
});
