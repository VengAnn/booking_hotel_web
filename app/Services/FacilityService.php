<?php

namespace App\Services;

use App\Interface\FacilityInterface;
use App\Classes\ApiResClass;
use Exception;
use Illuminate\Support\Facades\DB;

class FacilityService
{
    protected $repo;

    public function __construct(FacilityInterface $repo)
    {
        $this->repo = $repo;
    }

    public function getAll()
    {
        try {
            return ApiResClass::sendResponse($this->repo->getAll(), 'All facilities retrieved');
        } catch (Exception $e) {
            return ApiResClass::sendError('Failed to retrieve facilities' . $e->getMessage(), 500);
        }
    }

    public function getById($id)
    {
        try {
            return ApiResClass::sendResponse($this->repo->getById($id), 'Facility found');
        } catch (Exception $e) {
            return ApiResClass::sendError('Facility not found', 404);
        }
    }

    public function create($data)
    {
        DB::beginTransaction();
        try {
            $result = $this->repo->create($data);
            DB::commit();
            return ApiResClass::sendResponse($result, 'Facility created');
        } catch (Exception $e) {
            return ApiResClass::rollback($e, 'Facility creation failed');
        }
    }

    public function update($id, $data)
    {
        DB::beginTransaction();
        try {
            $result = $this->repo->update($id, $data);
            DB::commit();
            return ApiResClass::sendResponse($result, 'Facility updated');
        } catch (Exception $e) {
            return ApiResClass::rollback($e, 'Facility update failed');
        }
    }

    public function delete($id)
    {
        DB::beginTransaction();
        try {
            $this->repo->delete($id);
            DB::commit();
            return ApiResClass::sendResponse(null, 'Facility deleted');
        } catch (Exception $e) {
            return ApiResClass::rollback($e, 'Facility deletion failed');
        }
    }
}
