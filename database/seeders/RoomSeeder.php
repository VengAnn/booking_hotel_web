<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Room;
use App\Models\RoomType;

class RoomSeeder extends Seeder
{
    public function run(): void
    {
        $roomTypes = RoomType::all();

        if ($roomTypes->isEmpty()) {
            $this->command->warn('⚠️ No RoomTypes found. Please run RoomTypeSeeder first.');
            return;
        }

        $statuses = [
            'available',
            // 'in use',
            // 'maintenance'
        ];

        // Loop through 4 floors
        for ($floor = 1; $floor <= 4; $floor++) {
            for ($i = 1; $i <= 7; $i++) {
                $roomNumber = $floor . str_pad($i, 2, '0', STR_PAD_LEFT); // e.g., 101, 102, ..., 407

                Room::create([
                    'room_number' => $roomNumber,
                    'room_type_id' => $roomTypes->random()->id,
                    'status' => $statuses[array_rand($statuses)],
                ]);
            }
        }
    }
}
