<?php

namespace App\Services;

use App\Interface\RoomTypeRelationInterface;
use App\Classes\ApiResClass as Res;
use Illuminate\Support\Facades\DB;
use Exception;

class RoomTypeRelationService
{
    protected RoomTypeRelationInterface $relationRepo;

    public function __construct(RoomTypeRelationInterface $relationRepo)
    {
        $this->relationRepo = $relationRepo;
    }

    public function addRoomAmenities(int $roomId, array $amenityIds)
    {
        try {
            DB::beginTransaction();
            $this->relationRepo->addAmenities($roomId, $amenityIds);
            DB::commit();
            return Res::sendResponse(null, 'Thêm tiện nghi thành công');
        } catch (Exception $e) {
            return Res::rollback($e, 'Thêm tiện nghi thất bại');
        }
    }

    public function updateRoomAmenities(int $roomId, array $amenityIds)
    {
        try {
            DB::beginTransaction();
            $this->relationRepo->updateAmenities($roomId, $amenityIds);
            DB::commit();
            return Res::sendResponse(null, 'Cập nhật tiện nghi thành công');
        } catch (Exception $e) {
            return Res::rollback($e, 'Cập nhật tiện nghi thất bại');
        }
    }

    public function addFacilities(int $roomId, array $facilityIds)
    {
        try {
            DB::beginTransaction();
            $this->relationRepo->addFacilities($roomId, $facilityIds);
            DB::commit();
            return Res::sendResponse(null, 'Thêm cơ sở vật chất thành công');
        } catch (Exception $e) {
            return Res::rollback($e, 'Thêm cơ sở vật chất thất bại');
        }
    }

    public function updateFacilities(int $roomId, array $facilityIds)
    {
        try {
            DB::beginTransaction();
            $this->relationRepo->updateFacilities($roomId, $facilityIds);
            DB::commit();
            return Res::sendResponse(null, 'Cập nhật cơ sở vật chất thành công');
        } catch (Exception $e) {
            return Res::rollback($e, 'Cập nhật cơ sở vật chất thất bại');
        }
    }

    public function updateOrAddImages(int $roomId, array $imageFiles)
    {
        try {
            DB::beginTransaction();

            $images = $this->relationRepo->updateOrAddImages($roomId, $imageFiles);
            DB::commit();
            return Res::sendResponse($images, 'Cập nhật hình ảnh thành công');
        } catch (Exception $e) {
            return Res::rollback($e, 'Cập nhật hình ảnh thất bại');
        }
    }
}
