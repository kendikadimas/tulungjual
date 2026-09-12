<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Listing;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicListingController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Listing::with(['photos', 'pengiklanInfo'])
            ->publicApproved();

        // Filters
        if ($request->filled('q')) {
            $q = $request->q;
            $query->where(function ($sub) use ($q) {
                $sub->where('judul', 'like', "%{$q}%")
                    ->orWhere('deskripsi', 'like', "%{$q}%")
                    ->orWhere('kota', 'like', "%{$q}%")
                    ->orWhere('kecamatan', 'like', "%{$q}%")
                    ->orWhere('alamat_lengkap', 'like', "%{$q}%");
            });
        }

        if ($request->filled('jenis_iklan') && $request->jenis_iklan !== 'semua') {
            $query->where('jenis_iklan', $request->jenis_iklan);
        }

        if ($request->filled('jenis_properti') && $request->jenis_properti !== 'semua') {
            $query->where('jenis_properti', $request->jenis_properti);
        }

        if ($request->filled('provinsi')) {
            $query->where('provinsi', 'like', "%{$request->provinsi}%");
        }

        if ($request->filled('kota')) {
            $query->where('kota', 'like', "%{$request->kota}%");
        }

        if ($request->filled('kecamatan')) {
            $query->where('kecamatan', 'like', "%{$request->kecamatan}%");
        }

        if ($request->filled('min_harga')) {
            $query->where('harga', '>=', (float) $request->min_harga);
        }

        if ($request->filled('max_harga')) {
            $query->where('harga', '<=', (float) $request->max_harga);
        }

        if ($request->filled('min_lt')) {
            $query->where('luas_tanah', '>=', (float) $request->min_lt);
        }

        if ($request->filled('min_lb')) {
            $query->where('luas_bangunan', '>=', (float) $request->min_lb);
        }

        if ($request->filled('kamar_tidur')) {
            $query->where('kamar_tidur', '>=', (int) $request->kamar_tidur);
        }

        // Sorting
        switch ($request->sort) {
            case 'harga_asc':
                $query->orderBy('harga', 'asc');
                break;
            case 'harga_desc':
                $query->orderBy('harga', 'desc');
                break;
            case 'terlama':
                $query->orderBy('created_at', 'asc');
                break;
            case 'lt_asc':
                $query->orderBy('luas_tanah', 'asc');
                break;
            case 'lt_desc':
                $query->orderBy('luas_tanah', 'desc');
                break;
            case 'terbaru':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        $listings = $query->paginate(12)->withQueryString();
        $categories = Category::where('is_active', true)->get();

        return Inertia::render('PublicListing/Index', [
            'listings' => $listings,
            'categories' => $categories,
            'filters' => (object) $request->only([
                'q', 'jenis_iklan', 'jenis_properti', 'provinsi', 'kota', 'kecamatan',
                'min_harga', 'max_harga', 'min_lt', 'min_lb', 'kamar_tidur', 'sort'
            ]),
        ]);
    }

    public function show(string $slug): Response
    {
        $listing = Listing::with(['photos', 'videos', 'developerDetail', 'pengiklanInfo', 'user'])
            ->publicApproved()
            ->where('slug', $slug)
            ->firstOrFail();

        // Explicitly sanitize sensitive legal data for public consumption
        $listingData = $listing->toArray();
        unset($listingData['nomor_sertifikat']);
        unset($listingData['nama_pemegang_hak']);

        // Handle phone privacy if toggle is false
        if (isset($listingData['pengiklan_info']) && ! $listingData['tampilkan_no_telepon']) {
            $listingData['pengiklan_info']['telepon'] = null;
        }

        // Generate WA Report Link for admin (WA 085222111193)
        $adminWa = '6285222111193';
        $currentUrl = url()->current();
        $reportMessage = rawurlencode("Halo Admin TulungJual.id, saya ingin melaporkan iklan properti berikut:\n\nJudul: {$listing->judul}\nID Properti: {$listing->id}\nLink: {$currentUrl}\n\nAlasan Laporan: ");
        $waReportUrl = "https://wa.me/{$adminWa}?text={$reportMessage}";

        // Related Listings
        $relatedListings = Listing::with(['photos', 'pengiklanInfo'])
            ->publicApproved()
            ->where('id', '!=', $listing->id)
            ->where('jenis_properti', $listing->jenis_properti)
            ->latest()
            ->take(4)
            ->get();

        return Inertia::render('PublicListing/Show', [
            'listing' => $listingData,
            'waReportUrl' => $waReportUrl,
            'relatedListings' => $relatedListings,
        ]);
    }
}
