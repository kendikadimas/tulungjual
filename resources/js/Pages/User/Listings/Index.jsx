import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import FlashMessage from '@/Components/FlashMessage';
import { Link, router } from '@inertiajs/react';
import { 
    PlusCircle, 
    Home, 
    Clock, 
    CheckCircle2, 
    XCircle, 
    Edit, 
    Eye, 
    Trash2,
    EyeOff,
    Power
} from 'lucide-react';

export default function Index({ listings }) {
    const handleStatusChange = (listingId, newStatus) => {
        router.patch(`/iklan-saya/${listingId}/status`, {
            status_transaksi: newStatus,
        }, { preserveScroll: true });
    };

    const handleToggleActive = (listingId, isActive) => {
        const action = isActive ? 'nonaktifkan' : 'aktifkan';
        if (confirm(`Yakin ingin ${action} iklan ini?`)) {
            router.patch(`/iklan-saya/${listingId}/toggle-active`, {}, { preserveScroll: true });
        }
    };

    const formatRupiah = (val) => {
        if (!val) return 'Rp 0';
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <AppLayout title="Iklan Saya - Dashboard TulungJual.id">
            <div className="bg-[#002B7F] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-blue-900">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black">Kelola Iklan Saya</h1>
                        <p className="text-blue-100 text-sm mt-1">
                            Pantau status persetujuan, ketersediaan unit, dan kelola iklan properti Anda.
                        </p>
                    </div>
                    <Link
                        href="/pasang-iklan"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#FF8A00] hover:bg-[#e67a00] text-white font-black text-sm shadow-md transition shrink-0"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Pasang Iklan Baru
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <FlashMessage className="mb-6" />

                {listings.data.length > 0 ? (
                    <div className="space-y-4">
                        {listings.data.map((item) => {
                            const isApproved = item.status_approval === 'approved';
                            const isPending = item.status_approval === 'pending';
                            const isRejected = item.status_approval === 'rejected';

                            return (
                                <div 
                                    key={item.id} 
                                    className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                                >
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="w-24 h-20 sm:w-32 sm:h-24 rounded-2xl bg-slate-100 overflow-hidden shrink-0">
                                            <img 
                                                src={item.photos?.[0]?.url_foto || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80'} 
                                                alt={item.judul} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <div className="space-y-1.5 flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                {isApproved && (
                                                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-[#002B7F] flex items-center gap-1">
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0070F3]" /> Tayang / Disetujui
                                                    </span>
                                                )}
                                                {isPending && (
                                                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                                                        <Clock className="w-3.5 h-3.5" /> Menunggu Review Admin
                                                    </span>
                                                )}
                                                {isRejected && (
                                                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 flex items-center gap-1">
                                                        <XCircle className="w-3.5 h-3.5" /> Ditolak
                                                    </span>
                                                )}
                                                {!item.is_active && (
                                                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-slate-200 text-slate-600 flex items-center gap-1">
                                                        <EyeOff className="w-3.5 h-3.5" /> Nonaktif
                                                    </span>
                                                )}
                                                <span className="text-xs text-slate-500 font-medium">
                                                    {item.jenis_iklan} • {item.jenis_properti}
                                                </span>
                                            </div>

                                            <h3 className="text-base font-bold text-slate-900 truncate">
                                                {item.judul}
                                            </h3>

                                            <div className="text-sm font-black text-[#002B7F]">
                                                {formatRupiah(item.harga)}
                                            </div>

                                            <p className="text-xs text-slate-500">
                                                {item.kecamatan}, {item.kota} • Terdaftar: {new Date(item.created_at).toLocaleDateString('id-ID')}
                                            </p>

                                            {item.catatan_rejection && (
                                                <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl font-medium">
                                                    Alasan Penolakan: {item.catatan_rejection}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action & Status Controls */}
                                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                                        <div className="flex items-center gap-1.5 text-xs">
                                            <span className="text-slate-500 font-medium">Ketersediaan:</span>
                                            <select
                                                value={item.status_transaksi}
                                                onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                                className="text-xs py-1.5 px-3 border border-slate-300 rounded-xl font-bold text-[#002B7F] focus:ring-[#0070F3]"
                                            >
                                                <option value="Tersedia">Tersedia</option>
                                                <option value="Booking">Booking (DP Masuk)</option>
                                                <option value="Terjual">Terjual</option>
                                                <option value="Tersewa">Tersewa</option>
                                            </select>
                                        </div>

                                        {isApproved && (
                                            <Link
                                                href={`/listing/${item.slug}`}
                                                className="p-2 text-slate-600 hover:text-[#0070F3] bg-slate-100 hover:bg-blue-50 rounded-xl transition"
                                                title="Lihat Halaman Publik"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                        )}

                                        <button
                                            onClick={() => handleToggleActive(item.id, item.is_active)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition ${
                                                item.is_active
                                                    ? 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                                                    : 'text-white bg-[#0070F3] hover:bg-[#005bb5]'
                                            }`}
                                            title={item.is_active ? 'Nonaktifkan Iklan' : 'Aktifkan Iklan'}
                                        >
                                            <Power className="w-3.5 h-3.5" />
                                            {item.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                                        </button>

                                        <Link
                                            href={`/iklan-saya/${item.id}/edit`}
                                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                                        >
                                            <Edit className="w-3.5 h-3.5" /> Edit
                                        </Link>

                                        <button
                                            onClick={() => {
                                                if (confirm(`Hapus iklan "${item.judul}" secara permanen?`)) {
                                                    router.delete(`/iklan-saya/${item.id}`);
                                                }
                                            }}
                                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition"
                                            title="Hapus Iklan"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white p-12 rounded-3xl text-center border border-slate-200 space-y-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-[#0070F3]">
                            <Home className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900">Belum ada iklan properti</h3>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto">
                            Anda belum memiliki iklan yang terdaftar. Pasang iklan pertama Anda secara gratis sekarang!
                        </p>
                        <Link
                            href="/pasang-iklan"
                            className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#FF8A00] hover:bg-[#e67a00] text-white rounded-2xl text-xs font-black shadow transition"
                        >
                            <PlusCircle className="w-4 h-4" /> Pasang Iklan Sekarang
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {listings.links && listings.links.length > 3 && (
                    <div className="flex justify-center flex-wrap gap-1 pt-6">
                        {listings.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${
                                    link.active
                                        ? 'bg-[#0070F3] text-white shadow-sm'
                                        : link.url
                                        ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                        : 'text-slate-400 cursor-not-allowed pointer-events-none'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
