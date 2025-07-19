<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     * php artisan db:seed

     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            AmenitySeeder::class,
            FacilitySeeder::class,
            RoomTypeSeeder::class,
            RoomSeeder::class,
            BookingSeeder::class,
            FeedbackSeeder::class,
            ReviewSeeder::class,
            SlideSeeder::class,
        ]);
    }
}
