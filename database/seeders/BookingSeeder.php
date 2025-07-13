<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        // Only include users with role = 'user'
        $users = User::where('user_role', 'user')->get();
        $rooms = Room::with('roomType')->get();

        if ($users->isEmpty() || $rooms->isEmpty()) {
            $this->command->warn("⚠️ Không có người dùng hoặc phòng nào được tìm thấy. Bỏ qua BookingSeeder.");
            return;
        }

        foreach ($users as $user) {
            $room = $rooms->random();

            $checkInDate = Carbon::today()->addDays(rand(1, 10));
            $nights = rand(1, 5);
            $checkOutDate = (clone $checkInDate)->addDays($nights);
            $price = $room->roomType->price_per_night ?? 500000;
            $total = $price * $nights;

            Booking::create([
                'user_id'         => $user->id,
                'room_id'         => $room->id,
                'check_in_date'   => $checkInDate,
                'check_out_date'  => $checkOutDate,
                'price_per_night' => $price,
                'total'           => $total,
                'status'          => 'booked',
            ]);
        }

        $this->command->info("✅ BookingSeeder đã tạo dữ liệu đặt phòng cho {$users->count()} người dùng.");
    }
}
