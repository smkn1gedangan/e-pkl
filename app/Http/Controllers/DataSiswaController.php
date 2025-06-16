<?php

namespace App\Http\Controllers;

use App\Http\Requests\DataSiswaRequest;
use App\Models\Datasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DataSiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Datasiswa::query()
        ->when($request->filled("kode"),function($query) use($request){
            $query->whereRaw('SUBSTRING_INDEX(nisn,".",-1)=?',[$request->kode]);
        })
        ->when($request->filled("aktivasi"),function($query) use($request){
            $query->where('isActive',"=",filter_var($request->input('aktivasi'), FILTER_VALIDATE_BOOLEAN));
        })
        ->when($request->filled("search") , function($query)use($request){
            $query->where("nama","like","%{$request->search}%")
            ->orWhere("nisn","like","%{$request->search}%");
        })
        ->orderBy($request->input("sort_by","created_at"),$request->input("sort_order","desc"))
        ->paginate(10)->withQueryString();

        
        return Inertia::render("DataSiswa/Index",[
            "siswas"=>$data,
            "filters"=>$request->only(["search","sort_by","sort_order","kode","aktivasi"]),
            "dataSiswas"=> DB::table('datasiswas')
                ->selectRaw('SUBSTRING_INDEX(nisn, ".", -1) as kode, COUNT(*) as total')
                ->groupBy('kode')
                ->get()
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
    public function store(DataSiswaRequest $request)
    {
        $validate = $request->validated();

        Datasiswa::create([
            "nama"=>$validate["nama"],
            "nisn"=>$validate["induk"] . $validate["jurusan"],
            "isActive"=>false
        ]);
        return redirect()->route("data_siswa.index")->with("success","Sukses Menambah Data Registrasi User");
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
    public function update(DataSiswaRequest $request, string $id)
    {

       
        $dataId = Datasiswa::findOrFail($id);

        $validate = $request->validated();
        
        $dataId->nisn = $validate["induk"].$validate["jurusan"];
        $dataId->nama = $validate["nama"];


        $dataId->save();
        return redirect()->route("data_siswa.index")->with("success","Sukses Menghapus Data Registrasi User");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dataId = Datasiswa::findOrFail($id);

        if($dataId){
            $dataId->delete();
        }
        
        return redirect()->route("data_siswa.index")->with("success","Sukses Menghapus Data Registrasi User");
    }
}
