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
     * Show the admin dashboard with content statistics and recent activity.
     */
    public function index(): Response
    {
        return Inertia::render('admin/index', [
            'stats' => [
                'notices' => Notice::query()->count(),
                'scholarships' => Scholarship::query()->count(),
                'announcements' => Announcement::query()->count(),
                'activeAnnouncements' => Announcement::query()->where('active', true)->count(),
                'photos' => GalleryPhoto::query()->count(),
                'results' => Result::query()->count(),
                'applications' => Application::query()->count(),
            ],
            'recentApplications' => Application::query()
                ->orderByDesc('created_at')
                ->orderByDesc('id')
                ->take(5)
                ->get(),
            'recentNotices' => Notice::query()
                ->orderByDesc('notice_date')
                ->orderByDesc('id')
                ->take(5)
                ->get(),
        ]);
    }
}
