<?php

namespace App\Http\Controllers;

use App\Models\GalleryPhoto;
use App\Models\Notice;
use App\Models\Result;
use App\Models\Scholarship;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    /**
     * Show the public home page.
     */
    public function home(): Response
    {
        return Inertia::render('site/home', [
            'notices' => Notice::query()
                ->orderByDesc('notice_date')
                ->orderByDesc('id')
                ->take(4)
                ->get(),
            'photos' => GalleryPhoto::query()
                ->orderByDesc('created_at')
                ->orderByDesc('id')
                ->take(6)
                ->get(),
        ]);
    }

    /**
     * Show the about page with leadership and faculty details.
     */
    public function about(): Response
    {
        return Inertia::render('site/about');
    }

    /**
     * Show the notices page.
     */
    public function notices(): Response
    {
        return Inertia::render('site/notice', [
            'notices' => Notice::query()
                ->orderByDesc('notice_date')
                ->orderByDesc('id')
                ->get(),
        ]);
    }

    /**
     * Show the gallery page.
     */
    public function gallery(): Response
    {
        return Inertia::render('site/gallery', [
            'photos' => GalleryPhoto::query()
                ->orderByDesc('created_at')
                ->orderByDesc('id')
                ->get(),
        ]);
    }

    /**
     * Show the class-wise results page.
     */
    public function results(): Response
    {
        return Inertia::render('site/result', [
            'results' => Result::query()
                ->orderByDesc('created_at')
                ->orderByDesc('id')
                ->get(),
        ]);
    }

    /**
     * Show the scholarship announcements page.
     */
    public function scholarships(): Response
    {
        return Inertia::render('site/admission/scholarships', [
            'scholarships' => Scholarship::query()
                ->orderByDesc('announce_date')
                ->orderByDesc('id')
                ->get(),
        ]);
    }

    /**
     * Show the Bhairab Bazar branch contact page.
     */
    public function bhairabBazar(): Response
    {
        return Inertia::render('site/contacts/bhairab-bazar');
    }

    /**
     * Show the Kamalpur branch contact page.
     */
    public function kamalpur(): Response
    {
        return Inertia::render('site/contacts/kamalpur');
    }
}
