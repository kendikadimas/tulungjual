<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class StaticPageController extends Controller
{
    public function terms(): Response
    {
        return Inertia::render('Terms');
    }

    public function about(): Response
    {
        return Inertia::render('About');
    }
}
