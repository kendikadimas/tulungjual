<?php

namespace Database\Seeders;

use App\Models\DeveloperDetail;
use App\Models\Listing;
use App\Models\ListingPhoto;
use App\Models\ListingVideo;
use App\Models\PengiklanInfo;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ListingSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'user@tulungjual.id')->first();
        $developer = User::where('email', 'developer@tulungjual.id')->first();

        // 1. Rumah Minimalis Modern
        $l1 = Listing::create([
            'user_id' => $user->id,
            'slug' => Str::slug('Rumah Minimalis Modern 2 Lantai Siap Huni').'-'.Str::random(5),
            'jenis_iklan' => 'Jual',
            'jenis_properti' => 'Rumah',
            'judul' => 'Rumah Minimalis Modern 2 Lantai Siap Huni di Pusat Kota',
            'deskripsi' => 'Dijual rumah cantik 2 lantai dengan spesifikasi tinggi, lokasi sangat strategis, bebas banjir, dekat pusat perbelanjaan, sekolah, dan rumah sakit. Pencahayaan sangat baik dengan taman belakang.',
            'harga' => 850000000,
            'jenis_harga' => 'Nego',
            'bisa_nego' => true,
            'harga_promo' => 820000000,
            'metode_pembayaran' => 'Cash, KPR',
            'booking_fee' => 10000000,
            'provinsi' => 'Jawa Timur',
            'kota' => 'Kab. Tulungagung',
            'kecamatan' => 'Kedungwaru',
            'kelurahan' => 'Banjarsari',
            'kode_pos' => '66224',
            'alamat_lengkap' => 'Jl. Pahlawan No. 45, Kedungwaru, Tulungagung',
            'nama_jalan' => 'Jl. Pahlawan',
            'nomor_jalan' => '45',
            'patokan' => '100m dari SPBU Pahlawan',
            'titik_lat' => -8.067,
            'titik_lng' => 111.901,
            'privasi_lokasi' => 'tepat',
            'luas_tanah' => 120,
            'luas_bangunan' => 150,
            'lebar_tanah' => 8,
            'panjang_tanah' => 15,
            'jumlah_lantai' => 2,
            'kamar_tidur' => 4,
            'kamar_mandi' => 3,
            'toilet' => 1,
            'ruang_tamu' => 1,
            'ruang_keluarga' => 1,
            'ruang_makan' => 1,
            'dapur' => 1,
            'gudang' => 1,
            'balkon' => 1,
            'teras' => 1,
            'garasi' => 1,
            'carport' => 1,
            'kapasitas_parkir' => 2,
            'tahun_dibangun' => 2022,
            'tahun_renovasi' => 2024,
            'kondisi_bangunan' => 'Sangat Bagus',
            'status_furnitur' => 'Semi Furnished',
            'material_struktur' => 'Beton Bertulang',
            'material_dinding' => 'Bata Merah',
            'material_lantai' => 'Granit 60x60',
            'material_atap' => 'Baja Ringan & Genteng Beton',
            'facilities' => ['Carport', 'Garasi', 'Taman', 'CCTV', 'One Gate System', 'Keamanan'],
            'daya_listrik' => '2200 VA',
            'jenis_meteran' => 'Token (Prabayar)',
            'sumber_air' => 'PDAM & Sumur Bor',
            'internet_jaringan' => 'Fiber Optic (IndiHome)',
            'gas' => 'Tabung LPG',
            'status_sertifikat' => 'SHM - Sertifikat Hak Milik',
            'nomor_sertifikat' => 'SHM-3981/KDNGWARU-2022',
            'nama_pemegang_hak' => 'Budi Santoso',
            'luas_sertifikat' => 120,
            'status_sengketa' => 'Bebas Sengketa',
            'status_pbb' => 'Lunas 2025',
            'tahun_pbb' => 2025,
            'njop' => 450000000,
            'status_pbg_imb' => 'Ada (IMB 2022)',
            'kondisi_saat_ini' => 'Ditempati Pemilik',
            'status_transaksi' => 'Tersedia',
            'lebar_jalan' => '6 meter (2 mobil papasan)',
            'jenis_jalan' => 'Aspal',
            'akses_mobil' => true,
            'akses_truk' => false,
            'jarak_tol' => '15 menit',
            'jarak_stasiun' => '5 menit',
            'jarak_rs' => '3 menit',
            'jarak_sekolah' => '2 menit',
            'jarak_pasar' => '5 menit',
            'jarak_pusat_kota' => '3 menit',
            'orientasi' => 'Utara',
            'kontur_tanah' => 'Datar',
            'jenis_lingkungan' => 'Perumahan Tenang',
            'bebas_banjir' => true,
            'rawan_longsor' => false,
            'cara_dihubungi' => 'WA',
            'tampilkan_no_telepon' => true,
            'status_approval' => 'approved',
            'is_active' => true,
        ]);

        ListingPhoto::create([
            'listing_id' => $l1->id,
            'url_foto' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            'urutan' => 1,
        ]);
        ListingPhoto::create([
            'listing_id' => $l1->id,
            'url_foto' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
            'urutan' => 2,
        ]);
        ListingPhoto::create([
            'listing_id' => $l1->id,
            'url_foto' => 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
            'urutan' => 3,
        ]);
        ListingPhoto::create([
            'listing_id' => $l1->id,
            'url_foto' => 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
            'urutan' => 4,
        ]);
        ListingPhoto::create([
            'listing_id' => $l1->id,
            'url_foto' => 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80',
            'urutan' => 5,
        ]);

        ListingVideo::create([
            'listing_id' => $l1->id,
            'link_video' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'tipe' => 'walkthrough',
        ]);

        PengiklanInfo::create([
            'listing_id' => $l1->id,
            'nama_pengiklan' => 'Budi Santoso',
            'jenis_pengiklan' => 'Pemilik',
            'no_wa' => '081234567890',
            'telepon' => '081234567890',
            'email' => 'budi@gmail.com',
            'nama_perusahaan' => null,
            'hubungan_dengan_properti' => 'Pemilik',
            'pernyataan_kewenangan' => true,
        ]);


        // 2. Tanah Kavling Strategis
        $l2 = Listing::create([
            'user_id' => $user->id,
            'slug' => Str::slug('Tanah Kavling Siap Bangun Pinggir Jalan Utama').'-'.Str::random(5),
            'jenis_iklan' => 'Jual',
            'jenis_properti' => 'Tanah',
            'judul' => 'Tanah Kavling Siap Bangun Pinggir Jalan Utama Kota',
            'deskripsi' => 'Tanah komersial sangat strategis di pinggir jalan raya utama. Sangat cocok untuk perumahan, ruko, restoran, atau investasi masa depan. Kontur tanah rata dan siap bangun.',
            'harga' => 1200000000,
            'jenis_harga' => 'Nett',
            'bisa_nego' => false,
            'metode_pembayaran' => 'Cash',
            'provinsi' => 'Jawa Timur',
            'kota' => 'Kab. Tulungagung',
            'kecamatan' => 'Boyolangu',
            'kelurahan' => 'Beji',
            'alamat_lengkap' => 'Jl. Raya Boyolangu KM 3, Tulungagung',
            'titik_lat' => -8.082,
            'titik_lng' => 111.912,
            'privasi_lokasi' => 'tepat',
            'luas_tanah' => 500,
            'lebar_tanah' => 15,
            'panjang_tanah' => 33.3,
            'status_sertifikat' => 'SHM - Sertifikat Hak Milik',
            'nomor_sertifikat' => 'SHM-8821/BEJI-2021',
            'nama_pemegang_hak' => 'Budi Santoso',
            'luas_sertifikat' => 500,
            'status_sengketa' => 'Bebas Sengketa',
            'kondisi_saat_ini' => 'Kosong',
            'status_transaksi' => 'Tersedia',
            'jenis_tanah' => 'Darat / Pekarangan',
            'peruntukan_zonasi' => 'Komersial & Pemukiman',
            'akses_jalan_tanah' => 'Lebar 8 meter Asfal',
            'cocok_untuk_tanah' => ['Ruko', 'Perumahan', 'Gudang', 'Restoran', 'Investasi'],
            'bebas_banjir' => true,
            'rawan_longsor' => false,
            'cara_dihubungi' => 'WA',
            'tampilkan_no_telepon' => true,
            'status_approval' => 'approved',
            'is_active' => true,
        ]);

        ListingPhoto::create(['listing_id' => $l2->id, 'url_foto' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80', 'urutan' => 1]);
        ListingPhoto::create(['listing_id' => $l2->id, 'url_foto' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', 'urutan' => 2]);
        ListingPhoto::create(['listing_id' => $l2->id, 'url_foto' => 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80', 'urutan' => 3]);
        ListingPhoto::create(['listing_id' => $l2->id, 'url_foto' => 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80', 'urutan' => 4]);
        ListingPhoto::create(['listing_id' => $l2->id, 'url_foto' => 'https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=1200&q=80', 'urutan' => 5]);

        PengiklanInfo::create([
            'listing_id' => $l2->id,
            'nama_pengiklan' => 'Budi Santoso',
            'jenis_pengiklan' => 'Pemilik',
            'no_wa' => '081234567890',
            'hubungan_dengan_properti' => 'Pemilik',
            'pernyataan_kewenangan' => true,
        ]);


        // 3. Proyek Developer: Graha Harmony Cluster
        $l3 = Listing::create([
            'user_id' => $developer->id,
            'slug' => Str::slug('Graha Harmony Residence Cluster Minimalis Premium').'-'.Str::random(5),
            'jenis_iklan' => 'Jual',
            'jenis_properti' => 'Cluster',
            'judul' => 'Graha Harmony Residence - Perumahan Minimalis Premium One Gate System',
            'deskripsi' => 'Hunian eksklusif terbaru persembahan PT Graha Harmony Developer. Konsep perumahan ramah lingkungan dengan fasilitas clubhouse, taman bermain, dan keamanan 24 jam. Promo DP 0% & Free Biaya KPR.',
            'harga' => 650000000,
            'jenis_harga' => 'Harga Mulai',
            'bisa_nego' => true,
            'metode_pembayaran' => 'Cash, KPR, Bertahap',
            'booking_fee' => 5000000,
            'provinsi' => 'Jawa Timur',
            'kota' => 'Kab. Tulungagung',
            'kecamatan' => 'Tulungagung',
            'kelurahan' => 'Kepatihan',
            'alamat_lengkap' => 'Jl. Supriadi No. 88, Kepatihan, Tulungagung',
            'titik_lat' => -8.064,
            'titik_lng' => 111.905,
            'privasi_lokasi' => 'tepat',
            'luas_tanah' => 90,
            'luas_bangunan' => 70,
            'jumlah_lantai' => 2,
            'kamar_tidur' => 3,
            'kamar_mandi' => 2,
            'carport' => 2,
            'tahun_dibangun' => 2025,
            'kondisi_bangunan' => 'Baru (Indent / Ready)',
            'facilities' => ['One Gate System', 'CCTV', 'Keamanan', 'Playground', 'Clubhouse', 'Taman'],
            'status_sertifikat' => 'SHGB bisa naik SHM',
            'nomor_sertifikat' => 'HGB-10293/KEPATIHAN-2025',
            'nama_pemegang_hak' => 'PT Graha Harmony Developer',
            'status_sengketa' => 'Bebas Sengketa',
            'kondisi_saat_ini' => 'Tahap Pembangunan',
            'status_transaksi' => 'Tersedia',
            'bebas_banjir' => true,
            'cara_dihubungi' => 'WA',
            'tampilkan_no_telepon' => true,
            'status_approval' => 'approved',
            'is_active' => true,
        ]);

        ListingPhoto::create(['listing_id' => $l3->id, 'url_foto' => 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80', 'urutan' => 1]);
        ListingPhoto::create(['listing_id' => $l3->id, 'url_foto' => 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80', 'urutan' => 2]);
        ListingPhoto::create(['listing_id' => $l3->id, 'url_foto' => 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80', 'urutan' => 3]);
        ListingPhoto::create(['listing_id' => $l3->id, 'url_foto' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', 'urutan' => 4]);
        ListingPhoto::create(['listing_id' => $l3->id, 'url_foto' => 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80', 'urutan' => 5]);

        DeveloperDetail::create([
            'listing_id' => $l3->id,
            'nama_developer' => 'PT Graha Harmony Developer',
            'nama_proyek' => 'Graha Harmony Residence',
            'status_proyek' => 'Tahap Penjualan & Pembangunan',
            'jumlah_unit' => 50,
            'unit_tersedia' => 18,
            'tipe_unit' => 'Tipe 70/90 & Tipe 90/110',
            'harga_mulai' => 650000000,
            'booking_fee' => 5000000,
            'dp' => '0% (Subsidi DP)',
            'pilihan_kpr' => 'KPR Mandiri, BCA, BRI, BNI, BTN',
            'bank_partner' => 'Bank Mandiri & Bank BCA',
            'estimasi_serah_terima' => 'Desember 2025',
            'fasilitas_cluster' => 'Clubhouse, Kolam Renang, Playground, Keamanan 24 Jam, Access Card Gate',
            'video_marketing_link' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        ]);

        PengiklanInfo::create([
            'listing_id' => $l3->id,
            'nama_pengiklan' => 'Marketing PT Graha Harmony',
            'jenis_pengiklan' => 'Developer',
            'no_wa' => '082199887766',
            'telepon' => '082199887766',
            'email' => 'info@grahaharmony.co.id',
            'nama_perusahaan' => 'PT Graha Harmony Developer',
            'hubungan_dengan_properti' => 'Developer',
            'pernyataan_kewenangan' => true,
        ]);
    }
}
