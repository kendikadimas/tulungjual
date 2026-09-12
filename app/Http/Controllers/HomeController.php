<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Listing;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $featuredListings = Listing::with(['photos', 'pengiklanInfo'])
            ->publicApproved()
            ->latest()
            ->take(6)
            ->get();

        $categories = Category::where('is_active', true)->get();

        $stats = [
            'total_listings' => Listing::publicApproved()->count(),
            'total_cities' => Listing::publicApproved()->distinct('kota')->count('kota'),
            'total_users' => \App\Models\User::count(),
        ];

        return Inertia::render('Home', [
            'featuredListings' => $featuredListings,
            'categories' => $categories,
            'stats' => $stats,
        ]);
    }
}
