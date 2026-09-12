<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Listing;
use App\Models\User;
use App\Mail\ListingApproved;
use App\Mail\ListingRejected;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function dashboard(): Response
    {
        $stats = [
            'total_listings' => Listing::count(),
            'pending_listings' => Listing::where('status_approval', 'pending')->count(),
            'approved_listings' => Listing::where('status_approval', 'approved')->count(),
            'rejected_listings' => Listing::where('status_approval', 'rejected')->count(),
            'total_users' => User::where('role', 'user')->count(),
            'total_categories' => Category::count(),
        ];

        $recentListings = Listing::with(['user', 'pengiklanInfo'])
            ->latest()
            ->take(6)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentListings' => $recentListings,
        ]);
    }

    public function listings(Request $request): Response
    {
        $query = Listing::with(['user', 'pengiklanInfo', 'photos']);

        if ($request->filled('status')) {
            $query->where('status_approval', $request->status);
        }

        if ($request->filled('q')) {
            $q = $request->q;
            $query->where(function ($sub) use ($q) {
                $sub->where('judul', 'like', "%{$q}%")
                    ->orWhere('kota', 'like', "%{$q}%")
                    ->orWhereHas('user', function ($uq) use ($q) {
                        $uq->where('name', 'like', "%{$q}%")->orWhere('email', 'like', "%{$q}%");
                    });
            });
        }

        $listings = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('Admin/Listings/Index', [
            'listings' => $listings,
            'filters' => (object) $request->only(['status', 'q']),
        ]);
    }

    public function showListing(Listing $listing): Response
    {
        $listing->load(['user', 'photos', 'videos', 'developerDetail', 'pengiklanInfo']);
        $listingData = $listing->makeVisible(['nomor_sertifikat', 'nama_pemegang_hak'])->toArray();

        return Inertia::render('Admin/Listings/Show', [
            'listing' => $listingData,
        ]);
    }

    public function approveListing(Listing $listing): RedirectResponse
    {
        $listing->update([
            'status_approval' => 'approved',
            'catatan_rejection' => null,
            'is_active' => true,
        ]);

        // Kirim notifikasi email ke pengiklan
        $listing->load('user');
        if ($listing->user?->email) {
            try {
                Mail::to($listing->user->email)->send(new ListingApproved($listing));
            } catch (\Throwable $e) {
                // Log tapi jangan blokir flow
                \Log::warning('Failed to send approval email for listing ' . $listing->id . ': ' . $e->getMessage());
            }
        }

        return back()->with('success', 'Iklan berhasil disetujui (Approved) dan sudah tayang di publik!');
    }

    public function rejectListing(Request $request, Listing $listing): RedirectResponse
    {
        $request->validate([
            'catatan_rejection' => 'required|string|max:1000',
        ]);

        $listing->update([
            'status_approval' => 'rejected',
            'catatan_rejection' => $request->catatan_rejection,
        ]);

        // Kirim notifikasi email ke pengiklan
        $listing->load('user');
        if ($listing->user?->email) {
            try {
                Mail::to($listing->user->email)->send(new ListingRejected($listing));
            } catch (\Throwable $e) {
                \Log::warning('Failed to send rejection email for listing ' . $listing->id . ': ' . $e->getMessage());
            }
        }

        return back()->with('success', 'Iklan telah ditolak (Rejected) dengan catatan.');
    }

    public function destroyListing(Listing $listing): RedirectResponse
    {
        $listing->delete();

        return redirect()->route('admin.listings.index')->with('success', 'Iklan properti berhasil dihapus permanen!');
    }

    public function users(Request $request): Response
    {
        $query = User::withCount('listings');

        if ($request->filled('q')) {
            $q = $request->q;
            $query->where(function ($sub) use ($q) {
                $sub->where('name', 'like', "%{$q}%")
                    ->orWhere('email', 'like', "%{$q}%")
                    ->orWhere('no_hp', 'like', "%{$q}%");
            });
        }

        $users = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => (object) $request->only(['q']),
        ]);
    }

    public function destroyUser(User $user): RedirectResponse
    {
        if ($user->isAdmin()) {
            return back()->with('error', 'Akun admin tidak dapat dihapus.');
        }

        $user->delete();

        return back()->with('success', 'Pengguna dan seluruh iklan terkait berhasil dihapus!');
    }

    public function updateUserRole(Request $request, User $user): RedirectResponse
    {
        if ($user->id === $request->user()->id) {
            return back()->with('error', 'Anda tidak dapat mengubah role akun Anda sendiri.');
        }

        $request->validate([
            'role' => 'required|in:user,admin',
        ]);

        $user->update([
            'role' => $request->role,
        ]);

        return back()->with('success', "Role pengguna {$user->name} berhasil diubah menjadi ".strtoupper($request->role).'!');
    }

    public function categories(): Response
    {
        $categories = Category::all();

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function storeCategory(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:categories,slug',
        ]);

        Category::create([
            'name' => $request->name,
            'slug' => \Illuminate\Support\Str::slug($request->slug),
            'is_active' => true,
        ]);

        return back()->with('success', 'Kategori baru berhasil ditambahkan!');
    }

    public function updateCategory(Request $request, Category $category): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:categories,slug,'.$category->id,
        ]);

        $category->update([
            'name' => $request->name,
            'slug' => \Illuminate\Support\Str::slug($request->slug),
        ]);

        return back()->with('success', 'Kategori berhasil diperbarui!');
    }

    public function toggleCategory(Category $category): RedirectResponse
    {
        $category->update([
            'is_active' => ! $category->is_active,
        ]);

        return back()->with('success', 'Status kategori berhasil diperbarui!');
    }

    public function destroyCategory(Category $category): RedirectResponse
    {
        $category->delete();

        return back()->with('success', 'Kategori berhasil dihapus!');
    }
}
