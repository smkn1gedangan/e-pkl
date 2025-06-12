<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;
class UserRequest extends FormRequest
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
            'nisn' => 'required|string|max:255',
            'jurusan_id' => 'required',
            'tahunAjaran_id' => 'required',
            'g-recaptcha-response' => 'required',
            'kontak' => 'required|regex:/^0[0-9]{9,12}$/',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];
    }
    public function messages() : array {
        return [
            "nisn.required"=>"Nama Wajib Diisi",
            "jurusan_id.required"=>"Jurusan Wajib Dipilih",
            "tahunAjaran_id.required"=>"tahun Ajaran Wajib Dipilih",
            "kontak.regex"=>"Kontak Wajib Diisi 10 - 13 Karakter Dan Diawali Angka 0",
            "email.required"=>"Email Wajib Diisi",
            "email.unique"=>"Email Telah Digunakan",
            "password.required"=>"Password Wajib Diisi",
            "password.confirmed"=>"Pastikan Konfirmasi dan Password Sama",
            "g-recaptcha-response.required"=>"Captcha Wajib Di Centang"
        ];
    }
}
