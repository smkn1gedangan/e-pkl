<?php

namespace App\Http\Controllers;

use App\Models\PengajuanTempat;
use App\Models\Tempat;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengajuanTempatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         return Inertia::render("PengajuanTempat/Index",[
            "pengajuanTempats"=>PengajuanTempat::with("user")->latest()->paginate()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("PengajuanTempat/Form",[
            "tempats"=>Tempat::get(),
            "pengajuanTempats"=>PengajuanTempat::latest()->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validate = $request->validate([
            "user_id"=>"required",
            'nama' => ['required', function ($attribute, $value, $fail) use($request) {
            if (
                $request->input("is") === "siswa" && Tempat::where('nama', $value)->exists()
            ) {
                $fail('Nama Tempat Telah Terdaftar.');
            }
            }],
            "kontak"=>['required',"regex:/^0[0-9]{9,12}$/"],
            "bidang_usaha"=>"string|required",
            "lokasi"=>"required",
            "alasan"=>"required",
        ],[
            "nama.required"=>"Nama Du/Di Wajib Diisi",
            "kontak.required"=>"Kontak Du/Di Wajib Diisi",
            "kontak.regex"=>"Kontak Wajib 10 - 13 Karakter Dan Diawali Angka 0",
            "bidang_usaha.required"=>"Bidang Usaha Du/Di Wajib Diisi",
            "lokasi.required"=>"Lokasi Bidang Usaha Du/Di Wajib Diisi",
            "alasan.required"=>"Alasan Wajib Diisi",
        ]);
        PengajuanTempat::create($validate);

        return redirect()->route("pengajuanTempat.create")->with("success","Sukses Mengajukan Tempat Ke Admin Sekolah");
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
        
        $tempatId =Tempat::where("nama","=",$request->nama)->first();
        if($tempatId){
            PengajuanTempat::findOrFail($id)->delete();
        }else{
            $tempatId =  Tempat::create([
            "nama"=>$request->nama,
            "kontak"=>$request->kontak,
            "bidang_usaha"=>$request->bidang_usaha,
            "lokasi"=>$request->lokasi,
            ]);
        PengajuanTempat::findOrFail($id)->delete();
        }
        
        User::with("pengajuanTempat")->where("id","=",$request->user_id)->update([
            "tempat_id"=>$tempatId->id
        ]);

        return redirect()->back()->with("success","Berhasil Mengubah Tempat Du/Di Dan Mengubah Data Siswa");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        PengajuanTempat::findOrFail($id)->delete();
        return redirect()->back()->with("success","Berhasil Menolak Tempat Usulan Pemohon");
    }
}
