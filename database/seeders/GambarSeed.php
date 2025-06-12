<?php

namespace Database\Seeders;

use App\Models\Gambar;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GambarSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            [
                "url"=>"headers/static_1.jpg"
            ],
            [
                "url"=>"headers/static_2.jpg"
            ],
            [
                "url"=>"headers/static_3.jpg"
            ]
            ];
            foreach ($datas as $data) {
                Gambar::create($data);
            }
    }
}
