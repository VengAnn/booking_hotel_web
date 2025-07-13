<?php

namespace App\Repositories;

use App\Models\Room;
use App\Interface\RoomInterface;

class RoomRepo implements RoomInterface
{
    public function getAll()
    {
        return Room::with(['roomType', 'reviews', 'bookings' => function ($query) {
            $query->whereIn('status', ['booked', 'checked_in']);
        }])->get()->map(function ($room) {
            // If it has any active bookings, mark as in use
            if ($room->bookings->isNotEmpty()) {
                $room->status = 'in use';
            }

            return $room;
        });
    }


    public function findById($id)
    {
        return Room::with('roomType')->findOrFail($id);
    }

    public function create(array $data)
    {
        return Room::create($data);
    }

    public function update($id, array $data)
    {
        $room = Room::findOrFail($id);
        $room->update($data);
        return $room;
    }

    public function updateStatus($id, $status)
    {
        $room = Room::findOrFail($id);
        $room->update(['status' => $status]);
        return $room;
    }

    public function delete($id)
    {
        $room = Room::findOrFail($id);
        return $room->delete();
    }
}
