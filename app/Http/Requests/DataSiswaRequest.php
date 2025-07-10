<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DataSiswaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "induk"=>["required","min:3","max:7",Rule::unique("datasiswas","nisn")->ignore($this->route("data_siswa"))],
            "jurusan"=>["required","min:3","max:20"],
            "nama"=>["required","min:3","max:90"],
            "isActive"=>["boolean"],
        ];
    }
    public function messages() : array {
        return [
            "induk.required"=>"No Induk Wajib Diisi Antara 3 - 7 Karakter",
            "indux.unique"=>"No Induk Telah Ada",
            "jurusan.required"=>"No Induk Wajib Diisi Antara 3 - 20 Karakter",
            "nama.required"=>"Nama Wajib Diisi Antara 3 - 40 Karakter"
        ];
    }
}
