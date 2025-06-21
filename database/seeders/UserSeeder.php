<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            [
            "name"=>"admin",
            "email"=>"example@gmail.com",
            "email_verified_at"=>now(),
            "password"=>env("SEED_ADMIN_PASSWORD","password"),
            "remember_token"=>Str::random(10),   
            "role"=>"admin",
            "kontak"=>"0123457890"
            ],
            [
            "name"=>"siswa",
            "email"=>"siswa@gmail.com",
            "email_verified_at"=>now(),
            "password"=>env("SEED_ADMIN_PASSWORD","password"),
            "remember_token"=>Str::random(10),   
            "role"=>"siswa",
            "kontak"=>"0123457890"
            ],
        ];
        foreach ($datas as $data) {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'email_verified_at' => now(),
                'password' => Hash::make($data['password']),
                'remember_token' => Str::random(10),
                'kontak' => $data['kontak'],
            ]);

            $user->syncRoles($data["role"]);
        }
    }
}
