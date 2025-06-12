<?php

namespace App\Http\Controllers;

use App\Models\Jurnal;
use App\Models\Tempat;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request )
    {
        $rekapSiswa = Jurnal::where("user_id","=",Auth::user()->id)->select("keterangan",DB::raw("count(*) as total"))->groupBy("keterangan")->pluck("total","keterangan");

        $rekapPb = User::query()->with(["tempat","roles"])
        ->when(Auth::user()->getRoleNames()->first() === "pembimbing_sekolah",function($query){
            $query->withCount("jurnals")->where("pembimbing_sekolah_id","=",Auth::user()->id);
        })
        ->when(Auth::user()->getRoleNames()->first() === "pembimbing_pt",function($query){
            $query->withCount("jurnals")->whereHas("tempat",function($q2){
                    $q2->where("pembimbing_id",Auth::user()->id);
                });
            })
        ->get();
                
        $statistik = [
            "tempat"=>Tempat::count(),
            "siswa"=>User::with("roles")->role("siswa")->count(),
            "pembimbingPt"=>User::with("roles")->role("pembimbing_pt")->count(),
            "pembimbingSekolah"=>User::with("roles")->role("pembimbing_sekolah")->count(),
        ];

        return Inertia::render("Dashboard",[
            "rekapSiswa"=>$rekapSiswa ?? [],
            "rekapPb"=>$rekapPb,
            "statistik"=>$statistik
        ]);
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
        //
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
