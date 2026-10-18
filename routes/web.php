<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\ApplicationController;
use App\Http\Controllers\Admin\GalleryController;
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

    Route::post('results', [ResultController::class, 'store'])->name('results.store');
    Route::delete('results/{result}', [ResultController::class, 'destroy'])->name('results.destroy');

    Route::post('gallery', [GalleryController::class, 'store'])->name('gallery.store');
    Route::delete('gallery/{photo}', [GalleryController::class, 'destroy'])->name('gallery.destroy');

    Route::post('notices', [NoticeController::class, 'store'])->name('notices.store');
    Route::delete('notices/{notice}', [NoticeController::class, 'destroy'])->name('notices.destroy');

    Route::post('scholarships', [ScholarshipController::class, 'store'])->name('scholarships.store');
    Route::delete('scholarships/{scholarship}', [ScholarshipController::class, 'destroy'])->name('scholarships.destroy');

    Route::post('announcements', [AnnouncementController::class, 'store'])->name('announcements.store');
    Route::patch('announcements/{announcement}', [AnnouncementController::class, 'update'])->name('announcements.update');
    Route::delete('announcements/{announcement}', [AnnouncementController::class, 'destroy'])->name('announcements.destroy');

    Route::delete('applications/{application}', [ApplicationController::class, 'destroy'])->name('applications.destroy');
});

require __DIR__.'/settings.php';
