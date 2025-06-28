<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Laporan extends Model
{
    protected $fillable = ["judul","isActive","user_id"];

    public function user() : BelongsTo {
        return $this->belongsTo(User::class,"user_id","id","users");
    }
}
