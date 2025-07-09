<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use App\Models\StepLaporan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class LaporanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $datas = Laporan::query()->with(["user.tempat"])
            ->when(Auth::user()->getRoleNames()->contains("pembimbing_sekolah"),function($query){
                $query->whereHas("user",function($q2){
                    $q2->where("pembimbing_sekolah_id","=",Auth::user()->id);
                });
            })
            ->when(Auth::user()->getRoleNames()->contains("pembimbing_pt"),function($query){
                $query->whereHas("user.tempat",function($q2){
                    $q2->where("pembimbing_id","=",Auth::user()->id);
                });
            })
        ->paginate(10)->withQueryString();


        return Inertia::render("Laporan/Index",[
            "laporans"=>$datas,
            
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Laporan/Create",[
            "laporans"=>Laporan::get(),
            "step"=>StepLaporan::where("user_id","=",Auth::user()->id)->pluck("step")->first(),
            "siswa"=> User::with(["jurusan","tahunAjaran","pbSkl","tempat.user","nilai.pembimbing","dataSiswa","laporan"])->where("id","=",Auth::user()->id)->first(),
            "laporan"=>Laporan::where("user_id","=",Auth::user()->id)->where("status","=","tolak")->first()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "judul"=>"string|required|min:10|unique:laporans,judul",
            "user_id"=>["sometimes",Rule::exists("users","id")],
            "status"=>"sometimes|enum:pending",
        ],[
            "judul.min"=>"Judul Wajib Diisi Minimal 10 Karakter Huruf",
            "judul.unique"=>"Judul Telah Digunakan"
        ]);
        try {
          DB::transaction(function()use ($data){
              Laporan::create($data);

            StepLaporan::updateOrcreate([
                "user_id"=>$data["user_id"],
                
            ],[
                "user_id"=>$data["user_id"],
                "step"=> 2
            ]);
          });
        } catch (\Throwable $th) {
            return redirect()->back()->with("error","Terjadi Kesalahan :". $th->getMessage());
        }

        return redirect()->back()->with("success","Sukses Menambah Judul Baru");
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
    public function edit(Request $request, string $id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            "status"=>["sometimes","in:terima,tolak"],
        ]);

            try {
                DB::transaction(function() use($data,$id){
                    $laporanId = Laporan::findOrFail($id);
                if($laporanId){
                    $laporanId->status = $data["status"];
                    $laporanId->save();
                }
                
                $stepLaporanId = StepLaporan::where("user_id","=",$laporanId->user_id)->first();

                if($data["status"] === "terima"){
                    $stepLaporanId->update([
                        "step"=>3
                    ]);
                }else{
                    $stepLaporanId->update([
                        "step"=>1
                    ]);
                }
                $stepLaporanId->save();
                });
            } catch (\Throwable $th) {
                return redirect()->back()->with("error","Terjadi Kesalahan :". $th->getMessage());
            }           
        return redirect()->back()->with("success","Berhasil Mengubah Data");

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $laporanId = Laporan::findOrFail($id);
        if($laporanId){
            $laporanId->delete();
        }
        StepLaporan::where("user_id","=",$laporanId->user_id)->update([
            "step"=>1
        ]);
        return redirect()->back()->with("success","Sukses Menghapus Judul Laporan");

    }
}
