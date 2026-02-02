<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ItemController extends Controller
{
    /**
     * Public index with filters and pagination.
     */
    public function index(Request $request)
    {
        $query = Item::query();

        // Filter by type (exact)
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Filter by location (partial)
        if ($request->filled('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        // Default: only pending/resolved? Or all? User brief says "list of items".
        // Assuming we show all items except maybe archived, or just all.
        // Brief doesn't specify exclusion, but usually we filter by status too.
        // For now, returning all (with filters).

        $items = $query->latest()->paginate(9);

        return response()->json([
            'success' => true,
            'data' => $items,
            'message' => 'Items retrieved successfully',
        ]);
    }

    /**
     * Public show item.
     */
    public function show($id)
    {
        $item = Item::find($id);

        if (!$item) {
            return response()->json(['success' => false, 'message' => 'Item not found'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $item,
            'message' => 'Item retrieved successfully',
        ]);
    }

    /**
     * Store item (Auth).
     */
    public function store(StoreItemRequest $request)
    {
        $data = $request->validated();

        $item = $request->user()->items()->create([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'image' => $data['image'] ?? null,
            'type' => $data['type'],
            'location' => $data['location'],
            'date' => $data['date'],
            'status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'data' => $item,
            'message' => 'Item created successfully',
        ], 201);
    }

    /**
     * Update item (Auth: Owner or Admin).
     */
    public function update(UpdateItemRequest $request, Item $item)
    {
        $this->authorize('update', $item);

        $item->update($request->validated());

        return response()->json([
            'success' => true,
            'data' => $item,
            'message' => 'Item updated successfully',
        ]);
    }

    /**
     * Destroy item (Auth: Owner or Admin).
     */
    public function destroy(Item $item)
    {
        $this->authorize('delete', $item);

        if ($item->image && str_contains($item->image, 'cloudinary')) {
            // Optional: Implement Cloudinary image deletion logic here if needed/desired.
            // For now, removing the database record is sufficient.
        }

        $item->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item deleted successfully',
        ]);
    }

    /**
     * My Items (Auth).
     */
    public function myItems(Request $request)
    {
        $items = $request->user()->items()->latest()->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $items,
            'message' => 'My items retrieved successfully',
        ]);
    }
}
