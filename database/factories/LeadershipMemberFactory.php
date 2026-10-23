<?php

namespace Database\Factories;

use App\Models\LeadershipMember;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<LeadershipMember>
 */
class LeadershipMemberFactory extends Factory
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
            'name_bn' => 'পরিচালকের নাম',
            'role_en' => fake()->randomElement(['Chairman', 'Academic Director', 'Executive Director']),
            'role_bn' => 'পরিচালক',
            'message_en' => fake()->sentence(12),
            'message_bn' => 'শিক্ষা প্রতিটি শিক্ষার্থীকে অনুপ্রাণিত করবে।',
            'image_path' => 'leadership/'.fake()->uuid().'.jpg',
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
