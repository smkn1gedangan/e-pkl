<?php

namespace App\Http\Controllers;

use App\Models\TahunAjaran;
use App\Rules\TahunValidation;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TahunAjaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("TahunAjaran/Index",[
            "tahunAjarans"=>TahunAjaran::latest()->paginate(5)
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
            "tahun"=>["string","min:3","max:30","unique:tahun_ajarans,tahun",new TahunValidation]
        ],[
            "tahun.string"=>"Tahun Ajaran Wajib Diisi 3 - 30 Karakter Huruf",
            "tahun.unique"=>"Tahun Ajaran Telah Ada"
        ]);
        TahunAjaran::create(["tahun" => preg_replace("/\s*-\s*/"," - ",$validate["tahun"])]);

        return redirect()->route("tahunAjaran.index")->with("success","Sukses Menambah Tahun Ajaran Baru");
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

        $taId = TahunAjaran::findOrFail($id);
        
        $validate = $request->validate([
            "tahun"=>["string","min:3","max:30",Rule::unique("tahun_ajarans","tahun")->ignore($id) , new TahunValidation]
        ],[
            "tahun.string"=>"Tahun Ajaran Wajib Diisi 3 - 30 Karakter Huruf",
            "tahun.unique"=>"Tahun Ajaran Telah Ada"
        ]);

        $taId->tahun = preg_replace("/\s*-\s*/"," - ",$validate["tahun"]);

        $taId->save();
        return redirect()->route("tahunAjaran.index")->with("success","Sukses Mengubah Tahun Ajaran");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $taId = TahunAjaran::findOrFail($id);
        

        if($taId){
            $taId->delete();
        }
        return redirect()->route("tahunAjaran.index")->with("success","Sukses Menghapus Tahun Ajaran");
    }
}
