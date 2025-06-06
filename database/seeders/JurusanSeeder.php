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
            ],
            [
                "nama"=>"Akuntansi",
                "samaran"=>"AK",
            ],
            [
                "nama"=>"Busana",
                "samaran"=>"TBS",
            ],
            [
                "nama"=>"Desain Komunikasi Visual",
                "samaran"=>"DKV",
            ],
            [
                "nama"=>"Animasi",
                "samaran"=>"ANIMASI",
            ],
            [
                "nama"=>"Teknik Kendaraan Ringan",
                "samaran"=>"TKR",
            ],
            [
                "nama"=>"Boga",
                "samaran"=>"TBG",
            ],
        ];
        foreach ($datas as $data) {
            Jurusan::create(  
                ['nama' => $data['nama']]);
        }
    }
}
