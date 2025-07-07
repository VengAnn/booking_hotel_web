<?php

namespace App\Services;

use App\Classes\ApiResClass as Res;
use App\Interface\RoomTypeInterface;
use Illuminate\Support\Facades\DB;

class RoomTypeService
{
    protected $repo;

    public function __construct(RoomTypeInterface $repo)
    {
        $this->repo = $repo;
    }

    public function all()
    {
        try {
            $data = $this->repo->all();
            return Res::sendResponse($data, 'Danh sách loại phòng');
        } catch (\Exception $e) {
            return Res::sendError($e->getMessage());
        }
    }

    public function store(array $data)
    {
        DB::beginTransaction();
        try {
            $type = $this->repo->store($data);
            DB::commit();
            return Res::sendResponse($type, 'Thêm loại phòng thành công');
        } catch (\Exception $e) {
            return Res::rollback($e, 'Lỗi khi thêm loại phòng');
        }
    }

    public function update(array $data, $id)
    {
        DB::beginTransaction();
        try {
            $type = $this->repo->update($data, $id);
            DB::commit();
            return Res::sendResponse($type, 'Cập nhật loại phòng thành công');
        } catch (\Exception $e) {
            return Res::rollback($e, 'Lỗi khi cập nhật loại phòng');
        }
    }

    public function delete($id)
    {
        DB::beginTransaction();
        try {
            $this->repo->delete($id);
            DB::commit();
            return Res::sendResponse([], 'Xoá loại phòng thành công');
        } catch (\Exception $e) {
            return Res::rollback($e, 'Lỗi khi xoá loại phòng');
        }
    }
}
