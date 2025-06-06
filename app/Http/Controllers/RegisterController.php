<?php

namespace App\Http\Controllers;

use App\Models\Jurusan;
use App\Models\TahunAjaran;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegisterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $siswas = User::query()
        ->with(["jurusan","tahunAjaran","roles"])
        ->where("isAccept","=",false)
        ->when($request->filled("tahunAjaran"),function($query) use($request){
            $query->whereHas("tahunAjaran",function($q2) use($request){
                $q2->where("id","=",$request->input("tahunAjaran"));
            });
        })
        ->when($request->filled("jurusan"),function($query) use($request){
            $query->whereHas("jurusan",function($q2) use($request){
                $q2->where("id","=",$request->input("jurusan"));
            });
        })
        ->when($request->filled("search"),function($query) use($request){
             $query->where(function($q2) use($request){
                $q2->where("users.name", "like","%". $request->search . "%")
                ->orWhere("users.email", "like","%". $request->search . "%")
                ->orWhere("users.kontak", "like","%". $request->search . "%")
                ->orWhereHas("jurusan",function($q2) use($request){
                    $q2->where("nama", "like","%". $request->search . "%");
                })
                ->orWhereHas("tahunAjaran",function($q2) use($request){
                    $q2->where("tahun", "like","%". $request->search . "%");
                });
             });
        })
        ->when($request->input('sort_by') === "jurusan_id",function($query) use($request){
                $query->join("jurusans","users.jurusan_id","=","jurusans.id")
                ->orderBy("jurusans.nama",$request->input("sort_order","asc"))
                ->select("users.*");
        })
        ->when($request->input('sort_by') === "tahunAjaran_id",function($query) use($request){
                $query->join("tahun_ajarans","users.tahunAjaran_id","=","tahun_ajarans.id")
                ->orderBy("tahun_ajarans.tahun",$request->input("sort_order","asc"))
                ->select("users.*");
        })
        ->orderBy($request->input("sort_by","users.created_at"),$request->input("sort_order","desc"))
        ->role("siswa")->paginate(10)->withQueryString();
        return Inertia::render("Register/Index",[
            "siswas"=>$siswas,
            "filter"=> $request->only(["search","sort_by","sort_order","tahunAjaran","jurusan"]),
            'jurusans'=> Jurusan::get(),
            'tahunAjarans'=> TahunAjaran::get()
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
        $siswaId = User::findOrFail($id);
        if($siswaId){
            $siswaId->isAccept = true;
        }
        $siswaId->save();
        return redirect()->route("regis.index")->with("success","Sukses Menambah User Baru");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $siswaId = User::findOrFail($id);
        if($siswaId){
            $siswaId->delete();
        }
        return redirect()->route("regis.index")->with("success","Sukses Menghapus User");
    }
}
