<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\ApplicationController;
use App\Http\Controllers\Admin\FacultyController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\LeadershipController;
use App\Http\Controllers\Admin\NoticeController;
use App\Http\Controllers\Admin\ResultController;
use App\Http\Controllers\Admin\ScholarshipController;
use App\Http\Controllers\AdmissionApplicationController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('about', [PageController::class, 'about'])->name('about');
Route::get('notice', [PageController::class, 'notices'])->name('notice');
Route::get('gallery', [PageController::class, 'gallery'])->name('gallery');
Route::get('result', [PageController::class, 'results'])->name('result');

Route::get('admission/apply', [AdmissionApplicationController::class, 'create'])->name('admission.apply');
Route::post('admission/apply', [AdmissionApplicationController::class, 'store'])
    ->middleware('throttle:6,1')
    ->name('admission.apply.store');
Route::get('admission/scholarships', [PageController::class, 'scholarships'])->name('admission.scholarships');

Route::get('contacts/bhairab-bazar', [PageController::class, 'bhairabBazar'])->name('contacts.bhairab-bazar');
Route::get('contacts/kamalpur', [PageController::class, 'kamalpur'])->name('contacts.kamalpur');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('index');

    Route::resource('notices', NoticeController::class)->except(['show', 'create', 'edit']);
    Route::resource('scholarships', ScholarshipController::class)->except(['show', 'create', 'edit']);
    Route::resource('announcements', AnnouncementController::class)->except(['show', 'create', 'edit']);

    Route::resource('leadership', LeadershipController::class)
        ->except(['show', 'create', 'edit'])
        ->parameters(['leadership' => 'member']);

    Route::resource('faculty', FacultyController::class)
        ->except(['show', 'create', 'edit'])
        ->parameters(['faculty' => 'member']);

    Route::resource('gallery', GalleryController::class)
        ->except(['show', 'create', 'edit'])
        ->parameters(['gallery' => 'photo']);

    Route::resource('results', ResultController::class)->except(['show', 'create', 'edit']);

    Route::get('applications', [ApplicationController::class, 'index'])->name('applications.index');
    Route::delete('applications/{application}', [ApplicationController::class, 'destroy'])->name('applications.destroy');
});

require __DIR__.'/settings.php';
