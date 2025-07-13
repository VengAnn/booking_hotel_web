<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ReviewService;

class ReviewController
{
    protected $service;

    public function __construct(ReviewService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return $this->service->getAll();
    }

    public function getByRoom($roomId)
    {
        return $this->service->getByRoom($roomId);
    }

    public function store(Request $request)
    {
        $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'user_id' => 'required|exists:users,id',
            'room_id' => 'required|exists:rooms,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        return $this->service->store($request->all());
    }

    public function destroy($id)
    {
        return $this->service->delete($id);
    }

    public function getReviewInWhatRoomTypeById($roomTypeId)
    {
        return $this->service->getReviewInWhatRoomTypeById($roomTypeId);
    }
}
