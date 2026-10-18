<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notice;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NoticeController extends Controller
{
    /**
     * List the published notices.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();

        $notices = Notice::query()
            ->when($search !== '', fn (Builder $query) => $query->where(
                fn (Builder $group) => $group
                    ->where('title_en', 'like', "%{$search}%")
                    ->orWhere('title_bn', 'like', "%{$search}%")
                    ->orWhere('body_en', 'like', "%{$search}%")
                    ->orWhere('body_bn', 'like', "%{$search}%"),
            ))
            ->orderByDesc('notice_date')
            ->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/notices/index', [
            'notices' => $notices,
            'filters' => ['search' => $search],
        ]);
    }

    /**
     * Publish a new bilingual notice.
     */
    public function store(Request $request): RedirectResponse
    {
        Notice::query()->create($this->validated($request));

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Notice published.')]);

        return back();
    }

    /**
     * Update an existing notice.
     */
    public function update(Request $request, Notice $notice): RedirectResponse
    {
        $notice->update($this->validated($request));

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Notice updated.')]);

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

    /**
     * Validate the notice payload.
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
            'notice_date' => ['required', 'date'],
        ]);
    }
}
