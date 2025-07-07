<?php

namespace App\Repositories;

use App\Interface\RoomRelationInterface;
use App\Models\Room;
use App\Models\RoomImage;
use App\Helpers\FileHelper;
use Illuminate\Http\UploadedFile;

class RoomRelationRepository implements RoomRelationInterface
{
    public function addRoomAmenities(int $roomId, array $amenityIds): void
    {
        $room = Room::findOrFail($roomId);
        // $room->amenities()->attach($amenityIds);
        $room->amenities()->syncWithoutDetaching($amenityIds);
    }

    public function updateRoomAmenities(int $roomId, array $amenityIds): void
    {
        $room = Room::findOrFail($roomId);
        $room->amenities()->sync($amenityIds);
    }

    public function addFacilities(int $roomId, array $facilityIds): void
    {
        $room = Room::findOrFail($roomId);
        $room->facilities()->attach($facilityIds);
    }

    public function updateFacilities(int $roomId, array $facilityIds): void
    {
        $room = Room::findOrFail($roomId);
        $room->facilities()->sync($facilityIds);
    }

    public function updateOrAddImages(int $roomId, array $imageFiles): void
    {
        $room = Room::findOrFail($roomId);

        // 1. Delete existing image files from disk
        foreach ($room->images as $img) {
            FileHelper::deleteImage($img->image_url);
            $img->delete(); // delete DB row
        }

        // 2. Save new files
        foreach ($imageFiles as $file) {
            if ($file instanceof UploadedFile) {
                $path = FileHelper::storeImage($file, 'room_images');
                $room->images()->create(['image_url' => $path]);
            }
        }
    }
}
