<?php

namespace App\Exports;

use App\Models\DataSiswa;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class DataSiswaExport implements FromCollection,WithHeadings
{

    public function __construct(public $request)  {
        
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
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
                "No Induk"=>substr($query->nisn,0,4),
                "No Jurusan"=>substr($query->nisn,-7),
                "aktivasi"=> $query->isActive ? "Aktif":"Belum Aktif"
            ];
        });
        return $datas;
    }
    public function headings() : array {
        return [
            "nama",'No Induk','No Jurusan',"aktivasi"
        ];
    }
}
