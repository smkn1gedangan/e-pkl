<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\Datasiswa;
use App\Models\Jurusan;
use App\Models\TahunAjaran;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{

    public function index()  {
        return redirect()->route("aktivasi");
    }
    /**
     * Display the registration view.
     */
   public function edit($id): RedirectResponse|Response
    {
        $siswaId = Crypt::decrypt($id);

        $siswa = Datasiswa::find($siswaId);

        if(!$siswa){
            return redirect()->route("aktivasi");
        }
        $user = User::where("name", $siswa->nama)->first();
         
        if($siswa->isActive && $user){
            return redirect()->route("login")->with("error", "Nomor Aktivasi telah di registrasi. Silahkan Login");
        }

        if (!$siswa) {
            return redirect()->route("aktivasi")->with("error", "Data siswa tidak ditemukan.");
        }

        return Inertia::render('Auth/Register', [
            "siswa" => $siswa,
            "jurusans"=>Jurusan::where("isActive","=","aktif")->get(),
            "tahunAjarans" => TahunAjaran::get(),
        ]);
    }


    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(UserRequest $request): RedirectResponse
    {
        $request->validated();



        $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
        'secret' => env('VITE_SECRET_KEY'),
        'response' => $request->input('g-recaptcha-response'),
        ]);

        if (!optional($response->json())['success']) {
        return back()->withErrors(['error' => 'Verifikasi CAPTCHA gagal.']);
        }

        $regisId = Datasiswa::where("nisn",$request->nisn)->first();

       
        $user = User::create([
            'name' => $regisId->nama,   
            'nisn_id' => $regisId->id,   
            'jurusan_id' => $request->jurusan_id,
            'kontak' => $request->kontak,
            'tahunAjaran_id' => $request->tahunAjaran_id,
            'email' => $request->email,
            'tempat_lahir' => $request->tempat_lahir,
            'tanggal_lahir' => $request->tanggal_lahir,
            'password' => Hash::make($request->password),
        ]);
        $user->assignRole("siswa");

        event(new Registered($user));
        
        return redirect()->route('login')->with("success","Sukses Aktivasi dan Registrasi Akun Baru");
    }
}
