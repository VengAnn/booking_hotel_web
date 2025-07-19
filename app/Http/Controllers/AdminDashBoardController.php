<?php

namespace App\Http\Controllers;

use App\Services\AdminDashService;
use Illuminate\Http\Request;

class AdminDashBoardController
{
    protected $service;

    public function __construct(AdminDashService $service)
    {
        $this->service = $service;
    }

    /**
     * GET /api/admin/dashboard/summary
     */
    public function dashboardSummary()
    {
        return $this->service->getDashboardSummary();
    }

    /**
     * GET /api/admin/dashboard/room-booked
     * Params: room_id, check_in_date, check_out_date
     */
    public function totalRoomIsBooked(Request $request)
    {
        $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'check_in_date' => 'required|date',
            'check_out_date' => 'required|date|after_or_equal:check_in_date',
        ]);

        return $this->service->totalRoomIsBooked(
            $request->room_id,
            $request->check_in_date,
            $request->check_out_date
        );
    }
}
