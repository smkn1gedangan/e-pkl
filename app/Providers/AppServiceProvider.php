<?php

namespace App\Providers;

use App\Models\Jurnal;
use App\Models\Laporan;
use App\Models\PengajuanTempat;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Inertia::share([
            "ptCount"=>function(){
                return PengajuanTempat::count();
            },
            "lpCount"=>function(){
                return Laporan::where("status","=","pending")->count();
            },
            "trashJurnalCount"=>function(){
               if(Auth::user()?->id){
                 return Jurnal::onlyTrashed()->where("user_id","=",Auth::user()->id)->count();
               }
            },
        ]);
    }
}
