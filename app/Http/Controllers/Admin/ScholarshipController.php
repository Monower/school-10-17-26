<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Scholarship;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScholarshipController extends Controller
{
    /**
     * Publish a new bilingual scholarship announcement.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title_en' => ['required', 'string', 'max:255'],
            'title_bn' => ['required', 'string', 'max:255'],
            'body_en' => ['nullable', 'string', 'max:5000'],
            'body_bn' => ['nullable', 'string', 'max:5000'],
            'announce_date' => ['required', 'date'],
        ]);

        Scholarship::query()->create($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Scholarship published.')]);

        return back();
    }

    /**
     * Delete a scholarship announcement.
     */
    public function destroy(Scholarship $scholarship): RedirectResponse
    {
        $scholarship->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Scholarship deleted.')]);

        return back();
    }
}
