<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Item;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@lostfound.test'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );
        $this->command->info('Admin created.');

        // 2. Demo User
        $user = User::firstOrCreate(
            ['email' => 'user@lostfound.test'],
            [
                'name' => 'Demo User',
                'password' => Hash::make('password'),
                'role' => 'user',
            ]
        );
        $this->command->info('Demo User created.');

        // 3. Create Items for Demo User
        if (Item::count() === 0) {
            Item::factory(5)->create([
                'user_id' => $user->id,
                'type' => 'lost',
            ]);

            Item::factory(5)->create([
                'user_id' => $user->id,
                'type' => 'found',
            ]);
            $this->command->info('10 items created for Demo User.');
        }
    }
}
