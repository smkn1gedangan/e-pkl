<?php

namespace App\Http\Controllers;

use App\Models\Tempat;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TempatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tempats = Tempat::with("user")
        ->when($request->filled("search"),function($query) use($request){
            $query->where("nama","like","%".$request->search."%")
            ->orWhere("kontak","like","%".$request->search."%")
            ->orWhere("bidang_usaha","like","%".$request->search."%")
            ->orWhere("lokasi","like","%".$request->search."%")
            ->orWhereHas("user",function($q2) use($request){
                $q2->where("name","like","%".$request->search."%");   
            });
        })
        ->orderBy($request->input("sort_by","created_at"),$request->input("sort_order","desc"))
        ->paginate(10)->withQueryString();


        return Inertia::render("Tempat/Index",[
            "pembimbings"=>User::with("tempatYangDibimbing")->role("pembimbing_pt")->get(),
            "tempats"=>$tempats,
            "filters"=> $request->only(["search","sort_by","sort_order"])
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
            "nama"=>"required|unique:tempats,nama",
            "kontak"=>"required|unique:tempats,kontak",
            "bidang_usaha"=>"string|required",
            "lokasi"=>"string|required",
            "pembimbing_id"=>"nullable",
        ],[
            "nama.required"=>"Nama Du/Di Wajib Diisi",
            "nama.unique"=>"Nama Tempat Telah Digunakan",
            "kontak.required"=>"Kontak Du/Di Wajib Diisi",
            "kontak.unique"=>"Kontak Telah Ada dan Tidak Boleh Sama",
            "bidang_usaha.required"=>"Bidang Usaha Du/Di Wajib Diisi",
            "lokasi.required"=>"Lokasi Du/Di Wajib Diisi",
        ]);

        $tpId = Tempat::with("user")->where("pembimbing_id",$validate["pembimbing_id"])->first();
        if($tpId && $tpId->pembimbing_id !== null){
            return redirect()->route("tempat.index")->with("error","Pembimbing {$tpId?->user?->name} Telah Membimbing Pt Lain");
        }

        Tempat::create($validate);
        return redirect()->route("tempat.index")->with("success","Berhasil Menambah Tempat Du/Di Baru");
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
        $tempatId = Tempat::findOrFail($id);
        $validate = $request->validate([
            "nama"=>["string","required",Rule::unique("tempats","nama")->ignore($id)],
            "kontak"=>["string","required",Rule::unique("tempats","kontak")->ignore($id)],
            "bidang_usaha"=>"string|required",
            "lokasi"=>"string|required",
            "pembimbing_id"=>"nullable",
        ],[
            "nama.required"=>"Nama Du/Di Wajib Diisi",
            "nama.unique"=>"Nama Tempat Telah Digunakan",
            "kontak.required"=>"Kontak Du/Di Wajib Diisi",
            "kontak.unique"=>"Kontak Telah Ada dan Tidak Boleh Sama",
            "bidang_usaha.required"=>"Bidang Usaha Du/Di Wajib Diisi",
            "lokasi.required"=>"Lokasi Du/Di Wajib Diisi",
        ]);
        $tpId = Tempat::with("user")->where("pembimbing_id",$validate["pembimbing_id"])->first();
        if($request->input("pembimbing_id") !== $tpId?->pembimbing_id && $tpId){
            return redirect()->route("tempat.index")->with("error","Pembimbing {$tpId?->user?->name} Telah Membimbing Pt Lain");
        }

        $tempatId->nama = $validate["nama"];
        $tempatId->kontak = $validate["kontak"];
        $tempatId->bidang_usaha = $validate["bidang_usaha"];
        $tempatId->lokasi = $validate["lokasi"];
        $tempatId->pembimbing_id = $validate["pembimbing_id"];

        $tempatId->save();
        return redirect()->route("tempat.index")->with("success","Berhasil Mengubah Tempat Du/Di");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tempatId = Tempat::findOrFail($id);
        if($tempatId){
            $tempatId->delete();
        }
        return redirect()->route("tempat.index")->with("success","Berhasil Menghapus Tempat Du/Di");
    }
}
