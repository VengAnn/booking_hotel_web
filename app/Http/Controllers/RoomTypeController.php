<?php

namespace App\Http\Controllers;

use App\Services\RoomTypeService;
use Illuminate\Http\Request;

class RoomTypeController
{
    protected $service;

    public function __construct(RoomTypeService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return $this->service->all();
    }

    public function show($id)
    {
        return $this->service->getRoomTypeById($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'price_per_night' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'adults_capacity' => 'required|integer|min:0',
            'children_capacity' => 'required|integer|min:0',
            'bed_count' => 'required|integer|min:1'
        ]);

        return $this->service->store($validated);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'price_per_night' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'adults_capacity' => 'required|integer|min:0',
            'children_capacity' => 'required|integer|min:0',
            'bed_count' => 'required|integer|min:1'
        ]);

        return $this->service->update($validated, $id);
    }

    public function destroy($id)
    {
        return $this->service->delete($id);
    }
}
