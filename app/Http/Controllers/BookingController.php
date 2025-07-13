<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\BookingService;

class BookingController
{
    protected $service;

    public function __construct(BookingService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return $this->service->getAll();
    }

    public function getBookingsByUserId(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id'
        ]);

        return $this->service->getBookingsByUserId($request->user_id);
    }

    public function show($id)
    {
        return $this->service->findById($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id'       => 'required|exists:users,id',
            'room_id'       => 'required|exists:rooms,id',
            'check_in_date' => 'required|date|after_or_equal:today',
            'check_out_date' => 'required|date|after:check_in_date',
            'status'        => 'in:booked,checked_in,completed,cancelled',
            'price_per_night' => 'required|numeric|min:0',
            'total' => 'required|numeric|min:0'
        ]);

        return $this->service->create($validated);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'user_id'       => 'sometimes|exists:users,id',
            'room_id'       => 'sometimes|exists:rooms,id',
            'check_in_date' => 'sometimes|date|after_or_equal:today',
            'check_out_date' => 'sometimes|date|after:check_in_date',
            'status'        => 'sometimes|in:booked,checked_in,completed,cancelled'
        ]);

        return $this->service->update($id, $validated);
    }

    public function destroy($id)
    {
        return $this->service->delete($id);
    }

    public function checkRoomsAvailability(Request $request)
    {
        $request->validate([
            'room_ids' => 'required|array',
            'room_ids.*' => 'exists:rooms,id',
            'check_in_date' => 'required|date|after_or_equal:today',
            'check_out_date' => 'required|date|after:check_in_date'
        ]);

        return $this->service->areRoomsAvailable($request->room_ids, $request->check_in_date, $request->check_out_date);
    }

    public function cancel($id)
    {
        return $this->service->cancelBooking($id);
    }

    public function updateBookingStatus(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:bookings,id',
            'status' => 'required|in:booked,checked_in,completed,cancelled'
        ]);

        return $this->service->updateBookingStatus($request->id, $request->status);
    }
}
