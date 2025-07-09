<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tempat extends Model
{
    protected $fillable = ["nama","kontak","bidang_usaha","pembimbing_id","lokasi"];

    public function user() : BelongsTo {
        return $this->BelongsTo(User::class,"pembimbing_id","id","users");
    }

    public function siswas() : HasMany {
        return $this->hasMany(User::class,"tempat_id","id");
    }
}
