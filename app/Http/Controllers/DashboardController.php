<?php

namespace App\Http\Controllers;

use App\Models\Gambar;
use App\Models\Jurnal;
use App\Models\Jurusan;
use App\Models\Laporan;
use App\Models\PengajuanTempat;
use App\Models\TahunAjaran;
use App\Models\Tempat;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
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


        $rekapPb = collect();
        if(Auth::user()->getRoleNames()->contains("pembimbing_pt") || Auth::user()->getRoleNames()->contains("pembimbing_sekolah")){
            $rekapPb = User::query()->with(["tempat","roles"])
            ->when(Auth::user()->getRoleNames()->contains("pembimbing_sekolah"),function($query){
                $query->withCount("jurnals")->where("pembimbing_sekolah_id","=",Auth::user()->id);
            })
            ->when(Auth::user()->getRoleNames()->contains("pembimbing_pt"),function($query){
                $query->withCount("jurnals")->whereHas("tempat",function($q2){
                        $q2->where("pembimbing_id",Auth::user()->id);
                    });
                })
            ->get();
        }
        $statistik = collect();      
        if(Auth::user()->getRoleNames()->contains("admin")){
            $statistik = [
            "tempat"=>Tempat::count(),
            "siswa"=>User::with("roles")->role("siswa")->count(),
            "pembimbingPt"=>User::with("roles")->role("pembimbing_pt")->count(),
            "pembimbingSekolah"=>User::with("roles")->role("pembimbing_sekolah")->count(),
            "pengajuanTempat"=>PengajuanTempat::count(),
            "slider"=>Gambar::count(),
            "jurusan"=>Jurusan::count(),
            "tahunAjaran"=>TahunAjaran::count(),
            "jurnal"=>Jurnal::count(),
            "laporan"=>Laporan::count(),
        ];
        }



        $cacheKey = 'user_active_base_' . Auth::user()->jurusan_id;

        $users = Cache::remember($cacheKey, 10, function () {
            return User::with(['roles', 'datasiswa', 'jurusan'])
                ->where('isVisibilityJurnal', true)
                ->where('jurusan_id', Auth::user()->jurusan_id)
                ->where('id', '!=', Auth::id())
                ->orderBy('name')
                ->get(); // ambil semua, cache dulu
        });

        // lalu baru paginasi manual di controller
        $page = request()->get('page', 1);
        $perPage = 10;

        $userActives = collect();
        if(Auth::user()->getRoleNames()->contains("siswa")){
            $userActives = new LengthAwarePaginator(
            $users->forPage($page, $perPage),
            $users->count(),
            $perPage,
            $page,
            ['path' => request()->url(), 'query' => request()->query()]
        );
        }

        $jurnals = collect(); // default kosong

        if ($request->filled('user_id') && Auth::user()->isVisibilityJurnal) {
            $jurnals = Jurnal::with('user')
                ->where('user_id', $request->user_id)
                ->latest()
                ->paginate(10);
        }


        return Inertia::render("Dashboard",[
            "rekapSiswa"=>$rekapSiswa ?? [],
            "rekapPb"=>$rekapPb,
            "statistik"=>$statistik,
            "userActives"=>$userActives,
            "jurnals"=>$jurnals,
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
        $user =User::findOrFail($id);
        $user->isVisibilityJurnal = $request->isVisibilityJurnal;

        $user->save();

        return back()->with('success', 'Data berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
