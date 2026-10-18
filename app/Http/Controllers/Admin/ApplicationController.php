<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    /**
     * Delete a submitted admission application.
     */
    public function destroy(Application $application): RedirectResponse
    {
        $application->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Application deleted.')]);

        return back();
    }
}
