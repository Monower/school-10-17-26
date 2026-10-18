<?php

namespace Database\Factories;

use App\Models\Scholarship;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Scholarship>
 */
class ScholarshipFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title_en' => fake()->sentence(4),
            'title_bn' => fake()->sentence(4),
            'body_en' => fake()->paragraph(),
            'body_bn' => fake()->paragraph(),
            'announce_date' => fake()->dateTimeBetween('-1 year')->format('Y-m-d'),
        ];
    }
}
