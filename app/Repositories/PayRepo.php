<?php

namespace App\Repositories;

use App\Models\Payment;
use App\Interface\PayInterface;

class PayRepo implements PayInterface
{
    public function getAll()
    {
        return Payment::all();
    }

    public function getById($id)
    {
        return Payment::findOrFail($id);
    }

    public function create(array $data)
    {
        return Payment::create($data);
    }

    public function update($bookingId, array $data)
    {
        $payment = Payment::where('booking_id', $bookingId)->firstOrFail();
        $payment->update($data);
        return $payment;
    }

    public function delete($id)
    {
        $payment = Payment::findOrFail($id);
        return $payment->delete();
    }
}
