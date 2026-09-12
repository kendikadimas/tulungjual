<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::updateOrCreate(
            ['email' => 'admin@tulungjual.id'],
            [
                'name' => 'Admin TulungJual',
                'no_hp' => '085222111193',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        // Regular User (Pengiklan / Pemilik)
        User::updateOrCreate(
            ['email' => 'user@tulungjual.id'],
            [
                'name' => 'Budi Santoso',
                'no_hp' => '081234567890',
                'password' => Hash::make('password'),
                'role' => 'user',
            ]
        );

        // Developer User
        User::updateOrCreate(
            ['email' => 'developer@tulungjual.id'],
            [
                'name' => 'PT Graha Harmony Developer',
                'no_hp' => '082199887766',
                'password' => Hash::make('password'),
                'role' => 'user',
            ]
        );
    }
}
