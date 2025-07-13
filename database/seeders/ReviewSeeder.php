<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Review;
use App\Models\User;
use App\Models\Room;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('user_role', 'user')->inRandomOrder()->take(5)->get();
        $rooms = Room::all();

        foreach ($rooms as $room) {
            foreach ($users as $user) {
                Review::create([
                    'user_id'  => $user->id,
                    'room_id'  => $room->id,
                    'rating'   => rand(3, 5),
                    'comment'  => fake()->sentence(10),
                ]);
            }
        }
    }
}
