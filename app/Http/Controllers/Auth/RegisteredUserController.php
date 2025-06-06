<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Jurusan;
use App\Models\TahunAjaran;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register',[
            "jurusans"=>Jurusan::get(),
            "tahunAjarans"=>TahunAjaran::get()
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'jurusan_id' => 'required',
            'tahunAjaran_id' => 'required',
            'g-recaptcha-response' => 'required',
            'kontak' => 'required|regex:/^0[0-9]{9,12}$/',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ],[
            "name.required"=>"Nama Wajib Diisi",
            "jurusan_id.required"=>"Jurusan Wajib Dipilih",
            "tahunAjaran_id.required"=>"tahun Ajaran Wajib Dipilih",
            "kontak.regex"=>"Kontak Wajib Diisi 10 - 13 Karakter Dan Diawali Angka 0",
            "email.required"=>"Email Wajib Diisi",
            "email.unique"=>"Email Telah Digunakan",
            "password.required"=>"Password Wajib Diisi",
            "password.confirmed"=>"Pastikan Konfirmasi dan Password Sama",
            "g-recaptcha-response.required"=>"Captcha Wajib Di Centang"
        ]);
        $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
        'secret' => env('VITE_SECRET_KEY'),
        'response' => $request->input('g-recaptcha-response'),
        ]);
        if (!optional($response->json())['success']) {
        return back()->withErrors(['error' => 'Verifikasi CAPTCHA gagal.']);
    }
        $user = User::create([
            'name' => $request->name,
            'jurusan_id' => $request->jurusan_id,
            'kontak' => $request->kontak,
            'tahunAjaran_id' => $request->tahunAjaran_id,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $user->assignRole("siswa");
        event(new Registered($user));

        return redirect()->route('register')->with("success","Sukses    ");
    }
}
