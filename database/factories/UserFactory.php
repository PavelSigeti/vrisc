<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->firstName(),
            'surname' => fake()->lastName(),
            'university_id' => $this->faker->randomElement([null, 1, 2, 3]),
            'nickname' => 'Test-'.$this->faker->firstName(),
            'email' => fake()->unique()->safeEmail(),
//            'email_verified_at' => now(),
            'password' => bcrypt('123'), // 123
//            'remember_token' => Str::random(10),
            'role' => 'player',
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
//    public function unverified()
//    {
//        return $this->state(fn (array $attributes) => [
//            'email_verified_at' => null,
//        ]);
//    }
}
