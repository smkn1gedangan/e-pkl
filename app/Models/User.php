<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Notifications\CustomResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable , HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        "nisn_id",
        'email',
        'jurusan_id',
        'tahunAjaran_id',
        'tempat_id',
        'pembimbing_pt_id',
        'pembimbing_sekolah_id',
        "tempat_lahir",
        "tanggal_lahir",
        'kontak',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function sendPasswordResetNotification($token)  {
        $this->notify(new CustomResetPassword($token));
    }
    public function jurusan() : BelongsTo {
        return $this->belongsTo(Jurusan::class);
    }
    public function tahunAjaran() : BelongsTo {
        return $this->belongsTo(TahunAjaran::class,"tahunAjaran_id","id","tahun_ajarans");
    }
    public function tempat() : BelongsTo {
        return $this->belongsTo(Tempat::class);
    }
    public function tempatYangDibimbing() : HasOne {
        return $this->hasOne(Tempat::class,"pembimbing_id","id");
    }
    public function pbSkl()  {
        return $this->belongsTo(User::class,"pembimbing_sekolah_id");
    }
    public function nilai() : HasMany {
        return $this->hasMany(Nilai::class,"user_id","id");
    }

    public function pengajuanTempat() : HasOne {
        return $this->hasOne(PengajuanTempat::class,"user_id","id");
    }
 
    public function dataSiswa() : BelongsTo {
        return $this->belongsTo(Datasiswa::class,"nisn_id","id","datasiswas");
    }

    public function jurnals() : HasMany {
        return $this->hasMany(Jurnal::class,"user_id","id");
    }
}
