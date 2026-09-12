import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import { 
    Search, 
    MapPin, 
    Filter, 
    SlidersHorizontal, 
    ArrowRight,
    X,
    Camera,
    ShieldCheck,
    ChevronDown
} from 'lucide-react';

function timeAgo(dateStr) {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Hari ini';
    if (diffDays === 1) return '1 hari lalu';
    if (diffDays < 30) return `${diffDays} hari lalu`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return '1 bulan lalu';
    if (diffMonths < 12) return `${diffMonths} bulan lalu`;
    return `${Math.floor(diffMonths / 12)} tahun lalu`;
}

const HARGA_PRESETS = [
    { label: '< 200 Jt', max: 200000000 },
    { label: '< 500 Jt', max: 500000000 },
    { label: '< 1 M', max: 1000000000 },
    { label: '< 2 M', max: 2000000000 },
    { label: '> 2 M', min: 2000000000 },
];

export default function Index({ listings = { data: [] }, categories = [], filters = {} }) {
    const safeFilters = (filters && !Array.isArray(filters)) ? filters : {};

    const [q, setQ] = React.useState(safeFilters.q || '');
    const [jenisIklan, setJenisIklan] = React.useState(safeFilters.jenis_iklan || 'semua');
    const [jenisProperti, setJenisProperti] = React.useState(safeFilters.jenis_properti || 'semua');
    const [provinsi, setProvinsi] = React.useState(safeFilters.provinsi || '');
    const [kota, setKota] = React.useState(safeFilters.kota || '');
    const [kecamatan, setKecamatan] = React.useState(safeFilters.kecamatan || '');
    const [minHarga, setMinHarga] = React.useState(safeFilters.min_harga || '');
    const [maxHarga, setMaxHarga] = React.useState(safeFilters.max_harga || '');
    const [minLt, setMinLt] = React.useState(safeFilters.min_lt || '');
    const [minLb, setMinLb] = React.useState(safeFilters.min_lb || '');
    const [kamarTidur, setKamarTidur] = React.useState(safeFilters.kamar_tidur || '');
    const [sortBy, setSortBy] = React.useState(safeFilters.sort || 'terbaru');
    const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false);

    const activeFilterCount = [
        q, 
        jenisIklan !== 'semua' ? jenisIklan : '', 
        jenisProperti !== 'semua' ? jenisProperti : '',
        provinsi, kota, kecamatan, minHarga, maxHarga, minLt, minLb, kamarTidur
    ].filter(Boolean).length;

    const buildParams = () => ({
        q,
        jenis_iklan: jenisIklan,
        jenis_properti: jenisProperti,
        provinsi,
        kota,
        kecamatan,
        min_harga: minHarga,
        max_harga: maxHarga,
        min_lt: minLt,
        min_lb: minLb,
        kamar_tidur: kamarTidur,
        sort: sortBy,
    });

    const handleFilterSubmit = (e) => {
        if (e) e.preventDefault();
        router.get('/listing', buildParams(), { preserveState: true });
        setMobileFilterOpen(false);
    };

    const handleReset = () => {
        setQ(''); setJenisIklan('semua'); setJenisProperti('semua');
        setProvinsi(''); setKota(''); setKecamatan('');
        setMinHarga(''); setMaxHarga('');
        setMinLt(''); setMinLb(''); setKamarTidur('');
        setSortBy('terbaru');
        router.get('/listing');
        setMobileFilterOpen(false);
    };

    const applyPreset = (preset) => {
        setMinHarga(preset.min || '');
        setMaxHarga(preset.max || '');
    };

    const formatRupiah = (val) => {
        if (!val) return 'Hubungi Pengiklan';
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
    };

    const FilterSidebar = () => (
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-[#002B7F] flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#0070F3]" />
                    Filter Pencarian
                </h3>
                <button onClick={handleReset} className="text-xs text-rose-600 hover:underline font-medium">
                    Reset
                </button>
            </div>

            <form onSubmit={handleFilterSubmit} className="space-y-4 text-sm">
                {/* Kata Kunci */}
                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Kata Kunci</label>
                    <input 
                        type="text" placeholder="Judul, jalan, kecamatan..." 
                        value={q} onChange={(e) => setQ(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-[#0070F3]"
                    />
                </div>

                {/* Jenis Transaksi */}
                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Transaksi</label>
                    <select value={jenisIklan} onChange={(e) => setJenisIklan(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-[#0070F3]">
                        <option value="semua">Semua (Jual & Sewa)</option>
                        <option value="Jual">Jual</option>
                        <option value="Sewa">Sewa</option>
                        <option value="Jual & Sewa">Jual & Sewa</option>
                    </select>
                </div>

                {/* Jenis Properti */}
                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Properti</label>
                    <select value={jenisProperti} onChange={(e) => setJenisProperti(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-[#0070F3]">
                        <option value="semua">Semua Kategori</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                {/* Lokasi */}
                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Provinsi</label>
                    <input type="text" placeholder="Jawa Timur" value={provinsi}
                        onChange={(e) => setProvinsi(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-[#0070F3]"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Kota / Kabupaten</label>
                    <input type="text" placeholder="Tulungagung" value={kota}
                        onChange={(e) => setKota(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-[#0070F3]"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Kecamatan</label>
                    <input type="text" placeholder="Gondang, Ngunut..." value={kecamatan}
                        onChange={(e) => setKecamatan(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-[#0070F3]"
                    />
                </div>

                {/* Preset Harga */}
                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">Preset Harga</label>
                    <div className="flex flex-wrap gap-1.5">
                        {HARGA_PRESETS.map((p) => {
                            const isActive = p.max 
                                ? maxHarga == p.max && !minHarga
                                : minHarga == p.min && !maxHarga;
                            return (
                                <button
                                    key={p.label}
                                    type="button"
                                    onClick={() => applyPreset(p)}
                                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition ${
                                        isActive 
                                            ? 'bg-[#0070F3] text-white border-[#0070F3]' 
                                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:border-[#0070F3] hover:text-[#0070F3]'
                                    }`}
                                >
                                    {p.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Rentang Harga */}
                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Rentang Harga (Rp)</label>
                    <div className="grid grid-cols-2 gap-2">
                        <input type="number" placeholder="Min" value={minHarga}
                            onChange={(e) => setMinHarga(e.target.value)}
                            className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-xl"
                        />
                        <input type="number" placeholder="Max" value={maxHarga}
                            onChange={(e) => setMaxHarga(e.target.value)}
                            className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-xl"
                        />
                    </div>
                </div>

                {/* Luas */}
                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Luas Minimum (m²)</label>
                    <div className="grid grid-cols-2 gap-2">
                        <input type="number" placeholder="Min LT" value={minLt}
                            onChange={(e) => setMinLt(e.target.value)}
                            className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-xl"
                        />
                        <input type="number" placeholder="Min LB" value={minLb}
                            onChange={(e) => setMinLb(e.target.value)}
                            className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-xl"
                        />
                    </div>
                </div>

                {/* Kamar Tidur */}
                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Min. Kamar Tidur</label>
                    <select value={kamarTidur} onChange={(e) => setKamarTidur(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-[#0070F3]">
                        <option value="">Semua</option>
                        <option value="1">1+ Kamar</option>
                        <option value="2">2+ Kamar</option>
                        <option value="3">3+ Kamar</option>
                        <option value="4">4+ Kamar</option>
                        <option value="5">5+ Kamar</option>
                    </select>
                </div>

                <button type="submit"
                    className="w-full py-3 bg-[#FF8A00] hover:bg-[#e67a00] text-white font-bold text-xs rounded-xl shadow transition">
                    Terapkan Filter
                </button>
            </form>
        </div>
    );

    return (
        <AppLayout title="Cari Properti - TulungJual.id">
            <div className="bg-[#002B7F] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-blue-900">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl sm:text-4xl font-black">Cari Properti yang Tepat</h1>
                    <p className="text-blue-100 text-sm mt-1">
                        Temukan berbagai pilihan rumah, tanah, apartemen, ruko, dan properti komersial lainnya.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-sm font-bold text-[#002B7F]"
                    >
                        <span className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-[#0070F3]" />
                            Filter Pencarian
                            {activeFilterCount > 0 && (
                                <span className="px-2 py-0.5 bg-[#0070F3] text-white text-[11px] font-bold rounded-full">
                                    {activeFilterCount}
                                </span>
                            )}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileFilterOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {mobileFilterOpen && (
                        <div className="mt-3">
                            <FilterSidebar />
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Desktop Filters Sidebar */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-24">
                            <FilterSidebar />
                        </div>
                    </div>

                    {/* Listing Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Sort & Count Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="text-xs text-slate-600">
                                Menampilkan <span className="font-bold text-[#002B7F]">{listings.total || 0}</span> properti ditemukan
                                {activeFilterCount > 0 && (
                                    <button onClick={handleReset} className="ml-2 text-rose-500 hover:underline font-medium">
                                        (Reset {activeFilterCount} filter)
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                                <span className="text-slate-500 font-medium">Urutkan:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => {
                                        setSortBy(e.target.value);
                                        router.get('/listing', { ...buildParams(), sort: e.target.value }, { preserveState: true });
                                    }}
                                    className="text-xs py-1.5 px-3 border border-slate-300 rounded-xl focus:ring-[#0070F3] font-semibold"
                                >
                                    <option value="terbaru">Terbaru</option>
                                    <option value="terlama">Terlama</option>
                                    <option value="harga_asc">Harga Terendah</option>
                                    <option value="harga_desc">Harga Tertinggi</option>
                                    <option value="lt_asc">Luas Tanah Terkecil</option>
                                    <option value="lt_desc">Luas Tanah Terbesar</option>
                                </select>
                            </div>
                        </div>

                        {/* Grid Listings */}
                        {listings.data.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {listings.data.map((item) => (
                                    <Link 
                                        key={item.id} 
                                        href={`/listing/${item.slug}`}
                                        className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition flex flex-col group cursor-pointer block text-inherit"
                                    >
                                        <div className="relative aspect-[4/3] bg-slate-200 overflow-hidden">
                                            <img 
                                                src={item.photos?.[0]?.url_foto || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'} 
                                                alt={item.judul} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                            />
                                            <div className="absolute top-3 left-3 flex gap-1.5">
                                                <span className="px-2.5 py-1 bg-[#0070F3] text-white text-[11px] font-bold rounded-lg shadow">
                                                    {item.jenis_iklan}
                                                </span>
                                                <span className="px-2.5 py-1 bg-[#002B7F]/80 backdrop-blur text-white text-[11px] font-medium rounded-lg">
                                                    {item.jenis_properti}
                                                </span>
                                            </div>
                                            {/* Photo count badge */}
                                            {item.photos?.length > 0 && (
                                                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-[11px] font-semibold px-2 py-1 rounded-lg flex items-center gap-1">
                                                    <Camera className="w-3 h-3" /> {item.photos.length}
                                                </div>
                                            )}
                                            {/* Timestamp */}
                                            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur text-white text-[10px] px-2 py-1 rounded-md">
                                                {timeAgo(item.created_at)}
                                            </div>
                                        </div>

                                        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                                            <div>
                                                <div className="text-lg font-black text-[#002B7F]">
                                                    {formatRupiah(item.harga)}
                                                    {item.bisa_nego && <span className="text-[10px] text-slate-500 font-normal ml-1">(Nego)</span>}
                                                </div>
                                                <h4 className="font-bold text-slate-900 text-sm line-clamp-2 group-hover:text-[#0070F3] transition mt-1">
                                                    {item.judul}
                                                </h4>
                                                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                    {item.kecamatan}, {item.kota}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-3 gap-1 py-2 px-2 bg-blue-50/50 rounded-xl text-center text-[11px] font-medium text-slate-700 border border-blue-100">
                                                <div>
                                                    <span className="block text-slate-400 text-[9px]">LT</span>
                                                    {item.luas_tanah ? `${item.luas_tanah} m²` : '-'}
                                                </div>
                                                <div>
                                                    <span className="block text-slate-400 text-[9px]">LB</span>
                                                    {item.luas_bangunan ? `${item.luas_bangunan} m²` : '-'}
                                                </div>
                                                <div>
                                                    <span className="block text-slate-400 text-[9px]">KT/KM</span>
                                                    {item.kamar_tidur || 0}/{item.kamar_mandi || 0}
                                                </div>
                                            </div>

                                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                                                <span className="flex items-center gap-1 text-[11px] text-slate-500">
                                                    <ShieldCheck className="w-3.5 h-3.5 text-[#0070F3]" />
                                                    {item.pengiklan_info?.jenis_pengiklan || 'Pemilik'}
                                                </span>
                                                <span 
                                                    className="font-bold text-[#0070F3] group-hover:text-[#002B7F] flex items-center gap-0.5 text-xs transition"
                                                >
                                                    Lihat Detail <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-12 rounded-3xl text-center border border-slate-200 space-y-3">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-[#0070F3]">
                                    <Search className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold text-slate-800">Tidak ada properti ditemukan</h3>
                                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                                    Coba sesuaikan filter pencarian atau gunakan kata kunci lokasi lain.
                                </p>
                                <button
                                    onClick={handleReset}
                                    className="px-4 py-2 bg-blue-50 text-[#0070F3] rounded-xl text-xs font-bold hover:bg-blue-100"
                                >
                                    Reset Semua Filter
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {listings.links && listings.links.length > 3 && (
                            <div className="flex justify-center flex-wrap gap-1 pt-4">
                                {listings.links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${
                                            link.active
                                                ? 'bg-[#0070F3] text-white'
                                                : link.url
                                                ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                                : 'text-slate-400 cursor-not-allowed pointer-events-none'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
