<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengiklan_infos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('listing_id')->constrained()->onDelete('cascade');
            $table->string('nama_pengiklan');
            $table->string('jenis_pengiklan'); // Pemilik, Agen, Broker, Developer, Perusahaan, Investor, Pengelola, Lainnya
            $table->string('no_wa');
            $table->string('telepon')->nullable();
            $table->string('email')->nullable();
            $table->string('nama_perusahaan')->nullable();
            $table->string('hubungan_dengan_properti')->nullable(); // Pemilik, Agen berkuasa, Broker, Developer, Pengelola, Kuasa Pemilik, Lainnya
            $table->boolean('pernyataan_kewenangan')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengiklan_infos');
    }
};
