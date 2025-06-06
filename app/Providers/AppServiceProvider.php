<?php

namespace App\Providers;

use App\Models\PengajuanTempat;
use App\Models\User;
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
            "siswaCount"=>function(){
                return User::with("roles")->where("isAccept","=","false")->role("siswa")->count();
            },
            "ptCount"=>function(){
                return PengajuanTempat::count();
            }
        ]);
    }
}
