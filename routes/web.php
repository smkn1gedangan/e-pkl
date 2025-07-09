<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataSiswaController;
use App\Http\Controllers\FeController;
use App\Http\Controllers\GambarController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\JurnalController;
use App\Http\Controllers\JurusanController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\NilaiController;
use App\Http\Controllers\PembimbingController;
use App\Http\Controllers\PengajuanTempatController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\TahunAjaranController;
use App\Http\Controllers\TempatController;
use App\Http\Controllers\TrashJurnalController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [FeController::class,"welcome"])->name("welcome");



// excel diluar middlewre auth dan verified ,sementara pdf di dalam middleware auth
Route::get('data_siswa/export/', [ImportController::class, 'exportDataSiswas'])->name('data_siswas.export')->middleware(["role:admin",'throttle:6,1']);

Route::get('jurnals/export/', [ImportController::class, 'exportJurnals'])->name('jurnals.export')->middleware(["role:admin|pembimbing_pt|pembimbing_sekolah|siswa",'throttle:6,1']);

Route::get('siswas/export/', [ImportController::class, 'exportSiswas'])->name('exportSiswas')->middleware(["role:admin|pembimbing_pt|pembimbing_sekolah",'throttle:6,1']);


Route::middleware(['auth', 'verified'])->group(function(){
    

    Route::get('siswa/export/{id}', [ImportController::class, 'exportSiswaToPdf'])->name('exportSiswaToPdf');

    
    Route::get('/dashboard', [DashboardController::class,"index"])->middleware("role:admin|pembimbing_sekolah|pembimbing_pt|siswa")->name("dashboard");
    
    Route::put('/dashboard/update/{id}', [DashboardController::class,"update"])->middleware("role:admin|pembimbing_sekolah|pembimbing_pt|siswa")->name("dashboard.update");
    Route::get('/dokumentasi', function(){
        return Inertia::render("Dokumentasi/Index");
    })->middleware("role:admin|pembimbing_sekolah|pembimbing_pt|siswa")->name("dokumentasi");
    
    Route::resource("data_siswa",DataSiswaController::class)->middleware(["role:admin"]);
    
    Route::post('data_siswa/import', [ImportController::class, 'importRegisterUser'])->name('data_siswas.import')->middleware(["role:admin"]);


    Route::resource("laporan",LaporanController::class)->middleware(["role:siswa|admin|pembimbing_pt|pembimbing_sekolah"]);

    Route::get('laporan/export/format_penulisan_laporan', [ImportController::class, 'exportFormatlaporan'])->name('exportFormatlaporan')->middleware(['role:siswa','throttle:6,1']);

    Route::get('laporan/export/laporan', [ImportController::class, 'exportLaporan'])->name('exportLaporan')->middleware(['role:siswa','throttle:6,1']);

    Route::resource("jurusan",JurusanController::class)->middleware(["role:admin"]);
    Route::resource("gambar",GambarController::class)->middleware(["role:admin"]);
    Route::resource("tahunAjaran",TahunAjaranController::class)->middleware(["role:admin"]);
    
    Route::resource("tempat",TempatController::class)->middleware(["role:admin"]);
    Route::get("tempat/export/{id}",[ImportController::class,"exportTempat"])->name("tempat.export")->middleware(['role:admin','throttle:20,1']);

    
    Route::resource("pembimbing",PembimbingController::class)->middleware(["role:admin"]);
    Route::resource("siswa",SiswaController::class)->middleware(["role:admin|pembimbing_pt|pembimbing_sekolah|siswa"]);

    Route::resource("jurnal",JurnalController::class)->middleware(["role:admin|pembimbing_pt|pembimbing_sekolah|siswa"]);
    Route::resource("trashJurnal",TrashJurnalController::class)->middleware(["role:siswa"]);
   
    Route::resource("pengajuanTempat",PengajuanTempatController::class)->middleware(["role:siswa|admin"]);
    Route::resource("nilai",NilaiController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
