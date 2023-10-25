<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $priorityMaxCount = config('factories.priorityMaxCount');
        $statusMaxCount = config('factories.statusMaxCount');
        $userMaxCount = config('factories.userMaxCount');

        return [
            'title' => fake()->sentence(rand(2, 4)),
            'description' => fake()->text(100),
            'priority_id' => fake()->numberBetween(1, $priorityMaxCount),
            'status_id' => fake()->numberBetween(1, $statusMaxCount),
            'executor' => fake()->numberBetween(1, $userMaxCount),
            'creator' => fake()->numberBetween(1, $userMaxCount),
            'date_end' => fake()->dateTimeBetween('-1 week', '+1 week'),
        ];
    }
}
