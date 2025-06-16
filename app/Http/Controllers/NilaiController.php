<?php

namespace App\Http\Controllers;

use App\Models\Jurnal;
use App\Models\Nilai;
use Illuminate\Http\Request;

class NilaiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            "user_id"=>"required",
            "nilai"=> "required",
            "keterangan"=>"required|max:200",
            "pembimbing_id"=>"required"
        ],[
            "nilai.required"=>"Nilai Wajib Diisi",
            "keterangan.required"=>"Keterangan Wajib Diisi Minimal 1 Kata",
            "keterangan.max"=>"Keterangan Maksimal 200 Kata",
        ]);
        $nilaiId = Nilai::with("siswa")->where("user_id","=",$validate["user_id"])->where("pembimbing_id","=",$validate["pembimbing_id"])->first();

        if($nilaiId){
           return redirect()->route("siswa.index")->with("error","Anda Telah Menambah Nilai Untuk {$nilaiId->siswa->name}");
        }

        Nilai::create($validate);

        return redirect()->route("siswa.index")->with("success","Sukses Menambah Nilai Baru");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
       $jurnalId = Jurnal::findOrFail($id);

       if($jurnalId){
            $jurnalId->mark = true;
            $jurnalId->save();
       }
       return redirect()->route("rekap.index")->with("success","Sukses Menandai Jurnal");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //  
    }
}
