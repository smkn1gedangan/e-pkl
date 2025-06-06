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
                "url"=>"static_1.jpg"
            ],
            [
                "url"=>"static_2.jpg"
            ],
            [
                "url"=>"static_3.jpg"
            ]
            ];
            foreach ($datas as $data) {
                Gambar::create($data);
            }
    }
}
