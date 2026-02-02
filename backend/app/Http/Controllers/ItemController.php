<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ItemController extends Controller
{
    public function index(Request $request)
    {
        $query = Item::query();

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }



        $items = $query->latest()->paginate(9);

        return response()->json([
            'success' => true,
            'data' => $items,
            'message' => 'Items retrieved successfully',
        ]);
    }

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

    public function destroy(Item $item)
    {
        $this->authorize('delete', $item);

        if ($item->image && str_contains($item->image, 'cloudinary')) {
            // Cloudinary deletion logic if needed
        }

        $item->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item deleted successfully',
        ]);
    }

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
