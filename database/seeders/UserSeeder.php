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
            "email"=>"admin@gmail.com",
            "email_verified_at"=>now(),
            "password"=>"admin",
            "remember_token"=>Str::random(10),   
            "role"=>"admin",
            "kontak"=>"0123457890"
            ],
            [
            "name"=>"pembimbing",
            "email"=>"pembimbing@gmail.com",
            "email_verified_at"=>now(),
            "password"=>"pembimbing",
            "remember_token"=>Str::random(10),   
            "role"=>"pembimbing_sekolah",
            "kontak"=>"0123457890"

            ],
            [
            "name"=>"pembimbing1",
            "email"=>"pembimbing1@gmail.com",
            "email_verified_at"=>now(),
            "password"=>"pembimbing1",
            "remember_token"=>Str::random(10),   
            "role"=>"pembimbing_pt",
            "kontak"=>"0123457890"
            ],
            [
            "name"=>"pembimbing2",
            "email"=>"pembimbing2@gmail.com",
            "email_verified_at"=>now(),
            "password"=>"pembimbing2",
            "remember_token"=>Str::random(10),   
            "role"=>"pembimbing_pt",
            "kontak"=>"0123457890"

            ],
            [
            "name"=>"siswa",
            "email"=>"siswa10@gmail.com",
            "email_verified_at"=>now(),
            "password"=>"siswa",
            "remember_token"=>Str::random(10),   
            "role"=>"siswa",
            "kontak"=>"0123457890",
            "isAccept"=>true
            ],
            [
            "name"=>"siswa1",
            "email"=>"siswa1@gmail.com",
            "email_verified_at"=>now(),
            "password"=>"siswa1",
            "remember_token"=>Str::random(10),   
            "role"=>"siswa",
            "kontak"=>"0123457890"
            ],
            [
            "name"=>"siswa2",
            "email"=>"siswa2@gmail.com",
            "email_verified_at"=>now(),
            "password"=>"siswa",
            "remember_token"=>Str::random(10),   
            "role"=>"siswa",
            "kontak"=>"0123457890",
            ],
            [
            "name"=>"siswa3",
            "email"=>"siswa3@gmail.com",
            "email_verified_at"=>now(),
            "password"=>"siswa1",
            "remember_token"=>Str::random(10),   
            "role"=>"siswa",
            "kontak"=>"0233457890"
            ],
            [
            "name"=>"siswa4",
            "email"=>"siswa4@gmail.com",
            "email_verified_at"=>now(),
            "password"=>"siswa",
            "remember_token"=>Str::random(10),   
            "role"=>"siswa",
            "kontak"=>"0983457890",
            ],
            [
            "name"=>"siswa5",
            "email"=>"siswa5@gmail.com",
            "email_verified_at"=>now(),
            "password"=>"siswa1",
            "remember_token"=>Str::random(10),   
            "role"=>"siswa",
            "kontak"=>"5433457890"
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
