import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { 
    Search, 
    Filter, 
    Clock, 
    CheckCircle2, 
    XCircle, 
    Eye, 
    Building2,
    ShieldCheck,
    Wallet
} from 'lucide-react';

const PAYMENT_BADGE = {
    verified: { cls: 'bg-emerald-100 text-emerald-700', label: 'Terverifikasi' },
    pending: { cls: 'bg-amber-100 text-amber-800', label: 'Menunggu' },
    rejected: { cls: 'bg-rose-100 text-rose-800', label: 'Ditolak' },
    unpaid: { cls: 'bg-slate-100 text-slate-600', label: 'Belum Bayar' },
};

export default function Index({ listings, filters = {} }) {
    const safeFilters = (filters && !Array.isArray(filters)) ? filters : {};
    const [q, setQ] = React.useState(safeFilters.q || '');
    const [status, setStatus] = React.useState(safeFilters.status || '');
    const [payment, setPayment] = React.useState(safeFilters.payment || '');

    const handleFilter = (e) => {
        e.preventDefault();
        router.get('/admin/listings', { q, status, payment }, { preserveState: true });
    };

    const formatRupiah = (val) => {
        if (!val) return 'Rp 0';
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <AdminLayout title="Kelola Iklan">
            {/* Filter bar */}
                <form onSubmit={handleFilter} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-3">
                    <div className="relative flex-1 w-full">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Cari judul, kota, atau nama user pengiklan..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-[#0070F3]"
                        />
                    </div>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full sm:w-44 text-xs py-2 px-3 border border-slate-300 rounded-xl focus:ring-[#0070F3] font-medium"
                    >
                        <option value="">Semua Status Approval</option>
                        <option value="pending">Pending Approval</option>
                        <option value="approved">Approved (Tayang)</option>
                        <option value="rejected">Rejected (Ditolak)</option>
                    </select>

                    <select
                        value={payment}
                        onChange={(e) => setPayment(e.target.value)}
                        className="w-full sm:w-44 text-xs py-2 px-3 border border-slate-300 rounded-xl focus:ring-[#0070F3] font-medium"
                    >
                        <option value="">Semua Status Bayar</option>
                        <option value="pending">Menunggu Verifikasi</option>
                        <option value="verified">Terverifikasi</option>
                        <option value="rejected">Ditolak</option>
                        <option value="unpaid">Belum Bayar</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full sm:w-auto px-5 py-2.5 bg-[#002B7F] hover:bg-[#001D56] text-white font-bold text-xs rounded-xl transition"
                    >
                        Filter
                    </button>
                </form>

                {/* Table */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                                    <th className="p-4">Properti</th>
                                    <th className="p-4">Jenis</th>
                                    <th className="p-4">Harga</th>
                                    <th className="p-4">Pengiklan</th>
                                    <th className="p-4">Pembayaran</th>
                                    <th className="p-4">Status Approval</th>
                                    <th className="p-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs">
                                {listings.data.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50 transition">
                                        <td className="p-4 font-bold text-slate-900 max-w-xs">
                                            <div className="truncate">{item.judul}</div>
                                            <div className="text-[11px] text-slate-400 font-normal">{item.kota}, {item.provinsi}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#002B7F] font-bold">
                                                {item.jenis_iklan} • {item.jenis_properti}
                                            </span>
                                        </td>
                                        <td className="p-4 font-black text-[#002B7F]">
                                            {formatRupiah(item.harga)}
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-slate-800">{item.user?.name}</div>
                                            <div className="text-[11px] text-slate-500">{item.pengiklan_info?.no_wa || item.user?.email}</div>
                                        </td>
                                        <td className="p-4">
                                            {(() => {
                                                const badge = PAYMENT_BADGE[item.payment_status] || PAYMENT_BADGE.unpaid;
                                                return (
                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${badge.cls}`}>
                                                        <Wallet className="w-3 h-3" /> {badge.label}
                                                    </span>
                                                );
                                            })()}
                                        </td>
                                        <td className="p-4">
                                            {item.status_approval === 'approved' && (
                                                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-[#002B7F] inline-flex items-center gap-1">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0070F3]" /> Approved
                                                </span>
                                            )}
                                            {item.status_approval === 'pending' && (
                                                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 inline-flex items-center gap-1">
                                                    <Clock className="w-3.5 h-3.5 text-amber-600" /> Pending
                                                </span>
                                            )}
                                            {item.status_approval === 'rejected' && (
                                                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 inline-flex items-center gap-1">
                                                    <XCircle className="w-3.5 h-3.5" /> Rejected
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            <Link
                                                href={`/admin/listings/${item.id}`}
                                                className="px-3.5 py-1.5 bg-[#0070F3] hover:bg-[#005bb5] text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-1 shadow-sm"
                                            >
                                                <Eye className="w-3.5 h-3.5" /> Review
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

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
        </AdminLayout>
    );
}
