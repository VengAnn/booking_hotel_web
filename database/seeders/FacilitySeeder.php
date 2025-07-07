<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Facility;

class FacilitySeeder extends Seeder
{
    public function run(): void
    {
        Facility::insert([
            [
                'name' => 'Bể bơi',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Phòng gym',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bãi đỗ xe',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
