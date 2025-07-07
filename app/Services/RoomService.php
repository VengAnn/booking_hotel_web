<?php

namespace App\Services;


use App\Interface\RoomInterface;
use App\Classes\ApiResClass as Res;
use Illuminate\Support\Facades\DB;

class RoomService
{
    protected $roomRepository;

    public function __construct(RoomInterface $roomRepository)
    {
        $this->roomRepository = $roomRepository;
    }

    public function getAllRooms()
    {
        try {
            $rooms = $this->roomRepository->getAll();
            return Res::sendResponse($rooms, "Room list fetched successfully");
        } catch (\Exception $e) {
            return Res::sendError("Failed to fetch rooms");
        }
    }

    public function createRoom($data)
    {
        DB::beginTransaction();
        try {
            $room = $this->roomRepository->create($data);
            DB::commit();
            return Res::sendResponse($room, "Room created successfully");
        } catch (\Exception $e) {
            return Res::rollback($e, "Failed to create room");
        }
    }

    public function updateRoom($id, $data)
    {
        DB::beginTransaction();
        try {
            $room = $this->roomRepository->update($id, $data);
            DB::commit();
            return Res::sendResponse($room, "Room updated successfully");
        } catch (\Exception $e) {
            return Res::rollback($e, "Failed to update room");
        }
    }

    public function updateRoomStatus($id, $status)
    {
        DB::beginTransaction();
        try {
            $room = $this->roomRepository->updateStatus($id, $status);
            DB::commit();
            return Res::sendResponse($room, "Room status updated successfully");
        } catch (\Exception $e) {
            return Res::rollback($e, "Failed to update room status");
        }
    }

    public function deleteRoom($id)
    {
        DB::beginTransaction();
        try {
            $this->roomRepository->delete($id);
            DB::commit();
            return Res::sendResponse([], "Room deleted successfully");
        } catch (\Exception $e) {
            return Res::rollback($e, "Failed to delete room");
        }
    }

    public function getRoomById($id)
    {
        try {
            $room = $this->roomRepository->findById($id);
            return Res::sendResponse($room, "Room details fetched successfully");
        } catch (\Exception $e) {
            return Res::sendError("Failed to fetch room details");
        }
    }
}
