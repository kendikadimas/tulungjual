<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('listings', function (Blueprint $table) {
            $table->string('payment_proof_url')->nullable()->after('catatan_rejection');
            $table->unsignedBigInteger('payment_amount')->nullable()->after('payment_proof_url');
            $table->string('payment_method')->nullable()->after('payment_amount');
            $table->string('payment_sender_name')->nullable()->after('payment_method');
            $table->string('payment_status')->default('unpaid')->after('payment_sender_name'); // unpaid, pending, verified, rejected
            $table->text('payment_note')->nullable()->after('payment_status'); // catatan verifikasi admin
            $table->timestamp('payment_verified_at')->nullable()->after('payment_note');
            $table->foreignId('payment_verified_by')->nullable()->after('payment_verified_at')
                ->constrained('users')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('listings', function (Blueprint $table) {
            $table->dropForeign(['payment_verified_by']);
            $table->dropColumn([
                'payment_proof_url',
                'payment_amount',
                'payment_method',
                'payment_sender_name',
                'payment_status',
                'payment_note',
                'payment_verified_at',
                'payment_verified_by',
            ]);
        });
    }
};
