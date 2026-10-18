<?php

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
