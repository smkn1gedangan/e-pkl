<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Nilai extends Model
{
    protected $fillable = ['user_id',"nilai","keterangan","pembimbing_id"];

    public function pembimbing() : BelongsTo {
        return $this->belongsTo(User::class,"pembimbing_id","id","users");
    }
}
