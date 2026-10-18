<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreApplicationRequest;
use App\Models\Application;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdmissionApplicationController extends Controller
{
    /**
     * Show the admission application form.
     */
    public function create(): Response
    {
        return Inertia::render('site/admission/apply');
    }

    /**
     * Store a newly submitted admission application.
     */
    public function store(StoreApplicationRequest $request): RedirectResponse
    {
        Application::query()->create($request->validated());

        return redirect()->route('admission.apply');
    }
}
