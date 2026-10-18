<?php

use App\Models\Announcement;
use App\Models\Application;
use App\Models\GalleryPhoto;
use App\Models\Notice;
use App\Models\Result;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('an admin can upload a class result pdf', function () {
    Storage::fake('public');

    $this->actingAs(User::factory()->admin()->create())
        ->post(route('admin.results.store'), [
            'class_name' => 'Class 5',
            'files' => [UploadedFile::fake()->create('midterm.pdf', 120, 'application/pdf')],
        ])
        ->assertRedirect();

    $result = Result::query()->sole();

    expect($result->class_name)->toBe('Class 5')
        ->and($result->title)->toBe('midterm')
        ->and($result->file_size)->toBeGreaterThan(0);

    Storage::disk('public')->assertExists($result->file_path);
});

test('a result upload must be a pdf', function () {
    Storage::fake('public');

    $this->actingAs(User::factory()->admin()->create())
        ->post(route('admin.results.store'), [
            'class_name' => 'Class 5',
            'files' => [UploadedFile::fake()->create('marks.xlsx', 10)],
        ])
        ->assertSessionHasErrors('files.0');

    $this->assertDatabaseCount('results', 0);
});

test('deleting a result removes its stored file', function () {
    Storage::fake('public');
    Storage::disk('public')->put('results/class-5/midterm.pdf', 'pdf content');
    $result = Result::factory()->create(['file_path' => 'results/class-5/midterm.pdf']);

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('admin.results.destroy', $result))
        ->assertRedirect();

    $this->assertDatabaseCount('results', 0);
    Storage::disk('public')->assertMissing('results/class-5/midterm.pdf');
});

test('an admin can upload gallery photos', function () {
    Storage::fake('public');

    $this->actingAs(User::factory()->admin()->create())
        ->post(route('admin.gallery.store'), [
            'photos' => [UploadedFile::fake()->image('campus.jpg', 120, 120)],
        ])
        ->assertRedirect();

    $photo = GalleryPhoto::query()->sole();

    Storage::disk('public')->assertExists($photo->file_path);
});

test('deleting a gallery photo removes its stored image', function () {
    Storage::fake('public');
    Storage::disk('public')->put('gallery/campus.jpg', 'image content');
    $photo = GalleryPhoto::factory()->create(['file_path' => 'gallery/campus.jpg']);

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('admin.gallery.destroy', $photo))
        ->assertRedirect();

    $this->assertDatabaseCount('gallery_photos', 0);
    Storage::disk('public')->assertMissing('gallery/campus.jpg');
});

test('an admin can publish a bilingual notice', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post(route('admin.notices.store'), [
            'title_en' => 'Exam schedule',
            'title_bn' => 'পরীক্ষার সময়সূচি',
            'body_en' => 'See the attached schedule.',
            'notice_date' => '2026-10-01',
        ])
        ->assertRedirect();

    $notice = Notice::query()->sole();

    expect($notice->title_en)->toBe('Exam schedule')
        ->and($notice->title_bn)->toBe('পরীক্ষার সময়সূচি');
});

test('publishing a notice requires both language titles', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post(route('admin.notices.store'), [
            'title_en' => 'Only English',
            'notice_date' => '2026-10-01',
        ])
        ->assertSessionHasErrors('title_bn');

    $this->assertDatabaseCount('notices', 0);
});

test('an admin can publish a scholarship announcement', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post(route('admin.scholarships.store'), [
            'title_en' => 'Merit scholarship',
            'title_bn' => 'মেধা বৃত্তি',
            'announce_date' => '2026-10-05',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('scholarships', ['title_en' => 'Merit scholarship']);
});

test('an admin can add an announcement and toggle it off', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->post(route('admin.announcements.store'), [
            'text_en' => 'Admission open',
            'text_bn' => 'ভর্তি চলছে',
        ])
        ->assertRedirect();

    $announcement = Announcement::query()->sole();
    expect($announcement->active)->toBeTrue();

    $this->actingAs($admin)
        ->patch(route('admin.announcements.update', $announcement), ['active' => false])
        ->assertRedirect();

    expect($announcement->fresh()->active)->toBeFalse();
});

test('an admin can delete a submitted application', function () {
    $application = Application::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('admin.applications.destroy', $application))
        ->assertRedirect();

    $this->assertDatabaseCount('applications', 0);
});
