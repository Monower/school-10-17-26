<?php

namespace Database\Factories;

use App\Models\FacultyMember;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FacultyMember>
 */
class FacultyMemberFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name_en' => fake()->name(),
            'name_bn' => 'শিক্ষকের নাম',
            'designation_en' => fake()->randomElement([
                'Senior Teacher, Mathematics',
                'Teacher, English',
                'Teacher, Physics',
                'Teacher, Bangla',
            ]),
            'designation_bn' => 'শিক্ষক',
            'image_path' => 'faculty/'.fake()->uuid().'.jpg',
            'sort_order' => 0,
            'active' => true,
        ];
    }

    /**
     * Indicate that the member is hidden from the website.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'active' => false,
        ]);
    }
}
