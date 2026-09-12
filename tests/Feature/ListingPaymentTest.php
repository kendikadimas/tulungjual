<?php

namespace Tests\Feature;

use App\Models\ActivityLog;
use App\Models\Listing;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ListingPaymentTest extends TestCase
{
    use RefreshDatabase;

    private function superAdmin(): User
    {
        return User::factory()->create(['role' => User::ROLE_SUPER_ADMIN]);
    }

    private function admin(): User
    {
        return User::factory()->create(['role' => User::ROLE_ADMIN]);
    }

    private function baseListingPayload(User $user, array $overrides = []): array
    {
        return array_merge([
            'jenis_iklan' => 'Jual',
            'jenis_properti' => 'Rumah',
            'judul' => 'Rumah Pembayaran '.uniqid(),
            'deskripsi' => 'Deskripsi uji',
            'harga' => 500000000,
            'jenis_harga' => 'Nego',
            'bisa_nego' => true,
            'provinsi' => 'Jawa Timur',
            'kota' => 'Tulungagung',
            'kecamatan' => 'Kedungwaru',
            'kelurahan' => 'Banjarsari',
            'alamat_lengkap' => 'Jl. Uji No. 1',
            'privasi_lokasi' => 'tepat',
            'luas_tanah' => 120,
            'kondisi_bangunan' => 'Bagus',
            'status_sertifikat' => 'SHM - Sertifikat Hak Milik',
            'status_sengketa' => 'Bebas Sengketa',
            'kondisi_saat_ini' => 'Kosong',
            'status_transaksi' => 'Tersedia',
            'nama_pengiklan' => 'Pengiklan Uji',
            'jenis_pengiklan' => 'Pemilik',
            'no_wa' => '08123456789',
            'hubungan_dengan_properti' => 'Pemilik',
            'pernyataan_kewenangan' => true,
            'cara_dihubungi' => 'WA',
            'tampilkan_no_telepon' => true,
            'setuju_sk' => true,
            'setuju_benar' => true,
            'setuju_platform' => true,
        ], $overrides);
    }

    // ---------------------------------------------------------------
    // Pengaturan pembayaran
    // ---------------------------------------------------------------

    public function test_payment_config_defaults_present(): void
    {
        $config = Setting::paymentConfig();

        $this->assertTrue($config['enabled']);
        $this->assertSame(50000, $config['amount']);
        $this->assertNotEmpty($config['bank_name']);
        $this->assertNotEmpty($config['bank_account']);
        $this->assertIsArray($config['instructions']);
        $this->assertNotEmpty($config['instructions']);
    }

    public function test_super_admin_can_update_payment_settings(): void
    {
        $this->actingAs($this->superAdmin())
            ->put('/admin/settings', [
                'enabled' => true,
                'amount' => 75000,
                'bank_name' => 'Bank BCA',
                'bank_account' => '1234567890',
                'bank_holder' => 'PT TulungJual',
                'instructions' => "Transfer tepat waktu\nSimpan struk",
                'wa_confirmation' => '628111222333',
            ])
            ->assertRedirect();

        $config = Setting::paymentConfig();

        $this->assertTrue($config['enabled']);
        $this->assertSame(75000, $config['amount']);
        $this->assertSame('Bank BCA', $config['bank_name']);
        $this->assertSame('1234567890', $config['bank_account']);
        $this->assertCount(2, $config['instructions']);
    }

    public function test_super_admin_can_disable_payment_requirement(): void
    {
        $this->actingAs($this->superAdmin())
            ->put('/admin/settings', [
                'enabled' => false,
                'amount' => 50000,
                'bank_name' => 'Bank BCA',
                'bank_account' => '123',
                'bank_holder' => 'X',
                'instructions' => '',
                'wa_confirmation' => '',
            ])
            ->assertRedirect();

        $this->assertFalse(Setting::paymentConfig()['enabled']);
    }

    public function test_regular_admin_cannot_access_payment_settings(): void
    {
        $this->actingAs($this->admin())
            ->get('/admin/settings')
            ->assertForbidden();
    }

    public function test_regular_admin_cannot_update_payment_settings(): void
    {
        $this->actingAs($this->admin())
            ->put('/admin/settings', [
                'enabled' => true,
                'amount' => 99999,
                'bank_name' => 'Hack',
                'bank_account' => '0',
                'bank_holder' => 'Hack',
            ])
            ->assertForbidden();

        $this->assertSame(50000, Setting::paymentConfig()['amount']);
    }

    // ---------------------------------------------------------------
    // Pengajuan iklan wajib bukti pembayaran
    // ---------------------------------------------------------------

    public function test_listing_submission_requires_payment_proof_when_enabled(): void
    {
        Storage::fake('public');
        $user = User::factory()->create(['role' => User::ROLE_USER]);

        $photos = collect(range(1, 5))
            ->map(fn ($i) => UploadedFile::fake()->image("foto{$i}.jpg"))
            ->all();

        $this->actingAs($user)
            ->post('/pasang-iklan', $this->baseListingPayload($user, [
                'photos' => $photos,
            ]))
            ->assertSessionHasErrors('payment_proof_file');

        $this->assertDatabaseCount('listings', 0);
    }

    public function test_listing_submission_succeeds_with_payment_proof(): void
    {
        Storage::fake('public');
        $user = User::factory()->create(['role' => User::ROLE_USER]);

        $photos = collect(range(1, 5))
            ->map(fn ($i) => UploadedFile::fake()->image("foto{$i}.jpg"))
            ->all();

        $this->actingAs($user)
            ->post('/pasang-iklan', $this->baseListingPayload($user, [
                'photos' => $photos,
                'payment_proof_file' => UploadedFile::fake()->image('bukti.jpg'),
                'payment_sender_name' => 'Budi',
                'payment_method' => 'Transfer BCA',
            ]))
            ->assertRedirect(route('user.listings.index'));

        $listing = Listing::first();

        $this->assertNotNull($listing);
        $this->assertNotNull($listing->payment_proof_url);
        $this->assertSame('pending', $listing->payment_status);
        $this->assertSame('Budi', $listing->payment_sender_name);
        $this->assertSame(50000, (int) $listing->payment_amount);
    }

    // ---------------------------------------------------------------
    // Verifikasi oleh admin
    // ---------------------------------------------------------------

    public function test_admin_can_verify_payment(): void
    {
        $listing = Listing::factory()->awaitingPayment()->create(['status_approval' => 'pending']);

        $this->actingAs($this->admin())
            ->post("/admin/listings/{$listing->id}/verify-payment")
            ->assertRedirect();

        $listing->refresh();

        $this->assertSame('verified', $listing->payment_status);
        $this->assertNotNull($listing->payment_verified_at);
        $this->assertNotNull($listing->payment_verified_by);

        $this->assertDatabaseHas('activity_logs', [
            'action' => 'payment.verify',
            'subject_id' => $listing->id,
        ]);
    }

    public function test_admin_can_reject_payment_with_note(): void
    {
        $listing = Listing::factory()->awaitingPayment()->create(['status_approval' => 'pending']);

        $this->actingAs($this->admin())
            ->post("/admin/listings/{$listing->id}/reject-payment", [
                'payment_note' => 'Nominal transfer tidak sesuai',
            ])
            ->assertRedirect();

        $listing->refresh();

        $this->assertSame('rejected', $listing->payment_status);
        $this->assertSame('Nominal transfer tidak sesuai', $listing->payment_note);

        $this->assertDatabaseHas('activity_logs', [
            'action' => 'payment.reject',
            'subject_id' => $listing->id,
        ]);
    }

    public function test_reject_payment_requires_note(): void
    {
        $listing = Listing::factory()->awaitingPayment()->create(['status_approval' => 'pending']);

        $this->actingAs($this->admin())
            ->post("/admin/listings/{$listing->id}/reject-payment", ['payment_note' => ''])
            ->assertSessionHasErrors('payment_note');

        $this->assertSame('pending', $listing->refresh()->payment_status);
    }

    // ---------------------------------------------------------------
    // Gate approval berdasarkan pembayaran
    // ---------------------------------------------------------------

    public function test_listing_cannot_be_approved_before_payment_verified(): void
    {
        $listing = Listing::factory()->awaitingPayment()->create(['status_approval' => 'pending']);

        $this->actingAs($this->admin())
            ->post("/admin/listings/{$listing->id}/approve")
            ->assertRedirect()
            ->assertSessionHas('error');

        $this->assertSame('pending', $listing->refresh()->status_approval);
    }

    public function test_listing_can_be_approved_after_payment_verified(): void
    {
        $listing = Listing::factory()->create([
            'status_approval' => 'pending',
            'payment_status' => 'verified',
            'payment_proof_url' => '/storage/listings/payments/dummy.jpg',
        ]);

        $this->actingAs($this->admin())
            ->post("/admin/listings/{$listing->id}/approve")
            ->assertRedirect()
            ->assertSessionHas('success');

        $this->assertSame('approved', $listing->refresh()->status_approval);
    }

    public function test_approval_allowed_when_payment_feature_disabled(): void
    {
        Setting::set('payment_enabled', '0', 'payment');

        $listing = Listing::factory()->unpaid()->create(['status_approval' => 'pending']);

        $this->actingAs($this->admin())
            ->post("/admin/listings/{$listing->id}/approve")
            ->assertRedirect()
            ->assertSessionHas('success');

        $this->assertSame('approved', $listing->refresh()->status_approval);
    }

    // ---------------------------------------------------------------
    // Owner mengunggah ulang bukti
    // ---------------------------------------------------------------

    public function test_owner_reuploading_proof_resets_payment_status(): void
    {
        Storage::fake('public');

        $user = User::factory()->create(['role' => User::ROLE_USER]);
        $listing = Listing::factory()->create([
            'user_id' => $user->id,
            'payment_status' => 'rejected',
            'payment_proof_url' => '/storage/listings/payments/old.jpg',
            'payment_note' => 'Bukti buram',
        ]);

        $payload = $this->baseListingPayload($user, [
            'judul' => $listing->judul,
            'payment_proof_file' => UploadedFile::fake()->image('new.jpg'),
        ]);

        $this->actingAs($user)
            ->put("/iklan-saya/{$listing->id}", $payload)
            ->assertRedirect();

        $listing->refresh();

        $this->assertSame('pending', $listing->payment_status);
        $this->assertNull($listing->payment_note);
        $this->assertNotSame('/storage/listings/payments/old.jpg', $listing->payment_proof_url);
    }

    // ---------------------------------------------------------------
    // Halaman
    // ---------------------------------------------------------------

    public function test_create_page_receives_payment_config(): void
    {
        $user = User::factory()->create(['role' => User::ROLE_USER]);

        $this->actingAs($user)
            ->get('/pasang-iklan')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('User/Listings/Create')
                ->has('payment.bank_name')
                ->has('payment.amount')
                ->has('payment.instructions')
            );
    }

    public function test_settings_page_renders_for_super_admin(): void
    {
        $this->actingAs($this->superAdmin())
            ->get('/admin/settings')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Admin/Settings/Index')
                ->has('settings.amount')
            );
    }

    public function test_payment_verification_creates_activity_log_entry(): void
    {
        $listing = Listing::factory()->awaitingPayment()->create();

        $this->actingAs($this->superAdmin())
            ->post("/admin/listings/{$listing->id}/verify-payment");

        $this->assertDatabaseHas('activity_logs', [
            'action' => 'payment.verify',
            'category' => 'payment',
            'subject_label' => $listing->judul,
        ]);
    }
}
