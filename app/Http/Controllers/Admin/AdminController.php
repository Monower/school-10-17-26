<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\Application;
use App\Models\GalleryPhoto;
use App\Models\Notice;
use App\Models\Result;
use App\Models\Scholarship;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Show the staff admin portal with all managed content.
     */
    public function index(): Response
    {
        return Inertia::render('admin/index', [
            'results' => Result::query()
                ->orderByDesc('created_at')
                ->orderByDesc('id')
                ->get(),
            'photos' => GalleryPhoto::query()
                ->orderByDesc('created_at')
                ->orderByDesc('id')
                ->get(),
            'notices' => Notice::query()
                ->orderByDesc('notice_date')
                ->orderByDesc('id')
                ->get(),
            'scholarships' => Scholarship::query()
                ->orderByDesc('announce_date')
                ->orderByDesc('id')
                ->get(),
            'announcements' => Announcement::query()
                ->orderByDesc('created_at')
                ->orderByDesc('id')
                ->get(),
            'applications' => Application::query()
                ->orderByDesc('created_at')
                ->orderByDesc('id')
                ->get(),
        ]);
    }
}
