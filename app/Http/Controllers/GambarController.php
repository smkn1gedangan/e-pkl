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
            "url"=>"required|file|max:2400|mimes:jpg,jpeg,avif,png"
        ],[
            "url.required"=>"Gambar Wajib Diisi",
            "url.mimes"=>"Gambar harus Bertipe Jpg,Jpeg,Avif,Png",
            "url.max"=>"File Gambar Maksimal 2400 Kb (2,4 mb)"
        ]);

        if($request->hasFile("url")){

            
            // upload to public
            $sourcePath = $request->file('url')->store('headers', 'public');

            // backup path
            $backupPath = env("BACKUP_PHOTOS") . $sourcePath;

            if(!file_exists(dirname($backupPath))) {
                mkdir(dirname($backupPath), 0777, true);
            }
            // Simpan juga ke folder backup
            if(!File::copy(storage_path("app/public/".$sourcePath), $backupPath)){
                return Inertia::render("Gambar/Index")->with("error","Gambar gagal disimpan");
            };
            $validate["url"] =  $sourcePath ?? null;
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
            "url"=>"required|file|max:2400|mimes:jpg,jpeg,avif,png"
        ],[
            "url.required"=>"Gambar Wajib Diisi",
            "url.mimes"=>"Gambar harus Bertipe Jpg,Jpeg,Avif,Png",
            "url.max"=>"File Gambar Maksimal 2400 Kb (2,4 mb)"
        ]);
        
        $gambarId = Gambar::findOrFail($id);
        if ($request->hasFile('url')) {
            if ($gambarId->url) {
                
            
                $backupPath = env("BACKUP_PHOTOS") . $gambarId->url; // Lokasi kedua (backup)

                // Hapus file di lokasi pertama (public)
                if (File::exists(storage_path("app/public/". $gambarId->url))) {
                    File::delete(storage_path("app/public/". $gambarId->url));
                }

                // Hapus file di lokasi kedua (backup)
                if (File::exists($backupPath)) {
                    File::delete($backupPath);
                }
            }

            $sourcePath = $request->file('url')->store('headers', 'public'); //lokasi pertama

            $backupPath = env("BACKUP_PHOTOS") . $sourcePath;

            // upload to public

            if (!file_exists(dirname($backupPath))) {
                mkdir(dirname($backupPath), 0777, true);
            }
            // Simpan juga ke folder backup
            if(!File::copy(storage_path("app/public/".$sourcePath), $backupPath)){
                return redirect()->back()->with("error","Kesalahan Server Mengenai Gambar , Coba Beberapa Saat Lagi");
            };

            $gambarId->url =  $sourcePath ?? null;
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
            $backupPath = env("BACKUP_PHOTOS") . $gmbrId->url;

            if (File::exists(storage_path("app/public/". $gmbrId->url))) {
                    File::delete(storage_path("app/public/". $gmbrId->url));
            }
            if(fileExists($backupPath)){
                File::delete($backupPath);
            }
        }
        $gmbrId->delete();
        return redirect()->back()->with("success","Sukses Menghapus Gambar");
    }
}
