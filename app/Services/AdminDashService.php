<?php

namespace App\Services;

use App\Classes\ApiResClass as Res;
use App\Repositories\AdminDashRepo;
use App\Interface\AdminDashInterface;

class AdminDashService implements AdminDashInterface
{
    protected $repo;

    public function __construct(AdminDashRepo $repo)
    {
        $this->repo = $repo;
    }

    public function getDashboardSummary()
    {
        try {
            $data = [
                'room_types'          => $this->repo->getAllRoomType(),
                'rooms'               => $this->repo->getAllRoom(),
                'available_rooms'     => $this->repo->totalRoomAvailable(),
                'average_rating'      => $this->repo->averageOfHotel(),
                'total_customers'     => $this->repo->totalCustomer(),
                'feedback_count'      => $this->repo->totalFeedBack(),
                'today_bookings'      => $this->repo->todayRoomBook(),
                'today_cancellations' => $this->repo->todayRoomCancel(),
                'total_revenue'       => $this->repo->totalRevenue(),
                'today_revenue'       => $this->repo->todayRevenue(),
            ];

            return Res::sendResponse($data, "Thống kê dashboard thành công");
        } catch (\Exception $e) {
            return Res::sendError("Lỗi khi lấy dữ liệu thống kê: " . $e->getMessage(), 500);
        }
    }

    public function totalRoomIsBooked($roomId, $checkInDate, $checkOutDate)
    {
        try {
            $total = $this->repo->totalRoomIsBooked($roomId, $checkInDate, $checkOutDate);
            return Res::sendResponse($total, "Thống kê phòng thành công");
        } catch (\Exception $e) {
            return Res::sendError("Lỗi khi thống kê phòng: " . $e->getMessage(), 500);
        }
    }

    // Optional: if interface requires these
    public function getAllRoomType()
    {
        return $this->repo->getAllRoomType();
    }
    public function getAllRoom()
    {
        return $this->repo->getAllRoom();
    }

    public function totalRoomAvailable()
    {
        return $this->repo->totalRoomAvailable();
    }
    public function averageOfHotel()
    {
        return $this->repo->averageOfHotel();
    }
    public function totalCustomer()
    {
        return $this->repo->totalCustomer();
    }
    public function totalFeedBack()
    {
        return $this->repo->totalFeedBack();
    }
    public function todayRoomCancel()
    {
        return $this->repo->todayRoomCancel();
    }
    public function todayRoomBook()
    {
        return $this->repo->todayRoomBook();
    }
    public function totalRevenue()
    {
        return $this->repo->totalRevenue();
    }
    public function todayRevenue()
    {
        return $this->repo->todayRevenue();
    }
}
