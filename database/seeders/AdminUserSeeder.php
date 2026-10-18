<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Seed the first administrator account for the staff portal.
     */
    public function run(): void
    {
        User::factory()->admin()->create([
            'name' => 'Sunshine Admin',
            'email' => 'admin@sunshineeducare.edu.bd',
        ]);
    }
}
