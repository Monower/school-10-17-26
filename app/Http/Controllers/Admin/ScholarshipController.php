<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Scholarship;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ScholarshipController extends Controller
{
    /**
     * List the published scholarship announcements.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();

        $scholarships = Scholarship::query()
            ->when($search !== '', fn (Builder $query) => $query->where(
                fn (Builder $group) => $group
                    ->where('title_en', 'like', "%{$search}%")
                    ->orWhere('title_bn', 'like', "%{$search}%")
                    ->orWhere('body_en', 'like', "%{$search}%")
                    ->orWhere('body_bn', 'like', "%{$search}%"),
            ))
            ->orderByDesc('announce_date')
            ->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/scholarships/index', [
            'scholarships' => $scholarships,
            'filters' => ['search' => $search],
        ]);
    }

    /**
     * Publish a new bilingual scholarship announcement.
     */
    public function store(Request $request): RedirectResponse
    {
        Scholarship::query()->create($this->validated($request));

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Scholarship published.')]);

        return back();
    }

    /**
     * Update an existing scholarship announcement.
     */
    public function update(Request $request, Scholarship $scholarship): RedirectResponse
    {
        $scholarship->update($this->validated($request));

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Scholarship updated.')]);

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

    /**
     * Validate the scholarship payload.
     *
     * @return array<string, mixed>
     */
    private function validated(Request $request): array
    {
        return $request->validate([
            'title_en' => ['required', 'string', 'max:255'],
            'title_bn' => ['required', 'string', 'max:255'],
            'body_en' => ['nullable', 'string', 'max:5000'],
            'body_bn' => ['nullable', 'string', 'max:5000'],
            'announce_date' => ['required', 'date'],
        ]);
    }
}
