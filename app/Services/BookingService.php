<?php

namespace App\Services;

use App\Classes\ApiResClass as Res;
use App\Interface\BookingInterface;
use Exception;

class BookingService
{
    protected $repo;

    public function __construct(BookingInterface $repo)
    {
        $this->repo = $repo;
    }

    public function getAll()
    {
        try {
            return Res::sendResponse($this->repo->getAll(), 'Danh sách đặt phòng');
        } catch (Exception $e) {
            return Res::rollback($e, 'Không thể tải danh sách đặt phòng');
        }
    }

    public function findById($id)
    {
        try {
            return Res::sendResponse($this->repo->findById($id), 'Chi tiết đặt phòng');
        } catch (Exception $e) {
            return Res::rollback($e, 'Không tìm thấy đặt phòng');
        }
    }

    public function create(array $data)
    {
        try {
            return Res::sendResponse($this->repo->create($data), 'Đặt phòng thành công');
        } catch (Exception $e) {
            return Res::rollback($e, 'Lỗi khi tạo đặt phòng');
        }
    }

    public function update($id, array $data)
    {
        try {
            return Res::sendResponse($this->repo->update($id, $data), 'Cập nhật đặt phòng thành công');
        } catch (Exception $e) {
            return Res::rollback($e, 'Không thể cập nhật đặt phòng');
        }
    }

    public function delete($id)
    {
        try {
            return Res::sendResponse($this->repo->delete($id), 'Xóa đặt phòng thành công');
        } catch (Exception $e) {
            return Res::rollback($e, 'Không thể xóa đặt phòng');
        }
    }
}
