<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'desc' => 'required|string',
            'image' => 'required|string',
            'project_url' => 'required|string|nullable',
            'code_url' => 'required|string|nullable',
            'project_icon' => 'required|string|nullable',
            'technologies' => 'required|string',
            'project_name' => 'required|string',
            'short_desc' => 'required|string',
            'content' => 'required|string',
            'is_published' => 'nullable',
            'is_featured' => 'nullable',
        ];
    }
}
