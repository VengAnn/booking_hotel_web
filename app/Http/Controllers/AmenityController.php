<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AmenityService;
use App\Helpers\FileHelper;

class AmenityController
{
    protected $amenityService;

    public function __construct(AmenityService $amenityService)
    {
        $this->amenityService = $amenityService;
    }

    public function index()
    {
        return $this->amenityService->getAll();
    }

    public function show($id)
    {
        return $this->amenityService->getById($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'img_file' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data = $request->only(['name']);
        $data['img_file'] = $request->file('img_file');
        return $this->amenityService->create($data);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|unique:amenities,name,' . $id,
            'img_file' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data = $request->only(['name']);
        if ($request->hasFile('img_file')) {
            $data['img_file'] = $request->file('img_file');
        }

        return $this->amenityService->update($id, $data);
    }

    public function destroy($id)
    {
        return $this->amenityService->delete($id);
    }
}
