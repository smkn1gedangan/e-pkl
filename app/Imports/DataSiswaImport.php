<?php

namespace App\Imports;

use App\Models\Datasiswa;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class DataSiswaImport implements ToCollection
{
    public $existingError = [];
    public function collection(Collection $rows)
    {

        // Lewati baris 0-8, ambil dari baris ke-9 (index ke-9, karena index mulai dari 0)
        foreach ($rows->slice(11) as $index=> $row) {
            $induk = $row[1];
            $jurusan = $row[2];
            $nama = $row[3];
            // Pastikan urutan kolom benar sesuai Excel:
            // Kolom B = $row[1] -> induk
            // Kolom C = $row[2] -> jurusan
            // Kolom D = $row[3] -> nama
            // Kolom E = $row[4] -> jenis kelamin
            if (!$induk || !$jurusan || !$nama) {
            continue;
        }
        
            Datasiswa::updateOrCreate(["nisn"=>$induk.$jurusan],[
                'nisn' => $induk.$jurusan,
                'nama'    => $nama,
        ]);
        }
    }
}
