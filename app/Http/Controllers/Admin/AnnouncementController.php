<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementController extends Controller
{
    /**
     * List the announcement ticker messages.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();

        $announcements = Announcement::query()
            ->when($search !== '', fn (Builder $query) => $query->where(
                fn (Builder $group) => $group
                    ->where('text_en', 'like', "%{$search}%")
                    ->orWhere('text_bn', 'like', "%{$search}%"),
            ))
            ->orderByDesc('active')
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/announcements/index', [
            'announcements' => $announcements,
            'filters' => ['search' => $search],
        ]);
    }

    /**
     * Add a new announcement ticker message.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'text_en' => ['required', 'string', 'max:500'],
            'text_bn' => ['required', 'string', 'max:500'],
            'active' => ['sometimes', 'boolean'],
        ]);

        Announcement::query()->create([
            'text_en' => $validated['text_en'],
            'text_bn' => $validated['text_bn'],
            'active' => $validated['active'] ?? true,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Announcement added.')]);

        return back();
    }

    /**
     * Update an announcement message or toggle it in the ticker.
     */
    public function update(Request $request, Announcement $announcement): RedirectResponse
    {
        $validated = $request->validate([
            'text_en' => ['sometimes', 'required', 'string', 'max:500'],
            'text_bn' => ['sometimes', 'required', 'string', 'max:500'],
            'active' => ['sometimes', 'boolean'],
        ]);

        $announcement->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Announcement updated.')]);

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
