<?php

namespace App\Repositories;

use App\Interface\BookingInterface;
use App\Models\Booking;

class BookingRepo implements BookingInterface
{
    public function getAll()
    {
        return Booking::with(['user', 'room'])->latest()->get();
    }

    public function findById($id)
    {
        return Booking::with(['user', 'room'])->findOrFail($id);
    }

    public function create(array $data)
    {
        return Booking::create($data);
    }

    public function update($id, array $data)
    {
        $booking = Booking::findOrFail($id);
        $booking->update($data);
        return $booking;
    }

    public function delete($id)
    {
        return Booking::destroy($id);
    }
}
