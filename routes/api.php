<?php

use App\Http\Controllers\AdminDashBoardController;
use App\Http\Controllers\AmenityController;
use App\Http\Controllers\FeedbackController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\PayController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\RoomRelationController;
use App\Http\Controllers\RoomTypeController;
use App\Http\Controllers\SlideController;

// Route::middleware(['roleCheck:admin,user'])->group(function () {
//     Route::group(['prefix' => 'address'], function () {
//         // Route::get('getUserAddresses', [AddressController::class, 'getUserAddresses']);
//         // Route::post('store', [AddressController::class, 'store']);
//         // Route::put('update/{id}', [AddressController::class, 'update']);
//         // Route::delete('destroy/{id}', [AddressController::class, 'destroy']);
//     });
// });

// ============= Navigation routes ============ //
Route::get('/check-role', function () {
    return response()->json(['status' => 'ok']);
})->middleware('navigation');

// ============= Auth routes ============ //
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::put('update-password', [AuthController::class, 'updatePassword']);
    Route::post('update-profile', [AuthController::class, 'updateUserData']);
    Route::post('reset-default-password', [AuthController::class, 'resetDefualtPassword']);
    Route::post('toggle-status', [AuthController::class, 'toggleStatus']);
    Route::get('users', [AuthController::class, 'getAllUsers']);
    Route::post('current-user', [AuthController::class, 'getCurrentUser']);
    Route::delete('users', [AuthController::class, 'deleteUser']);
});

// ============= Otp routes ============= //
Route::prefix('otp')->group(function () {
    Route::post('send', [OtpController::class, 'sendOtp']);
    Route::post('verify', [OtpController::class, 'verifyOtp']);
    Route::post('resend', [OtpController::class, 'resendOtp']);
});

// ============ Room routes ============= //
Route::prefix('room')->group(function () {
    Route::get('/', [RoomController::class, 'getAllRooms']);
    Route::get('/{id}', [RoomController::class, 'show']);
    Route::post('/', [RoomController::class, 'store']);
    Route::put('/{id}', [RoomController::class, 'update']);
    Route::post('/update-status', [RoomController::class, 'updateStatus']);
    Route::delete('/{id}', [RoomController::class, 'destroy']);
});

// ============= Amenity routes ============= //
Route::prefix('amenity')->group(function () {
    Route::get('/', [AmenityController::class, 'index']);
    Route::get('/{id}', [AmenityController::class, 'show']);
    Route::post('/', [AmenityController::class, 'store']);
    Route::put('/{id}', [AmenityController::class, 'update']);
    Route::delete('/{id}', [AmenityController::class, 'destroy']);
});

// ============ Facility routes ============= //
Route::prefix('facility')->group(function () {
    Route::get('/', [FacilityController::class, 'index']);
    Route::get('/{id}', [FacilityController::class, 'show']);
    Route::post('/', [FacilityController::class, 'store']);
    Route::put('/{id}', [FacilityController::class, 'update']);
    Route::delete('/{id}', [FacilityController::class, 'destroy']);
});

// ============ Slide routes ============= //
Route::prefix('slide')->group(function () {
    Route::get('/', [SlideController::class, 'index']);
    Route::post('/', [SlideController::class, 'store']);
    Route::post('/reorder', [SlideController::class, 'reorder']);
    Route::post('/{id}', [SlideController::class, 'update']);
    Route::delete('/{id}', [SlideController::class, 'destroy']);
});

// ============ RoomType routes ============= //
Route::prefix('room-types')->group(function () {
    Route::get('/', [RoomTypeController::class, 'index']);
    Route::post('/', [RoomTypeController::class, 'store']);
    Route::put('/{id}', [RoomTypeController::class, 'update']);
    Route::delete('/{id}', [RoomTypeController::class, 'destroy']);

    Route::get('/{id}', [RoomTypeController::class, 'show']);
});

// ============ Room Type Relation routes ============= //
Route::prefix('room-types/{roomId}')->group(function () {
    Route::post('/amenities', [RoomRelationController::class, 'addAmenities']);
    Route::put('/amenities', [RoomRelationController::class, 'updateAmenities']);

    Route::post('/facilities', [RoomRelationController::class, 'addFacilities']);
    Route::put('/facilities', [RoomRelationController::class, 'updateFacilities']);

    Route::post('/images', [RoomRelationController::class, 'updateOrAddImages']);
});


// =========== Booking routes ============= //
Route::prefix('bookings')->controller(BookingController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/get-by-user', 'getBookingsByUserId');
    Route::get('{id}', 'show');
    Route::post('/', 'store');
    Route::put('{id}', 'update');
    Route::delete('{id}', 'destroy');

    Route::post('/check-multiple-rooms',  'checkRoomsAvailability');
    Route::post('/cancel/{id}', 'cancel');
    Route::post('/update-status', 'updateBookingStatus');
});

// =========== FeedBack routes ============= //
Route::prefix('feedbacks')->controller(FeedbackController::class)->group(function () {
    Route::get('/', 'getAll');
    Route::post('/', 'store');
    Route::put('{id}', 'markAsRead');
    Route::delete('{id}', 'destroy');
});

// =========== Review routes ============= //
Route::prefix('reviews')->controller(ReviewController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/room/{roomId}', 'getByRoom');
    Route::post('/', 'store');
    Route::delete('/{id}', 'destroy');

    Route::get('/room-type/{roomTypeId}', 'getReviewInWhatRoomTypeById');
});


// =========== Admin dashboard routes ============= //
Route::prefix('admin/dashboard')->group(function () {
    Route::get('/summary', [AdminDashBoardController::class, 'dashboardSummary']);
    Route::get('/room-booked', [AdminDashBoardController::class, 'totalRoomIsBooked']);
});

// =========== Payment routes ============= //
Route::prefix('payments')->group(function () {
    Route::get('/', [PayController::class, 'index']);
    Route::get('/{id}', [PayController::class, 'show']);
    Route::post('/', [PayController::class, 'store']);
    Route::put('/{id}', [PayController::class, 'update']);
    Route::delete('/{id}', [PayController::class, 'destroy']);
});


Route::post('/chat/gemini', [ChatController::class, 'chatWithGemini']);
