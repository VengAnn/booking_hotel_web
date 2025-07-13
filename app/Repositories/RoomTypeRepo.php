<?php

namespace App\Repositories;

use App\Helpers\FileHelper;
use App\Interface\RoomTypeInterface;
use App\Models\RoomType;

class RoomTypeRepo implements RoomTypeInterface
{
    public function all()
    {
        return RoomType::with('rooms', 'amenities', 'facilities', 'images')->get();
    }

    public function getRoomTypeById($id)
    {
        return RoomType::with('rooms', 'amenities', 'facilities', 'images')->findOrFail($id);
    }

    public function store(array $data)
    {
        return RoomType::create($data);
    }

    public function update(array $data, $id)
    {
        $roomType = RoomType::findOrFail($id);
        $roomType->update($data);
        return $roomType;
    }

    public function delete($id)
    {
        $roomType = RoomType::with('images')->findOrFail($id);

        // Delete all related images
        foreach ($roomType->images as $image) {
            FileHelper::deleteImage($image->img_url);
            $image->delete();
        }

        // Delete the room type itself
        return $roomType->delete();
    }
}
