<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Room;
use App\Models\User;
use App\Models\Payment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('user_role', 'user')->get();
        $rooms = Room::with('roomType')->get();

        if ($users->isEmpty() || $rooms->isEmpty()) {
            $this->command->warn("⚠️ No users or rooms found. Skipping BookingSeeder.");
            return;
        }

        foreach ($users as $user) {
            $room = $rooms->random();

            $checkInDate = Carbon::today()->addDays(rand(1, 10));
            $nights = rand(1, 5);
            $checkOutDate = (clone $checkInDate)->addDays($nights);
            $price = $room->roomType->price_per_night ?? 500000;
            $total = $price * $nights;

            // Create booking
            $booking = Booking::create([
                'user_id'         => $user->id,
                'room_id'         => $room->id,
                'check_in_date'   => $checkInDate,
                'check_out_date'  => $checkOutDate,
                'price_per_night' => $price,
                'total'           => $total,
                'status'          => 'booked',
            ]);

            // Create payment (unpaid - pending)
            Payment::create([
                'booking_id' => $booking->id,
                'amount'     => $total,
                'method'     => 'cash',
                'status'     => 'pending',
                'paid_at'    => null,
            ]);
        }

        $this->command->info("✅ BookingSeeder created bookings and pending payments for {$users->count()} users.");
    }
}
