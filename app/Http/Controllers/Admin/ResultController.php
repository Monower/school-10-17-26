<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Result;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ResultController extends Controller
{
    /**
     * Store a newly uploaded result PDF.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'class_name' => ['required', 'string', Rule::in(Application::CLASS_NAMES)],
            'files' => ['required', 'array'],
            'files.*' => ['file', 'mimes:pdf', 'max:10240'],
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
