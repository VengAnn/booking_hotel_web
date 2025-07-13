<?php

namespace App\Http\Controllers;

use App\Services\RoomTypeRelationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RoomRelationController
{
    protected RoomTypeRelationService $service;

    public function __construct(RoomTypeRelationService $service)
    {
        $this->service = $service;
    }

    public function addAmenities(Request $request, int $roomId)
    {
        $validated = $request->validate([
            'amenities' => 'required|array',
            'amenities.*' => 'integer|exists:amenities,id'
        ]);
        return $this->service->addRoomAmenities($roomId, $validated['amenities']);
    }

    public function updateAmenities(Request $request, int $roomId)
    {
        $validated = $request->validate([
            'amenities' => 'required|array',
            'amenities.*' => 'integer|exists:amenities,id'
        ]);
        return $this->service->updateRoomAmenities($roomId, $validated['amenities']);
    }

    public function addFacilities(Request $request, int $roomId)
    {
        $validated = $request->validate([
            'facilities' => 'required|array',
            'facilities.*' => 'integer|exists:facilities,id'
        ]);
        return $this->service->addFacilities($roomId, $validated['facilities']);
    }

    public function updateFacilities(Request $request, int $roomId)
    {
        $validated = $request->validate([
            'facilities' => 'required|array',
            'facilities.*' => 'integer|exists:facilities,id'
        ]);
        return $this->service->updateFacilities($roomId, $validated['facilities']);
    }


    public function updateOrAddImages(Request $request, int $roomId)
    {
        $images = $request->file('images', []);
        return $this->service->updateOrAddImages($roomId, $images);
    }
}
