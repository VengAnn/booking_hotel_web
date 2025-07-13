<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use App\Models\Amenity;
use App\Helpers\FileHelper;

class AmenitySeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['name' => 'Máy lạnh', 'file' => 'air-conditioner.png'],
            ['name' => 'Máy sưởi', 'file' => 'heater.png'],
            ['name' => 'Smart TV', 'file' => 'smart-tv.png'],
            ['name' => 'Spa', 'file' => 'spa.png'],
            ['name' => 'Nước sạch', 'file' => 'water-quality.png'],
            ['name' => 'Wi-Fi miễn phí', 'file' => 'wifi.png'],
        ];

        foreach ($items as $item) {
            $path = public_path("assets/images/amenities/{$item['file']}");

            if (file_exists($path)) {
                $uploadedFile = new UploadedFile($path, $item['file'], null, null, true);
                $storedPath = FileHelper::storeImage($uploadedFile, 'amenities');

                Amenity::create([
                    'name' => $item['name'],
                    'img_url' => $storedPath,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
