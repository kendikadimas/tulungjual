<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('listing_videos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('listing_id')->constrained()->onDelete('cascade');
            $table->string('link_video');
            $table->string('tipe')->default('walkthrough'); // walkthrough, lingkungan, drone
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('listing_videos');
    }
};
