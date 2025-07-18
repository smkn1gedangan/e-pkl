<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Jurnal extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = ["photo","keterangan","kegiatan","user_id","mark"];

    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

}
