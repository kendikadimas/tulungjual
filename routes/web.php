<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicListingController;
use App\Http\Controllers\StaticPageController;
use App\Http\Controllers\UserListingController;
use App\Http\Middleware\EnsureIsAdmin;
use App\Http\Middleware\EnsureIsSuperAdmin;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Pages
Route::get('/', HomeController::class)->name('home');
Route::get('/listing', [PublicListingController::class, 'index'])->name('listings.index');
Route::get('/listing/{slug}', [PublicListingController::class, 'show'])->name('listings.show');
Route::get('/syarat-ketentuan', [StaticPageController::class, 'terms'])->name('terms');
Route::get('/tentang-kontak', [StaticPageController::class, 'about'])->name('about');

// User Dashboard & Authenticated Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        if (request()->user()->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('user.listings.index');
    })->name('dashboard');

    // User Listings
    Route::get('/iklan-saya', [UserListingController::class, 'index'])->name('user.listings.index');
    Route::get('/pasang-iklan', [UserListingController::class, 'create'])->name('user.listings.create');
    Route::post('/pasang-iklan', [UserListingController::class, 'store'])->middleware('throttle:15,1')->name('user.listings.store');
    Route::get('/iklan-saya/{listing}/edit', [UserListingController::class, 'edit'])->name('user.listings.edit');
    Route::put('/iklan-saya/{listing}', [UserListingController::class, 'update'])->middleware('throttle:20,1')->name('user.listings.update');
    Route::delete('/iklan-saya/{listing}', [UserListingController::class, 'destroy'])->name('user.listings.destroy');
    Route::delete('/iklan-saya/{listing}/photos/{photo}', [UserListingController::class, 'destroyPhoto'])->name('user.listings.photos.destroy');
    Route::patch('/iklan-saya/{listing}/status', [UserListingController::class, 'updateStatus'])->name('user.listings.update-status');
    Route::patch('/iklan-saya/{listing}/toggle-active', [UserListingController::class, 'toggleActive'])->name('user.listings.toggle-active');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Panel Routes
Route::middleware(['auth', EnsureIsAdmin::class])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/listings', [AdminController::class, 'listings'])->name('listings.index');
    Route::get('/listings/{listing}', [AdminController::class, 'showListing'])->name('listings.show');
    Route::post('/listings/{listing}/approve', [AdminController::class, 'approveListing'])->name('listings.approve');
    Route::post('/listings/{listing}/reject', [AdminController::class, 'rejectListing'])->name('listings.reject');
    Route::delete('/listings/{listing}', [AdminController::class, 'destroyListing'])->name('listings.destroy');
    
    Route::get('/users', [AdminController::class, 'users'])->name('users.index');
    Route::patch('/users/{user}/role', [AdminController::class, 'updateUserRole'])->name('users.update-role');
    Route::delete('/users/{user}', [AdminController::class, 'destroyUser'])->name('users.destroy');
    Route::get('/categories', [AdminController::class, 'categories'])->name('categories.index');
    Route::post('/categories', [AdminController::class, 'storeCategory'])->name('categories.store');
    Route::put('/categories/{category}', [AdminController::class, 'updateCategory'])->name('categories.update');
    Route::patch('/categories/{category}/toggle', [AdminController::class, 'toggleCategory'])->name('categories.toggle');
    Route::delete('/categories/{category}', [AdminController::class, 'destroyCategory'])->name('categories.destroy');

    // Activity Log — super admin only
    Route::middleware(EnsureIsSuperAdmin::class)->group(function () {
        Route::get('/activity-logs', [AdminController::class, 'activityLogs'])->name('activity-logs.index');
    });
});

require __DIR__.'/auth.php';
