<?php

namespace Tests\Feature;

use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ItemFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_can_view_items()
    {
        $user = User::factory()->create();
        Item::factory(5)->create(['user_id' => $user->id]);

        $response = $this->getJson('/api/items');

        $response->assertStatus(200)
            ->assertJsonStructure(['success', 'data', 'message']);
    }

    public function test_user_can_create_item()
    {
        $user = User::factory()->create();

        \Laravel\Sanctum\Sanctum::actingAs($user, ['*']);

        $response = $this->postJson('/api/items', [
            'title' => 'Lost Keys',
            'type' => 'lost',
            'location' => 'Central Park',
            'date' => '2023-10-10',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('success', true);

        $this->assertDatabaseHas('items', ['title' => 'Lost Keys']);
    }

    public function test_user_can_update_own_item()
    {
        $user = User::factory()->create();
        $item = Item::factory()->create(['user_id' => $user->id]);

        \Laravel\Sanctum\Sanctum::actingAs($user, ['*']);

        $response = $this->putJson("/api/items/{$item->id}", [
            'title' => 'Updated Title',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('items', ['title' => 'Updated Title']);
    }

    public function test_user_cannot_update_others_item()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $item = Item::factory()->create(['user_id' => $user2->id]);

        \Laravel\Sanctum\Sanctum::actingAs($user1, ['*']);

        $response = $this->putJson("/api/items/{$item->id}", [
            'title' => 'Hacked Title',
        ]);

        $response->assertStatus(403);
    }

    public function test_admin_can_update_status()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $user = User::factory()->create();
        $item = Item::factory()->create(['user_id' => $user->id]);

        \Laravel\Sanctum\Sanctum::actingAs($admin, ['*']);

        $response = $this->patchJson("/api/admin/items/{$item->id}/status", [
            'status' => 'resolved',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('items', ['id' => $item->id, 'status' => 'resolved']);
    }

    public function test_admin_can_update_status_to_archived()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $user = User::factory()->create();
        $item = Item::factory()->create(['user_id' => $user->id]);

        \Laravel\Sanctum\Sanctum::actingAs($admin, ['*']);

        $response = $this->patchJson("/api/admin/items/{$item->id}/status", [
            'status' => 'archived',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('items', ['id' => $item->id, 'status' => 'archived']);
    }

    public function test_my_items_returns_only_auth_user_items()
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        Item::factory(3)->create(['user_id' => $user->id]);
        Item::factory(2)->create(['user_id' => $otherUser->id]);

        \Laravel\Sanctum\Sanctum::actingAs($user, ['*']);

        $response = $this->getJson('/api/my/items');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data.data'); // Pagination structure
    }

    public function test_user_cannot_access_admin_routes()
    {
        $user = User::factory()->create(['role' => 'user']);

        \Laravel\Sanctum\Sanctum::actingAs($user, ['*']);

        $response = $this->getJson('/api/admin/items');

        $response->assertStatus(403);
    }

    public function test_user_can_delete_own_item()
    {
        $user = User::factory()->create();
        $item = Item::factory()->create(['user_id' => $user->id]);

        \Laravel\Sanctum\Sanctum::actingAs($user, ['*']);

        $response = $this->deleteJson("/api/items/{$item->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('items', ['id' => $item->id]);
    }

    public function test_admin_can_delete_any_item()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $user = User::factory()->create();
        $item = Item::factory()->create(['user_id' => $user->id]);

        \Laravel\Sanctum\Sanctum::actingAs($admin, ['*']);

        $response = $this->deleteJson("/api/admin/items/{$item->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('items', ['id' => $item->id]);
    }
}
