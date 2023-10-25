<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $userMaxCount = config('factories.userMaxCount');

        $this->call(PrioritiesSeeder::class);
        $this->call(StatusesSeeder::class);

        User::factory($userMaxCount)->create();
        Task::factory($userMaxCount)->create();
    }
}
