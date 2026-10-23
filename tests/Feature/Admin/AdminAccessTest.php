<?php

use App\Models\Notice;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page', function () {
    $this->get(route('admin.index'))->assertRedirect(route('login'));
});

test('non admin users cannot view the admin portal', function () {
    $this->actingAs(User::factory()->create())
        ->get(route('admin.index'))
        ->assertForbidden();
});

test('admins can view the admin portal', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->get(route('admin.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/index'));
});

test('non admin users cannot manage content', function () {
    $this->actingAs(User::factory()->create())
        ->post(route('admin.notices.store'), [
            'title_en' => 'Blocked',
            'title_bn' => 'অনুমতি নেই',
            'notice_date' => '2026-10-01',
        ])
        ->assertForbidden();

    $this->assertDatabaseCount('notices', 0);
});

test('the admin dashboard shows content statistics', function () {
    Notice::factory()->count(2)->create();

    $this->actingAs(User::factory()->admin()->create())
        ->get(route('admin.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/index')
            ->where('stats.notices', 2)
            ->has('recentNotices')
            ->has('recentApplications'));
});

test('admins can browse the managed content lists', function (string $route, string $component) {
    $this->actingAs(User::factory()->admin()->create())
        ->get(route($route))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component($component));
})->with([
    ['admin.notices.index', 'admin/notices/index'],
    ['admin.scholarships.index', 'admin/scholarships/index'],
    ['admin.announcements.index', 'admin/announcements/index'],
    ['admin.gallery.index', 'admin/gallery/index'],
    ['admin.leadership.index', 'admin/leadership/index'],
    ['admin.faculty.index', 'admin/faculty/index'],
    ['admin.results.index', 'admin/results/index'],
    ['admin.applications.index', 'admin/applications/index'],
]);

test('notices can be filtered by a search term', function () {
    Notice::factory()->create(['title_en' => 'Exam schedule']);
    Notice::factory()->create(['title_en' => 'Holiday notice']);

    $this->actingAs(User::factory()->admin()->create())
        ->get(route('admin.notices.index', ['search' => 'Exam']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/notices/index')
            ->has('notices.data', 1)
            ->where('notices.data.0.title_en', 'Exam schedule'));
});

test('non admin users cannot update content', function () {
    $notice = Notice::factory()->create();

    $this->actingAs(User::factory()->create())
        ->patch(route('admin.notices.update', $notice), [
            'title_en' => 'Blocked',
            'title_bn' => 'অনুমতি নেই',
            'notice_date' => '2026-10-01',
        ])
        ->assertForbidden();

    expect($notice->fresh()->title_en)->not->toBe('Blocked');
});
