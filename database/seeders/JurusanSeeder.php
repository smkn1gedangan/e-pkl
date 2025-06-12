<?php

namespace Database\Seeders;

use App\Models\Jurusan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JurusanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            [
                "nama"=>"Sistem Informatika Jaringan Aplikasi",
                "samaran"=>"SIJA",
                "isActive"=>"aktif"
            ],
            [
                "nama"=>"Akuntansi",
                "samaran"=>"AK",
                "isActive"=>"tidak"
            ],
            [
                "nama"=>"Busana",
                "samaran"=>"TBS",
                "isActive"=>"tidak"
            ],
            [
                "nama"=>"Desain Komunikasi Visual",
                "samaran"=>"DKV",
                "isActive"=>"tidak"
            ],
            [
                "nama"=>"Animasi",
                "samaran"=>"ANIMASI",
                "isActive"=>"tidak"
            ],
            [
                "nama"=>"Teknik Kendaraan Ringan",
                "samaran"=>"TKR",
                "isActive"=>"tidak"
            ],
            [
                "nama"=>"Boga",
                "samaran"=>"TBG",
                "isActive"=>"tidak"
            ],
        ];
        foreach ($datas as $data) {
            Jurusan::create(  
                [
                    'nama' => $data['nama'],
                    'isActive' => $data['isActive']
                ]);
        }
    }
}
