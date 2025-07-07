<?php

namespace App\Services;

use App\Helpers\FileHelper;
use App\Classes\ApiResClass as Res;
use App\Interface\SlideInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Exception;

class SlideService
{
    protected $repo;

    public function __construct(SlideInterface $repo)
    {
        $this->repo = $repo;
    }

    public function all()
    {
        return Res::sendResponse($this->repo->all(), 'Slide list');
    }

    public function create(array $data)
    {
        DB::beginTransaction();
        try {
            $imgUrl = null;

            if (isset($data['img_file']) && $data['img_file'] instanceof UploadedFile) {
                $imgUrl = FileHelper::storeImage($data['img_file'], 'slides');
            }

            $result = $this->repo->store($imgUrl);
            DB::commit();
            return Res::sendResponse($result, 'Slide created');
        } catch (Exception $e) {
            return Res::rollback($e, 'Slide creation failed');
        }
    }

    public function update($id, array $data)
    {
        DB::beginTransaction();
        try {
            $slide = $this->repo->all()->firstWhere('id', $id);
            if (!$slide) {
                throw new Exception('Slide not found');
            }

            $imgUrl = $slide->img_url;

            if (isset($data['img_file']) && $data['img_file'] instanceof UploadedFile) {
                $imgUrl = FileHelper::storeImage($data['img_file'], 'slides', $imgUrl);
            }

            $result = $this->repo->update($imgUrl, $id);
            DB::commit();
            return Res::sendResponse($result, 'Slide updated');
        } catch (Exception $e) {
            return Res::rollback($e, 'Slide update failed');
        }
    }

    public function delete($id)
    {
        DB::beginTransaction();
        try {
            $slide =  $this->repo->destroy($id);

            if ($slide->img_url) {
                FileHelper::deleteImage($slide->img_url);
            }
            DB::commit();
            return Res::sendResponse(null, 'Slide deleted');
        } catch (Exception $e) {
            return Res::rollback($e, 'Slide deletion failed');
        }
    }

    public function reorder(array $orderedIds)
    {
        DB::beginTransaction();
        try {
            $result = $this->repo->reorder($orderedIds);
            DB::commit();
            return Res::sendResponse($result, 'Slides reordered');
        } catch (Exception $e) {
            return Res::rollback($e, 'Slide reorder failed');
        }
    }
}
