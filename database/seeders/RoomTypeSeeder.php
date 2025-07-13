<?php

namespace Database\Seeders;

use App\Helpers\FileHelper;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\RoomType;
use App\Models\Amenity;
use App\Models\Facility;
use Illuminate\Http\UploadedFile;

class RoomTypeSeeder extends Seeder
{
    public function run(): void
    {
        // meaning of this
        $amenities = Amenity::pluck('id')->toArray();
        $facilities = Facility::pluck('id')->toArray();

        $roomTypes = [
            [
                'name' => 'Standard Room',
                'capacity' => 3,
                'price_per_night' => 1100000,
                'adults_capacity' => 2,
                'children_capacity' => 1,
                'bed_count' => 1,
                'description' => 'Phòng tiêu chuẩn với diện tích vừa đủ, phù hợp cho khách cá nhân hoặc cặp đôi.',
                'folder' => 'Deluxe_Double',
            ],
            [
                'name' => 'Phòng Đôi Cao Cấp',
                'capacity' => 4,
                'price_per_night' => 1400000,
                'adults_capacity' => 2,
                'children_capacity' => 2,
                'bed_count' => 1,
                'description' => 'Phòng rộng rãi với giường đôi lớn, thiết kế hiện đại pha nét truyền thống.',
                'folder' => 'Superior_Double',
            ],
            [
                'name' => 'Phòng Gia Đình',
                'capacity' => 5,
                'price_per_night' => 800000,
                'adults_capacity' => 3,
                'children_capacity' => 2,
                'bed_count' => 2,
                'description' => 'Phòng rộng nhất, bố trí 2 giường đôi hoặc giường đôi + giường đơn, thích hợp cho gia đình.',
                'folder' => 'Superior_Twin',
            ],
        ];

        foreach ($roomTypes as $data) {
            $roomType = RoomType::create([
                'name' => $data['name'],
                'capacity' => $data['capacity'],
                'price_per_night' => $data['price_per_night'],
                'description' => $data['description'],
                'adults_capacity' => $data['adults_capacity'],
                'children_capacity' => $data['children_capacity'],
                'bed_count' => $data['bed_count'],
            ]);

            // Attach up to 4 random amenities/facilities
            $roomType->amenities()->attach(array_rand(array_flip($amenities), min(4, count($amenities))));
            $roomType->facilities()->attach(array_rand(array_flip($facilities), min(4, count($facilities))));

            // ✅ Copy 4 images using FileHelper
            for ($i = 1; $i <= 4; $i++) {
                $filename = "{$data['folder']}_{$i}.avif";
                $sourcePath = public_path("assets/images/{$filename}");

                if (File::exists($sourcePath)) {
                    // Convert to UploadedFile
                    $file = new UploadedFile(
                        $sourcePath,
                        $filename,
                        'image/avif',
                        null,
                        true // Mark as test file (skip file validation)
                    );

                    $storedPath = FileHelper::storeImage($file, 'room_type_images');

                    $roomType->images()->create([
                        'img_url' => $storedPath
                    ]);
                }
            }
        }
    }
}
