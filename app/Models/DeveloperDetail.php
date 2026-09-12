<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DeveloperDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'listing_id',
        'nama_developer',
        'nama_proyek',
        'status_proyek',
        'jumlah_unit',
        'unit_tersedia',
        'tipe_unit',
        'harga_mulai',
        'booking_fee',
        'dp',
        'pilihan_kpr',
        'bank_partner',
        'estimasi_serah_terima',
        'fasilitas_cluster',
        'site_plan_url',
        'brosur_url',
        'video_marketing_link',
    ];

    public function listing(): BelongsTo
    {
        return $this->belongsTo(Listing::class);
    }
}
