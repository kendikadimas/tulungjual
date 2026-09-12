<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PengiklanInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'listing_id',
        'nama_pengiklan',
        'jenis_pengiklan',
        'no_wa',
        'telepon',
        'email',
        'nama_perusahaan',
        'hubungan_dengan_properti',
        'pernyataan_kewenangan',
    ];

    protected function casts(): array
    {
        return [
            'pernyataan_kewenangan' => 'boolean',
        ];
    }

    public function listing(): BelongsTo
    {
        return $this->belongsTo(Listing::class);
    }
}
