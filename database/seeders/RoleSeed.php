<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            ["name"=>"admin"],
            ["name"=>"pembimbing_sekolah"],
            ["name"=>"pembimbing_pt"],
            ["name"=>"siswa"],
        ];
        foreach ($datas as $data) {
            Role::updateOrCreate(['name'=> $data["name"]],['name'=> $data["name"]]);
        }
    }
}
