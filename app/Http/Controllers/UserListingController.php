<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\DeveloperDetail;
use App\Models\Listing;
use App\Models\ListingPhoto;
use App\Models\ListingVideo;
use App\Models\PengiklanInfo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class UserListingController extends Controller
{
    public function index(Request $request): Response
    {
        $listings = Listing::with(['photos', 'pengiklanInfo'])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->paginate(10);

        return Inertia::render('User/Listings/Index', [
            'listings' => $listings,
        ]);
    }

    public function create(): Response
    {
        $categories = Category::where('is_active', true)->get();

        return Inertia::render('User/Listings/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            // 4.1 Dasar
            'jenis_iklan' => 'required|string',
            'jenis_properti' => 'required|string',
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',

            // 4.2 Harga
            'harga' => 'required|numeric|min:0',
            'jenis_harga' => 'required|string',
            'bisa_nego' => 'required|boolean',

            // 4.3 Lokasi
            'provinsi' => 'required|string',
            'kota' => 'required|string',
            'kecamatan' => 'required|string',
            'kelurahan' => 'required|string',
            'alamat_lengkap' => 'required|string',
            'privasi_lokasi' => 'required|in:tepat,perkiraan',

            // 4.4 Fisik
            'luas_tanah' => 'required|numeric|min:0',

            // 4.5 Spesifikasi
            'kondisi_bangunan' => 'required|string',

            // 4.8 Legalitas
            'status_sertifikat' => 'required|string',
            'status_sengketa' => 'required|string',

            // 4.9 Status
            'kondisi_saat_ini' => 'required|string',
            'status_transaksi' => 'required|string',

            // 4.11 Foto & Video Links
            'photos' => 'required|array|min:5',
            'photos.*' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120',
            'link_video_walkthrough' => 'nullable|url|max:255',
            'link_video_lingkungan' => 'nullable|url|max:255',
            'link_video_drone' => 'nullable|url|max:255',

            // 4.14 Khusus Developer
            'site_plan_file' => 'nullable|file|mimes:jpeg,png,jpg,webp,pdf|max:10240',
            'brosur_file' => 'nullable|file|mimes:pdf|max:15360',
            'video_marketing_link' => 'nullable|url|max:255',

            // 4.12 Data Pengiklan
            'nama_pengiklan' => 'required|string|max:255',
            'jenis_pengiklan' => 'required|string',
            'no_wa' => 'required|string|max:255',

            // 4.13 Hubungan & Kewenangan
            'pernyataan_kewenangan' => 'accepted',

            // 4.18 Persetujuan 3 checkbox
            'setuju_sk' => 'accepted',
            'setuju_benar' => 'accepted',
            'setuju_platform' => 'accepted',
        ]);

        DB::transaction(function () use ($request) {
            $slug = Str::slug($request->judul) . '-' . Str::lower(Str::random(6));

            $listing = Listing::create([
                'user_id' => $request->user()->id,
                'slug' => $slug,
                'jenis_iklan' => $request->jenis_iklan,
                'jenis_properti' => $request->jenis_properti,
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'harga' => $request->harga,
                'jenis_harga' => $request->jenis_harga,
                'bisa_nego' => (bool) $request->bisa_nego,
                'harga_promo' => $request->harga_promo ?: null,
                'metode_pembayaran' => $request->metode_pembayaran ?: null,
                'booking_fee' => $request->booking_fee ?: null,
                'provinsi' => $request->provinsi,
                'kota' => $request->kota,
                'kecamatan' => $request->kecamatan,
                'kelurahan' => $request->kelurahan,
                'kode_pos' => $request->kode_pos ?: null,
                'alamat_lengkap' => $request->alamat_lengkap,
                'nama_jalan' => $request->nama_jalan ?: null,
                'nomor_jalan' => $request->nomor_jalan ?: null,
                'patokan' => $request->patokan ?: null,
                'titik_lat' => $request->titik_lat ?: null,
                'titik_lng' => $request->titik_lng ?: null,
                'privasi_lokasi' => $request->privasi_lokasi ?: 'tepat',
                'luas_tanah' => $request->luas_tanah,
                'luas_bangunan' => $request->luas_bangunan ?: null,
                'lebar_tanah' => $request->lebar_tanah ?: null,
                'panjang_tanah' => $request->panjang_tanah ?: null,
                'jumlah_lantai' => $request->jumlah_lantai ?: null,
                'kamar_tidur' => $request->kamar_tidur ?: null,
                'kamar_mandi' => $request->kamar_mandi ?: null,
                'toilet' => $request->toilet ?: null,
                'ruang_tamu' => $request->ruang_tamu ?: null,
                'ruang_keluarga' => $request->ruang_keluarga ?: null,
                'ruang_makan' => $request->ruang_makan ?: null,
                'dapur' => $request->dapur ?: null,
                'gudang' => $request->gudang ?: null,
                'balkon' => $request->balkon ?: null,
                'teras' => $request->teras ?: null,
                'garasi' => $request->garasi ?: null,
                'carport' => $request->carport ?: null,
                'kapasitas_parkir' => $request->kapasitas_parkir ?: null,
                'tahun_dibangun' => $request->tahun_dibangun ?: null,
                'tahun_renovasi' => $request->tahun_renovasi ?: null,
                'kondisi_bangunan' => $request->kondisi_bangunan ?: 'Bagus',
                'status_furnitur' => $request->status_furnitur ?: null,
                'material_struktur' => $request->material_struktur ?: null,
                'material_dinding' => $request->material_dinding ?: null,
                'material_lantai' => $request->material_lantai ?: null,
                'material_atap' => $request->material_atap ?: null,
                'facilities' => $request->facilities ?: [],
                'daya_listrik' => $request->daya_listrik ?: null,
                'jenis_meteran' => $request->jenis_meteran ?: null,
                'sumber_air' => $request->sumber_air ?: null,
                'internet_jaringan' => $request->internet_jaringan ?: null,
                'gas' => $request->gas ?: null,
                'status_sertifikat' => $request->status_sertifikat,
                'nomor_sertifikat' => $request->nomor_sertifikat ?: null,
                'nama_pemegang_hak' => $request->nama_pemegang_hak ?: null,
                'luas_sertifikat' => $request->luas_sertifikat ?: null,
                'status_sengketa' => $request->status_sengketa ?: 'Bebas Sengketa',
                'status_pbb' => $request->status_pbb ?: null,
                'tahun_pbb' => $request->tahun_pbb ?: null,
                'njop' => $request->njop ?: null,
                'status_pbg_imb' => $request->status_pbg_imb ?: null,
                'kondisi_saat_ini' => $request->kondisi_saat_ini ?: 'Kosong',
                'status_transaksi' => $request->status_transaksi ?: 'Tersedia',
                'lebar_jalan' => $request->lebar_jalan ?: null,
                'jenis_jalan' => $request->jenis_jalan ?: null,
                'akses_mobil' => (bool) $request->akses_mobil,
                'akses_truk' => (bool) $request->akses_truk,
                'jarak_tol' => $request->jarak_tol ?: null,
                'jarak_stasiun' => $request->jarak_stasiun ?: null,
                'jarak_bandara' => $request->jarak_bandara ?: null,
                'jarak_rs' => $request->jarak_rs ?: null,
                'jarak_sekolah' => $request->jarak_sekolah ?: null,
                'jarak_pasar' => $request->jarak_pasar ?: null,
                'jarak_pusat_kota' => $request->jarak_pusat_kota ?: null,
                'orientasi' => $request->orientasi ?: null,
                'kontur_tanah' => $request->kontur_tanah ?: null,
                'jenis_lingkungan' => $request->jenis_lingkungan ?: null,
                'bebas_banjir' => (bool) $request->bebas_banjir,
                'rawan_longsor' => (bool) $request->rawan_longsor,
                'jenis_tanah' => $request->jenis_tanah ?: null,
                'peruntukan_zonasi' => $request->peruntukan_zonasi ?: null,
                'akses_jalan_tanah' => $request->akses_jalan_tanah ?: null,
                'cocok_untuk_tanah' => $request->cocok_untuk_tanah ?: [],
                'lebar_muka' => $request->lebar_muka ?: null,
                'area_parkir' => $request->area_parkir ?: null,
                'cocok_untuk_komersial' => $request->cocok_untuk_komersial ?: [],
                'cara_dihubungi' => $request->cara_dihubungi ?: 'WA',
                'tampilkan_no_telepon' => (bool) $request->tampilkan_no_telepon,
                'status_approval' => 'pending',
                'is_active' => true,
            ]);

            // Photos
            if ($request->hasFile('photos')) {
                foreach ($request->file('photos') as $idx => $photo) {
                    $path = $photo->store('listings/photos', 'public');
                    ListingPhoto::create([
                        'listing_id' => $listing->id,
                        'url_foto' => Storage::url($path),
                        'urutan' => $idx + 1,
                    ]);
                }
            } elseif (is_array($request->photos)) {
                // If provided as URL strings (seeders/sample)
                foreach ($request->photos as $idx => $url) {
                    if (is_string($url)) {
                        ListingPhoto::create([
                            'listing_id' => $listing->id,
                            'url_foto' => $url,
                            'urutan' => $idx + 1,
                        ]);
                    }
                }
            }

            // Videos (Link only)
            if ($request->filled('link_video_walkthrough')) {
                ListingVideo::create([
                    'listing_id' => $listing->id,
                    'link_video' => $request->link_video_walkthrough,
                    'tipe' => 'walkthrough',
                ]);
            }
            if ($request->filled('link_video_lingkungan')) {
                ListingVideo::create([
                    'listing_id' => $listing->id,
                    'link_video' => $request->link_video_lingkungan,
                    'tipe' => 'lingkungan',
                ]);
            }
            if ($request->filled('link_video_drone')) {
                ListingVideo::create([
                    'listing_id' => $listing->id,
                    'link_video' => $request->link_video_drone,
                    'tipe' => 'drone',
                ]);
            }

            // Pengiklan Info
            PengiklanInfo::create([
                'listing_id' => $listing->id,
                'nama_pengiklan' => $request->nama_pengiklan,
                'jenis_pengiklan' => $request->jenis_pengiklan,
                'no_wa' => $request->no_wa,
                'telepon' => $request->telepon ?: null,
                'email' => $request->email ?: null,
                'nama_perusahaan' => $request->nama_perusahaan ?: null,
                'hubungan_dengan_properti' => $request->hubungan_dengan_properti ?: null,
                'pernyataan_kewenangan' => (bool) $request->pernyataan_kewenangan,
            ]);

            // Developer Details (if developer)
            if ($request->jenis_pengiklan === 'Developer') {
                $sitePlanUrl = null;
                if ($request->hasFile('site_plan_file')) {
                    $sitePlanUrl = Storage::url($request->file('site_plan_file')->store('listings/developer', 'public'));
                }
                $brosurUrl = null;
                if ($request->hasFile('brosur_file')) {
                    $brosurUrl = Storage::url($request->file('brosur_file')->store('listings/developer', 'public'));
                }

                DeveloperDetail::create([
                    'listing_id' => $listing->id,
                    'nama_developer' => $request->nama_developer ?: null,
                    'nama_proyek' => $request->nama_proyek ?: null,
                    'status_proyek' => $request->status_proyek ?: null,
                    'jumlah_unit' => $request->jumlah_unit ?: null,
                    'unit_tersedia' => $request->unit_tersedia ?: null,
                    'tipe_unit' => $request->tipe_unit ?: null,
                    'harga_mulai' => $request->harga_mulai ?: null,
                    'booking_fee' => $request->dev_booking_fee ?: null,
                    'dp' => $request->dp ?: null,
                    'pilihan_kpr' => $request->pilihan_kpr ?: null,
                    'bank_partner' => $request->bank_partner ?: null,
                    'estimasi_serah_terima' => $request->estimasi_serah_terima ?: null,
                    'fasilitas_cluster' => $request->fasilitas_cluster ?: null,
                    'site_plan_url' => $sitePlanUrl,
                    'brosur_url' => $brosurUrl,
                    'video_marketing_link' => $request->video_marketing_link ?: null,
                ]);
            }
        });

        return redirect()->route('user.listings.index')->with('success', 'Iklan berhasil diajukan dan sedang menunggu peninjauan admin!');
    }

    public function edit(Request $request, Listing $listing): Response
    {
        if ($listing->user_id !== $request->user()->id && ! $request->user()->isAdmin()) {
            abort(403);
        }

        $listing->load(['photos', 'videos', 'developerDetail', 'pengiklanInfo']);
        $categories = Category::where('is_active', true)->get();

        return Inertia::render('User/Listings/Edit', [
            'listing' => $listing,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Listing $listing): RedirectResponse
    {
        if ($listing->user_id !== $request->user()->id && ! $request->user()->isAdmin()) {
            abort(403);
        }

        $request->validate([
            // 4.1 Dasar
            'jenis_iklan' => 'required|string',
            'jenis_properti' => 'required|string',
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',

            // 4.2 Harga
            'harga' => 'required|numeric|min:0',
            'jenis_harga' => 'required|string',
            'bisa_nego' => 'required|boolean',

            // 4.3 Lokasi
            'provinsi' => 'required|string',
            'kota' => 'required|string',
            'kecamatan' => 'required|string',
            'kelurahan' => 'required|string',
            'alamat_lengkap' => 'required|string',
            'privasi_lokasi' => 'required|in:tepat,perkiraan',

            // 4.4 Fisik
            'luas_tanah' => 'required|numeric|min:0',

            // 4.5 Spesifikasi
            'kondisi_bangunan' => 'required|string',

            // 4.8 Legalitas
            'status_sertifikat' => 'required|string',
            'status_sengketa' => 'required|string',

            // 4.9 Status
            'kondisi_saat_ini' => 'required|string',
            'status_transaksi' => 'required|string',

            // Foto tambahan
            'new_photos' => 'nullable|array',
            'new_photos.*' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',

            // 4.11 Video (Link)
            'link_video_walkthrough' => 'nullable|url|max:255',
            'link_video_lingkungan' => 'nullable|url|max:255',
            'link_video_drone' => 'nullable|url|max:255',

            // 4.14 Khusus Developer
            'site_plan_file' => 'nullable|file|mimes:jpeg,png,jpg,webp,pdf|max:10240',
            'brosur_file' => 'nullable|file|mimes:pdf|max:15360',
            'video_marketing_link' => 'nullable|url|max:255',
        ]);

        $listing->update([
            // 4.1 Dasar
            'jenis_iklan' => $request->jenis_iklan,
            'jenis_properti' => $request->jenis_properti,
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,

            // 4.2 Harga
            'harga' => $request->harga,
            'jenis_harga' => $request->jenis_harga,
            'bisa_nego' => (bool) $request->bisa_nego,
            'harga_promo' => $request->harga_promo ?: null,
            'metode_pembayaran' => $request->metode_pembayaran ?: null,
            'booking_fee' => $request->booking_fee ?: null,

            // 4.3 Lokasi
            'provinsi' => $request->provinsi,
            'kota' => $request->kota,
            'kecamatan' => $request->kecamatan,
            'kelurahan' => $request->kelurahan,
            'kode_pos' => $request->kode_pos ?: null,
            'alamat_lengkap' => $request->alamat_lengkap,
            'nama_jalan' => $request->nama_jalan ?: null,
            'nomor_jalan' => $request->nomor_jalan ?: null,
            'patokan' => $request->patokan ?: null,
            'titik_lat' => $request->titik_lat ?: null,
            'titik_lng' => $request->titik_lng ?: null,
            'privasi_lokasi' => $request->privasi_lokasi,

            // 4.4 Fisik
            'luas_tanah' => $request->luas_tanah,
            'luas_bangunan' => $request->luas_bangunan ?: null,
            'lebar_tanah' => $request->lebar_tanah ?: null,
            'panjang_tanah' => $request->panjang_tanah ?: null,
            'jumlah_lantai' => $request->jumlah_lantai ?: null,
            'kamar_tidur' => $request->kamar_tidur ?: null,
            'kamar_mandi' => $request->kamar_mandi ?: null,
            'toilet' => $request->toilet ?: null,
            'ruang_tamu' => $request->ruang_tamu ?: null,
            'ruang_keluarga' => $request->ruang_keluarga ?: null,
            'ruang_makan' => $request->ruang_makan ?: null,
            'dapur' => $request->dapur ?: null,
            'gudang' => $request->gudang ?: null,
            'balkon' => $request->balkon ?: null,
            'teras' => $request->teras ?: null,
            'garasi' => $request->garasi ?: null,
            'carport' => $request->carport ?: null,
            'kapasitas_parkir' => $request->kapasitas_parkir ?: null,

            // 4.5 Spesifikasi
            'tahun_dibangun' => $request->tahun_dibangun ?: null,
            'tahun_renovasi' => $request->tahun_renovasi ?: null,
            'kondisi_bangunan' => $request->kondisi_bangunan,
            'status_furnitur' => $request->status_furnitur ?: null,
            'material_struktur' => $request->material_struktur ?: null,
            'material_dinding' => $request->material_dinding ?: null,
            'material_lantai' => $request->material_lantai ?: null,
            'material_atap' => $request->material_atap ?: null,

            // 4.6 Fasilitas
            'facilities' => $request->facilities ?: [],

            // 4.7 Utilitas
            'daya_listrik' => $request->daya_listrik ?: null,
            'jenis_meteran' => $request->jenis_meteran ?: null,
            'sumber_air' => $request->sumber_air ?: null,
            'internet_jaringan' => $request->internet_jaringan ?: null,
            'gas' => $request->gas ?: null,

            // 4.8 Legalitas
            'status_sertifikat' => $request->status_sertifikat,
            'nomor_sertifikat' => $request->nomor_sertifikat ?: null,
            'nama_pemegang_hak' => $request->nama_pemegang_hak ?: null,
            'luas_sertifikat' => $request->luas_sertifikat ?: null,
            'status_sengketa' => $request->status_sengketa,
            'status_pbb' => $request->status_pbb ?: null,
            'tahun_pbb' => $request->tahun_pbb ?: null,
            'njop' => $request->njop ?: null,
            'status_pbg_imb' => $request->status_pbg_imb ?: null,

            // 4.9 Status
            'kondisi_saat_ini' => $request->kondisi_saat_ini,
            'status_transaksi' => $request->status_transaksi,

            // 4.10 Akses & Lingkungan
            'lebar_jalan' => $request->lebar_jalan ?: null,
            'jenis_jalan' => $request->jenis_jalan ?: null,
            'akses_mobil' => (bool) $request->akses_mobil,
            'akses_truk' => (bool) $request->akses_truk,
            'jarak_tol' => $request->jarak_tol ?: null,
            'jarak_stasiun' => $request->jarak_stasiun ?: null,
            'jarak_bandara' => $request->jarak_bandara ?: null,
            'jarak_rs' => $request->jarak_rs ?: null,
            'jarak_sekolah' => $request->jarak_sekolah ?: null,
            'jarak_pasar' => $request->jarak_pasar ?: null,
            'jarak_pusat_kota' => $request->jarak_pusat_kota ?: null,
            'orientasi' => $request->orientasi ?: null,
            'kontur_tanah' => $request->kontur_tanah ?: null,
            'jenis_lingkungan' => $request->jenis_lingkungan ?: null,
            'bebas_banjir' => (bool) $request->bebas_banjir,
            'rawan_longsor' => (bool) $request->rawan_longsor,

            // 4.15 Khusus Tanah
            'jenis_tanah' => $request->jenis_tanah ?: null,
            'peruntukan_zonasi' => $request->peruntukan_zonasi ?: null,
            'akses_jalan_tanah' => $request->akses_jalan_tanah ?: null,
            'cocok_untuk_tanah' => $request->cocok_untuk_tanah ?: [],

            // 4.16 Khusus Komersial
            'lebar_muka' => $request->lebar_muka ?: null,
            'area_parkir' => $request->area_parkir ?: null,
            'cocok_untuk_komersial' => $request->cocok_untuk_komersial ?: [],

            // 4.17 Kontak & Privasi
            'cara_dihubungi' => $request->cara_dihubungi ?: 'WA',
            'tampilkan_no_telepon' => (bool) $request->tampilkan_no_telepon,

            'is_active' => $request->has('is_active') ? (bool) $request->is_active : $listing->is_active,
        ]);

        // Update Data Pengiklan (4.12 & 4.13)
        if ($listing->pengiklanInfo) {
            $listing->pengiklanInfo->update([
                'nama_pengiklan' => $request->nama_pengiklan ?: $listing->pengiklanInfo->nama_pengiklan,
                'jenis_pengiklan' => $request->jenis_pengiklan ?: $listing->pengiklanInfo->jenis_pengiklan,
                'no_wa' => $request->no_wa ?: $listing->pengiklanInfo->no_wa,
                'telepon' => $request->telepon ?: null,
                'email' => $request->email ?: null,
                'nama_perusahaan' => $request->nama_perusahaan ?: null,
                'hubungan_dengan_properti' => $request->hubungan_dengan_properti ?: null,
            ]);
        }

        // Update Developer Detail (4.14) — create/update when pengiklan is Developer
        if ($request->jenis_pengiklan === 'Developer') {
            $dev = $listing->developerDetail;

            $sitePlanUrl = $dev?->site_plan_url;
            if ($request->hasFile('site_plan_file')) {
                $sitePlanUrl = Storage::url($request->file('site_plan_file')->store('listings/developer', 'public'));
            }

            $brosurUrl = $dev?->brosur_url;
            if ($request->hasFile('brosur_file')) {
                $brosurUrl = Storage::url($request->file('brosur_file')->store('listings/developer', 'public'));
            }

            DeveloperDetail::updateOrCreate(
                ['listing_id' => $listing->id],
                [
                    'nama_developer' => $request->nama_developer ?: null,
                    'nama_proyek' => $request->nama_proyek ?: null,
                    'status_proyek' => $request->status_proyek ?: null,
                    'jumlah_unit' => $request->jumlah_unit ?: null,
                    'unit_tersedia' => $request->unit_tersedia ?: null,
                    'tipe_unit' => $request->tipe_unit ?: null,
                    'harga_mulai' => $request->harga_mulai ?: null,
                    'booking_fee' => $request->dev_booking_fee ?: null,
                    'dp' => $request->dp ?: null,
                    'pilihan_kpr' => $request->pilihan_kpr ?: null,
                    'bank_partner' => $request->bank_partner ?: null,
                    'estimasi_serah_terima' => $request->estimasi_serah_terima ?: null,
                    'fasilitas_cluster' => $request->fasilitas_cluster ?: null,
                    'site_plan_url' => $sitePlanUrl,
                    'brosur_url' => $brosurUrl,
                    'video_marketing_link' => $request->video_marketing_link ?: null,
                ]
            );
        }

        // Process Additional Photos if uploaded
        if ($request->hasFile('new_photos')) {
            $lastOrder = $listing->photos()->max('urutan') ?: 0;
            foreach ($request->file('new_photos') as $idx => $photo) {
                $path = $photo->store('listings/photos', 'public');
                ListingPhoto::create([
                    'listing_id' => $listing->id,
                    'url_foto' => Storage::url($path),
                    'urutan' => $lastOrder + $idx + 1,
                ]);
            }
        }

        // Sync Video Links (4.11) — replace per type
        $videoMap = [
            'walkthrough' => $request->link_video_walkthrough,
            'lingkungan' => $request->link_video_lingkungan,
            'drone' => $request->link_video_drone,
        ];

        foreach ($videoMap as $tipe => $link) {
            $existing = $listing->videos()->where('tipe', $tipe)->first();

            if ($link) {
                if ($existing) {
                    $existing->update(['link_video' => $link]);
                } else {
                    ListingVideo::create([
                        'listing_id' => $listing->id,
                        'link_video' => $link,
                        'tipe' => $tipe,
                    ]);
                }
            } elseif ($existing) {
                $existing->delete();
            }
        }

        return redirect()->route('user.listings.index')->with('success', 'Iklan berhasil diperbarui!');
    }

    public function updateStatus(Request $request, Listing $listing): RedirectResponse
    {
        if ($listing->user_id !== $request->user()->id && ! $request->user()->isAdmin()) {
            abort(403);
        }

        $request->validate([
            'status_transaksi' => 'required|string',
        ]);

        $listing->update([
            'status_transaksi' => $request->status_transaksi,
        ]);

        return back()->with('success', 'Status ketersediaan berhasil diperbarui!');
    }

    public function toggleActive(Request $request, Listing $listing): RedirectResponse
    {
        if ($listing->user_id !== $request->user()->id && ! $request->user()->isAdmin()) {
            abort(403);
        }

        $listing->update([
            'is_active' => ! $listing->is_active,
        ]);

        $status = $listing->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return back()->with('success', "Iklan berhasil {$status}!");
    }

    public function destroyPhoto(Request $request, Listing $listing, ListingPhoto $photo): RedirectResponse
    {
        if ($listing->user_id !== $request->user()->id && ! $request->user()->isAdmin()) {
            abort(403);
        }

        if ($photo->listing_id !== $listing->id) {
            abort(404);
        }

        // Pastikan minimal 1 foto tetap ada
        if ($listing->photos()->count() <= 1) {
            return back()->with('error', 'Iklan harus memiliki minimal 1 foto. Unggah foto baru sebelum menghapus yang ini.');
        }

        // Hapus file dari storage
        $path = ltrim(\Illuminate\Support\Str::after($photo->url_foto, '/storage/'), '/');
        if ($path && ! \Illuminate\Support\Str::startsWith($path, ['http://', 'https://'])) {
            Storage::disk('public')->delete($path);
        }

        $photo->delete();

        return back()->with('success', 'Foto berhasil dihapus.');
    }

    public function destroy(Request $request, Listing $listing): RedirectResponse
    {
        if ($listing->user_id !== $request->user()->id && ! $request->user()->isAdmin()) {
            abort(403);
        }

        $listing->delete();

        return redirect()->route('user.listings.index')->with('success', 'Iklan properti berhasil dihapus!');
    }
}
