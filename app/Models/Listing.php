<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Listing extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Delete stored media files when a listing is removed.
     */
    protected static function booted(): void
    {
        static::deleting(function (Listing $listing) {
            $disk = Storage::disk('public');

            foreach ($listing->photos as $photo) {
                $path = ltrim(Str::after($photo->url_foto, '/storage/'), '/');
                if ($path && ! Str::startsWith($path, ['http://', 'https://']) && $disk->exists($path)) {
                    $disk->delete($path);
                }
            }

            if ($dev = $listing->developerDetail) {
                foreach (['site_plan_url', 'brosur_url'] as $field) {
                    $url = $dev->{$field};
                    if (! $url) {
                        continue;
                    }
                    $path = ltrim(Str::after($url, '/storage/'), '/');
                    if ($path && ! Str::startsWith($path, ['http://', 'https://']) && $disk->exists($path)) {
                        $disk->delete($path);
                    }
                }
            }

            // Bukti pembayaran
            if ($listing->payment_proof_url) {
                $path = ltrim(Str::after($listing->payment_proof_url, '/storage/'), '/');
                if ($path && ! Str::startsWith($path, ['http://', 'https://']) && $disk->exists($path)) {
                    $disk->delete($path);
                }
            }
        });
    }

    /**
     * Hidden by default from JSON / Array serialization to guarantee security for public API outputs.
     */
    protected $hidden = [
        'nomor_sertifikat',
        'nama_pemegang_hak',
        'payment_proof_url',
        'payment_sender_name',
        'payment_note',
        'payment_verified_by',
    ];

    protected function casts(): array
    {
        return [
            'bisa_nego' => 'boolean',
            'facilities' => 'array',
            'cocok_untuk_tanah' => 'array',
            'cocok_untuk_komersial' => 'array',
            'akses_mobil' => 'boolean',
            'akses_truk' => 'boolean',
            'bebas_banjir' => 'boolean',
            'rawan_longsor' => 'boolean',
            'tampilkan_no_telepon' => 'boolean',
            'is_active' => 'boolean',
            'luas_tanah' => 'float',
            'luas_bangunan' => 'float',
            'lebar_tanah' => 'float',
            'panjang_tanah' => 'float',
            'luas_sertifikat' => 'float',
            'lebar_muka' => 'float',
            'titik_lat' => 'float',
            'titik_lng' => 'float',
            'payment_verified_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function photos(): HasMany
    {
        return $this->hasMany(ListingPhoto::class)->orderBy('urutan', 'asc');
    }

    public function videos(): HasMany
    {
        return $this->hasMany(ListingVideo::class);
    }

    public function developerDetail(): HasOne
    {
        return $this->hasOne(DeveloperDetail::class);
    }

    public function pengiklanInfo(): HasOne
    {
        return $this->hasOne(PengiklanInfo::class);
    }

    public function paymentVerifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'payment_verified_by');
    }

    /**
     * Apakah bukti pembayaran sudah diunggah oleh pengiklan?
     */
    public function hasPaymentProof(): bool
    {
        return ! empty($this->payment_proof_url);
    }

    /**
     * Apakah pembayaran sudah diverifikasi admin?
     */
    public function isPaymentVerified(): bool
    {
        return $this->payment_status === 'verified';
    }

    public function paymentStatusLabel(): string
    {
        return match ($this->payment_status) {
            'verified' => 'Terverifikasi',
            'pending' => 'Menunggu Verifikasi',
            'rejected' => 'Ditolak',
            default => 'Belum Bayar',
        };
    }

    /**
     * Scope for public listings (only approved and active)
     */
    public function scopePublicApproved($query)
    {
        return $query->where('status_approval', 'approved')->where('is_active', true);
    }
}
