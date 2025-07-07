<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Amenity;

class AmenitySeeder extends Seeder
{
    public function run(): void
    {
        Amenity::insert([
            [
                'name' => 'Máy lạnh',
                'img_url' => 'assets/images/amenities/air-conditioner.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Máy sưởi',
                'img_url' => 'assets/images/amenities/heater.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Smart TV',
                'img_url' => 'assets/images/amenities/smart-tv.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Spa',
                'img_url' => 'assets/images/amenities/spa.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Nước sạch',
                'img_url' => 'assets/images/amenities/water-quality.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Wi-Fi miễn phí',
                'img_url' => 'assets/images/amenities/wifi.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
