<?php

namespace App\Repositories;

use App\Models\Room;
use App\Interface\RoomInterface;

class RoomRepo implements RoomInterface
{
    public function getAll()
    {
        return Room::with(['images', 'roomType', 'amenities', 'facilities'])->get();
    }

    public function findById($id)
    {
        return Room::with(['roomType', 'amenities', 'facilities'])->findOrFail($id);
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
        $room = Room::with('images')->findOrFail($id);

        // Delete image files from storage
        foreach ($room->images as $image) {
            \App\Helpers\FileHelper::deleteImage($image->image_url);
        }
        return $room->delete();
    }
}
