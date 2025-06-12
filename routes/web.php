<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataSiswaController;
use App\Http\Controllers\FeController;
use App\Http\Controllers\GambarController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\JurnalController;
use App\Http\Controllers\JurusanController;
use App\Http\Controllers\NilaiController;
use App\Http\Controllers\PembimbingController;
use App\Http\Controllers\PengajuanTempatController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\TahunAjaranController;
use App\Http\Controllers\TempatController;
use App\Models\PengajuanTempat;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [FeController::class,"welcome"])->name("welcome");


Route::middleware(['auth', 'verified'])->group(function(){
    Route::get('/dashboard', [DashboardController::class,"index"])->middleware("role:admin|pembimbing_sekolah|pembimbing_pt|siswa")->name("dashboard");
    Route::get('/dokumentasi', function(){
        return Inertia::render("Dokumentasi/Index");
    })->middleware("role:admin|pembimbing_sekolah|pembimbing_pt|siswa")->name("dokumentasi");
    
    Route::resource("data_siswa",DataSiswaController::class)->middleware(["role:admin"]);
    Route::post('data_siswa/import', [ImportController::class, 'importRegisterUser'])->name('data_siswa.import')->middleware(["role:admin"]);
    Route::resource("jurusan",JurusanController::class)->middleware(["role:admin"]);
    Route::resource("gambar",GambarController::class)->middleware(["role:admin"]);
    Route::resource("tahunAjaran",TahunAjaranController::class)->middleware(["role:admin"]);
    Route::resource("tempat",TempatController::class)->middleware(["role:admin"]);
    Route::resource("pembimbing",PembimbingController::class)->middleware(["role:admin"]);
    Route::resource("siswa",SiswaController::class)->middleware(["role:admin|pembimbing_pt|pembimbing_sekolah|siswa"]);
    Route::resource("rekap",JurnalController::class)->middleware(["role:admin|pembimbing_pt|pembimbing_sekolah|siswa"]);
   
    Route::resource("pengajuanTempat",PengajuanTempatController::class)->middleware(["role:siswa|admin"]);
    Route::resource("nilai",NilaiController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
