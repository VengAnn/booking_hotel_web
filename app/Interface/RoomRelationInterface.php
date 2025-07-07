<?php

namespace App\Interface;

interface RoomRelationInterface
{
    public function addRoomAmenities(int $roomId, array $amenityIds): void;
    public function updateRoomAmenities(int $roomId, array $amenityIds): void;
    public function addFacilities(int $roomId, array $facilityIds): void;
    public function updateFacilities(int $roomId, array $facilityIds): void;

    public function updateOrAddImages(int $roomId, array $imageUrls): void;
}
