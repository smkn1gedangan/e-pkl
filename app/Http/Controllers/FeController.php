<?php

namespace App\Http\Controllers;

use App\Models\Gambar;
use Illuminate\Http\Request;

use Inertia\Inertia;

class FeController extends Controller
{
    public function welcome()  {
    return Inertia::render('Welcome', [
        'gambars'=>Gambar::get()
    ]);
    }
}
