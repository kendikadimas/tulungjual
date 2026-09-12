<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('slug')->unique();

            // 4.1 Informasi Dasar
            $table->string('jenis_iklan'); // Jual, Sewa, Jual & Sewa
            $table->string('jenis_properti'); // Rumah, Tanah, Apartemen, Ruko, Kios, Gudang, Kost, Villa, Kantor, Pabrik, Kavling, Cluster, Hotel, Komersial, Lainnya
            $table->string('judul');
            $table->text('deskripsi');

            // 4.2 Harga & Transaksi
            $table->unsignedBigInteger('harga');
            $table->string('jenis_harga');
            $table->boolean('bisa_nego')->default(true);
            $table->unsignedBigInteger('harga_promo')->nullable();
            $table->string('metode_pembayaran')->nullable();
            $table->unsignedBigInteger('booking_fee')->nullable();

            // 4.3 Lokasi
            $table->string('provinsi');
            $table->string('kota');
            $table->string('kecamatan');
            $table->string('kelurahan');
            $table->string('kode_pos')->nullable();
            $table->text('alamat_lengkap');
            $table->string('nama_jalan')->nullable();
            $table->string('nomor_jalan')->nullable();
            $table->string('patokan')->nullable();
            $table->decimal('titik_lat', 10, 7)->nullable();
            $table->decimal('titik_lng', 10, 7)->nullable();
            $table->enum('privasi_lokasi', ['tepat', 'perkiraan'])->default('tepat');

            // 4.4 Data Fisik
            $table->decimal('luas_tanah', 10, 2)->nullable();
            $table->decimal('luas_bangunan', 10, 2)->nullable();
            $table->decimal('lebar_tanah', 8, 2)->nullable();
            $table->decimal('panjang_tanah', 8, 2)->nullable();
            $table->integer('jumlah_lantai')->nullable();
            $table->integer('kamar_tidur')->nullable();
            $table->integer('kamar_mandi')->nullable();
            $table->integer('toilet')->nullable();
            $table->integer('ruang_tamu')->nullable();
            $table->integer('ruang_keluarga')->nullable();
            $table->integer('ruang_makan')->nullable();
            $table->integer('dapur')->nullable();
            $table->integer('gudang')->nullable();
            $table->integer('balkon')->nullable();
            $table->integer('teras')->nullable();
            $table->integer('garasi')->nullable();
            $table->integer('carport')->nullable();
            $table->integer('kapasitas_parkir')->nullable();

            // 4.5 Spesifikasi Bangunan
            $table->integer('tahun_dibangun')->nullable();
            $table->integer('tahun_renovasi')->nullable();
            $table->string('kondisi_bangunan')->default('Bagus');
            $table->string('status_furnitur')->nullable();
            $table->string('material_struktur')->nullable();
            $table->string('material_dinding')->nullable();
            $table->string('material_lantai')->nullable();
            $table->string('material_atap')->nullable();

            // 4.6 Fasilitas
            $table->json('facilities')->nullable();

            // 4.7 Utilitas
            $table->string('daya_listrik')->nullable();
            $table->string('jenis_meteran')->nullable();
            $table->string('sumber_air')->nullable();
            $table->string('internet_jaringan')->nullable();
            $table->string('gas')->nullable();

            // 4.8 Legalitas
            $table->string('status_sertifikat');
            $table->string('nomor_sertifikat')->nullable(); // SECRET - DO NOT RENDER IN PUBLIC API
            $table->string('nama_pemegang_hak')->nullable(); // SECRET - DO NOT RENDER IN PUBLIC API
            $table->decimal('luas_sertifikat', 10, 2)->nullable();
            $table->string('status_sengketa')->default('Bebas Sengketa');
            $table->string('status_pbb')->nullable();
            $table->integer('tahun_pbb')->nullable();
            $table->unsignedBigInteger('njop')->nullable();
            $table->string('status_pbg_imb')->nullable();

            // 4.9 Status Properti
            $table->string('kondisi_saat_ini')->default('Kosong');
            $table->string('status_transaksi')->default('Tersedia'); // Tersedia, Terjual, Tersewa, Booking

            // 4.10 Akses & Lingkungan
            $table->string('lebar_jalan')->nullable();
            $table->string('jenis_jalan')->nullable();
            $table->boolean('akses_mobil')->default(false);
            $table->boolean('akses_truk')->default(false);
            $table->string('jarak_tol')->nullable();
            $table->string('jarak_stasiun')->nullable();
            $table->string('jarak_bandara')->nullable();
            $table->string('jarak_rs')->nullable();
            $table->string('jarak_sekolah')->nullable();
            $table->string('jarak_pasar')->nullable();
            $table->string('jarak_pusat_kota')->nullable();
            $table->string('orientasi')->nullable();
            $table->string('kontur_tanah')->nullable();
            $table->string('jenis_lingkungan')->nullable();
            $table->boolean('bebas_banjir')->default(true);
            $table->boolean('rawan_longsor')->default(false);

            // 4.15 Khusus Tanah
            $table->string('jenis_tanah')->nullable();
            $table->string('peruntukan_zonasi')->nullable();
            $table->string('akses_jalan_tanah')->nullable();
            $table->json('cocok_untuk_tanah')->nullable();

            // 4.16 Khusus Ruko/Komersial
            $table->decimal('lebar_muka', 8, 2)->nullable();
            $table->string('area_parkir')->nullable();
            $table->json('cocok_untuk_komersial')->nullable();

            // 4.17 Kontak & Privasi
            $table->string('cara_dihubungi')->default('WA'); // Chat TulungJual, WA, Telepon, Email
            $table->boolean('tampilkan_no_telepon')->default(true);

            // Approval Status
            $table->enum('status_approval', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('catatan_rejection')->nullable();
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('listings');
    }
};
