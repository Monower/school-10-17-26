<?php

use App\Models\Announcement;
use App\Models\FacultyMember;
use App\Models\GalleryPhoto;
use App\Models\LeadershipMember;
use App\Models\Notice;
use App\Models\Result;
use App\Models\Scholarship;
use Inertia\Testing\AssertableInertia as Assert;

test('public pages render their inertia component', function (string $routeName, string $component) {
    $this->get(route($routeName))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component($component));
})->with([
    ['home', 'site/home'],
    ['about', 'site/about'],
    ['notice', 'site/notice'],
    ['gallery', 'site/gallery'],
    ['result', 'site/result'],
    ['admission.apply', 'site/admission/apply'],
    ['admission.scholarships', 'site/admission/scholarships'],
    ['contacts.bhairab-bazar', 'site/contacts/bhairab-bazar'],
    ['contacts.kamalpur', 'site/contacts/kamalpur'],
]);

test('the home page exposes the latest notices and gallery photos', function () {
    Notice::factory()->create(['title_en' => 'Home notice']);
    GalleryPhoto::factory()->create(['file_path' => 'gallery/home.jpg']);

    $this->get(route('home'))
        ->assertInertia(fn (Assert $page) => $page
            ->has('notices', 1)
            ->where('notices.0.title_en', 'Home notice')
            ->has('photos', 1)
            ->has('photos.0.url')
            ->missing('photos.0.file_path')
        );
});

test('the notices page lists the latest notices first', function () {
    Notice::factory()->create(['title_en' => 'Older notice', 'notice_date' => '2026-01-01']);
    Notice::factory()->create(['title_en' => 'Newer notice', 'notice_date' => '2026-09-01']);

    $this->get(route('notice'))
        ->assertInertia(fn (Assert $page) => $page
            ->has('notices', 2)
            ->where('notices.0.title_en', 'Newer notice')
        );
});

test('the results page exposes a public download url without the storage path', function () {
    Result::factory()->create(['title' => 'Midterm', 'file_path' => 'results/class-5/midterm.pdf']);

    $this->get(route('result'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('results.0.title', 'Midterm')
            ->has('results.0.url')
            ->missing('results.0.file_path')
        );
});

test('the gallery page exposes photo urls without the storage path', function () {
    GalleryPhoto::factory()->create(['file_path' => 'gallery/campus.jpg']);

    $this->get(route('gallery'))
        ->assertInertia(fn (Assert $page) => $page
            ->has('photos', 1)
            ->has('photos.0.url')
            ->missing('photos.0.file_path')
        );
});

test('the scholarships page lists announcements', function () {
    Scholarship::factory()->create(['title_en' => 'Merit scholarship']);

    $this->get(route('admission.scholarships'))
        ->assertInertia(fn (Assert $page) => $page
            ->has('scholarships', 1)
            ->where('scholarships.0.title_en', 'Merit scholarship')
        );
});

test('only active announcements are shared with the page', function () {
    Announcement::factory()->create(['text_en' => 'Active message', 'active' => true]);
    Announcement::factory()->inactive()->create(['text_en' => 'Hidden message']);

    $this->get(route('home'))
        ->assertInertia(fn (Assert $page) => $page
            ->has('announcements', 1)
            ->where('announcements.0.text_en', 'Active message')
        );
});

test('the home page exposes active leadership members in display order', function () {
    LeadershipMember::factory()->create(['name_en' => 'Second', 'sort_order' => 2]);
    LeadershipMember::factory()->create(['name_en' => 'First', 'sort_order' => 1]);
    LeadershipMember::factory()->inactive()->create(['name_en' => 'Hidden']);

    $this->get(route('home'))
        ->assertInertia(fn (Assert $page) => $page
            ->has('leaders', 2)
            ->where('leaders.0.name_en', 'First')
            ->where('leaders.1.name_en', 'Second')
            ->has('leaders.0.image_url')
            ->missing('leaders.0.image_path')
        );
});

test('the about page exposes leadership members', function () {
    LeadershipMember::factory()->create(['name_en' => 'Chairman']);

    $this->get(route('about'))
        ->assertInertia(fn (Assert $page) => $page
            ->has('leaders', 1)
            ->where('leaders.0.name_en', 'Chairman')
        );
});

test('the about page exposes active faculty members in display order', function () {
    FacultyMember::factory()->create(['name_en' => 'Second teacher', 'sort_order' => 2]);
    FacultyMember::factory()->create(['name_en' => 'First teacher', 'sort_order' => 1]);
    FacultyMember::factory()->inactive()->create(['name_en' => 'Hidden teacher']);

    $this->get(route('about'))
        ->assertInertia(fn (Assert $page) => $page
            ->has('faculty', 2)
            ->where('faculty.0.name_en', 'First teacher')
            ->where('faculty.1.name_en', 'Second teacher')
            ->has('faculty.0.image_url')
            ->missing('faculty.0.image_path')
        );
});
