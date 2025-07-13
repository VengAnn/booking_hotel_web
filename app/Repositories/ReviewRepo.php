<?php

namespace App\Repositories;

use App\Models\Review;
use App\Interface\ReviewInterface;
use App\Models\Booking;

class ReviewRepo implements ReviewInterface
{
    public function getAll()
    {
        return Review::with(['user', 'room'])->latest()->get();
    }

    public function getByRoom($roomId)
    {
        return Review::where('room_id', $roomId)->with('user')->latest()->get();
    }

    public function store(array $data)
    {
        $booking = Booking::findOrFail($data['booking_id']);
        $booking->is_reviewed = true;
        $booking->save();
        return Review::create($data);
    }

    public function delete(int $id)
    {
        $review = Review::findOrFail($id);
        return $review->delete();
    }

    public function getReviewInWhatRoomTypeById($roomTypeId)
    {
        return Review::with(['user', 'room.roomType'])
            ->whereHas('room', function ($q) use ($roomTypeId) {
                $q->where('room_type_id', $roomTypeId);
            })
            ->latest()
            ->get();
    }
}
