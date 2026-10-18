<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryPhoto;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    /**
     * List the uploaded gallery photos.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();

        $photos = GalleryPhoto::query()
            ->when($search !== '', fn (Builder $query) => $query->where('caption', 'like', "%{$search}%"))
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('admin/gallery/index', [
            'photos' => $photos,
            'filters' => ['search' => $search],
        ]);
    }

    /**
     * Store newly uploaded gallery photos.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'photos' => ['required', 'array'],
            'photos.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ], [
            'photos.required' => __('Choose at least one photo to upload.'),
            'photos.*.image' => __('Every file must be an image.'),
            'photos.*.mimes' => __('Photos must be a JPG, PNG or WEBP file.'),
            'photos.*.max' => __('Each photo may not be larger than 5 MB.'),
        ]);

        /** @var array<int, UploadedFile> $photos */
        $photos = $request->file('photos');

        foreach ($photos as $photo) {
            GalleryPhoto::query()->create([
                'file_path' => $photo->store('gallery', 'public'),
            ]);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Photos uploaded.')]);

        return back();
    }

    /**
     * Update the caption of an uploaded photo.
     */
    public function update(Request $request, GalleryPhoto $photo): RedirectResponse
    {
        $validated = $request->validate([
            'caption' => ['nullable', 'string', 'max:255'],
        ]);

        $photo->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Photo updated.')]);

        return back();
    }

    /**
     * Delete a gallery photo and its stored image.
     */
    public function destroy(GalleryPhoto $photo): RedirectResponse
    {
        Storage::disk('public')->delete($photo->file_path);

        $photo->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Photo deleted.')]);

        return back();
    }
}
