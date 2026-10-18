<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Result;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ResultController extends Controller
{
    /**
     * List the uploaded result PDFs.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();

        $results = Result::query()
            ->when($search !== '', fn (Builder $query) => $query->where(
                fn (Builder $group) => $group
                    ->where('title', 'like', "%{$search}%")
                    ->orWhere('class_name', 'like', "%{$search}%"),
            ))
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/results/index', [
            'results' => $results,
            'filters' => ['search' => $search],
        ]);
    }

    /**
     * Store a newly uploaded result PDF.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'class_name' => ['required', 'string', Rule::in(Application::CLASS_NAMES)],
            'files' => ['required', 'array'],
            'files.*' => ['file', 'mimes:pdf', 'max:10240'],
        ], [
            'class_name.required' => __('Choose the class for this result.'),
            'files.required' => __('Choose at least one PDF to upload.'),
            'files.*.mimes' => __('Results must be PDF files.'),
            'files.*.max' => __('Each PDF may not be larger than 10 MB.'),
        ]);

        /** @var array<int, UploadedFile> $files */
        $files = $request->file('files');
        $directory = 'results/'.Str::slug($validated['class_name']);

        foreach ($files as $file) {
            Result::query()->create([
                'title' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
                'class_name' => $validated['class_name'],
                'file_path' => $file->store($directory, 'public'),
                'file_size' => $file->getSize(),
            ]);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Result uploaded.')]);

        return back();
    }

    /**
     * Rename a result or change its class.
     */
    public function update(Request $request, Result $result): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'class_name' => ['required', 'string', Rule::in(Application::CLASS_NAMES)],
        ]);

        $result->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Result updated.')]);

        return back();
    }

    /**
     * Delete a result and its stored PDF.
     */
    public function destroy(Result $result): RedirectResponse
    {
        Storage::disk('public')->delete($result->file_path);

        $result->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Result deleted.')]);

        return back();
    }
}
