<?php

namespace App\Http\Controllers;

use App\Http\Requests\SiswaRequest;
use App\Models\Datasiswa;
use App\Models\Jurusan;
use App\Models\TahunAjaran;
use App\Models\Tempat;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $sortableRelations = [
            'jurusan_id' => ['table' => 'jurusans', 'foreign_key' => 'users.jurusan_id', 'column' => 'jurusans.nama'],
            'tahunAjaran_id' => ['table' => 'tahun_ajarans', 'foreign_key' => 'users.tahunAjaran_id', 'column' => 'tahun_ajarans.tahun'],
            'tempat_id' => ['table' => 'tempats', 'foreign_key' => 'users.tempat_id', 'column' => 'tempats.nama'],
        ];
        $sortBy = $request->input('sort_by');
        $sortOrder = $request->input('sort_order', 'asc');
        $datas = User::query()->with(["jurusan","tahunAjaran","pbSkl","tempat.user","nilai.pembimbing","dataSiswa"])
        ->when(Auth::user()->getRoleNames()->first() === "pembimbing_sekolah",function($query){
            $query->where("pembimbing_sekolah_id","=",Auth::user()->id);
        })
        ->when(Auth::user()->getRoleNames()->first() === "pembimbing_pt",function($query){
            $query->whereHas("tempat",function($q2){
                $q2->where("pembimbing_id","=",Auth::user()->id);
            });
        })
        ->when(Auth::user()->getRoleNames()->first() === "siswa",function($query){
            $query->where("id","=",Auth::user()->id);
        })
        ->when($request->filled("jurusan"),function($query)use($request){
            $query->whereHas("jurusan",function($q2) use($request){
                $q2->where("nama","=",$request->input("jurusan"));
            });
        })
        ->when($request->filled("tahunAjaran"),function($query)use($request){
            $query->whereHas("tahunAjaran",function($q2) use($request){
                $q2->where("tahun","=",$request->input("tahunAjaran"));
            });
        })
        ->when($request->filled("tempat"),function($query)use($request){
            $query->whereHas("tempat",function($q2) use($request){
                $q2->where("nama","=",$request->input("tempat"));
            });
        })
        ->when($request->filled("search"),function($query) use($request){
            $query->where(function($q2)use($request){
                $q2->where("users.name","like","%{$request->search}%")
            ->orWhere("users.email","like","%{$request->search}%")
            ->orWhere("users.kontak","like","%{$request->search}%")
            ->orWhereHas("jurusan",function($q2) use($request){
                $q2->where("nama", "like","%". $request->search . "%");
                })
            ->orWhereHas("tahunAjaran",function($q2) use($request){
                $q2->where("tahun", "like","%". $request->search . "%");
            })
            ->orWhereHas("tempat",function($q2) use($request){
                $q2->where("nama", "like","%". $request->search . "%");
            })
            ->orWhereHas("tempat.user",function($q2) use($request){
                $q2->where("name", "like","%". $request->search . "%");
            })
            ->orWhereHas("pbSkl",function($q2) use($request){
                $q2->where("name", "like","%". $request->search . "%");
            });
        });
        })
        ->when(array_key_exists($sortBy, $sortableRelations),function($query) use($sortableRelations,$sortBy,$sortOrder){
             $relation = $sortableRelations[$sortBy];
                $query->join($relation['table'], $relation['foreign_key'], '=', "{$relation['table']}.id")
                    ->orderBy($relation['column'], $sortOrder)
                    ->select('users.*');
        })

        ->orderBy($request->input("sort_by","users.created_at"),$request->input("sort_order","desc"))
        ->role("siswa")->paginate(10);
        return Inertia::render("Siswa/Index",[
            "siswas"=> $datas,
            "filters"=> $request->only(["search","sort_by","sort_order","tahunAjaran","tempat","jurusan"]),
            'jurusans'=> Jurusan::get(),
            'tahunAjarans'=> TahunAjaran::get(),
            'tempats'=> Tempat::get(),
    ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Siswa/Form",[
            "pembimbing_sekolahs"=> User::with("roles")->role('pembimbing_sekolah')->get(),
            "jurusans"=>Jurusan::where("isActive","=","aktif")->get(),
            "tempats"=>Tempat::get(),
            "dataSiswas"=>Datasiswa::where("isActive","=",false)->get(),
            "tahunAjarans"=>TahunAjaran::get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SiswaRequest $request):RedirectResponse
    {
         
        $validate = $request->validated();

        $dataSiswa = Datasiswa::where("nisn","=",$validate["nisn"])->first();

        $dataSiswa->isActive = true;

        $dataSiswa->save();

        $siswa = User::create([
            "name"=> $dataSiswa->nama,
            "nisn_id"=> $dataSiswa->id,
            'tempat_lahir' => $validate["tempat_lahir"],
            'tanggal_lahir' => $validate["tanggal_lahir"],
            "email"=> $validate["email"],
            "jurusan_id"=> $validate["jurusan_id"],
            "tahunAjaran_id"=> $validate["tahunAjaran_id"],
            "pembimbing_sekolah_id"=> $validate["pembimbing_sekolah_id"],
            "tempat_id"=> $validate["tempat_id"],
            "kontak"=> $validate["kontak"],
            "password"=> Hash::make($validate["password"]),
        ]);
        $siswa->syncRoles("siswa");
        return redirect()->route("siswa.create")->with("success","Sukses Menambah Data Siswa Baru");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
      
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
          return Inertia::render("Siswa/Form",[
            "user"=> User::with(["jurusan","tahunAjaran","pbSkl","tempat.user","dataSiswa"])->role("siswa")->where("id","=",$id)->first(),
            "pembimbing_sekolahs"=> User::with("roles")->role('pembimbing_sekolah')->get(),
            "dataSiswas"=>Datasiswa::get(),
            "jurusans"=>Jurusan::where("isActive","=","aktif")->get(),
            "tempats"=>Tempat::get(),
            "tahunAjarans"=>TahunAjaran::get(),
            "isEdit"=>true
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SiswaRequest $request, string $id)
    {
        $siswaId = User::findOrFail($id);
        $validate = $request->validated();
        $dataSiswa = Datasiswa::where("nisn","=",$validate["nisn"])->first();
        $siswaId->name = $dataSiswa->nama;
        $siswaId->nisn_id = $dataSiswa->id;

        $siswaId->email = $validate["email"];
        $siswaId->tempat_lahir= $validate["tempat_lahir"];
        $siswaId->tanggal_lahir= $validate["tanggal_lahir"];
        $siswaId->tahunAjaran_id =  $request->filled("tahunAjaran_id") ?$validate["tahunAjaran_id"]:$siswaId->tahunAjaran_id;
        $siswaId->pembimbing_sekolah_id =  $request->filled("pembimbing_sekolah_id") ?$validate["pembimbing_sekolah_id"]:$siswaId->pembimbing_sekolah_id;
        $siswaId->jurusan_id =  $request->filled("jurusan_id") ?$validate["jurusan_id"]:$siswaId->jurusan_id;
        $siswaId->tempat_id =  $request->filled("tempat_id") ?$validate["tempat_id"]:$siswaId->tempat_id;
        $siswaId->kontak = $validate["kontak"];
        
        $siswaId->save();
        return redirect()->back()->with("success","Sukses Mengubah Data Milik $siswaId->name");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $siswaId = User::findOrFail($id);

        if($siswaId){
            $siswaId->dataSiswa->isActive = false;
            $siswaId->save();


            $siswaId->delete();
        }
         return redirect()->route("siswa.index")->with("success","Sukses Menghapus Data Siswa");
    }
}
