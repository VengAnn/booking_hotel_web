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

    public function getBookingsByUserId($userId)
    {
        try {
            return Res::sendResponse($this->repo->getBookingsByUserId($userId), 'Danh sách đặt phòng');
        } catch (Exception $e) {
            return Res::rollback($e, 'Không thể tài danh sách đặt phòng');
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

    public function areRoomsAvailable($roomIds, string $checkInDate, string $checkOutDate)
    {
        try {
            $result = $this->repo->areRoomsAvailable($roomIds, $checkInDate, $checkOutDate);

            return Res::sendResponse($result, 'Kiếm tra phòng thanh cong');
        } catch (Exception $e) {
            return Res::rollback($e, 'Không thể tìm kiếm phòng.');
        }
    }

    public function cancelBooking(int $id)
    {
        try {
            $cancel = $this->repo->cancelBooking($id);

            return Res::sendResponse($cancel, 'Hủy đơn đặt phòng thanh cong');
        } catch (Exception $e) {
            return Res::rollback($e, 'Không thể hủy đơn đặt phòng');
        }
    }

    public function updateBookingStatus($id, $status)
    {
        try {
            $cancel = $this->repo->updateBookingStatus($id, $status);

            return Res::sendResponse($cancel, 'Cap nhat trang thai thanh cong');
        } catch (Exception $e) {
            return Res::rollback($e, 'Không thể cap nhat trang thai');
        }
    }
}
