<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $password = Hash::make('1234567');

        $records = [
            // two admins
            [
                'username'    => 'admin01',
                'email'       => 'admin01@example.com',
                'phone'       => '0900000001',
                'password'    => $password,
                'user_role'   => 'admin',
            ],
            [
                'username'  => 'admin02',
                'email'     => 'admin02@example.com',
                'phone'     => '0900000002',
                'password'  => $password,
                'user_role' => 'admin',
            ],

            // three normal users
            [
                'username'  => 'user01',
                'email'     => 'user01@example.com',
                'phone'     => '0900000003',
                'password'  => $password,
                'user_role' => 'user',
            ],
            [
                'username'  => 'user02',
                'email'     => 'user02@example.com',
                'phone'     => '0900000004',
                'password'  => $password,
                'user_role' => 'user',
            ],
            [
                'username'  => 'user03',
                'email'     => 'user03@example.com',
                'phone'     => '0900000005',
                'password'  => $password,
                'user_role' => 'user',
            ],

            // two staff
            [
                'username'  => 'staff01',
                'email'     => 'staff01@example.com',
                'phone'     => '0900000006',
                'password'  => $password,
                'user_role' => 'staff',
            ],
            [
                'username'  => 'staff02',
                'email'     => 'staff02@example.com',
                'phone'     => '0900000007',
                'password'  => $password,
                'user_role' => 'staff',
            ],
        ];

        // add timestamps
        $now = now();
        foreach ($records as &$r) {
            $r['created_at'] = $now;
            $r['updated_at'] = $now;
        }

        DB::table('users')->insert($records);
    }
}
