import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import MapViewer from '@/Components/MapViewer';
import { Link } from '@inertiajs/react';
import { 
    MapPin, 
    Home, 
    Calendar, 
    ShieldCheck, 
    Phone, 
    Mail, 
    MessageSquare, 
    CheckCircle, 
    AlertTriangle, 
    Maximize2, 
    Layers, 
    BedDouble, 
    Bath, 
    Car, 
    Zap, 
    Droplets, 
    Wifi, 
    Flame, 
    Compass, 
    FileText, 
    Share2, 
    Building, 
    Check, 
    Play, 
    ExternalLink,
    Clock,
    UserCheck,
    Download
} from 'lucide-react';

function KprCalculator({ harga }) {
    const [dp, setDp] = React.useState(20);
    const [tenor, setTenor] = React.useState(15);
    const [bunga, setBunga] = React.useState(9);

    const dpNominal = harga * (dp / 100);
    const pinjaman = harga - dpNominal;
    const bungaBulanan = bunga / 100 / 12;
    const jumlahAngsuran = tenor * 12;
    const angsuran = jumlahAngsuran > 0 && bungaBulanan > 0
        ? (pinjaman * bungaBulanan * Math.pow(1 + bungaBulanan, jumlahAngsuran)) /
          (Math.pow(1 + bungaBulanan, jumlahAngsuran) - 1)
        : pinjaman / jumlahAngsuran;

    const fmt = (val) => new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', maximumFractionDigits: 0
    }).format(val);

    return (
        <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-sm font-bold text-[#002B7F] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-100 text-[#0070F3] flex items-center justify-center text-xs">%</span>
                Simulasi KPR
            </h4>
            <p className="text-[11px] text-slate-400">Estimasi kasar — bukan penawaran resmi bank.</p>

            <div className="space-y-3 text-xs">
                <div>
                    <div className="flex justify-between mb-1">
                        <label className="font-semibold text-slate-600">Uang Muka (DP)</label>
                        <span className="font-bold text-[#002B7F]">{dp}% — {fmt(dpNominal)}</span>
                    </div>
                    <input type="range" min={10} max={90} step={5} value={dp}
                        onChange={(e) => setDp(Number(e.target.value))}
                        className="w-full accent-[#0070F3]"
                    />
                </div>

                <div>
                    <div className="flex justify-between mb-1">
                        <label className="font-semibold text-slate-600">Tenor</label>
                        <span className="font-bold text-[#002B7F]">{tenor} tahun</span>
                    </div>
                    <input type="range" min={1} max={30} step={1} value={tenor}
                        onChange={(e) => setTenor(Number(e.target.value))}
                        className="w-full accent-[#0070F3]"
                    />
                </div>

                <div>
                    <div className="flex justify-between mb-1">
                        <label className="font-semibold text-slate-600">Bunga / Tahun</label>
                        <span className="font-bold text-[#002B7F]">{bunga}%</span>
                    </div>
                    <input type="range" min={4} max={20} step={0.5} value={bunga}
                        onChange={(e) => setBunga(Number(e.target.value))}
                        className="w-full accent-[#0070F3]"
                    />
                </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-3 space-y-1.5 text-xs border border-blue-100">
                <div className="flex justify-between">
                    <span className="text-slate-500">Pokok Pinjaman</span>
                    <span className="font-bold text-slate-800">{fmt(pinjaman)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500">Jumlah Angsuran</span>
                    <span className="font-bold text-slate-800">{jumlahAngsuran} bulan</span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-blue-200">
                    <span className="font-bold text-[#002B7F]">Cicilan / Bulan</span>
                    <span className="font-black text-[#FF8A00] text-sm">{fmt(angsuran)}</span>
                </div>
            </div>
        </div>
    );
}

export default function Show({ listing, waReportUrl, relatedListings = [] }) {
    const [activePhotoIdx, setActivePhotoIdx] = React.useState(0);

    const photos = listing.photos || [];
    const videos = listing.videos || [];
    const pengiklan = listing.pengiklan_info || {};
    const dev = listing.developer_detail || {};

    const formatRupiah = (val) => {
        if (!val) return 'Hubungi Pengiklan';
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
    };

    const getEmbedUrl = (url) => {
        if (!url) return null;
        try {
            const parsed = new URL(url);
            // Only allow https protocol
            if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return null;

            // YouTube Watch
            if (parsed.hostname.includes('youtube.com') && parsed.searchParams.get('v')) {
                const vidId = parsed.searchParams.get('v');
                if (/^[a-zA-Z0-9_-]+$/.test(vidId)) {
                    return `https://www.youtube-nocookie.com/embed/${vidId}`;
                }
            }

            // YouTube Short
            if (parsed.hostname.includes('youtu.be')) {
                const vidId = parsed.pathname.replace('/', '');
                if (/^[a-zA-Z0-9_-]+$/.test(vidId)) {
                    return `https://www.youtube-nocookie.com/embed/${vidId}`;
                }
            }

            // Google Drive
            if (parsed.hostname.includes('drive.google.com') && parsed.pathname.includes('/file/d/')) {
                const parts = parsed.pathname.split('/file/d/');
                if (parts[1]) {
                    const fileId = parts[1].split('/')[0];
                    if (/^[a-zA-Z0-9_-]+$/.test(fileId)) {
                        return `https://drive.google.com/file/d/${fileId}/preview`;
                    }
                }
            }
        } catch (e) {
            return null;
        }

        return null;
    };

    const waNumber = pengiklan.no_wa ? pengiklan.no_wa.replace(/\D/g, '').replace(/^0/, '62') : '';
    const contactText = encodeURIComponent(`Halo ${pengiklan.nama_pengiklan || 'Pengiklan'}, saya tertarik dengan properti "${listing.judul}" di TulungJual.id: ${typeof window !== 'undefined' ? window.location.href : ''}`);
    const waLink = waNumber ? `https://wa.me/${waNumber}?text=${contactText}` : '#';

    return (
        <AppLayout title={`${listing.judul} - TulungJual.id`}>
            {/* Breadcrumb & Header */}
            <div className="bg-slate-100 border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500">
                    <Link href="/" className="hover:text-[#0070F3]">Beranda</Link>
                    <span>/</span>
                    <Link href="/listing" className="hover:text-[#0070F3]">Cari Properti</Link>
                    <span>/</span>
                    <span className="text-slate-800 font-medium truncate max-w-xs">{listing.judul}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content (2 Cols) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Title & Badges */}
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="px-3.5 py-1 bg-[#0070F3] text-white font-bold text-xs rounded-full shadow-sm">
                                    {listing.jenis_iklan}
                                </span>
                                <span className="px-3.5 py-1 bg-[#002B7F] text-white font-semibold text-xs rounded-full">
                                    {listing.jenis_properti}
                                </span>
                                <span className="px-3.5 py-1 bg-blue-50 text-[#002B7F] font-bold text-xs rounded-full flex items-center gap-1 border border-blue-200">
                                    <ShieldCheck className="w-3.5 h-3.5 text-[#0070F3]" />
                                    Iklan Terverifikasi Admin
                                </span>
                                <span className="px-3.5 py-1 bg-amber-50 text-[#FF8A00] font-bold text-xs rounded-full border border-orange-200">
                                    Status: {listing.status_transaksi}
                                </span>
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                                {listing.judul}
                            </h1>

                            <p className="text-sm text-slate-600 flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-[#0070F3] shrink-0" />
                                {listing.alamat_lengkap} ({listing.kelurahan}, {listing.kecamatan}, {listing.kota}, {listing.provinsi})
                            </p>
                        </div>

                        {/* Photo Gallery (Min 5 Photos) */}
                        <div className="space-y-3">
                            <div className="relative aspect-[16/10] bg-slate-900 rounded-3xl overflow-hidden shadow-md">
                                <img 
                                    src={photos[activePhotoIdx]?.url_foto || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80'} 
                                    alt={listing.judul} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur text-white text-xs px-3 py-1 rounded-full">
                                    Foto {activePhotoIdx + 1} dari {photos.length || 1}
                                </div>
                            </div>

                            {/* Thumbnail list */}
                            {photos.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {photos.map((p, idx) => (
                                        <button
                                            key={p.id || idx}
                                            onClick={() => setActivePhotoIdx(idx)}
                                            className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-2xl overflow-hidden shrink-0 border-2 transition ${
                                                activePhotoIdx === idx ? 'border-[#0070F3] ring-2 ring-blue-500/20' : 'border-transparent opacity-70 hover:opacity-100'
                                            }`}
                                        >
                                            <img src={p.url_foto} alt="thumb" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Quick Specs Highlight Box */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="p-3 bg-slate-50 rounded-xl">
                                <span className="text-[11px] text-slate-500 block">Luas Tanah</span>
                                <span className="text-base font-bold text-slate-900">{listing.luas_tanah ? `${listing.luas_tanah} m²` : '-'}</span>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-xl">
                                <span className="text-[11px] text-slate-500 block">Luas Bangunan</span>
                                <span className="text-base font-bold text-slate-900">{listing.luas_bangunan ? `${listing.luas_bangunan} m²` : '-'}</span>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-xl">
                                <span className="text-[11px] text-slate-500 block">Kamar Tidur / Mandi</span>
                                <span className="text-base font-bold text-slate-900">{listing.kamar_tidur || 0} / {listing.kamar_mandi || 0}</span>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-xl">
                                <span className="text-[11px] text-slate-500 block">Carport / Parkir</span>
                                <span className="text-base font-bold text-slate-900">{listing.carport || 0} Kendaraan</span>
                            </div>
                        </div>

                        {/* Deskripsi */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                                Deskripsi Properti
                            </h3>
                            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                                {listing.deskripsi}
                            </div>
                        </div>

                        {/* Peta Interaktif (Leaflet) */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                            <h3 className="text-lg font-bold text-[#002B7F] border-b border-slate-100 pb-3 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-[#0070F3]" />
                                Lokasi & Peta Properti
                            </h3>
                            <MapViewer
                                lat={listing.titik_lat}
                                lng={listing.titik_lng}
                                isApproximate={listing.privasi_lokasi === 'perkiraan'}
                                title={listing.judul}
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
                                <div className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 block">Nama Jalan / Blok:</span><span className="font-semibold text-slate-800">{listing.nama_jalan || '-'}</span></div>
                                <div className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 block">Nomor:</span><span className="font-semibold text-slate-800">{listing.nomor_jalan || '-'}</span></div>
                                <div className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 block">Patokan:</span><span className="font-semibold text-slate-800">{listing.patokan || '-'}</span></div>
                                <div className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 block">Kode Pos:</span><span className="font-semibold text-slate-800">{listing.kode_pos || '-'}</span></div>
                            </div>
                        </div>

                        {/* Data Fisik & Spesifikasi Bangunan Lengkap */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                                Data Fisik & Spesifikasi Bangunan Complete
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs">
                                <div><span className="text-slate-400 block">Dimensi Tanah (P x L):</span> <span className="font-semibold text-slate-800">{listing.panjang_tanah && listing.lebar_tanah ? `${listing.panjang_tanah} m x ${listing.lebar_tanah} m` : '-'}</span></div>
                                <div><span className="text-slate-400 block">Jumlah Lantai:</span> <span className="font-semibold text-slate-800">{listing.jumlah_lantai || 1} Lantai</span></div>
                                <div><span className="text-slate-400 block">Kondisi Bangunan:</span> <span className="font-semibold text-slate-800">{listing.kondisi_bangunan}</span></div>
                                <div><span className="text-slate-400 block">Status Furnitur:</span> <span className="font-semibold text-slate-800">{listing.status_furnitur || 'Unfurnished'}</span></div>
                                <div><span className="text-slate-400 block">Tahun Dibangun / Renovasi:</span> <span className="font-semibold text-slate-800">{listing.tahun_dibangun || '-'} / {listing.tahun_renovasi || '-'}</span></div>
                                <div><span className="text-slate-400 block">Toilet Khusus:</span> <span className="font-semibold text-slate-800">{listing.toilet || 0}</span></div>
                                <div><span className="text-slate-400 block">Ruang Tamu / Keluarga / Makan:</span> <span className="font-semibold text-slate-800">{listing.ruang_tamu || 0} / {listing.ruang_keluarga || 0} / {listing.ruang_makan || 0}</span></div>
                                <div><span className="text-slate-400 block">Dapur / Gudang:</span> <span className="font-semibold text-slate-800">{listing.dapur || 0} / {listing.gudang || 0}</span></div>
                                <div><span className="text-slate-400 block">Balkon / Teras:</span> <span className="font-semibold text-slate-800">{listing.balkon || 0} / {listing.teras || 0}</span></div>
                                <div><span className="text-slate-400 block">Garasi / Carport:</span> <span className="font-semibold text-slate-800">{listing.garasi || 0} / {listing.carport || 0}</span></div>
                                <div><span className="text-slate-400 block">Kapasitas Parkir:</span> <span className="font-semibold text-slate-800">{listing.kapasitas_parkir ? `${listing.kapasitas_parkir} Kendaraan` : '-'}</span></div>
                                <div><span className="text-slate-400 block">Kondisi Saat Ini:</span> <span className="font-semibold text-slate-800">{listing.kondisi_saat_ini || '-'}</span></div>
                                <div><span className="text-slate-400 block">Material Struktur:</span> <span className="font-semibold text-slate-800">{listing.material_struktur || '-'}</span></div>
                                <div><span className="text-slate-400 block">Material Dinding:</span> <span className="font-semibold text-slate-800">{listing.material_dinding || '-'}</span></div>
                                <div><span className="text-slate-400 block">Material Lantai:</span> <span className="font-semibold text-slate-800">{listing.material_lantai || '-'}</span></div>
                                <div><span className="text-slate-400 block">Material Atap:</span> <span className="font-semibold text-slate-800">{listing.material_atap || '-'}</span></div>
                            </div>
                        </div>

                        {/* Khusus Tanah (Seksi 4.15) */}
                        {['Tanah', 'Kavling'].includes(listing.jenis_properti) && (
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                                <h3 className="text-lg font-bold text-[#002B7F] border-b border-slate-100 pb-3">
                                    Spesifikasi Khusus Tanah & Zonasi
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs">
                                    <div><span className="text-slate-400 block">Jenis Tanah:</span> <span className="font-semibold text-slate-800">{listing.jenis_tanah || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Peruntukan / Zonasi:</span> <span className="font-semibold text-slate-800">{listing.peruntukan_zonasi || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Akses Jalan Tanah:</span> <span className="font-semibold text-slate-800">{listing.akses_jalan_tanah || '-'}</span></div>
                                </div>
                                {listing.cocok_untuk_tanah && listing.cocok_untuk_tanah.length > 0 && (
                                    <div className="pt-2">
                                        <span className="text-slate-400 block text-xs mb-1.5">Cocok Untuk:</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {listing.cocok_untuk_tanah.map((c, i) => (
                                                <span key={i} className="px-3 py-1 bg-blue-50 text-[#002B7F] rounded-lg text-xs font-bold border border-blue-100">
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Khusus Ruko & Komersial (Seksi 4.16) */}
                        {['Ruko', 'Kios', 'Gudang', 'Kantor', 'Pabrik', 'Komersial'].includes(listing.jenis_properti) && (
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                                <h3 className="text-lg font-bold text-[#002B7F] border-b border-slate-100 pb-3">
                                    Spesifikasi Khusus Ruko & Properti Komersial
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs">
                                    <div><span className="text-slate-400 block">Lebar Muka:</span> <span className="font-semibold text-slate-800">{listing.lebar_muka ? `${listing.lebar_muka} meter` : '-'}</span></div>
                                    <div><span className="text-slate-400 block">Area Parkir:</span> <span className="font-semibold text-slate-800">{listing.area_parkir || '-'}</span></div>
                                </div>
                                {listing.cocok_untuk_komersial && listing.cocok_untuk_komersial.length > 0 && (
                                    <div className="pt-2">
                                        <span className="text-slate-400 block text-xs mb-1.5">Cocok Untuk:</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {listing.cocok_untuk_komersial.map((c, i) => (
                                                <span key={i} className="px-3 py-1 bg-blue-50 text-[#002B7F] rounded-lg text-xs font-bold border border-blue-100">
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Aksesibilitas & Lingkungan (Seksi 4.10) */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                                Aksesibilitas, Lingkungan & Jarak Fasilitas Umum
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                                <div className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 block">Lebar Jalan:</span><span className="font-semibold text-slate-800">{listing.lebar_jalan || '-'}</span></div>
                                <div className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 block">Jenis Jalan:</span><span className="font-semibold text-slate-800">{listing.jenis_jalan || '-'}</span></div>
                                <div className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 block">Orientasi Hadap:</span><span className="font-semibold text-slate-800">{listing.orientasi || '-'}</span></div>
                                <div className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 block">Kontur Tanah:</span><span className="font-semibold text-slate-800">{listing.kontur_tanah || '-'}</span></div>
                                <div className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 block">Jenis Lingkungan:</span><span className="font-semibold text-slate-800">{listing.jenis_lingkungan || '-'}</span></div>
                                <div className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 block">Akses Kendaraan:</span><span className="font-semibold text-slate-800">{listing.akses_mobil ? 'Mobil' : ''} {listing.akses_truk ? '& Truk' : ''}{!listing.akses_mobil && !listing.akses_truk ? '-' : ''}</span></div>
                                <div className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 block">Bebas Banjir:</span><span className="font-semibold text-[#0070F3]">{listing.bebas_banjir ? 'Ya' : 'Tidak'}</span></div>
                                <div className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 block">Rawan Longsor:</span><span className="font-semibold text-slate-800">{listing.rawan_longsor ? 'Ya' : 'Tidak'}</span></div>
                            </div>
                            <div className="pt-2 border-t border-slate-100">
                                <h4 className="text-sm font-bold text-slate-900 mb-3">Jarak ke Fasilitas Umum</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                                    <div className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 block">Tol:</span><span className="font-semibold text-slate-800">{listing.jarak_tol || '-'}</span></div>
                                    <div className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 block">Stasiun:</span><span className="font-semibold text-slate-800">{listing.jarak_stasiun || '-'}</span></div>
                                    <div className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 block">Bandara:</span><span className="font-semibold text-slate-800">{listing.jarak_bandara || '-'}</span></div>
                                    <div className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 block">Rumah Sakit:</span><span className="font-semibold text-slate-800">{listing.jarak_rs || '-'}</span></div>
                                    <div className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 block">Sekolah:</span><span className="font-semibold text-slate-800">{listing.jarak_sekolah || '-'}</span></div>
                                    <div className="p-3 bg-slate-50 rounded-xl"><span className="text-slate-400 block">Pasar:</span><span className="font-semibold text-slate-800">{listing.jarak_pasar || '-'}</span></div>
                                    <div className="p-3 bg-slate-50 rounded-xl col-span-2"><span className="text-slate-400 block">Pusat Kota:</span><span className="font-semibold text-slate-800">{listing.jarak_pusat_kota || '-'}</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Fasilitas & Utilitas */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 mb-3">
                                    Fasilitas Properti
                                </h3>
                                {listing.facilities && listing.facilities.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                        {listing.facilities.map((fac, idx) => (
                                            <div key={idx} className="flex items-center gap-2 p-2.5 bg-blue-50/70 rounded-xl text-xs font-bold text-[#002B7F] border border-blue-100">
                                                <CheckCircle className="w-4 h-4 text-[#0070F3] shrink-0" />
                                                {fac}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-slate-500">Tidak ada fasilitas khusus yang dicantumkan.</p>
                                )}
                            </div>

                            <div className="pt-3 border-t border-slate-100">
                                <h4 className="text-sm font-bold text-slate-900 mb-3">Utilitas & Daya</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                                    <div className="p-2.5 bg-slate-50 rounded-xl">
                                        <span className="text-slate-400 block text-[10px]">Daya Listrik</span>
                                        <span className="font-semibold text-slate-800">{listing.daya_listrik || '-'}</span>
                                    </div>
                                    <div className="p-2.5 bg-slate-50 rounded-xl">
                                        <span className="text-slate-400 block text-[10px]">Jenis Meteran</span>
                                        <span className="font-semibold text-slate-800">{listing.jenis_meteran || 'Prabayar'}</span>
                                    </div>
                                    <div className="p-2.5 bg-slate-50 rounded-xl">
                                        <span className="text-slate-400 block text-[10px]">Sumber Air</span>
                                        <span className="font-semibold text-slate-800">{listing.sumber_air || '-'}</span>
                                    </div>
                                    <div className="p-2.5 bg-slate-50 rounded-xl">
                                        <span className="text-slate-400 block text-[10px]">Internet</span>
                                        <span className="font-semibold text-slate-800">{listing.internet_jaringan || '-'}</span>
                                    </div>
                                    <div className="p-2.5 bg-slate-50 rounded-xl">
                                        <span className="text-slate-400 block text-[10px]">Jalur Gas</span>
                                        <span className="font-semibold text-slate-800">{listing.gas || '-'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Legalitas Publik (Hidden Sensitive Field) */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <h3 className="text-lg font-bold text-[#002B7F]">
                                    Legalitas & Dokumen
                                </h3>
                                <span className="text-[11px] px-3 py-1 bg-blue-50 text-[#002B7F] font-bold rounded-full flex items-center gap-1 border border-blue-200">
                                    <ShieldCheck className="w-3.5 h-3.5 text-[#0070F3]" />
                                    Data Terverifikasi Admin
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs">
                                <div><span className="text-slate-400 block">Jenis Sertifikat:</span> <span className="font-semibold text-slate-900">{listing.status_sertifikat}</span></div>
                                <div><span className="text-slate-400 block">Status Sengketa:</span> <span className="font-semibold text-[#0070F3]">{listing.status_sengketa}</span></div>
                                <div><span className="text-slate-400 block">Luas di Sertifikat:</span> <span className="font-semibold text-slate-800">{listing.luas_sertifikat ? `${listing.luas_sertifikat} m²` : `${listing.luas_tanah} m²`}</span></div>
                                <div><span className="text-slate-400 block">Status PBB:</span> <span className="font-semibold text-slate-800">{listing.status_pbb || '-'}{listing.tahun_pbb ? ` (${listing.tahun_pbb})` : ''}</span></div>
                                <div><span className="text-slate-400 block">NJOP:</span> <span className="font-semibold text-slate-800">{listing.njop ? formatRupiah(listing.njop) : '-'}</span></div>
                                <div><span className="text-slate-400 block">Status PBG / IMB:</span> <span className="font-semibold text-slate-800">{listing.status_pbg_imb || '-'}</span></div>
                            </div>
                        </div>

                        {/* Khusus Developer Detail & Brosur Download */}
                        {dev && dev.nama_developer && (
                            <div className="bg-[#001F5C] text-white p-6 rounded-3xl border border-blue-900 shadow-sm space-y-4">
                                <div className="flex items-center justify-between border-b border-blue-900 pb-3">
                                    <div className="flex items-center gap-2">
                                        <Building className="w-5 h-5 text-[#FF8A00]" />
                                        <h3 className="text-lg font-bold">Informasi Proyek Developer</h3>
                                    </div>
                                    <span className="text-xs bg-[#FF8A00] text-white px-3 py-1 rounded-full font-bold">
                                        Project Resmi
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                                    <div><span className="text-blue-200 block">Developer:</span> <span className="font-semibold">{dev.nama_developer}</span></div>
                                    <div><span className="text-blue-200 block">Nama Proyek:</span> <span className="font-semibold">{dev.nama_proyek}</span></div>
                                    <div><span className="text-blue-200 block">Status Proyek:</span> <span className="font-semibold">{dev.status_proyek || 'Pembangunan'}</span></div>
                                    <div><span className="text-blue-200 block">Sisa Unit:</span> <span className="font-semibold">{dev.unit_tersedia || '-'} dari {dev.jumlah_unit || '-'} Unit</span></div>
                                    <div><span className="text-blue-200 block">Tipe Unit:</span> <span className="font-semibold">{dev.tipe_unit || '-'}</span></div>
                                    <div><span className="text-blue-200 block">Harga Mulai:</span> <span className="font-semibold">{dev.harga_mulai ? formatRupiah(dev.harga_mulai) : '-'}</span></div>
                                    <div><span className="text-blue-200 block">Estimasi Serah Terima:</span> <span className="font-semibold">{dev.estimasi_serah_terima || '-'}</span></div>
                                    <div><span className="text-blue-200 block">Pilihan KPR:</span> <span className="font-semibold">{dev.pilihan_kpr || '-'}</span></div>
                                    <div><span className="text-blue-200 block">Bank Partner KPR:</span> <span className="font-semibold">{dev.bank_partner || '-'}</span></div>
                                    <div><span className="text-blue-200 block">Booking Fee / DP:</span> <span className="font-semibold">{formatRupiah(dev.booking_fee)} / {dev.dp || '0%'}</span></div>
                                    <div className="col-span-2 sm:col-span-3"><span className="text-blue-200 block">Fasilitas Cluster:</span> <span className="font-semibold">{dev.fasilitas_cluster || '-'}</span></div>
                                </div>
                                {(dev.brosur_url || dev.site_plan_url || dev.video_marketing_link) && (
                                    <div className="pt-3 border-t border-blue-900 flex flex-wrap gap-3">
                                        {dev.brosur_url && (
                                            <a href={dev.brosur_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FF8A00] hover:bg-[#e67a00] text-white rounded-xl text-xs font-bold transition shadow">
                                                <Download className="w-4 h-4" /> Unduh Brosur Proyek (PDF)
                                            </a>
                                        )}
                                        {dev.site_plan_url && (
                                            <a href={dev.site_plan_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#0070F3] hover:bg-[#005bb5] text-white rounded-xl text-xs font-bold transition">
                                                <FileText className="w-4 h-4 text-white" /> Lihat Site Plan Proyek
                                            </a>
                                        )}
                                        {dev.video_marketing_link && (
                                            <a href={dev.video_marketing_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition border border-slate-700">
                                                <Play className="w-4 h-4 text-[#FF8A00]" /> Video Marketing Proyek
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Video Tour Embed */}
                        {videos.length > 0 && (
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                                <h3 className="text-lg font-bold text-[#002B7F] border-b border-slate-100 pb-3 flex items-center gap-2">
                                    <Play className="w-5 h-5 text-[#0070F3]" />
                                    Video Properti (Walkthrough / Drone)
                                </h3>
                                <div className="space-y-4">
                                    {videos.map((vid, i) => {
                                        const embedSrc = getEmbedUrl(vid.link_video);
                                        return (
                                            <div key={i} className="space-y-1.5">
                                                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                                    Tipe: {vid.tipe}
                                                </span>
                                                {embedSrc ? (
                                                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                                                        <iframe 
                                                            src={embedSrc} 
                                                            title={`Video ${i + 1}`}
                                                            className="w-full h-full border-0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                            sandbox="allow-scripts allow-same-origin allow-presentation"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="p-4 bg-slate-100 rounded-xl flex items-center justify-between">
                                                        <span className="text-xs text-slate-600 truncate max-w-sm">Tautan Video: {vid.link_video}</span>
                                                        <a href={vid.link_video} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-[#0070F3] text-white rounded-lg text-xs font-bold shrink-0">
                                                            Tonton Video Eksternal
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Properti Serupa */}
                        {relatedListings.length > 0 && (
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                                    Properti Serupa
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {relatedListings.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/listing/${item.slug}`}
                                            className="flex gap-3 p-3 rounded-2xl border border-slate-200 hover:border-[#0070F3] hover:shadow-sm transition group"
                                        >
                                            <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                                                <img
                                                    src={item.photos?.[0]?.url_foto || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=60'}
                                                    alt={item.judul}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0 space-y-0.5">
                                                <p className="text-xs font-bold text-slate-900 truncate">{item.judul}</p>
                                                <p className="text-xs font-black text-[#002B7F]">{formatRupiah(item.harga)}</p>
                                                <p className="text-[11px] text-slate-500">{item.kecamatan}, {item.kota}</p>
                                                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-[#0070F3] rounded-full border border-blue-100">
                                                    {item.jenis_iklan} • {item.jenis_properti}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Action (1 Col) */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg sticky top-24 space-y-6">
                            <div>
                                <span className="text-xs text-slate-500 block mb-1">Harga Penawaran:</span>
                                <div className="text-3xl font-black text-[#002B7F]">
                                    {formatRupiah(listing.harga)}
                                </div>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                                        {listing.jenis_harga || 'Nego'}
                                    </span>
                                    {listing.bisa_nego ? (
                                        <span className="text-xs text-[#0070F3] font-bold">Bisa Nego</span>
                                    ) : (
                                        <span className="text-xs text-slate-500 font-semibold">Harga Pas</span>
                                    )}
                                </div>
                                {listing.harga_promo && (
                                    <div className="mt-2 text-xs text-rose-600 font-bold bg-rose-50 p-2.5 rounded-xl border border-rose-100">
                                        Harga Promo: {formatRupiah(listing.harga_promo)}
                                    </div>
                                )}
                                {listing.booking_fee && (
                                    <div className="mt-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                                        Booking Fee: <span className="font-bold text-[#002B7F]">{formatRupiah(listing.booking_fee)}</span>
                                    </div>
                                )}
                                {listing.metode_pembayaran && (
                                    <div className="mt-2 text-xs text-slate-600">
                                        Metode Pembayaran: <span className="font-semibold text-slate-800">{listing.metode_pembayaran}</span>
                                    </div>
                                )}
                            </div>

                            {/* Pengiklan Profile & Preferensi Kontak */}
                            <div className="p-4 bg-blue-50/40 rounded-2xl border border-blue-100 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-[#0070F3] text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow">
                                        {pengiklan.nama_pengiklan?.[0] || 'P'}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">{pengiklan.nama_pengiklan || 'Pengiklan'}</h4>
                                        <p className="text-xs text-slate-500 font-medium">
                                            {pengiklan.jenis_pengiklan || 'Pemilik'} {pengiklan.nama_perusahaan ? `• ${pengiklan.nama_perusahaan}` : ''}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-blue-100 text-xs text-slate-600 space-y-1.5">
                                    <div className="flex justify-between">
                                        <span>Hubungan dg Properti:</span>
                                        <span className="font-bold text-[#002B7F]">{pengiklan.hubungan_dengan_properti || '-'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Metode Kontak Utama:</span>
                                        <span className="font-bold text-[#002B7F]">{listing.cara_dihubungi || 'WhatsApp'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Primary Action: Sesuai Preferensi Cara Dihubungi Pengiklan */}
                            <div className="space-y-3">
                                {(listing.cara_dihubungi === 'WA' || listing.cara_dihubungi === 'Chat TulungJual' || !listing.cara_dihubungi) && (
                                    <a
                                        href={waLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-[#FF8A00] hover:bg-[#e67a00] text-white font-black text-sm rounded-2xl shadow-md transition"
                                    >
                                        <MessageSquare className="w-5 h-5" />
                                        Hubungi via WhatsApp
                                    </a>
                                )}

                                {listing.cara_dihubungi === 'Telepon' && pengiklan.telepon && (
                                    <a
                                        href={`tel:${pengiklan.telepon}`}
                                        className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-[#FF8A00] hover:bg-[#e67a00] text-white font-black text-sm rounded-2xl shadow-md transition"
                                    >
                                        <Phone className="w-5 h-5" />
                                        Telepon Langsung
                                    </a>
                                )}

                                {listing.cara_dihubungi === 'Email' && pengiklan.email && (
                                    <a
                                        href={`mailto:${pengiklan.email}?subject=${encodeURIComponent('Tanya Properti: ' + listing.judul)}`}
                                        className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-[#FF8A00] hover:bg-[#e67a00] text-white font-black text-sm rounded-2xl shadow-md transition"
                                    >
                                        <Mail className="w-5 h-5" />
                                        Kirim Email
                                    </a>
                                )}

                                {listing.tampilkan_no_telepon && pengiklan.telepon && listing.cara_dihubungi !== 'Telepon' && (
                                    <a
                                        href={`tel:${pengiklan.telepon}`}
                                        className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition"
                                    >
                                        <Phone className="w-4 h-4 text-slate-500" />
                                        Telepon Langsung
                                    </a>
                                )}
                            </div>

                            {/* Kalkulator KPR */}
                            {listing.harga > 0 && (
                                <KprCalculator harga={listing.harga} />
                            )}

                            {/* Share Buttons */}
                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                                <span className="text-slate-500 font-semibold flex items-center gap-1">
                                    <Share2 className="w-3.5 h-3.5 text-[#0070F3]" /> Bagikan:
                                </span>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={`https://wa.me/?text=${encodeURIComponent(`Cek properti "${listing.judul}" di TulungJual.id: ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-2.5 py-1 bg-blue-50 text-[#0070F3] hover:bg-blue-100 rounded-lg font-bold flex items-center gap-1 transition"
                                        title="Bagikan ke WhatsApp"
                                    >
                                        WhatsApp
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (navigator.clipboard) {
                                                navigator.clipboard.writeText(window.location.href);
                                                alert('Tautan properti berhasil disalin ke clipboard!');
                                            }
                                        }}
                                        className="px-2.5 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-semibold transition"
                                    >
                                        Salin Link
                                    </button>
                                </div>
                            </div>

                            {/* Laporkan Iklan ke Admin */}
                            <div className="pt-4 border-t border-slate-200 text-center">
                                <a
                                    href={waReportUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline"
                                >
                                    <AlertTriangle className="w-3.5 h-3.5" />
                                    Laporkan Iklan Ini ke Admin
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
