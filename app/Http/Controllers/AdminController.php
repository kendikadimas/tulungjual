<?php

namespace App\Http\Controllers;

use App\Mail\ListingApproved;
use App\Mail\ListingRejected;
use App\Models\ActivityLog;
use App\Models\Category;
use App\Models\Listing;
use App\Models\Setting;
use App\Models\User;
use App\Support\ActivityLogger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
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
            'pending_payments' => Listing::where('payment_status', 'pending')->count(),
            'verified_payments' => Listing::where('payment_status', 'verified')->count(),
            'total_users' => User::where('role', User::ROLE_USER)->count(),
            'total_admins' => User::whereIn('role', [User::ROLE_ADMIN, User::ROLE_SUPER_ADMIN])->count(),
            'total_categories' => Category::count(),
        ];

        $recentListings = Listing::with(['user', 'pengiklanInfo'])
            ->latest()
            ->take(6)
            ->get();

        $recentActivities = ActivityLog::with('user')
            ->latest()
            ->take(8)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentListings' => $recentListings,
            'recentActivities' => $recentActivities,
        ]);
    }

    public function listings(Request $request): Response
    {
        $query = Listing::with(['user', 'pengiklanInfo', 'photos']);

        if ($request->filled('status')) {
            $query->where('status_approval', $request->status);
        }

        if ($request->filled('payment')) {
            $query->where('payment_status', $request->payment);
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
            'filters' => (object) $request->only(['status', 'q', 'payment']),
        ]);
    }

    public function showListing(Listing $listing): Response
    {
        $listing->load(['user', 'photos', 'videos', 'developerDetail', 'pengiklanInfo']);
        $listingData = $listing->makeVisible([
            'nomor_sertifikat',
            'nama_pemegang_hak',
            'payment_proof_url',
            'payment_sender_name',
            'payment_note',
            'payment_verified_by',
        ])->toArray();

        return Inertia::render('Admin/Listings/Show', [
            'listing' => $listingData,
        ]);
    }

    public function approveListing(Listing $listing): RedirectResponse
    {
        // Wajib verifikasi pembayaran dulu bila fitur pembayaran aktif
        if (Setting::get('payment_enabled', '1') === '1' && ! $listing->isPaymentVerified()) {
            return back()->with('error', 'Bukti pembayaran belum diverifikasi. Verifikasi pembayaran terlebih dahulu sebelum menyetujui iklan.');
        }

        $listing->update([
            'status_approval' => 'approved',
            'catatan_rejection' => null,
            'is_active' => true,
        ]);

        ActivityLogger::log(
            action: 'listing.approve',
            category: 'listing',
            description: "Menyetujui iklan \"{$listing->judul}\"",
            subject: $listing,
            subjectLabel: $listing->judul,
            meta: ['status_approval' => 'approved'],
        );

        // Kirim notifikasi email ke pengiklan
        $listing->load('user');
        if ($listing->user?->email) {
            try {
                Mail::to($listing->user->email)->send(new ListingApproved($listing));
            } catch (\Throwable $e) {
                \Log::warning('Failed to send approval email for listing '.$listing->id.': '.$e->getMessage());
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

        ActivityLogger::log(
            action: 'listing.reject',
            category: 'listing',
            description: "Menolak iklan \"{$listing->judul}\"",
            subject: $listing,
            subjectLabel: $listing->judul,
            meta: ['catatan_rejection' => $request->catatan_rejection],
        );

        // Kirim notifikasi email ke pengiklan
        $listing->load('user');
        if ($listing->user?->email) {
            try {
                Mail::to($listing->user->email)->send(new ListingRejected($listing));
            } catch (\Throwable $e) {
                \Log::warning('Failed to send rejection email for listing '.$listing->id.': '.$e->getMessage());
            }
        }

        return back()->with('success', 'Iklan telah ditolak (Rejected) dengan catatan.');
    }

    /**
     * Verifikasi bukti pembayaran pengiklan.
     */
    public function verifyPayment(Request $request, Listing $listing): RedirectResponse
    {
        if (! $listing->hasPaymentProof()) {
            return back()->with('error', 'Pengiklan belum mengunggah bukti pembayaran.');
        }

        $request->validate([
            'payment_note' => 'nullable|string|max:500',
        ]);

        $listing->update([
            'payment_status' => 'verified',
            'payment_note' => $request->payment_note ?: null,
            'payment_verified_at' => now(),
            'payment_verified_by' => $request->user()->id,
        ]);

        ActivityLogger::log(
            action: 'payment.verify',
            category: 'payment',
            description: "Memverifikasi bukti pembayaran iklan \"{$listing->judul}\"",
            subject: $listing,
            subjectLabel: $listing->judul,
            meta: ['payment_amount' => $listing->payment_amount],
        );

        return back()->with('success', 'Bukti pembayaran berhasil diverifikasi. Iklan siap disetujui.');
    }

    /**
     * Tolak bukti pembayaran pengiklan.
     */
    public function rejectPayment(Request $request, Listing $listing): RedirectResponse
    {
        $request->validate([
            'payment_note' => 'required|string|max:500',
        ]);

        $listing->update([
            'payment_status' => 'rejected',
            'payment_note' => $request->payment_note,
            'payment_verified_at' => null,
            'payment_verified_by' => null,
        ]);

        ActivityLogger::log(
            action: 'payment.reject',
            category: 'payment',
            description: "Menolak bukti pembayaran iklan \"{$listing->judul}\"",
            subject: $listing,
            subjectLabel: $listing->judul,
            meta: ['payment_note' => $request->payment_note],
        );

        return back()->with('success', 'Bukti pembayaran ditolak dengan catatan.');
    }

    public function destroyListing(Listing $listing): RedirectResponse
    {
        ActivityLogger::log(
            action: 'listing.delete',
            category: 'listing',
            description: "Menghapus permanen iklan \"{$listing->judul}\"",
            subjectLabel: $listing->judul,
            meta: ['listing_id' => $listing->id, 'status_approval' => $listing->status_approval],
        );

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

        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        $users = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => (object) $request->only(['q', 'role']),
            'canManageRoles' => $request->user()->canManageRoles(),
        ]);
    }

    public function destroyUser(Request $request, User $user): RedirectResponse
    {
        if ($user->id === $request->user()->id) {
            return back()->with('error', 'Anda tidak dapat menghapus akun Anda sendiri.');
        }

        if ($user->isSuperAdmin()) {
            return back()->with('error', 'Akun Super Admin tidak dapat dihapus.');
        }

        if ($user->isAdmin() && ! $request->user()->isSuperAdmin()) {
            return back()->with('error', 'Hanya Super Admin yang dapat menghapus akun admin.');
        }

        ActivityLogger::log(
            action: 'user.delete',
            category: 'user',
            description: "Menghapus akun pengguna \"{$user->name}\" ({$user->roleLabel()})",
            subjectLabel: $user->name,
            meta: ['email' => $user->email, 'role' => $user->role],
        );

        $user->delete();

        return back()->with('success', 'Pengguna dan seluruh iklan terkait berhasil dihapus!');
    }

    public function updateUserRole(Request $request, User $user): RedirectResponse
    {
        if ($user->id === $request->user()->id) {
            return back()->with('error', 'Anda tidak dapat mengubah role akun Anda sendiri.');
        }

        if (! $request->user()->canManageRoles()) {
            return back()->with('error', 'Hanya Super Admin yang dapat mengubah role pengguna.');
        }

        if ($user->isSuperAdmin()) {
            return back()->with('error', 'Role Super Admin tidak dapat diubah.');
        }

        $request->validate([
            'role' => 'required|in:user,admin,super_admin',
        ]);

        // Guard tambahan: hanya Super Admin yang boleh membuat/menurunkan admin.
        if (in_array($request->role, [User::ROLE_ADMIN, User::ROLE_SUPER_ADMIN], true) && ! $request->user()->isSuperAdmin()) {
            return back()->with('error', 'Hanya Super Admin yang dapat menetapkan role admin.');
        }

        $oldRole = $user->role;

        $user->update([
            'role' => $request->role,
        ]);

        ActivityLogger::log(
            action: 'user.role_update',
            category: 'user',
            description: "Mengubah role \"{$user->name}\" dari ".strtoupper($oldRole).' menjadi '.strtoupper($request->role),
            subject: $user,
            subjectLabel: $user->name,
            meta: ['from' => $oldRole, 'to' => $request->role],
        );

        return back()->with('success', "Role pengguna {$user->name} berhasil diubah menjadi ".strtoupper($request->role).'!');
    }

    public function categories(): Response
    {
        $categories = Category::orderBy('name')->get();

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

        $category = Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->slug),
            'is_active' => true,
        ]);

        ActivityLogger::log(
            action: 'category.create',
            category: 'category',
            description: "Menambahkan kategori baru \"{$category->name}\"",
            subject: $category,
            subjectLabel: $category->name,
        );

        return back()->with('success', 'Kategori baru berhasil ditambahkan!');
    }

    public function updateCategory(Request $request, Category $category): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:categories,slug,'.$category->id,
        ]);

        $oldName = $category->name;

        $category->update([
            'name' => $request->name,
            'slug' => Str::slug($request->slug),
        ]);

        ActivityLogger::log(
            action: 'category.update',
            category: 'category',
            description: "Memperbarui kategori \"{$oldName}\" menjadi \"{$category->name}\"",
            subject: $category,
            subjectLabel: $category->name,
            meta: ['from' => $oldName, 'to' => $category->name],
        );

        return back()->with('success', 'Kategori berhasil diperbarui!');
    }

    public function toggleCategory(Category $category): RedirectResponse
    {
        $category->update([
            'is_active' => ! $category->is_active,
        ]);

        ActivityLogger::log(
            action: 'category.toggle',
            category: 'category',
            description: ($category->is_active ? 'Mengaktifkan' : 'Menonaktifkan')." kategori \"{$category->name}\"",
            subject: $category,
            subjectLabel: $category->name,
            meta: ['is_active' => $category->is_active],
        );

        return back()->with('success', 'Status kategori berhasil diperbarui!');
    }

    public function destroyCategory(Category $category): RedirectResponse
    {
        ActivityLogger::log(
            action: 'category.delete',
            category: 'category',
            description: "Menghapus kategori \"{$category->name}\"",
            subjectLabel: $category->name,
            meta: ['slug' => $category->slug],
        );

        $category->delete();

        return back()->with('success', 'Kategori berhasil dihapus!');
    }

    public function activityLogs(Request $request): Response
    {
        $query = ActivityLog::with('user');

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('q')) {
            $q = $request->q;
            $query->where(function ($sub) use ($q) {
                $sub->where('description', 'like', "%{$q}%")
                    ->orWhere('user_name', 'like', "%{$q}%")
                    ->orWhere('subject_label', 'like', "%{$q}%");
            });
        }

        $logs = $query->latest()->paginate(20)->withQueryString();

        return Inertia::render('Admin/ActivityLogs/Index', [
            'logs' => $logs,
            'filters' => (object) $request->only(['category', 'q']),
        ]);
    }

    /**
     * Halaman pengaturan pembayaran (khusus Super Admin).
     */
    public function settings(): Response
    {
        return Inertia::render('Admin/Settings/Index', [
            'settings' => Setting::paymentConfig(),
        ]);
    }

    /**
     * Simpan pengaturan pembayaran (khusus Super Admin).
     */
    public function updateSettings(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'enabled' => 'required|boolean',
            'amount' => 'required|numeric|min:0',
            'bank_name' => 'required|string|max:255',
            'bank_account' => 'required|string|max:255',
            'bank_holder' => 'required|string|max:255',
            'instructions' => 'nullable|string|max:2000',
            'wa_confirmation' => 'nullable|string|max:255',
        ]);

        Setting::setMany([
            'payment_enabled' => $validated['enabled'] ? '1' : '0',
            'payment_amount' => (string) $validated['amount'],
            'payment_bank_name' => $validated['bank_name'],
            'payment_bank_account' => $validated['bank_account'],
            'payment_bank_holder' => $validated['bank_holder'],
            'payment_instructions' => $validated['instructions'] ?? '',
            'payment_wa_confirmation' => $validated['wa_confirmation'] ?? '',
        ], 'payment');

        ActivityLogger::log(
            action: 'settings.payment_update',
            category: 'settings',
            description: 'Memperbarui pengaturan informasi pembayaran',
            meta: [
                'enabled' => $validated['enabled'],
                'amount' => $validated['amount'],
                'bank_name' => $validated['bank_name'],
                'bank_account' => $validated['bank_account'],
            ],
        );

        return back()->with('success', 'Pengaturan pembayaran berhasil disimpan!');
    }
}
