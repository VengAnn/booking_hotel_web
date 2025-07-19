<?php

namespace App\Repositories;

use App\Models\Booking;
use App\Models\Feedback;
use App\Models\Review;
use App\Models\Room;
use App\Models\RoomType;
use App\Models\User;
use App\Models\Payment;
use Carbon\Carbon;

class AdminDashRepo
{
    public function getAllRoomType()
    {
        return RoomType::all();
    }

    public function getAllRoom()
    {
        return Room::with('roomType')->get();
    }

    public function totalRoomIsBooked($roomId, $checkIn, $checkOut)
    {
        return Booking::where('room_id', $roomId)
            ->where(function ($query) use ($checkIn, $checkOut) {
                $query->whereBetween('check_in_date', [$checkIn, $checkOut])
                    ->orWhereBetween('check_out_date', [$checkIn, $checkOut]);
            })
            ->count();
    }

    public function totalRoomAvailable()
    {
        return Room::whereDoesntHave('bookings', function ($query) {
            $query->whereIn('status', ['booked', 'checked_in']);
        })->count();
    }


    public function averageOfHotel()
    {
        return Review::avg('rating');
    }

    public function totalCustomer()
    {
        return User::where('user_role', 'user')->count();
    }

    public function totalFeedBack()
    {
        return Feedback::count();
    }

    public function todayRoomCancel()
    {
        return Booking::where('status', 'cancelled')
            ->whereDate('created_at', Carbon::today())
            ->count();
    }

    public function todayRoomBook()
    {
        return Booking::whereDate('created_at', Carbon::today())->count();
    }

    public function totalRevenue()
    {
        return Payment::whereIn('status', ['paid', 'pending'])->sum('amount');
    }

    public function todayRevenue()
    {
        return Payment::whereIn('status', ['paid', 'pending'])
            ->whereDate('paid_at', Carbon::today())
            ->sum('amount');
    }
}
