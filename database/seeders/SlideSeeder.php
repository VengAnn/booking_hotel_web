<?php

namespace Database\Seeders;

use App\Models\Slide;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class SlideSeeder extends Seeder
{
    public function run(): void
    {
        // Delete existing slide images and records
        Storage::disk('public')->deleteDirectory('slides');
        Slide::truncate();

        // Prepare image file names from public/assets/images/
        $sourceImages = [
            public_path('assets/images/slide_hotel_1.png'),
            public_path('assets/images/slide_hotel_2.png'),
            public_path('assets/images/slide_hotel_3.png'),
        ];

        foreach ($sourceImages as $index => $sourcePath) {
            if (file_exists($sourcePath)) {
                // Generate unique filename
                $filename = 'slide_' . ($index + 1) . '_' . Str::random(8) . '.png';
                $destination = 'slides/' . $filename;

                // Copy to storage/app/public/slides
                Storage::disk('public')->put($destination, file_get_contents($sourcePath));

                // Save record in DB
                Slide::create([
                    'img_url' => $destination,
                    'order'   => $index + 1,
                ]);
            }
        }

        $this->command->info("✅ SlideSeeder inserted 3 slides and copied images.");
    }
}
