<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notice;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoticeController extends Controller
{
    /**
     * Publish a new bilingual notice.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title_en' => ['required', 'string', 'max:255'],
            'title_bn' => ['required', 'string', 'max:255'],
            'body_en' => ['nullable', 'string', 'max:5000'],
            'body_bn' => ['nullable', 'string', 'max:5000'],
            'notice_date' => ['required', 'date'],
        ]);

        Notice::query()->create($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Notice published.')]);

        return back();
    }

    /**
     * Delete a notice.
     */
    public function destroy(Notice $notice): RedirectResponse
    {
        $notice->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Notice deleted.')]);

        return back();
    }
}
