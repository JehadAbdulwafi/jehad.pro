<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'required|string',
            'category' => 'required|string',
            'name' => 'required|string',
            'desc' => 'required|string',
            'readTime' => 'required|string',
            'jobTitle' => 'required|string',
            'is_published' => 'nullable',
            'is_featured' => 'nullable',
        ];
    }
}
