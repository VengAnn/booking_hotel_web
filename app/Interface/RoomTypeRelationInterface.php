<?php

namespace App\Interface;

interface RoomTypeRelationInterface
{
    // public function addRoomTypeAmenities(int $roomTypeId, array $amenityIds): void;
    // public function updateRoomTypeAmenities(int $roomTypeId, array $amenityIds): void;
    // public function addRoomTypeFacilities(int $roomTypeId, array $facilityIds): void;
    // public function updateRoomTypeFacilities(int $roomTypeId, array $facilityIds): void;
    // public function updateOrAddImages(int $roomTypeId, array $imageUrls): void;

    public function addAmenities(int $typeId, array $amenityIds): void;
    public function updateAmenities(int $typeId, array $amenityIds): void;

    public function addFacilities(int $typeId, array $facilityIds): void;
    public function updateFacilities(int $typeId, array $facilityIds): void;

    public function updateOrAddImages(int $typeId, array $imageFiles): array;
}
