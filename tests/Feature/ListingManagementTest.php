<?php

namespace Tests\Feature;

use App\Models\Listing;
use App\Models\PengiklanInfo;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ListingManagementTest extends TestCase
{
    use RefreshDatabase;

    private function makeListing(User $user, array $overrides = []): Listing
    {
        $listing = Listing::create(array_merge([
            'user_id' => $user->id,
            'slug' => 'rumah-uji-'.uniqid(),
            'jenis_iklan' => 'Jual',
            'jenis_properti' => 'Rumah',
            'judul' => 'Rumah Uji',
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
            'nama_pengiklan' => 'Pengiklan Uji',
            'jenis_pengiklan' => 'Pemilik',
            'no_wa' => '08123456789',
            'hubungan_dengan_properti' => 'Pemilik',
            'pernyataan_kewenangan' => true,
        ]);

        return $listing;
    }

    public function test_owner_can_update_listing_with_full_fields(): void
    {
        $user = User::factory()->create();
        $listing = $this->makeListing($user);

        $response = $this->actingAs($user)->put("/iklan-saya/{$listing->id}", [
            'jenis_iklan' => 'Jual',
            'jenis_properti' => 'Rumah',
            'judul' => 'Rumah Diperbarui',
            'deskripsi' => 'Deskripsi baru',
            'harga' => 750000000,
            'jenis_harga' => 'Nett',
            'bisa_nego' => false,
            'provinsi' => 'Jawa Timur',
            'kota' => 'Tulungagung',
            'kecamatan' => 'Boyolangu',
            'kelurahan' => 'Beji',
            'alamat_lengkap' => 'Jl. Baru No. 9',
            'privasi_lokasi' => 'perkiraan',
            'luas_tanah' => 120,
            'kondisi_bangunan' => 'Sangat Bagus',
            'status_sertifikat' => 'SHM - Sertifikat Hak Milik',
            'status_sengketa' => 'Bebas Sengketa',
            'kondisi_saat_ini' => 'Kosong',
            'status_transaksi' => 'Booking',
            'facilities' => ['Carport', 'CCTV'],
            'nama_pengiklan' => 'Nama Baru',
            'jenis_pengiklan' => 'Agen',
            'no_wa' => '089999999',
            'hubungan_dengan_properti' => 'Agen berkuasa',
            'cara_dihubungi' => 'Telepon',
            'tampilkan_no_telepon' => false,
            'is_active' => true,
        ]);

        $response->assertRedirect(route('user.listings.index'));

        $listing->refresh();
        $this->assertSame('Rumah Diperbarui', $listing->judul);
        $this->assertSame('Booking', $listing->status_transaksi);
        $this->assertSame('perkiraan', $listing->privasi_lokasi);
        $this->assertFalse($listing->tampilkan_no_telepon);
        $this->assertSame(['Carport', 'CCTV'], $listing->facilities);
        $this->assertSame('Nama Baru', $listing->pengiklanInfo->nama_pengiklan);
        $this->assertSame('Telepon', $listing->cara_dihubungi);
    }

    public function test_owner_can_toggle_listing_active(): void
    {
        $user = User::factory()->create();
        $listing = $this->makeListing($user, ['is_active' => true]);

        $this->actingAs($user)
            ->patch("/iklan-saya/{$listing->id}/toggle-active")
            ->assertRedirect();

        $this->assertFalse($listing->refresh()->is_active);

        $this->actingAs($user)->patch("/iklan-saya/{$listing->id}/toggle-active");
        $this->assertTrue($listing->refresh()->is_active);
    }

    public function test_video_links_are_synced_on_update(): void
    {
        $user = User::factory()->create();
        $listing = $this->makeListing($user);

        $base = [
            'jenis_iklan' => 'Jual',
            'jenis_properti' => 'Rumah',
            'judul' => 'Rumah Video',
            'deskripsi' => 'x',
            'harga' => 500000000,
            'jenis_harga' => 'Nego',
            'bisa_nego' => true,
            'provinsi' => 'Jawa Timur',
            'kota' => 'Tulungagung',
            'kecamatan' => 'Kedungwaru',
            'kelurahan' => 'Banjarsari',
            'alamat_lengkap' => 'Jl. Uji',
            'privasi_lokasi' => 'tepat',
            'luas_tanah' => 100,
            'kondisi_bangunan' => 'Bagus',
            'status_sertifikat' => 'SHM - Sertifikat Hak Milik',
            'status_sengketa' => 'Bebas Sengketa',
            'kondisi_saat_ini' => 'Kosong',
            'status_transaksi' => 'Tersedia',
        ];

        // Add walkthrough + drone
        $this->actingAs($user)->put("/iklan-saya/{$listing->id}", array_merge($base, [
            'link_video_walkthrough' => 'https://www.youtube.com/watch?v=abc123',
            'link_video_drone' => 'https://youtu.be/xyz789',
        ]))->assertRedirect();

        $this->assertDatabaseHas('listing_videos', ['listing_id' => $listing->id, 'tipe' => 'walkthrough']);
        $this->assertDatabaseHas('listing_videos', ['listing_id' => $listing->id, 'tipe' => 'drone']);
        $this->assertDatabaseMissing('listing_videos', ['listing_id' => $listing->id, 'tipe' => 'lingkungan']);

        // Remove walkthrough, keep drone
        $this->actingAs($user)->put("/iklan-saya/{$listing->id}", array_merge($base, [
            'link_video_walkthrough' => '',
            'link_video_drone' => 'https://youtu.be/xyz789',
        ]))->assertRedirect();

        $this->assertDatabaseMissing('listing_videos', ['listing_id' => $listing->id, 'tipe' => 'walkthrough']);
        $this->assertDatabaseHas('listing_videos', ['listing_id' => $listing->id, 'tipe' => 'drone']);
    }

    public function test_developer_detail_is_created_and_updated(): void
    {
        $user = User::factory()->create();
        $listing = $this->makeListing($user);

        $base = [
            'jenis_iklan' => 'Jual',
            'jenis_properti' => 'Cluster',
            'judul' => 'Cluster Developer',
            'deskripsi' => 'x',
            'harga' => 650000000,
            'jenis_harga' => 'Nego',
            'bisa_nego' => true,
            'provinsi' => 'Jawa Timur',
            'kota' => 'Tulungagung',
            'kecamatan' => 'Kedungwaru',
            'kelurahan' => 'Banjarsari',
            'alamat_lengkap' => 'Jl. Uji',
            'privasi_lokasi' => 'tepat',
            'luas_tanah' => 100,
            'kondisi_bangunan' => 'Bagus',
            'status_sertifikat' => 'SHM - Sertifikat Hak Milik',
            'status_sengketa' => 'Bebas Sengketa',
            'kondisi_saat_ini' => 'Kosong',
            'status_transaksi' => 'Tersedia',
            'nama_pengiklan' => 'Marketing',
            'jenis_pengiklan' => 'Developer',
            'no_wa' => '08123456789',
            'hubungan_dengan_properti' => 'Developer',
        ];

        $this->actingAs($user)->put("/iklan-saya/{$listing->id}", array_merge($base, [
            'nama_developer' => 'PT Uji',
            'nama_proyek' => 'Cluster Uji',
            'unit_tersedia' => 10,
            'harga_mulai' => 650000000,
            'pilihan_kpr' => 'KPR BCA',
            'fasilitas_cluster' => 'Playground',
            'video_marketing_link' => 'https://youtu.be/xyz789',
        ]))->assertRedirect();

        $this->assertDatabaseHas('developer_details', [
            'listing_id' => $listing->id,
            'nama_developer' => 'PT Uji',
            'nama_proyek' => 'Cluster Uji',
            'pilihan_kpr' => 'KPR BCA',
        ]);

        // Update again — should not duplicate
        $this->actingAs($user)->put("/iklan-saya/{$listing->id}", array_merge($base, [
            'nama_developer' => 'PT Uji Revisi',
            'nama_proyek' => 'Cluster Uji',
        ]))->assertRedirect();

        $this->assertSame(1, $listing->developerDetail()->count());
        $this->assertDatabaseHas('developer_details', [
            'listing_id' => $listing->id,
            'nama_developer' => 'PT Uji Revisi',
        ]);
    }

    public function test_success_flash_is_shared_to_inertia(): void
    {
        $user = User::factory()->create();
        $listing = $this->makeListing($user);

        $this->actingAs($user)
            ->patch("/iklan-saya/{$listing->id}/toggle-active")
            ->assertRedirect();

        $this->actingAs($user)
            ->get('/iklan-saya')
            ->assertOk()
            ->assertSee('Iklan berhasil dinonaktifkan!', false);
    }

    public function test_user_cannot_update_others_listing(): void
    {
        $owner = User::factory()->create();
        $other = User::factory()->create();
        $listing = $this->makeListing($owner);

        $this->actingAs($other)
            ->put("/iklan-saya/{$listing->id}", [
                'judul' => 'Hack',
                'deskripsi' => 'x',
                'harga' => 1,
                'status_transaksi' => 'Tersedia',
            ])
            ->assertForbidden();
    }
}
