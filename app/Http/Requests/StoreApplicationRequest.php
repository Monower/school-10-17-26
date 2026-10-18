<?php

namespace App\Http\Requests;

use App\Models\Application;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreApplicationRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'student_name' => ['required', 'string', 'max:100'],
            'date_of_birth' => ['required', 'date', 'before:today'],
            'class_name' => ['required', 'string', Rule::in(Application::CLASS_NAMES)],
            'gender' => ['required', 'string', Rule::in(Application::GENDERS)],
            'father_name' => ['required', 'string', 'max:100'],
            'mother_name' => ['required', 'string', 'max:100'],
            'phone' => ['required', 'string', 'max:15', 'regex:/^[0-9+\- ]{8,15}$/'],
            'email' => ['nullable', 'email', 'max:255'],
            'previous_school' => ['nullable', 'string', 'max:150'],
            'branch' => ['required', 'string', Rule::in(Application::BRANCHES)],
            'address' => ['required', 'string', 'max:300'],
        ];
    }
}
