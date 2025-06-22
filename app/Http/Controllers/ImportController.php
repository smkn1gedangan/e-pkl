<?php

namespace App\Http\Controllers;

use App\Exports\DataSiswaExport;
use App\Exports\siswaExport;
use App\Imports\DataSiswaImport;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
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

    public function exportDataSiswa(Request $request) {
        return Excel::download(new DataSiswaExport($request), 'data-siswa.xlsx');
    }
    
    public function exportSiswa(Request $request) {
        return Excel::download(new siswaExport($request), 'siswa.xlsx');
    }

    public function exportSiswaToPdf($id)  {
        $siswa = User::with(["jurusan","tahunAjaran","pbSkl","tempat.user","nilai.pembimbing","dataSiswa","jurnals"])->withCount("jurnals")->findOrFail($id);

        $hadirs =$siswa->jurnals->where("keterangan","hadir")->count();
        $sakits =$siswa->jurnals->where("keterangan","sakit")->count();
        $izins =$siswa->jurnals->where("keterangan","izin")->count();
        // view PDF dengan data $siswa
        $pdf = Pdf::loadView('pdf.siswa', compact('siswa','hadirs','sakits','izins'));

        return $pdf->download('siswa-' . $siswa->name . '.pdf');
    }
}
