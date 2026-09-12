<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminCategoryTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['role' => 'admin']);
    }

    public function test_admin_can_create_category(): void
    {
        $this->actingAs($this->admin())
            ->post('/admin/categories', ['name' => 'Penthouse', 'slug' => 'penthouse'])
            ->assertRedirect();

        $this->assertDatabaseHas('categories', ['name' => 'Penthouse', 'slug' => 'penthouse']);
    }

    public function test_admin_can_update_category(): void
    {
        $category = Category::create(['name' => 'Rumah', 'slug' => 'rumah', 'is_active' => true]);

        $this->actingAs($this->admin())
            ->put("/admin/categories/{$category->id}", ['name' => 'Rumah Tapak', 'slug' => 'rumah-tapak'])
            ->assertRedirect();

        $this->assertDatabaseHas('categories', ['id' => $category->id, 'name' => 'Rumah Tapak', 'slug' => 'rumah-tapak']);
    }

    public function test_admin_can_toggle_category(): void
    {
        $category = Category::create(['name' => 'Ruko', 'slug' => 'ruko', 'is_active' => true]);

        $this->actingAs($this->admin())
            ->patch("/admin/categories/{$category->id}/toggle")
            ->assertRedirect();

        $this->assertFalse($category->refresh()->is_active);
    }

    public function test_admin_can_delete_category(): void
    {
        $category = Category::create(['name' => 'Kios', 'slug' => 'kios', 'is_active' => true]);

        $this->actingAs($this->admin())
            ->delete("/admin/categories/{$category->id}")
            ->assertRedirect();

        $this->assertDatabaseMissing('categories', ['id' => $category->id]);
    }

    public function test_non_admin_cannot_manage_categories(): void
    {
        $user = User::factory()->create(['role' => 'user']);
        $category = Category::create(['name' => 'Gudang', 'slug' => 'gudang', 'is_active' => true]);

        $this->actingAs($user)->delete("/admin/categories/{$category->id}")->assertForbidden();
    }
}
