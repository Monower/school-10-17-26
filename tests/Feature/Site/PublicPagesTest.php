<?php

use App\Models\Announcement;
use App\Models\GalleryPhoto;
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
