<?php

namespace Tests\Feature;

use App\Models\ActivityLog;
use App\Models\Listing;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminRoleTest extends TestCase
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

    // ---------------------------------------------------------------
    // Middleware / access
    // ---------------------------------------------------------------

    public function test_super_admin_can_access_admin_panel(): void
    {
        $this->actingAs($this->superAdmin())
            ->get('/admin/dashboard')
            ->assertOk();
    }

    public function test_super_admin_can_access_activity_logs(): void
    {
        $this->actingAs($this->superAdmin())
            ->get('/admin/activity-logs')
            ->assertOk();
    }

    public function test_regular_admin_cannot_access_activity_logs(): void
    {
        $this->actingAs($this->admin())
            ->get('/admin/activity-logs')
            ->assertForbidden();
    }

    public function test_regular_user_cannot_access_admin_panel(): void
    {
        $user = User::factory()->create(['role' => User::ROLE_USER]);

        $this->actingAs($user)
            ->get('/admin/dashboard')
            ->assertForbidden();
    }

    // ---------------------------------------------------------------
    // Role management
    // ---------------------------------------------------------------

    public function test_super_admin_can_promote_user_to_admin(): void
    {
        $target = User::factory()->create(['role' => User::ROLE_USER]);

        $this->actingAs($this->superAdmin())
            ->patch("/admin/users/{$target->id}/role", ['role' => User::ROLE_ADMIN])
            ->assertRedirect();

        $this->assertDatabaseHas('users', ['id' => $target->id, 'role' => User::ROLE_ADMIN]);
    }

    public function test_super_admin_can_promote_admin_to_super_admin(): void
    {
        $target = $this->admin();

        $this->actingAs($this->superAdmin())
            ->patch("/admin/users/{$target->id}/role", ['role' => User::ROLE_SUPER_ADMIN])
            ->assertRedirect();

        $this->assertDatabaseHas('users', ['id' => $target->id, 'role' => User::ROLE_SUPER_ADMIN]);
    }

    public function test_regular_admin_cannot_promote_user_to_admin(): void
    {
        $target = User::factory()->create(['role' => User::ROLE_USER]);

        $this->actingAs($this->admin())
            ->patch("/admin/users/{$target->id}/role", ['role' => User::ROLE_ADMIN])
            ->assertRedirect();

        // Role must remain unchanged
        $this->assertDatabaseHas('users', ['id' => $target->id, 'role' => User::ROLE_USER]);
    }

    public function test_regular_admin_cannot_change_another_admin_role(): void
    {
        $target = $this->admin();

        $this->actingAs($this->admin())
            ->patch("/admin/users/{$target->id}/role", ['role' => User::ROLE_USER])
            ->assertRedirect();

        $this->assertDatabaseHas('users', ['id' => $target->id, 'role' => User::ROLE_ADMIN]);
    }

    public function test_user_cannot_change_own_role(): void
    {
        $superAdmin = $this->superAdmin();

        $this->actingAs($superAdmin)
            ->patch("/admin/users/{$superAdmin->id}/role", ['role' => User::ROLE_USER])
            ->assertRedirect();

        $this->assertDatabaseHas('users', ['id' => $superAdmin->id, 'role' => User::ROLE_SUPER_ADMIN]);
    }

    public function test_super_admin_role_cannot_be_changed(): void
    {
        $superAdmin = $this->superAdmin();
        $other = $this->superAdmin();

        $this->actingAs($other)
            ->patch("/admin/users/{$superAdmin->id}/role", ['role' => User::ROLE_USER])
            ->assertRedirect();

        $this->assertDatabaseHas('users', ['id' => $superAdmin->id, 'role' => User::ROLE_SUPER_ADMIN]);
    }

    // ---------------------------------------------------------------
    // User deletion guards
    // ---------------------------------------------------------------

    public function test_admin_cannot_delete_another_admin(): void
    {
        $target = $this->admin();

        $this->actingAs($this->admin())
            ->delete("/admin/users/{$target->id}")
            ->assertRedirect();

        $this->assertDatabaseHas('users', ['id' => $target->id]);
    }

    public function test_super_admin_cannot_be_deleted(): void
    {
        $target = $this->superAdmin();

        $this->actingAs($this->superAdmin())
            ->delete("/admin/users/{$target->id}")
            ->assertRedirect();

        $this->assertDatabaseHas('users', ['id' => $target->id]);
    }

    public function test_super_admin_can_delete_regular_admin(): void
    {
        $target = $this->admin();

        $this->actingAs($this->superAdmin())
            ->delete("/admin/users/{$target->id}")
            ->assertRedirect();

        $this->assertDatabaseMissing('users', ['id' => $target->id]);
    }

    // ---------------------------------------------------------------
    // Activity logging
    // ---------------------------------------------------------------

    public function test_approving_listing_creates_activity_log(): void
    {
        $listing = Listing::factory()->create([
            'status_approval' => 'pending',
            'is_active' => true,
            'payment_status' => 'verified',
            'payment_proof_url' => '/storage/listings/payments/dummy.jpg',
        ]);

        $this->actingAs($this->superAdmin())
            ->post("/admin/listings/{$listing->id}/approve")
            ->assertRedirect();

        $this->assertDatabaseHas('activity_logs', [
            'action' => 'listing.approve',
            'category' => 'listing',
            'subject_id' => $listing->id,
        ]);
    }

    public function test_rejecting_listing_creates_activity_log(): void
    {
        $listing = Listing::factory()->create([
            'status_approval' => 'pending',
            'is_active' => true,
        ]);

        $this->actingAs($this->superAdmin())
            ->post("/admin/listings/{$listing->id}/reject", ['catatan_rejection' => 'Foto kurang jelas'])
            ->assertRedirect();

        $this->assertDatabaseHas('activity_logs', [
            'action' => 'listing.reject',
            'category' => 'listing',
            'subject_id' => $listing->id,
        ]);
    }

    public function test_role_change_creates_activity_log(): void
    {
        $target = User::factory()->create(['role' => User::ROLE_USER]);

        $this->actingAs($this->superAdmin())
            ->patch("/admin/users/{$target->id}/role", ['role' => User::ROLE_ADMIN]);

        $log = ActivityLog::where('action', 'user.role_update')->first();

        $this->assertNotNull($log);
        $this->assertSame('user', $log->meta['from']);
        $this->assertSame('admin', $log->meta['to']);
    }

    public function test_category_creation_creates_activity_log(): void
    {
        $this->actingAs($this->admin())
            ->post('/admin/categories', ['name' => 'Penthouse', 'slug' => 'penthouse']);

        $this->assertDatabaseHas('activity_logs', [
            'action' => 'category.create',
            'category' => 'category',
        ]);
    }

    public function test_activity_log_records_actor_details(): void
    {
        $admin = $this->admin();
        $listing = Listing::factory()->create([
            'status_approval' => 'pending',
            'is_active' => true,
            'payment_status' => 'verified',
            'payment_proof_url' => '/storage/listings/payments/dummy.jpg',
        ]);

        $this->actingAs($admin)->post("/admin/listings/{$listing->id}/approve");

        $log = ActivityLog::where('action', 'listing.approve')->first();

        $this->assertNotNull($log);
        $this->assertSame($admin->id, $log->user_id);
        $this->assertSame($admin->name, $log->user_name);
        $this->assertSame(User::ROLE_ADMIN, $log->user_role);
        $this->assertSame($listing->judul, $log->subject_label);
    }

    public function test_activity_logs_page_renders_with_data(): void
    {
        $listing = Listing::factory()->create([
            'status_approval' => 'pending',
            'is_active' => true,
            'payment_status' => 'verified',
            'payment_proof_url' => '/storage/listings/payments/dummy.jpg',
        ]);

        $this->actingAs($this->superAdmin())
            ->post("/admin/listings/{$listing->id}/approve");

        $this->actingAs($this->superAdmin())
            ->get('/admin/activity-logs')
            ->assertOk();
    }
}
