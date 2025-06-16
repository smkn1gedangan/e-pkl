<?php

namespace App\Exports;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\FromCollection;

class siswaExport implements FromCollection
{
    public function __construct(public $request)  {
        
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        
        $sortableRelations = [
            'jurusan_id' => ['table' => 'jurusans', 'foreign_key' => 'users.jurusan_id', 'column' => 'jurusans.nama'],
            'tahunAjaran_id' => ['table' => 'tahun_ajarans', 'foreign_key' => 'users.tahunAjaran_id', 'column' => 'tahun_ajarans.tahun'],
            'tempat_id' => ['table' => 'tempats', 'foreign_key' => 'users.tempat_id', 'column' => 'tempats.nama'],
        ];
        $sortBy = $this->request->input('sort_by')?: "user.created_at";
        $sortOrder = $this->request->input('sort_order')?: 'asc';


        $datas = User::query()->with(["jurusan","tahunAjaran","pbSkl","tempat.user","nilai.pembimbing","nilai"])
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
        ->when($this->request->filled("jurusan"),function($query){
            $query->whereHas("jurusan",function($q2) {
                $q2->where("nama","=",$this->request->input("jurusan"));
            });
        })
        ->when($this->request->filled("tahunAjaran"),function($query){
            $query->whereHas("tahunAjaran",function($q2) {
                $q2->where("tahun","=",$this->request->input("tahunAjaran"));
            });
        })
        ->when($this->request->filled("tempat"),function($query){
            $query->whereHas("tempat",function($q2) {
                $q2->where("nama","=",$this->request->input("tempat"));
            });
        })
        ->when($this->request->filled("search"),function($query) {
            $query->where(function($q2){
                $q2->where("users.name","like","%{$this->request->search}%")
            ->orWhere("users.email","like","%{$this->request->search}%")
            ->orWhere("users.kontak","like","%{$this->request->search}%")
            ->orWhereHas("jurusan",function($q2) {
                $q2->where("nama", "like","%". $this->request->search . "%");
                })
            ->orWhereHas("tahunAjaran",function($q2) {
                $q2->where("tahun", "like","%". $this->request->search . "%");
            })
            ->orWhereHas("tempat",function($q2) {
                $q2->where("nama", "like","%". $this->request->search . "%");
            })
            ->orWhereHas("tempat.user",function($q2) {
                $q2->where("name", "like","%". $this->request->search . "%");
            })
            ->orWhereHas("pbSkl",function($q2) {
                $q2->where("name", "like","%". $this->request->search . "%");
            });
        });
        })
        ->when(array_key_exists($sortBy, $sortableRelations),function($query) use($sortableRelations,$sortBy,$sortOrder){
             $relation = $sortableRelations[$sortBy];
                $query->join($relation['table'], $relation['foreign_key'], '=', "{$relation['table']}.id")
                    ->orderBy($relation['column'], $sortOrder)
                    ->select('users.*');
        })

        ->orderBy($this->request->input("sort_by")?: "users.created_at",$this->request->input("sort_order")?: "desc")
        ->role("siswa")->get()->map(function($query){
            return [        
                "nama"=>$query->name,
                "email"=>$query->email,
                "kontak"=>$query->kontak,
                "jurusan"=>$query->jurusan->nama,
                "tempat"=>$query->tempat?->nama,
                "pembimbing_pt"=>$query->tempat?->user?->name,
                "pembimbing_sekolah"=>$query->pbSkl?->name,
                "nilai" => $query->nilai instanceof \Illuminate\Support\Collection 
                ? $query->nilai->pluck('nilai')->implode(', ') 
                : ($query->nilai?->nilai ?? "-"),
                ];
        });
        return $datas;
    }
}
