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

        $comments = [
            'Phòng rất sạch sẽ và thoáng mát.',
            'Dịch vụ tốt, nhân viên thân thiện.',
            'Tôi rất hài lòng với kỳ nghỉ tại đây.',
            'Giá cả hợp lý, sẽ quay lại lần sau.',
            'Phòng đẹp, đầy đủ tiện nghi.',
            'Rất thích không gian và cách phục vụ.',
            'Tuyệt vời, không có gì để chê.',
            'Chất lượng dịch vụ tốt hơn mong đợi.',
            'Phòng hơi nhỏ nhưng sạch sẽ.',
            'Vị trí thuận tiện, gần trung tâm.'
        ];

        foreach ($rooms as $room) {
            foreach ($users as $user) {
                Review::create([
                    'user_id'  => $user->id,
                    'room_id'  => $room->id,
                    'rating'   => rand(3, 5),
                    'comment'  => $comments[array_rand($comments)],
                ]);
            }
        }
    }
}
