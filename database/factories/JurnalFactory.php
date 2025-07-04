<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Jurnal>
 */
class JurnalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "user_id"=> $this->faker->numberBetween(5,6),
            "photo"=>$this->faker->image(),
            "kegiatan"=>$this->faker->sentence(),
            "keterangan"=>$this->faker->randomElement(["hadir","sakit","izin"]),
        ];
    }
}
