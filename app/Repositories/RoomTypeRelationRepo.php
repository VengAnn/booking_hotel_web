<?php

namespace App\Repositories;

use App\Interface\RoomTypeRelationInterface;
use App\Models\RoomType;
use App\Helpers\FileHelper;
use Illuminate\Http\UploadedFile;

class RoomTypeRelationRepo implements RoomTypeRelationInterface
{
    public function addAmenities(int $typeId, array $amenityIds): void
    {
        $type = RoomType::findOrFail($typeId);
        $type->amenities()->syncWithoutDetaching($amenityIds);
    }

    public function updateAmenities(int $typeId, array $amenityIds): void
    {
        $type = RoomType::findOrFail($typeId);
        $type->amenities()->sync($amenityIds);
    }

    public function addFacilities(int $typeId, array $facilityIds): void
    {
        $type = RoomType::findOrFail($typeId);
        $type->facilities()->syncWithoutDetaching($facilityIds);
    }

    public function updateFacilities(int $typeId, array $facilityIds): void
    {
        $type = RoomType::findOrFail($typeId);
        $type->facilities()->sync($facilityIds);
    }

    public function updateOrAddImages(int $typeId, array $imageFiles): array
    {
        $type = RoomType::findOrFail($typeId);

        // Delete old images
        foreach ($type->images as $img) {
            FileHelper::deleteImage($img->img_url);
            $img->delete();
        }

        $storedImages = [];

        // Store new images
        foreach ($imageFiles as $file) {
            if ($file instanceof UploadedFile) {
                $path = FileHelper::storeImage($file, 'room_type_images');
                $newImage = $type->images()->create(['img_url' => $path]);
                $storedImages[] = $newImage;
            }
        }

        return $storedImages;
    }
}
