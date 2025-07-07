<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\FacilityService;

class FacilityController
{
    protected $facilityService;

    public function __construct(FacilityService $facilityService)
    {
        $this->facilityService = $facilityService;
    }

    public function index()
    {
        return $this->facilityService->getAll();
    }

    public function show($id)
    {
        return $this->facilityService->getById($id);
    }

    public function store(Request $request)
    {
        $data = $request->only(['name', 'img_url']);
        return $this->facilityService->create($data);
    }

    public function update(Request $request, $id)
    {
        $data = $request->only(['name', 'img_url']);
        return $this->facilityService->update($id, $data);
    }

    public function destroy($id)
    {
        return $this->facilityService->delete($id);
    }
}
