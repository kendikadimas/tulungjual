<?php

namespace Tests\Feature;

use App\Models\Listing;
use App\Models\PengiklanInfo;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SmokeTest extends TestCase
{
    use RefreshDatabase;

    private function makeListing(User $user, array $overrides = []): Listing
    {
        $listing = Listing::create(array_merge([
            'user_id' => $user->id,
            'slug' => 'smoke-'.uniqid(),
            'jenis_iklan' => 'Jual',
            'jenis_properti' => 'Rumah',
            'judul' => 'Smoke Listing',
            'deskripsi' => 'Deskripsi',
            'harga' => 500000000,
            'jenis_harga' => 'Nego',
            'bisa_nego' => true,
            'provinsi' => 'Jawa Timur',
            'kota' => 'Tulungagung',
            'kecamatan' => 'Kedungwaru',
            'kelurahan' => 'Banjarsari',
            'alamat_lengkap' => 'Jl. Smoke No. 1',
            'privasi_lokasi' => 'tepat',
            'titik_lat' => -8.067,
            'titik_lng' => 111.901,
            'luas_tanah' => 100,
            'kondisi_bangunan' => 'Bagus',
            'status_sertifikat' => 'SHM - Sertifikat Hak Milik',
            'status_sengketa' => 'Bebas Sengketa',
            'kondisi_saat_ini' => 'Kosong',
            'status_transaksi' => 'Tersedia',
            'cara_dihubungi' => 'WA',
            'tampilkan_no_telepon' => true,
            'status_approval' => 'approved',
            'is_active' => true,
        ], $overrides));

        PengiklanInfo::create([
            'listing_id' => $listing->id,
            'nama_pengiklan' => 'Pengiklan Smoke',
            'jenis_pengiklan' => 'Pemilik',
            'no_wa' => '08123456789',
            'hubungan_dengan_properti' => 'Pemilik',
            'pernyataan_kewenangan' => true,
        ]);

        return $listing;
    }

    public function test_guest_public_pages_render(): void
    {
        $this->get('/')->assertOk();
        $this->get('/listing')->assertOk();
        $this->get('/syarat-ketentuan')->assertOk();
        $this->get('/tentang-kontak')->assertOk();
    }

    public function test_listing_detail_renders_for_each_property_type(): void
    {
        $user = User::factory()->create();

        foreach (['Rumah', 'Tanah', 'Kavling', 'Ruko', 'Kantor', 'Cluster', 'Gudang'] as $type) {
            $listing = $this->makeListing($user, ['jenis_properti' => $type]);
            $this->get('/listing/'.$listing->slug)->assertOk();
        }
    }

    public function test_guest_is_redirected_from_protected_pages(): void
    {
        $this->get('/iklan-saya')->assertRedirect('/login');
        $this->get('/pasang-iklan')->assertRedirect('/login');
        $this->get('/admin/dashboard')->assertRedirect('/login');
    }

    public function test_user_dashboard_pages_render(): void
    {
        $user = User::factory()->create();
        $listing = $this->makeListing($user, ['status_approval' => 'pending']);

        $this->actingAs($user)->get('/iklan-saya')->assertOk();
        $this->actingAs($user)->get('/pasang-iklan')->assertOk();
        $this->actingAs($user)->get('/iklan-saya/'.$listing->id.'/edit')->assertOk();
        $this->actingAs($user)->get('/profile')->assertOk();
    }

    public function test_admin_pages_render(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $user = User::factory()->create();
        $listing = $this->makeListing($user);

        $this->actingAs($admin)->get('/admin/dashboard')->assertOk();
        $this->actingAs($admin)->get('/admin/listings')->assertOk();
        $this->actingAs($admin)->get('/admin/listings/'.$listing->id)->assertOk();
        $this->actingAs($admin)->get('/admin/users')->assertOk();
        $this->actingAs($admin)->get('/admin/categories')->assertOk();
    }

    public function test_non_admin_cannot_access_admin_pages(): void
    {
        $user = User::factory()->create(['role' => 'user']);
        $this->actingAs($user)->get('/admin/dashboard')->assertForbidden();
    }
}
