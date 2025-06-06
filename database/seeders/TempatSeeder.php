<?php

namespace Database\Seeders;

use App\Models\Tempat;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TempatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $datas = [
            [
            "nama"=>"pt_jaya_berkah1",
            "kontak"=>"09878714352",
            "bidang_usaha"=>"jahit1",
            "lokasi"=>"Sample",
            "pembimbing_id"=>3,
            ],
            [
            "nama"=>"pt_jaya_berkah2",
            "kontak"=>"09218713452",
            "bidang_usaha"=>"jahit2",
            "lokasi"=>"Sample2",
            "pembimbing_id"=>4,
            ],
        ];
        foreach ($datas as $data) {
            Tempat::create($data);
        }
    }
}
