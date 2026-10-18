<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    /**
     * Add a new announcement ticker message.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'text_en' => ['required', 'string', 'max:500'],
            'text_bn' => ['required', 'string', 'max:500'],
        ]);

        Announcement::query()->create($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Announcement added.')]);

        return back();
    }

    /**
     * Toggle whether an announcement is shown in the ticker.
     */
    public function update(Request $request, Announcement $announcement): RedirectResponse
    {
        $validated = $request->validate([
            'active' => ['required', 'boolean'],
        ]);

        $announcement->update($validated);

        return back();
    }

    /**
     * Delete an announcement.
     */
    public function destroy(Announcement $announcement): RedirectResponse
    {
        $announcement->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Announcement deleted.')]);

        return back();
    }
}
