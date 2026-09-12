<?php

namespace Database\Factories;

use App\Models\Listing;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Listing>
 */
class ListingFactory extends Factory
{
    protected $model = Listing::class;

    public function definition(): array
    {
        $judul = fake()->sentence(4);

        return [
            'user_id' => User::factory(),
            'slug' => Str::slug($judul).'-'.Str::lower(Str::random(6)),

            // 4.1 Dasar
            'jenis_iklan' => 'Jual',
            'jenis_properti' => 'Rumah',
            'judul' => $judul,
            'deskripsi' => fake()->paragraph(),

            // 4.2 Harga
            'harga' => fake()->numberBetween(100_000_000, 2_000_000_000),
            'jenis_harga' => 'Nego',
            'bisa_nego' => true,

            // 4.3 Lokasi
            'provinsi' => 'Jawa Timur',
            'kota' => 'Kab. Tulungagung',
            'kecamatan' => 'Gondang',
            'kelurahan' => 'Bendungan',
            'alamat_lengkap' => fake()->address(),
            'privasi_lokasi' => 'tepat',

            // 4.4 Fisik
            'luas_tanah' => 120,
            'luas_bangunan' => 90,
            'kamar_tidur' => 3,
            'kamar_mandi' => 2,

            // 4.5 Spesifikasi
            'kondisi_bangunan' => 'Bagus',

            // 4.8 Legalitas
            'status_sertifikat' => 'SHM - Sertifikat Hak Milik',
            'status_sengketa' => 'Bebas Sengketa',

            // 4.9 Status
            'kondisi_saat_ini' => 'Kosong',
            'status_transaksi' => 'Tersedia',

            // Approval
            'status_approval' => 'pending',
            'is_active' => true,
        ];
    }

    public function approved(): static
    {
        return $this->state(fn () => [
            'status_approval' => 'approved',
            'is_active' => true,
        ]);
    }
}
