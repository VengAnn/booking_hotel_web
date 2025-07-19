<?php

namespace App\Interface;

interface AdminDashInterface
{
    public function getAllRoomType();
    public function getAllRoom();
    public function totalRoomIsBooked($roomId, $checkInDate, $checkOutDate);
    public function totalRoomAvailable();
    public function averageOfHotel();
    public function totalCustomer();
    public function totalFeedBack();
    public function todayRoomCancel();
    public function todayRoomBook();
    public function totalRevenue();
    public function todayRevenue();
}
