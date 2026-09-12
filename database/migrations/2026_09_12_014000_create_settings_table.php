<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('group')->default('general');
            $table->timestamps();
        });

        // Nilai default informasi pembayaran
        $defaults = [
            ['key' => 'payment_enabled', 'value' => '1', 'group' => 'payment'],
            ['key' => 'payment_amount', 'value' => '50000', 'group' => 'payment'],
            ['key' => 'payment_bank_name', 'value' => 'Bank Mandiri', 'group' => 'payment'],
            ['key' => 'payment_bank_account', 'value' => '1450-0099-8877-6', 'group' => 'payment'],
            ['key' => 'payment_bank_holder', 'value' => 'TulungJual.id', 'group' => 'payment'],
            ['key' => 'payment_instructions', 'value' => implode("\n", [
                'Transfer sesuai nominal ke rekening resmi di atas.',
                'Simpan struk / screenshot bukti transfer yang jelas (nominal & tanggal terlihat).',
                'Unggah bukti transfer pada formulir pengajuan iklan.',
                'Admin akan memverifikasi bukti pembayaran sebelum iklan ditayangkan.',
            ]), 'group' => 'payment'],
            ['key' => 'payment_wa_confirmation', 'value' => '6285222111193', 'group' => 'payment'],
        ];

        foreach ($defaults as $row) {
            DB::table('settings')->updateOrInsert(
                ['key' => $row['key']],
                $row + ['created_at' => now(), 'updated_at' => now()],
            );
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
