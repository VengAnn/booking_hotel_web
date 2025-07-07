<?php

namespace App\Services;

use App\Interface\AmenityInterface;
use App\Classes\ApiResClass as Res;
use Exception;
use Illuminate\Support\Facades\DB;
use App\Helpers\FileHelper;


class AmenityService
{
    protected $repo;

    public function __construct(AmenityInterface $repo)
    {
        $this->repo = $repo;
    }

    public function getAll()
    {
        try {
            return Res::sendResponse($this->repo->getAll(), 'All amenities retrieved');
        } catch (Exception $e) {
            return Res::sendError('Failed to fetch amenities');
        }
    }

    public function getById($id)
    {
        try {
            return Res::sendResponse($this->repo->getById($id), 'Amenity found');
        } catch (Exception $e) {
            return Res::sendError('Amenity not found', 404);
        }
    }

    public function create($data)
    {
        DB::beginTransaction();
        try {
            if (isset($data['img_file']) && $data['img_file'] instanceof \Illuminate\Http\UploadedFile) {
                $data['img_url'] = FileHelper::storeImage($data['img_file'], 'amenities');
            }

            $result = $this->repo->create($data);
            DB::commit();
            return Res::sendResponse($result, 'Amenity created');
        } catch (Exception $e) {
            return Res::rollback($e, 'Amenity creation failed');
        }
    }

    public function update($id, $data)
    {
        DB::beginTransaction();
        try {
            $amenity = $this->repo->getById($id);

            if (isset($data['img_file']) && $data['img_file'] instanceof \Illuminate\Http\UploadedFile) {
                $oldPath = $amenity->img_url ?? null;
                $data['img_url'] = FileHelper::storeImage($data['img_file'], 'amenities', $oldPath);
            }

            unset($data['img_file']); // Clean up unused field
            $result = $this->repo->update($id, $data);

            DB::commit();
            return Res::sendResponse($result, 'Amenity updated');
        } catch (Exception $e) {
            return Res::rollback($e, 'Amenity update failed');
        }
    }


    public function delete($id)
    {
        DB::beginTransaction();
        try {
            $amenity = $this->repo->delete($id);
            if ($amenity->img_url) {
                FileHelper::deleteImage($amenity->img_url);
            }

            DB::commit();
            return Res::sendResponse(null, 'Amenity deleted');
        } catch (Exception $e) {
            return Res::rollback($e, 'Amenity deletion failed');
        }
    }
}
