$(document).ready(function () {
    const currentPath = window.location.pathname;

    function setActiveNav(section) {
        $('.navbar-nav .nav-link').removeClass('active');
        $(`.navbar-nav .nav-link[data-section="${section}"]`).addClass('active');
    }

    // Initial active tab highlight
    if (currentPath === '/' || currentPath === '/home') {
        setActiveNav('home');
    } else if (currentPath === '/room') {
        setActiveNav('room');
    } else if (currentPath === '/facilities') {
        setActiveNav('facilities');
    } else if (currentPath === '/contact') {
        setActiveNav('contact');
    } else if (currentPath === '/about') {
        setActiveNav('about');
    }
});
