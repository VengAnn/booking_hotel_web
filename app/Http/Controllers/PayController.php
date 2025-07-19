<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PayService;

class PayController extends Controller
{
    protected PayService $payService;

    public function __construct(PayService $payService)
    {
        $this->payService = $payService;
    }

    /**
     * GET /api/payments
     */
    public function index()
    {
        return $this->payService->getAll();
    }

    /**
     * GET /api/payments/{id}
     */
    public function show($id)
    {
        return $this->payService->getById($id);
    }

    /**
     * POST /api/payments
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'amount'     => 'required|numeric|min:0',
            'paid_at'    => 'nullable|date',
            'method'     => 'required|in:cash,card,ABA,Wing,PiPay',
            'status'     => 'required|in:paid,pending,failed'
        ]);

        return $this->payService->create($data);
    }

    /**
     * PUT /api/payments/{id}
     */
    public function update(Request $request, $bookingId)
    {
        $data = $request->validate([
            'amount'  => 'nullable|numeric|min:0',
            'paid_at' => 'nullable|date',
            'method'  => 'nullable|in:cash,card,ABA,Wing,PiPay',
            'status'  => 'nullable|in:paid,pending,failed'
        ]);

        return $this->payService->update($bookingId, $data);
    }


    /**
     * DELETE /api/payments/{id}
     */
    public function destroy($id)
    {
        return $this->payService->delete($id);
    }
}
