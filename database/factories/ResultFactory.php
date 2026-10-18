<?php

namespace Database\Factories;

use App\Models\Result;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Result>
 */
class ResultFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'class_name' => 'Class '.fake()->numberBetween(1, 12),
            'file_path' => 'results/'.fake()->uuid().'.pdf',
            'file_size' => fake()->numberBetween(50_000, 5_000_000),
        ];
    }
}
