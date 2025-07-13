<?php

namespace App\Services;

use App\Interface\ReviewInterface;
use App\Classes\ApiResClass as Res;

class ReviewService
{
    protected $repo;

    public function __construct(ReviewInterface $repo)
    {
        $this->repo = $repo;
    }

    public function getAll()
    {
        try {
            return Res::sendResponse($this->repo->getAll(), 'Danh sách đánh giá');
        } catch (\Exception $e) {
            return Res::sendError('Lỗi lấy đánh giá');
        }
    }

    public function getByRoom($roomId)
    {
        try {
            return Res::sendResponse($this->repo->getByRoom($roomId), 'Đánh giá theo phòng');
        } catch (\Exception $e) {
            return Res::sendError('Lỗi khi lấy đánh giá');
        }
    }

    public function store(array $data)
    {
        try {
            return Res::sendResponse($this->repo->store($data), 'Thêm đánh giá thành công');
        } catch (\Exception $e) {
            return Res::sendError('Không thể thêm đánh giá');
        }
    }

    public function delete(int $id)
    {
        try {
            return Res::sendResponse($this->repo->delete($id), 'Đã xóa đánh giá');
        } catch (\Exception $e) {
            return Res::sendError('Không thể xóa đánh giá');
        }
    }


    public function getReviewInWhatRoomTypeById($roomTypeId)
    {
        try {
            $data = $this->repo->getReviewInWhatRoomTypeById($roomTypeId);
            return Res::sendResponse($data, 'Lấy đánh giá theo loại phòng thành công!');
        } catch (\Exception $e) {
            return Res::rollback($e, 'Lấy đánh giá thất bại!');
        }
    }
}
