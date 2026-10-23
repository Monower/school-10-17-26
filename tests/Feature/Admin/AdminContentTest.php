<?php

use App\Models\Announcement;
use App\Models\Application;
use App\Models\FacultyMember;
use App\Models\GalleryPhoto;
use App\Models\LeadershipMember;
use App\Models\Notice;
use App\Models\Result;
use App\Models\Scholarship;
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

test('an admin can edit a notice', function () {
    $notice = Notice::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->patch(route('admin.notices.update', $notice), [
            'title_en' => 'Updated title',
            'title_bn' => 'হালনাগাদ শিরোনাম',
            'body_en' => 'Updated details',
            'notice_date' => '2026-10-02',
        ])
        ->assertRedirect();

    $notice->refresh();

    expect($notice->title_en)->toBe('Updated title')
        ->and($notice->title_bn)->toBe('হালনাগাদ শিরোনাম')
        ->and($notice->body_en)->toBe('Updated details');
});

test('editing a notice still requires both language titles', function () {
    $notice = Notice::factory()->create(['title_bn' => 'মূল শিরোনাম']);

    $this->actingAs(User::factory()->admin()->create())
        ->patch(route('admin.notices.update', $notice), [
            'title_en' => 'Only English',
            'title_bn' => '',
            'notice_date' => '2026-10-02',
        ])
        ->assertSessionHasErrors('title_bn');

    expect($notice->fresh()->title_en)->not->toBe('Only English');
});

test('an admin can edit a scholarship', function () {
    $scholarship = Scholarship::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->patch(route('admin.scholarships.update', $scholarship), [
            'title_en' => 'Updated scholarship',
            'title_bn' => 'হালনাগাদ বৃত্তি',
            'announce_date' => '2026-10-06',
        ])
        ->assertRedirect();

    expect($scholarship->fresh()->title_en)->toBe('Updated scholarship');
});

test('an admin can rename a result and move it to another class', function () {
    $result = Result::factory()->create([
        'title' => 'midterm',
        'class_name' => 'Class 1',
    ]);

    $this->actingAs(User::factory()->admin()->create())
        ->patch(route('admin.results.update', $result), [
            'title' => 'Half yearly',
            'class_name' => 'Class 6',
        ])
        ->assertRedirect();

    $result->refresh();

    expect($result->title)->toBe('Half yearly')
        ->and($result->class_name)->toBe('Class 6');
});

test('moving a result to another class moves its stored pdf', function () {
    Storage::fake('public');
    Storage::disk('public')->put('results/class-1/midterm.pdf', 'pdf content');
    $result = Result::factory()->create([
        'title' => 'midterm',
        'class_name' => 'Class 1',
        'file_path' => 'results/class-1/midterm.pdf',
    ]);

    $this->actingAs(User::factory()->admin()->create())
        ->patch(route('admin.results.update', $result), [
            'title' => 'Midterm',
            'class_name' => 'Class 6',
        ])
        ->assertRedirect();

    expect($result->fresh()->file_path)->toBe('results/class-6/midterm.pdf');

    Storage::disk('public')->assertMissing('results/class-1/midterm.pdf');
    Storage::disk('public')->assertExists('results/class-6/midterm.pdf');
});

test('an admin can update a gallery photo caption', function () {
    $photo = GalleryPhoto::factory()->create(['caption' => null]);

    $this->actingAs(User::factory()->admin()->create())
        ->patch(route('admin.gallery.update', $photo), [
            'caption' => 'Sports day',
        ])
        ->assertRedirect();

    expect($photo->fresh()->caption)->toBe('Sports day');
});

test('an admin can edit an announcement message', function () {
    $announcement = Announcement::factory()->create([
        'text_en' => 'Old text',
        'text_bn' => 'পুরনো বার্তা',
        'active' => true,
    ]);

    $this->actingAs(User::factory()->admin()->create())
        ->patch(route('admin.announcements.update', $announcement), [
            'text_en' => 'New text',
            'text_bn' => 'নতুন বার্তা',
            'active' => false,
        ])
        ->assertRedirect();

    $announcement->refresh();

    expect($announcement->text_en)->toBe('New text')
        ->and($announcement->text_bn)->toBe('নতুন বার্তা')
        ->and($announcement->active)->toBeFalse();
});

test('an admin can add a leadership member', function () {
    Storage::fake('public');

    $this->actingAs(User::factory()->admin()->create())
        ->post(route('admin.leadership.store'), [
            'name_en' => 'Md. Rahim Uddin',
            'name_bn' => 'মো. রহিম উদ্দিন',
            'role_en' => 'Chairman',
            'role_bn' => 'চেয়ারম্যান',
            'message_en' => 'Welcome to our school.',
            'image' => UploadedFile::fake()->image('chairman.jpg', 400, 500),
            'sort_order' => 1,
            'active' => true,
        ])
        ->assertRedirect();

    $member = LeadershipMember::query()->sole();

    expect($member->name_en)->toBe('Md. Rahim Uddin')
        ->and($member->role_bn)->toBe('চেয়ারম্যান')
        ->and($member->active)->toBeTrue();

    Storage::disk('public')->assertExists($member->image_path);
});

