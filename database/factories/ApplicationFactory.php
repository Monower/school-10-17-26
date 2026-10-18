<?php

namespace Database\Factories;

use App\Models\Application;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Application>
 */
class ApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'student_name' => fake()->name(),
            'date_of_birth' => fake()->dateTimeBetween('-18 years', '-5 years')->format('Y-m-d'),
            'class_name' => 'Class '.fake()->numberBetween(1, 12),
            'gender' => fake()->randomElement(['Male', 'Female']),
            'father_name' => fake()->name('male'),
            'mother_name' => fake()->name('female'),
            'phone' => fake()->numerify('01#########'),
            'email' => fake()->safeEmail(),
            'previous_school' => fake()->company(),
            'branch' => fake()->randomElement(['Bhairab Bazar Branch', 'Kamalpur Branch']),
            'address' => fake()->address(),
        ];
    }
}
