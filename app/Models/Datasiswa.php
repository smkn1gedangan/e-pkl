<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Datasiswa extends Model
{
protected $fillable = ["nama","nisn","isActive"];

public function user() : HasOne {
    return $this->hasOne(User::class,"nisn_id","id");
}
}
