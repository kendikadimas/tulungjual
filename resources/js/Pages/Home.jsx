import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import { 
    Search, 
    MapPin, 
    Home as HomeIcon, 
    Landmark, 
    Building2, 
    Building, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2, 
    ChevronRight,
    Users,
    KeyRound,
    TrendingUp,
    Store,
    Warehouse,
    Hotel,
    Briefcase,
    ListChecks,
    MapPinned,
    Camera
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
    const diffYears = Math.floor(diffMonths / 12);
    return `${diffYears} tahun lalu`;
}

export default function Home({ featuredListings = [], categories = [], stats = {} }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedType, setSelectedType] = React.useState('semua');
    const [selectedCategory, setSelectedCategory] = React.useState('semua');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/listing', {
            q: searchQuery,
            jenis_iklan: selectedType,
            jenis_properti: selectedCategory,
        });
    };

    const handleCategoryClick = (catName) => {
        router.get('/listing', {
            jenis_properti: catName,
        });
    };

    const formatRupiah = (val) => {
        if (!val) return 'Hubungi Pengiklan';
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
    };

    const quickCategories = [
        { name: 'Rumah', icon: HomeIcon },
        { name: 'Tanah', icon: Landmark },
        { name: 'Apartemen', icon: Building },
        { name: 'Ruko', icon: Store },
        { name: 'Kost', icon: Building2 },
        { name: 'Villa', icon: Hotel },
        { name: 'Gudang', icon: Warehouse },
        { name: 'Lainnya', icon: Briefcase },
    ];

    return (
        <AppLayout title="TulungJual.id - Temukan Properti yang Tepat">
            {/* Hero Section sesuai Mockup Laptop */}
            <section className="relative bg-[#001F5C] text-white py-16 md:py-24 overflow-hidden">
                {/* Background Image dengan Dark Overlay */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#001F5C]/95 via-[#002B7F]/90 to-[#001238]/85 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#0070F3]/30 via-transparent to-transparent pointer-events-none" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl space-y-4 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-blue-200 text-xs font-semibold backdrop-blur border border-white/20">
                            Marketplace Properti Terpercaya
                        </div>
                        
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                            Temukan <br className="hidden sm:inline" />
                            Properti yang <span className="text-[#FF8A00]">Tepat.</span>
                        </h1>
                        
                        <p className="text-blue-100 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
                            Rumah, Tanah, Apartemen, Ruko, dan lainnya semua ada di TULUNGJUAL.ID
                        </p>
                        <p className="text-blue-200/90 text-sm max-w-xl italic border-l-2 border-[#FF8A00] pl-3">
                            "Marketplace properti yang membantu orang menemukan properti dengan lebih percaya diri."
                        </p>
                    </div>

                    {/* Main Search Component sesuai Mockup Laptop */}
                    <div className="mt-10 bg-white p-4 sm:p-6 rounded-3xl shadow-2xl text-slate-800 border border-slate-100 max-w-4xl">
                        <div className="flex border-b border-slate-200 mb-4 pb-3 space-x-3 overflow-x-auto">
                            {['semua', 'Jual', 'Sewa', 'Jual & Sewa'].map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setSelectedType(type)}
                                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                                        selectedType === type
                                            ? 'bg-[#0070F3] text-white shadow-sm'
                                            : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    {type === 'semua' ? 'Semua Transaksi' : type}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
                            <div className="relative flex-1 w-full">
                                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Cari lokasi, jenis properti, atau kata kunci..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-[#0070F3] focus:border-[#0070F3] text-sm font-medium"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-8 bg-[#FF8A00] hover:bg-[#e67a00] text-white font-black rounded-2xl shadow-md transition shrink-0"
                            >
                                <Search className="w-4 h-4" />
                                Cari
                            </button>
                        </form>
                    </div>

                    {/* Category Icons Row (Mockup Laptop Bottom Navigation) */}
                    <div className="mt-8 grid grid-cols-4 sm:grid-cols-8 gap-3 max-w-4xl">
                        {quickCategories.map((cat) => {
                            const IconComponent = cat.icon;
                            return (
                                <button
                                    key={cat.name}
                                    onClick={() => handleCategoryClick(cat.name)}
                                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur border border-white/10 transition group text-white"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-2 group-hover:scale-110 transition text-[#FF8A00]">
                                        <IconComponent className="w-5 h-5" />
                                    </div>
                                    <span className="text-[11px] font-semibold tracking-tight">{cat.name}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Stats Bar */}
                    {(stats.total_listings > 0 || stats.total_cities > 0 || stats.total_users > 0) && (
                        <div className="mt-10 flex flex-wrap gap-4 max-w-4xl">
                            <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white/10 backdrop-blur border border-white/20 rounded-2xl">
                                <div className="w-8 h-8 rounded-xl bg-[#FF8A00]/20 flex items-center justify-center">
                                    <ListChecks className="w-4 h-4 text-[#FF8A00]" />
                                </div>
                                <div>
                                    <div className="text-lg font-black text-white leading-none">{stats.total_listings?.toLocaleString('id-ID') || 0}</div>
                                    <div className="text-[11px] text-blue-200 font-medium">Properti Aktif</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white/10 backdrop-blur border border-white/20 rounded-2xl">
                                <div className="w-8 h-8 rounded-xl bg-[#FF8A00]/20 flex items-center justify-center">
                                    <MapPinned className="w-4 h-4 text-[#FF8A00]" />
                                </div>
                                <div>
                                    <div className="text-lg font-black text-white leading-none">{stats.total_cities?.toLocaleString('id-ID') || 0}</div>
                                    <div className="text-[11px] text-blue-200 font-medium">Kota / Kabupaten</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white/10 backdrop-blur border border-white/20 rounded-2xl">
                                <div className="w-8 h-8 rounded-xl bg-[#FF8A00]/20 flex items-center justify-center">
                                    <Users className="w-4 h-4 text-[#FF8A00]" />
                                </div>
                                <div>
                                    <div className="text-lg font-black text-white leading-none">{stats.total_users?.toLocaleString('id-ID') || 0}</div>
                                    <div className="text-[11px] text-blue-200 font-medium">Pengguna Terdaftar</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* 5 Poin Fitur Utama (Mockup Banner Tengah) */}
            <section className="bg-gradient-to-r from-[#EBF4FF] via-white to-[#EBF4FF] py-8 border-y border-blue-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                            <div className="w-10 h-10 rounded-xl bg-[#0070F3]/10 text-[#0070F3] flex items-center justify-center shrink-0">
                                <Search className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-[#002B7F]">Cari Properti</h4>
                                <p className="text-[10px] text-slate-500">Mudah & Cepat</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                            <div className="w-10 h-10 rounded-xl bg-[#0070F3]/10 text-[#0070F3] flex items-center justify-center shrink-0">
                                <HomeIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-[#002B7F]">Pasang Iklan</h4>
                                <p className="text-[10px] text-slate-500">Praktis & Efektif</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                            <div className="w-10 h-10 rounded-xl bg-[#0070F3]/10 text-[#0070F3] flex items-center justify-center shrink-0">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-[#002B7F]">Bertemu Langsung</h4>
                                <p className="text-[10px] text-slate-500">Pembeli & Penjual</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                            <div className="w-10 h-10 rounded-xl bg-[#0070F3]/10 text-[#0070F3] flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-[#002B7F]">Lebih Terpercaya</h4>
                                <p className="text-[10px] text-slate-500">Informasi Jelas & Aman</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm col-span-2 md:col-span-1">
                            <div className="w-10 h-10 rounded-xl bg-[#0070F3]/10 text-[#0070F3] flex items-center justify-center shrink-0">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-[#002B7F]">Peluang Lebih Luas</h4>
                                <p className="text-[10px] text-slate-500">Untuk Masa Depan Anda</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Listings Section */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div>
                            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0070F3] mb-1">Rekomendasi Terbaik</h2>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#002B7F]">
                                Properti Terbaru di TulungJual.id
                            </h3>
                        </div>
                        <Link 
                            href="/listing"
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0070F3] hover:text-[#002B7F]"
                        >
                            Lihat Semua Properti <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {featuredListings.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredListings.map((item) => (
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
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            <span className="px-3 py-1 bg-[#0070F3] text-white text-xs font-bold rounded-lg shadow">
                                                {item.jenis_iklan}
                                            </span>
                                            <span className="px-3 py-1 bg-[#002B7F]/80 backdrop-blur text-white text-xs font-medium rounded-lg">
                                                {item.jenis_properti}
                                            </span>
                                        </div>
                                        {/* Photo count badge */}
                                        {item.photos?.length > 0 && (
                                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-[11px] font-semibold px-2 py-1 rounded-lg flex items-center gap-1">
                                                <Camera className="w-3 h-3" /> {item.photos.length}
                                            </div>
                                        )}
                                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs font-semibold text-white">
                                            <span className="bg-slate-900/70 backdrop-blur px-2.5 py-1 rounded-md flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5 text-[#FF8A00]" />
                                                {item.kota}
                                            </span>
                                            <span className="bg-slate-900/60 backdrop-blur px-2.5 py-1 rounded-md text-[10px]">
                                                {timeAgo(item.created_at)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                        <div>
                                            <div className="text-xl font-black text-[#002B7F] mb-1">
                                                {formatRupiah(item.harga)}
                                                {item.bisa_nego && <span className="text-xs text-slate-500 font-normal ml-2">(Nego)</span>}
                                            </div>
                                            <h4 className="font-bold text-slate-900 line-clamp-2 group-hover:text-[#0070F3] transition">
                                                {item.judul}
                                            </h4>
                                            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                {item.kecamatan}, {item.kota}
                                            </p>
                                        </div>

                                        {/* Physical Quick Data */}
                                        <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-blue-50/50 rounded-2xl text-center text-xs font-medium text-slate-700 border border-blue-100">
                                            <div>
                                                <span className="block text-slate-400 text-[10px]">LT</span>
                                                {item.luas_tanah ? `${item.luas_tanah} m²` : '-'}
                                            </div>
                                            <div>
                                                <span className="block text-slate-400 text-[10px]">LB</span>
                                                {item.luas_bangunan ? `${item.luas_bangunan} m²` : '-'}
                                            </div>
                                            <div>
                                                <span className="block text-slate-400 text-[10px]">KT / KM</span>
                                                {item.kamar_tidur || 0} / {item.kamar_mandi || 0}
                                            </div>
                                        </div>

                                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                                            <div className="flex items-center gap-1.5 text-xs">
                                                <ShieldCheck className="w-3.5 h-3.5 text-[#0070F3]" />
                                                <span className="text-slate-500">{item.pengiklan_info?.jenis_pengiklan || 'Pemilik'}</span>
                                            </div>
                                            <span 
                                                className="text-xs font-bold text-[#0070F3] group-hover:text-[#002B7F] flex items-center gap-1 transition"
                                            >
                                                Detail <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 space-y-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-[#0070F3]">
                                <HomeIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-[#002B7F]">Belum ada properti yang ditampilkan</h3>
                            <p className="text-sm text-slate-500 max-w-sm mx-auto">
                                Jadilah yang pertama memasang iklan properti di TulungJual.id.
                            </p>
                            <Link
                                href="/pasang-iklan"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF8A00] hover:bg-[#e67a00] text-white rounded-2xl font-bold text-sm shadow transition"
                            >
                                Pasang Iklan Sekarang <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Mengapa TulungJual? - 6 Poin Keunggulan */}
            <section className="py-16 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-[#0070F3] mb-2">Mengapa TulungJual?</h2>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#002B7F]">
                            6 Keunggulan Utama Platform Kami
                        </h3>
                        <p className="text-sm text-slate-600 mt-2">
                            Didesain untuk mempermudah transaksi jual beli & sewa properti tanpa kerumitan.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-[#0070F3] hover:shadow-md transition group">
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#0070F3] flex items-center justify-center mb-4 group-hover:bg-[#0070F3] group-hover:text-white transition">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h4 className="text-lg font-bold text-[#002B7F] mb-2">1. Iklan Terverifikasi Admin</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Setiap iklan properti ditinjau tim admin untuk memastikan keabsahan informasi dan kenyamanan pencari properti.
                            </p>
                        </div>

                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-[#0070F3] hover:shadow-md transition group">
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#0070F3] flex items-center justify-center mb-4 group-hover:bg-[#0070F3] group-hover:text-white transition">
                                <KeyRound className="w-6 h-6" />
                            </div>
                            <h4 className="text-lg font-bold text-[#002B7F] mb-2">2. Privasi Legalitas Terjamin</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Nomor sertifikat & nama pemegang hak disimpan aman di database dan TIDAK pernah ditampilkan ke publik — hanya dapat ditinjau admin.
                            </p>
                        </div>

                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-[#0070F3] hover:shadow-md transition group">
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#0070F3] flex items-center justify-center mb-4 group-hover:bg-[#0070F3] group-hover:text-white transition">
                                <Users className="w-6 h-6" />
                            </div>
                            <h4 className="text-lg font-bold text-[#002B7F] mb-2">3. Terhubung Langsung Pengiklan</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Pencari properti dapat langsung menghubungi pemilik, agen, atau developer via WhatsApp/telepon tanpa perantara tersembunyi.
                            </p>
                        </div>

                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-[#0070F3] hover:shadow-md transition group">
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#0070F3] flex items-center justify-center mb-4 group-hover:bg-[#0070F3] group-hover:text-white transition">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <h4 className="text-lg font-bold text-[#002B7F] mb-2">4. Form Spesifikasi Lengkap</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Menyediakan 18+ seksi detail mulai dari data fisik, spesifikasi bangunan, fasilitas, hingga zonasi khusus tanah & ruko.
                            </p>
                        </div>

                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-[#0070F3] hover:shadow-md transition group">
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#0070F3] flex items-center justify-center mb-4 group-hover:bg-[#0070F3] group-hover:text-white transition">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h4 className="text-lg font-bold text-[#002B7F] mb-2">5. Dukungan Khusus Developer</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Fitur spesifik perumahan baru: tipe unit, sisa unit, estimasi serah terima, brosur PDF, site plan, & bank partner KPR.
                            </p>
                        </div>

                        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-[#0070F3] hover:shadow-md transition group">
                            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#0070F3] flex items-center justify-center mb-4 group-hover:bg-[#0070F3] group-hover:text-white transition">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h4 className="text-lg font-bold text-[#002B7F] mb-2">6. Bebas Biaya & Registrasi Mudah</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Pendaftaran instan tanpa OTP ribet. Pengiklan dapat memasang properti secara cepat dan gratis kapan saja.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-[#002B7F] text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-black">
                        Ingin Memasarkan Properti Anda Hari Ini?
                    </h2>
                    <p className="text-blue-200 text-base max-w-xl mx-auto">
                        Bergabunglah bersama pemilik properti, agen, dan developer yang telah mempercayakan pemasaran properti mereka di TulungJual.id.
                    </p>
                    <div className="pt-2">
                        <Link 
                            href="/pasang-iklan"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF8A00] hover:bg-[#e67a00] text-white rounded-2xl font-black text-lg shadow-xl transition"
                        >
                            Pasang Iklan Properti Sekarang
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
