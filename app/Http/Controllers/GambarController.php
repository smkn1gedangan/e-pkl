<?php

namespace App\Http\Controllers;

use App\Models\Gambar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use function PHPUnit\Framework\fileExists;

class GambarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       return Inertia::render("Gambar/Index",[
        "gambars"=>Gambar::paginate(10)
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
            "url"=>"required|file|max:1200|mimes:jpg,jpeg,avif,png"
        ],[
            "url.required"=>"Gambar Wajib Diisi",
            "url.mimes"=>"Gambar Type Jpg,Jpeg,Avif,Png",
            "url.max"=>"File Gambar Maksimal 1200 Kb (1,2 mb)"
        ]);

        if($request->hasFile("url")){
            $file = $request->file("url");
            $filename = time() . "_" . $file->getClientOriginalName();


            $publicPath = public_path("img/header/". $filename);
            $backupPath = env("BACKUP_PHOTOS") . "header/". $filename;

            // upload to public

            $file->move(public_path("img/header"), $filename);

            if(!file_exists(dirname($backupPath))) {
                mkdir(dirname($backupPath), 0777, true);
            }
            // Simpan juga ke folder backup
            if(!copy($publicPath, $backupPath)){
                return Inertia::render("Gambar/Index")->with("error","Gambar gagal disimpan");
            };
            $validate["url"] =  $filename ?? null;
        }
        Gambar::create($validate);
        return redirect()->back()->with("success","Sukses Menambah Slider / Gambar Baru");
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
        $request->validate([
            "url"=>"required|file|max:1200|mimes:jpg,jpeg,avif,png"
        ],[
            "url.required"=>"Gambar Wajib Diisi",
            "url.mimes"=>"Gambar Type Jpg,Jpeg,Avif,Png",
            "url.max"=>"File Gambar Maksimal 1200 Kb (1,2 mb)"
        ]);
        
        $gambarId = Gambar::findOrFail($id);
        if ($request->hasFile('url')) {
            if ($gambarId->url) {
                $publicPath = public_path('img/header/' . $gambarId->url); // Lokasi pertama (public)
                $backupPath = env("BACKUP_PHOTOS") ."header/" . $gambarId->url; // Lokasi kedua (backup)

                // Hapus file di lokasi pertama (public)
                if (File::exists($publicPath)) {
                    File::delete($publicPath);
                }

                // Hapus file di lokasi kedua (backup)
                if (File::exists($backupPath)) {
                    File::delete($backupPath);
                }
            }

            $file = $request->file('url');
            $filename = time() . '_' . $file->getClientOriginalName();
            $publicPath = public_path("img/header/" . $filename);
            $backupPath = env("BACKUP_PHOTOS") . "header/" . $filename;

            // upload to public
            $file->move(public_path('img/header'), $filename);

            if (!file_exists(dirname($backupPath))) {
                mkdir(dirname($backupPath), 0777, true);
            }
            // Simpan juga ke folder backup
            if(!copy($publicPath, $backupPath)){
                return redirect()->back()->with("error","Kesalahan SErvevr Mengenai Gambar , Coba Beberapa Saat Lagi");
            };

           $gambarId->url = $filename ?? null;
        }
        $gambarId->save();
        return redirect()->back()->with("success","Sukses Mengubah Gambar");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $gmbrId = Gambar::findOrFail($id);
        
        if($gmbrId->url){
            $publicPath = public_path("img/header/". $gmbrId->url);
            $backupPath = env("BACKUP_PHOTOS") . "header/" . $gmbrId->url;

            if(fileExists($publicPath)){
                File::delete($publicPath);
            }
            if(fileExists($backupPath)){
                File::delete($backupPath);
            }
        }
        $gmbrId->delete();
        return redirect()->back()->with("success","Sukses Menghapus Gambar");
    }
}
