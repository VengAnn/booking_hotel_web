<?php

namespace App\Repositories;

use App\Interface\BookingInterface;
use App\Models\Booking;
use Illuminate\Support\Facades\DB;

class BookingRepo implements BookingInterface
{
    public function getAll()
    {
        return Booking::with(['user', 'room', 'room.roomType', 'payment'])->latest()->get();
    }

    public function getBookingsByUserId($userId)
    {
        return Booking::with(['user', 'room', 'room.roomType', 'payment'])->where('user_id', $userId)->latest()->get();
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


    public function areRoomsAvailable(array $roomIds, string $checkInDate, string $checkOutDate): array
    {
        // Step 1: Get room statuses
        $roomStatuses = DB::table('rooms')
            ->whereIn('id', $roomIds)
            ->pluck('status', 'id') // [roomId => status]
            ->toArray();

        // Step 2: Get rooms that are booked in the selected range
        $bookedRoomIds = DB::table('bookings')
            ->whereIn('room_id', $roomIds)
            ->where('status', '!=', 'cancelled')
            ->where(function ($query) use ($checkInDate, $checkOutDate) {
                $query->whereBetween('check_in_date', [$checkInDate, $checkOutDate])
                    ->orWhereBetween('check_out_date', [$checkInDate, $checkOutDate])
                    ->orWhere(function ($q) use ($checkInDate, $checkOutDate) {
                        $q->where('check_in_date', '<=', $checkInDate)
                            ->where('check_out_date', '>=', $checkOutDate);
                    });
            })
            ->pluck('room_id')
            ->toArray();

        // Step 3: Build result with status values
        $result = [];

        foreach ($roomIds as $roomId) {
            $originalStatus = $roomStatuses[$roomId] ?? 'available';

            if ($originalStatus === 'maintenance') {
                $result[$roomId] = 'maintenance';
            } elseif (in_array($roomId, $bookedRoomIds)) {
                $result[$roomId] = 'in use';
            } else {
                $result[$roomId] = 'available';
            }
        }

        return $result; // [roomId => 'available' | 'in use' | 'maintenance']
    }

    public function cancelBooking(int $id): bool
    {
        $booking = Booking::find($id);

        if (!$booking || $booking->status !== 'booked') {
            return false;
        }

        $booking->status = 'cancelled';
        return $booking->save();
    }

    public function updateBookingStatus($id, $status): bool
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return false;
        }
        $booking->status = $status;
        return $booking->save();
    }
}
