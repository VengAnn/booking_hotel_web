<?php

namespace App\Http\Controllers;

use App\Services\SlideService;
use Illuminate\Http\Request;

class SlideController
{
    protected $slideService;

    public function __construct(SlideService $slideService)
    {
        $this->slideService = $slideService;
    }

    // Get all slides
    public function index()
    {
        return $this->slideService->all();
    }

    // Store new slide
    public function store(Request $request)
    {
        $request->validate([
            'img_file' => 'required|image|mimes:jpg,jpeg,png,webp|max:4048',
        ]);

        $data = ['img_file' => $request->file('img_file')];
        return $this->slideService->create($data);
    }

    // Update slide image
    public function update(Request $request, $id)
    {
        $request->validate([
            'img_file' => 'required|image|mimes:jpg,jpeg,png,webp|max:4048',
        ]);

        $data = ['img_file' => $request->file('img_file')];
        return $this->slideService->update($id, $data);
    }

    // Delete slide
    public function destroy($id)
    {
        return $this->slideService->delete($id);
    }

    // Reorder slides
    public function reorder(Request $request)
    {
        $request->validate([
            'ordered_ids' => 'required|array',
        ]);

        return $this->slideService->reorder($request->ordered_ids);
    }
}
