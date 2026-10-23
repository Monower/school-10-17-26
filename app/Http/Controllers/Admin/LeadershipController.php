<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LeadershipMember;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class LeadershipController extends Controller
{
    /**
     * List the leadership members shown on the website.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();

        $members = LeadershipMember::query()
            ->when($search !== '', fn (Builder $query) => $query->where(
                fn (Builder $group) => $group
                    ->where('name_en', 'like', "%{$search}%")
                    ->orWhere('name_bn', 'like', "%{$search}%")
                    ->orWhere('role_en', 'like', "%{$search}%")
                    ->orWhere('role_bn', 'like', "%{$search}%"),
            ))
            ->ordered()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/leadership/index', [
            'members' => $members,
            'filters' => ['search' => $search],
        ]);
    }

    /**
     * Add a new leadership member.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validated($request);

        $validated['sort_order'] = $validated['sort_order']
            ?? ((int) LeadershipMember::query()->max('sort_order') + 1);
        $validated['active'] = $validated['active'] ?? true;

        /** @var UploadedFile $image */
        $image = $request->file('image');
        $imagePath = $image->store('leadership', 'public');

        try {
            LeadershipMember::query()->create([
                ...$validated,
                'image_path' => $imagePath,
            ]);
        } catch (Throwable $exception) {
            Storage::disk('public')->delete($imagePath);

            throw $exception;
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Leadership member added.')]);

        return back();
    }

    /**
     * Update an existing leadership member.
     */
    public function update(Request $request, LeadershipMember $member): RedirectResponse
    {
        $validated = $this->validated($request, $member);

        if (array_key_exists('sort_order', $validated) && $validated['sort_order'] === null) {
            unset($validated['sort_order']);
        }

        if (! $request->hasFile('image')) {
            $member->update($validated);

            Inertia::flash('toast', ['type' => 'success', 'message' => __('Leadership member updated.')]);

            return back();
        }

        /** @var UploadedFile $image */
        $image = $request->file('image');

        $previousImage = $member->image_path;
        $newImage = $image->store('leadership', 'public');

        try {
            $member->update([
                ...$validated,
                'image_path' => $newImage,
            ]);
        } catch (Throwable $exception) {
            Storage::disk('public')->delete($newImage);

            throw $exception;
        }

        Storage::disk('public')->delete($previousImage);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Leadership member updated.')]);

        return back();
    }

    /**
     * Delete a leadership member and their stored portrait.
     */
    public function destroy(LeadershipMember $member): RedirectResponse
    {
        Storage::disk('public')->delete($member->image_path);

        $member->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Leadership member deleted.')]);

        return back();
    }

    /**
     * Validate the leadership member payload.
     *
     * @return array<string, mixed>
     */
    private function validated(Request $request, ?LeadershipMember $member = null): array
    {
        $isUpdate = $member instanceof LeadershipMember;

        $requiredText = $isUpdate ? ['sometimes', 'required'] : ['required'];
        $nullableText = $isUpdate ? ['sometimes', 'nullable'] : ['nullable'];
        $optional = $isUpdate ? ['sometimes'] : [];

        $validated = $request->validate([
            'name_en' => [...$requiredText, 'string', 'max:255'],
            'name_bn' => [...$requiredText, 'string', 'max:255'],
            'role_en' => [...$requiredText, 'string', 'max:255'],
            'role_bn' => [...$requiredText, 'string', 'max:255'],
            'message_en' => [...$nullableText, 'string', 'max:5000'],
            'message_bn' => [...$nullableText, 'string', 'max:5000'],
            'image' => [...($isUpdate ? ['sometimes'] : ['required']), 'nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'sort_order' => [...$optional, 'nullable', 'integer', 'min:0'],
            'active' => [...$optional, 'boolean'],
        ], [
            'image.required' => __('Upload a portrait for this member.'),
            'image.image' => __('The portrait must be an image.'),
            'image.mimes' => __('The portrait must be a JPG, PNG or WEBP file.'),
            'image.max' => __('The portrait may not be larger than 5 MB.'),
        ]);

        unset($validated['image']);

        return $validated;
    }
}
