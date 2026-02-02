<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateItemStatusRequest;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemAdminController extends Controller
{
    public function indexAll(Request $request)
    {
        $query = Item::with('user');

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%");
            });
        }

        $items = $query->latest()->paginate(9);

        return response()->json([
            'success' => true,
            'data' => $items,
            'message' => 'All items retrieved successfully (Admin)',
        ]);
    }

    public function updateStatus(UpdateItemStatusRequest $request, $id)
    {
        $item = Item::find($id);

        if (!$item) {
            return response()->json(['success' => false, 'message' => 'Item not found'], 404);
        }

        $item->status = $request->status;
        $item->save();

        return response()->json([
            'success' => true,
            'data' => $item,
            'message' => 'Item status updated successfully',
        ]);
    }

    public function destroy($id)
    {
        $item = Item::find($id);

        if (!$item) {
            return response()->json(['success' => false, 'message' => 'Item not found'], 404);
        }

        $item->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item deleted successfully (Admin)',
        ]);
    }
}
