<?php

namespace App\Http\Controllers;

use App\Models\Jurusan;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class JurusanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $datas = Jurusan::query()
        ->when($request->filled("search"),function($query) use($request){
            $query->where("nama","like","%{$request->search}%");
        })
        
        ->latest()->paginate(10);

        return Inertia::render("Jurusan/Index",[
            "jurusans"=>$datas,
            "filters"=> $request->only(["search"])
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
        $validate = $request->validate([
            "nama"=>"string|min:3|max:40|unique:jurusans,nama",
            "kepala"=>"required|min:3|max:40",
            "isActive"=>"required"
        ],[
            "nama.string"=>"Nama Jurusan Wajib Diisi 3 - 40 Karakter Huruf",
            "nama.unique"=>"Nama Jurusan Telah Ada",
            "kepala.required"=>"Nama Kepala Konsentrasi Jurusan Harus Diisi 3 - 40 Karakter Huruf",
        ]);
        
        Jurusan::create($validate);

        return redirect()->route("jurusan.index")->with("success","Sukses Menambah Jurusan Baru");
        
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
        $jurusanId = Jurusan::findOrFail($id);

        if($jurusanId){
             $validate = $request->validate([
            "nama"=>["string","min:3","max:50",Rule::unique("jurusans","nama")->ignore($id)],
            "kepala"=>["nullable"],
            "isActive"=>"required"
        ],[
            "nama.string"=>"Nama Jurusan Wajib Diisi 3 - 50 Karakter Huruf",
            "nama.unique"=>"Nama Jurusan Telah Ada",
        ]);
        
        $jurusanId ->nama = $validate["nama"]; 
        $jurusanId ->kepala = $validate["kepala"]; 
        $jurusanId ->isActive = $validate["isActive"]; 
        $jurusanId->save();
        }

        return redirect()->route("jurusan.index")->with("success","Sukses Mengubah Jurusan");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $jurusanId = Jurusan::findOrFail($id);

        if($jurusanId){
            $jurusanId->delete();
        }
         return redirect()->route("jurusan.index")->with("success","Sukses Menghapus Jurusan");
    }
}
