<?php

namespace App\Http\Controllers;

use App\Imports\DataSiswaImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ImportController extends Controller
{
    public function importRegisterUser(Request $request)  {
        $request->validate([
            "file"=>"required|mimes:xlsx,xls"
        ],[
            "file.required"=>"file wajib diisi dan format .xlsx , .xls"
        ]);

        $import = new DataSiswaImport();
        Excel::import(new DataSiswaImport,$request->file("file"));

         if (count($import->existingError) > 0) {
                return back()->withErrors([
                    'duplicate' => 'Beberapa data tidak dimasukkan karena duplikat.',
                    'details' => $import->existingError
                ]);
            }
        return redirect()->back()->with('success', 'Data siswa berhasil diimport!');
    }
}
