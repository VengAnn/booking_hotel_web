<?php

namespace App\Http\Controllers;

use App\Services\RoomService;
use Illuminate\Http\Request;

class RoomController
{
    protected $roomService;

    public function __construct(RoomService $roomService)
    {
        $this->roomService = $roomService;
    }

    public function getAllRooms()
    {
        return $this->roomService->getAllRooms();
    }

    public function show($id)
    {
        return $this->roomService->getRoomById($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_number' => 'required|string|unique:rooms',
            'room_type_id' => 'required|exists:room_types,id',
            'status' => 'sometimes|in:available,in use,maintenance'
        ]);

        return $this->roomService->createRoom($validated);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'room_number' => 'sometimes|string|unique:rooms,room_number,' . $id,
            'room_type_id' => 'sometimes|exists:room_types,id',
            'status' => 'sometimes|in:available,in use,maintenance'
        ]);

        return $this->roomService->updateRoom($id, $validated);
    }

    public function updateStatus(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:rooms,id',
            'status' => 'required|in:available,in use,maintenance'
        ]);

        return $this->roomService->updateRoomStatus($validated['id'], $validated['status']);
    }

    public function destroy($id)
    {
        return $this->roomService->deleteRoom($id);
    }
}
