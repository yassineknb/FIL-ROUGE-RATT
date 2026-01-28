<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'type' => ['required', 'in:lost,found'],
            'location' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date'],
            // 'status' is usually set to pending on create, but if we want to allow it:
            'status' => ['nullable', 'in:pending,resolved,archived'],
        ];
    }
}
