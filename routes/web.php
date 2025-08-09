<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('clients.pages.home_page');
})->name('clients.pages.home_page');

Route::get('/room', function () {
    return view('clients.pages.room_page');
});

Route::get('/room-booking', function () {
    return view('admin.pages.room_booking');
});

Route::get('/facilities', function () {
    return view('clients.pages.facility_page');
});

Route::get('/contact', function () {
    return view('clients.pages.contact_page');
});

Route::get('/about', function () {
    return view('clients.pages.about_page');
});

Route::get('/detail-roomtype', function () {
    return view('clients.pages.detail_room_type_page');
});


Route::get('/login', function () {
    return view('commons.auth.login_page');
})->name('commons.auth.login_page');



Route::get('/register', function () {
    return view('commons.auth.register_page');
});

Route::get('/forgot-pass', function () {
    return view('commons.auth.forget_pass_page');
});

Route::get('/verify-otp', function () {
    return view('commons.auth.verify_otp_page');
});

Route::get('/reset-pass-page', function () {
    return view('commons.auth.reset_password');
});

Route::middleware('protectRoute')->group(function () {
    Route::get('/history-booking', function () {
        return view('clients.pages.history_booking_page');
    });

    Route::get('/booking-page', function () {
        return view('clients.pages.booking_page');
    });


    Route::get('/info-profile', function () {
        return view('clients.pages.info_profile_page');
    });


    // admin
    Route::get('/home-dashboard', function () {
        return view('admin.pages.home_dashboard');
    })->name('admin.pages.home_dashboard');
});
