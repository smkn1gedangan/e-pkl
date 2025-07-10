<?php

namespace App\Http\Controllers;

use App\Models\Gambar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class FeController extends Controller
{
    public function welcome()  {

    $gambars = Cache::remember('welcome_gambars', 3600 * 24 * 30, function () {
        return Gambar::latest()->get();
    });
    return Inertia::render('Welcome', [
        'gambars'=>$gambars
    ]);
    }
}
