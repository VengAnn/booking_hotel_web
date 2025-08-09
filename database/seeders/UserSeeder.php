<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $password = Hash::make('1234567');

        $records = [
            // Admin user
            [
                'username'    => 'admin',
                'email'       => 'admin@gmail.com',
                'phone'       => '0900000001',
                'password'    => $password,
                'user_role'   => 'admin',
            ],

            // Normal users
            [
                'username'  => 'sokha',
                'email'     => 'sokha@gmail.com',
                'phone'     => '0900000003',
                'password'  => $password,
                'user_role' => 'user',
            ],
            [
                'username'  => 'dara',
                'email'     => 'dara@gmail.com',
                'phone'     => '0900000004',
                'password'  => $password,
                'user_role' => 'user',
            ],
            [
                'username'  => 'rathana',
                'email'     => 'rathana@gmail.com',
                'phone'     => '0900000005',
                'password'  => $password,
                'user_role' => 'user',
            ],
            [
                'username'  => 'vengann',
                'email'     => 'kunvengann@gmail.com',
                'phone'     => '0900045005',
                'password'  => $password,
                'user_role' => 'user',
            ],
        ];

        // Add timestamps
        $now = now();
        foreach ($records as &$r) {
            $r['created_at'] = $now;
            $r['updated_at'] = $now;
        }

        DB::table('users')->insert($records);
    }
}
