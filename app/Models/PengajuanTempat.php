<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PengajuanTempat extends Model
{
     protected $fillable = ["nama","kontak","bidang_usaha","alasan","user_id","lokasi","is"];

    public function user() : BelongsTo {
        return $this->BelongsTo(User::class);
    }
}
