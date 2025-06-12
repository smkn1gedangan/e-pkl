<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SiswaRequest extends FormRequest
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
            "nisn"=>['required',Rule::exists("datasiswas","nisn")],
            "email"=>['required', 'string', 'email',Rule::unique("users","email")->ignore($this->route("siswa"))],
            "jurusan_id"=>['required'],
            "tahunAjaran_id"=>['nullable'],
            "pembimbing_sekolah_id"=>['nullable'],
            "tempat_id"=>['nullable'],
            "kontak"=>['required',"regex:/^0[0-9]{9,12}$/"],
            "password"=>['nullable'],
        ];
    }
    public function messages() : array {
        return [
            "nisn.required"=>"Nisn Wajib Diisi",
            "email.required"=>"email Wajib Diisi",
            "email.unique"=>"Email Telah Terdaftar",
            "kontak.required"=>"Kontak Wajib Diisi",
            "kontak.regex"=>"Kontak Wajib 10 - 13 Karakter Dan Diawali Angka 0",
            "jurusan_id.required"=>"Jurusan Wajib Diisi",
            "password.required"=>"Password Wajib Diisi",
            "password.confirmed"=>"Konfirmasi Password Tidak Sama"
        ];
    }
}
