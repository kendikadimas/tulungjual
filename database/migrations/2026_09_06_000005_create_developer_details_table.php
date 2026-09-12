<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('developer_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('listing_id')->constrained()->onDelete('cascade');
            $table->string('nama_developer')->nullable();
            $table->string('nama_proyek')->nullable();
            $table->string('status_proyek')->nullable();
            $table->integer('jumlah_unit')->nullable();
            $table->integer('unit_tersedia')->nullable();
            $table->string('tipe_unit')->nullable();
            $table->unsignedBigInteger('harga_mulai')->nullable();
            $table->unsignedBigInteger('booking_fee')->nullable();
            $table->string('dp')->nullable();
            $table->string('pilihan_kpr')->nullable();
            $table->string('bank_partner')->nullable();
            $table->string('estimasi_serah_terima')->nullable();
            $table->text('fasilitas_cluster')->nullable();
            $table->string('site_plan_url')->nullable();
            $table->string('brosur_url')->nullable();
            $table->string('video_marketing_link')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('developer_details');
    }
};
