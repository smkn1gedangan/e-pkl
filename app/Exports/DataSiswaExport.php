<?php

namespace App\Exports;

use App\Models\Datasiswa;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class DataSiswaExport implements FromView
{

    public function __construct(public $request)  {
        
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function view():View
    {
        $datas = Datasiswa::query()
        ->when($this->request->filled("kode"),function($query){
            $query->whereRaw('SUBSTRING_INDEX(nisn,".",-1)=?',[$this->request->kode]);
        })
        ->when($this->request->filled("aktivasi"),function($query){
            $query->where('isActive',"=",filter_var($this->request->input('aktivasi'), FILTER_VALIDATE_BOOLEAN));
        })
        ->when($this->request->filled("search") , function($query){
            $query->where("nama","like","%{$this->request->search}%")
            ->orWhere("nisn","like","%{$this->request->search}%");
        })
        ->orderBy($this->request->input("sort_by")?:"created_at",$this->request->input("sort_order")?: "desc")
        ->get()->map(function($query){
            return [
                "nama"=>$query->nama,
                "induk"=>substr($query->nisn,0,4),
                "jurusan"=>substr($query->nisn,-7),
                "aktivasi"=> $query->isActive ? "Aktif":"Belum Aktif"
            ];
        });
        return view("excel.datasiswa",compact("datas"));
    }
}
