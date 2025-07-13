<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;


class FeedbackSeeder extends Seeder
{
    //php artisan db:seed --class=FeedbackSeeder
    public function run(): void
    {
        DB::table('feedback')->insert([
            [
                'name' => 'Nguyễn Văn A',
                'email' => 'vana@example.com',
                'message' => 'Khách sạn rất tuyệt vời, tôi sẽ quay lại lần sau!',
                'is_read' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Trần Thị B',
                'email' => 'thib@example.com',
                'message' => 'Nhân viên phục vụ nhiệt tình, phòng ốc sạch sẽ.',
                'is_read' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Lê Văn C',
                'email' => 'vanc@example.com',
                'message' => 'Cần cải thiện wifi và điều hòa.',
                'is_read' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
