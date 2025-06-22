<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Datasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AktivasiController extends Controller
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
        return Inertia::render("Auth/Aktivasi");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $dataId = Datasiswa::where("nisn",$request->input("nisn"))->first();
        
        $request->validate([
            "nisn"=>["string","required","min:9","max:20",Rule::exists("datasiswas","nisn")]
        ],[
            "nisn.required"=>"Nomor Aktivasi Wajib Diisi",
            "nisn.min"=>"Nomor Aktivasi Minimal 9 Karakter",
            "nisn.max"=>"Nomor Aktivasi Maksimal 20 Karakter",
            "nisn.exists"=>"Nomor Aktivasi Tidak Ditemukan",
        ]);

        if(!$dataId){
            return redirect()->route("aktivasi")->with("error","Nomor Aktivasi Tidak Ditemukan");
        }else{
            $dataId->isActive = true;
            $dataId->save();
        }

        return redirect()->route("register.edit",[
            "register"=>Crypt::encrypt($dataId->id)
        ]);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