test('adding a leadership member requires both language names and a portrait', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post(route('admin.leadership.store'), [
            'name_en' => 'Only English',
            'role_en' => 'Chairman',
            'role_bn' => 'চেয়ারম্যান',
        ])
        ->assertSessionHasErrors(['name_bn', 'image']);

    $this->assertDatabaseCount('leadership_members', 0);
});

test('updating a leadership member replaces the stored portrait', function () {
    Storage::fake('public');
    Storage::disk('public')->put('leadership/old.jpg', 'old image');
    $member = LeadershipMember::factory()->create([
        'image_path' => 'leadership/old.jpg',
    ]);

    $this->actingAs(User::factory()->admin()->create())
        ->patch(route('admin.leadership.update', $member), [
            'name_en' => 'Updated name',
            'name_bn' => 'হালনাগাদ নাম',
            'role_en' => 'Chairman',
            'role_bn' => 'চেয়ারম্যান',
            'image' => UploadedFile::fake()->image('new.jpg', 400, 500),
        ])
        ->assertRedirect();

    $member->refresh();

    expect($member->name_en)->toBe('Updated name');

    Storage::disk('public')->assertMissing('leadership/old.jpg');
    Storage::disk('public')->assertExists($member->image_path);
});

test('an admin can hide a leadership member', function () {
    $member = LeadershipMember::factory()->create(['active' => true]);

    $this->actingAs(User::factory()->admin()->create())
        ->patch(route('admin.leadership.update', $member), ['active' => false])
        ->assertRedirect();

    expect($member->fresh()->active)->toBeFalse();
});

test('deleting a leadership member removes their stored portrait', function () {
    Storage::fake('public');
    Storage::disk('public')->put('leadership/chairman.jpg', 'image content');
    $member = LeadershipMember::factory()->create([
        'image_path' => 'leadership/chairman.jpg',
    ]);

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('admin.leadership.destroy', $member))
        ->assertRedirect();

    $this->assertDatabaseCount('leadership_members', 0);
    Storage::disk('public')->assertMissing('leadership/chairman.jpg');
});

test('an admin can add a faculty member', function () {
    Storage::fake('public');

    $this->actingAs(User::factory()->admin()->create())
        ->post(route('admin.faculty.store'), [
            'name_en' => 'Md. Karim Uddin',
            'name_bn' => 'মো. করিম উদ্দিন',
            'designation_en' => 'Senior Teacher, Mathematics',
            'designation_bn' => 'সিনিয়র শিক্ষক, গণিত',
            'image' => UploadedFile::fake()->image('teacher.jpg', 400, 500),
            'sort_order' => 1,
            'active' => true,
        ])
        ->assertRedirect();

    $member = FacultyMember::query()->sole();

    expect($member->name_en)->toBe('Md. Karim Uddin')
        ->and($member->designation_bn)->toBe('সিনিয়র শিক্ষক, গণিত')
        ->and($member->active)->toBeTrue();

    Storage::disk('public')->assertExists($member->image_path);
});

test('adding a faculty member requires both language names, designations and a portrait', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post(route('admin.faculty.store'), [
            'name_en' => 'Only English',
            'designation_en' => 'Teacher, English',
        ])
        ->assertSessionHasErrors(['name_bn', 'designation_bn', 'image']);

    $this->assertDatabaseCount('faculty_members', 0);
});

test('updating a faculty member replaces the stored portrait', function () {
    Storage::fake('public');
    Storage::disk('public')->put('faculty/old.jpg', 'old image');
    $member = FacultyMember::factory()->create([
        'image_path' => 'faculty/old.jpg',
    ]);

    $this->actingAs(User::factory()->admin()->create())
        ->patch(route('admin.faculty.update', $member), [
            'name_en' => 'Updated name',
            'name_bn' => 'হালনাগাদ নাম',
            'designation_en' => 'Teacher, Physics',
            'designation_bn' => 'শিক্ষক, পদার্থবিজ্ঞান',
            'image' => UploadedFile::fake()->image('new.jpg', 400, 500),
        ])
        ->assertRedirect();

    $member->refresh();

    expect($member->name_en)->toBe('Updated name')
        ->and($member->designation_en)->toBe('Teacher, Physics');

    Storage::disk('public')->assertMissing('faculty/old.jpg');
    Storage::disk('public')->assertExists($member->image_path);
});

test('an admin can hide a faculty member', function () {
    $member = FacultyMember::factory()->create(['active' => true]);

    $this->actingAs(User::factory()->admin()->create())
        ->patch(route('admin.faculty.update', $member), ['active' => false])
        ->assertRedirect();

    expect($member->fresh()->active)->toBeFalse();
});

test('deleting a faculty member removes their stored portrait', function () {
    Storage::fake('public');
    Storage::disk('public')->put('faculty/teacher.jpg', 'image content');
    $member = FacultyMember::factory()->create([
        'image_path' => 'faculty/teacher.jpg',
    ]);

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('admin.faculty.destroy', $member))
        ->assertRedirect();

    $this->assertDatabaseCount('faculty_members', 0);
    Storage::disk('public')->assertMissing('faculty/teacher.jpg');
});
