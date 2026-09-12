import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, usePage } from '@inertiajs/react';
import { 
    Home, 
    CheckCircle2, 
    Clock, 
    Users, 
    Eye,
    XCircle,
    Tag,
    ShieldCheck,
    History,
    Wallet
} from 'lucide-react';

function timeAgo(dateStr) {
    const diffMins = Math.floor((new Date() - new Date(dateStr)) / 60000);
    if (diffMins < 1) return 'Baru saja';
    if (diffMins < 60) return `${diffMins} menit lalu`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} jam lalu`;
    return `${Math.floor(diffHours / 24)} hari lalu`;
}

export default function Dashboard({ stats = {}, recentListings = [], recentActivities = [] }) {
    const { auth } = usePage().props;
    const isSuperAdmin = auth?.user?.role === 'super_admin';

    const formatRupiah = (val) => {
        if (!val) return 'Rp 0';
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <AdminLayout title="Overview">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-xs font-semibold">Total Iklan</span>
                        <Home className="w-4 h-4 text-[#0070F3]" />
                    </div>
                    <div className="text-3xl font-black text-[#002B7F]">{stats.total_listings || 0}</div>
                    <div className="text-[11px] text-slate-400 mt-1">Seluruh pengajuan</div>
                </div>

                <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 shadow-sm">
                    <div className="flex items-center justify-between text-amber-700 mb-2">
                        <span className="text-xs font-semibold">Pending</span>
                        <Clock className="w-4 h-4 text-[#FF8A00]" />
                    </div>
                    <div className="text-3xl font-black text-[#FF8A00]">{stats.pending_listings || 0}</div>
                    <div className="text-[11px] text-amber-600 mt-1">Butuh Review</div>
                </div>

                <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200 shadow-sm">
                    <div className="flex items-center justify-between text-blue-700 mb-2">
                        <span className="text-xs font-semibold">Approved</span>
                        <CheckCircle2 className="w-4 h-4 text-[#0070F3]" />
                    </div>
                    <div className="text-3xl font-black text-[#0070F3]">{stats.approved_listings || 0}</div>
                    <div className="text-[11px] text-[#0070F3] mt-1">Tayang Publik</div>
                </div>

                <div className="bg-rose-50 p-5 rounded-2xl border border-rose-200 shadow-sm">
                    <div className="flex items-center justify-between text-rose-700 mb-2">
                        <span className="text-xs font-semibold">Ditolak</span>
                        <XCircle className="w-4 h-4 text-rose-500" />
                    </div>
                    <div className="text-3xl font-black text-rose-600">{stats.rejected_listings || 0}</div>
                    <div className="text-[11px] text-rose-500 mt-1">Rejected</div>
                </div>

                <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 shadow-sm">
                    <div className="flex items-center justify-between text-amber-700 mb-2">
                        <span className="text-xs font-semibold">Bayar Pending</span>
                        <Wallet className="w-4 h-4 text-[#FF8A00]" />
                    </div>
                    <div className="text-3xl font-black text-[#FF8A00]">{stats.pending_payments || 0}</div>
                    <div className="text-[11px] text-amber-600 mt-1">Perlu Verifikasi</div>
                </div>

                <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 shadow-sm">
                    <div className="flex items-center justify-between text-emerald-700 mb-2">
                        <span className="text-xs font-semibold">Bayar Verified</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-3xl font-black text-emerald-600">{stats.verified_payments || 0}</div>
                    <div className="text-[11px] text-emerald-600 mt-1">Lunas</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-xs font-semibold">Pengguna</span>
                        <Users className="w-4 h-4 text-[#002B7F]" />
                    </div>
                    <div className="text-3xl font-black text-[#002B7F]">{stats.total_users || 0}</div>
                    <div className="text-[11px] text-slate-400 mt-1">Member</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-xs font-semibold">Admin</span>
                        <ShieldCheck className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="text-3xl font-black text-purple-700">{stats.total_admins || 0}</div>
                    <div className="text-[11px] text-slate-400 mt-1">Admin & Super</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                        <span className="text-xs font-semibold">Kategori</span>
                        <Tag className="w-4 h-4 text-[#002B7F]" />
                    </div>
                    <div className="text-3xl font-black text-[#002B7F]">{stats.total_categories || 0}</div>
                    <div className="text-[11px] text-slate-400 mt-1">Aktif</div>
                </div>
            </div>

            {/* Quick Actions */}
            {(stats.pending_listings || 0) > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-[#FF8A00] shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-amber-800">{stats.pending_listings} iklan menunggu persetujuan</p>
                            <p className="text-xs text-amber-600">Segera review agar pengiklan tidak menunggu lama.</p>
                        </div>
                    </div>
                    <Link
                        href="/admin/listings?status=pending"
                        className="shrink-0 px-4 py-2 bg-[#FF8A00] hover:bg-[#e67a00] text-white font-black text-xs rounded-xl transition shadow"
                    >
                        Review Sekarang
                    </Link>
                </div>
            )}

            {/* Recent Listings */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-[#002B7F] text-sm">Pengajuan Iklan Terbaru</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Iklan yang baru masuk atau diperbarui</p>
                    </div>
                    <Link href="/admin/listings" className="text-xs font-bold text-[#0070F3] hover:underline flex items-center gap-1">
                        Lihat Semua
                    </Link>
                </div>

                <div className="divide-y divide-slate-100">
                    {recentListings.length === 0 && (
                        <div className="p-8 text-center text-xs text-slate-400">Belum ada iklan yang masuk.</div>
                    )}
                    {recentListings.map((item) => (
                        <div key={item.id} className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50 transition">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                        item.status_approval === 'approved' ? 'bg-blue-100 text-[#002B7F]' :
                                        item.status_approval === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                                    }`}>
                                        {item.status_approval.toUpperCase()}
                                    </span>
                                    <span className="text-xs text-slate-400">{item.jenis_iklan} • {item.jenis_properti}</span>
                                </div>
                                <h4 className="font-bold text-slate-900 text-sm truncate">{item.judul}</h4>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Oleh: <span className="font-semibold text-slate-700">{item.user?.name}</span> ({item.pengiklan_info?.no_wa || '-'}) • {item.kota}
                                </p>
                            </div>
                            <Link
                                href={`/admin/listings/${item.id}`}
                                className="shrink-0 px-4 py-2 bg-[#0070F3] hover:bg-[#005bb5] text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm"
                            >
                                <Eye className="w-3.5 h-3.5" /> Review
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activities */}
            {recentActivities.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <History className="w-4 h-4 text-[#0070F3]" />
                            <div>
                                <h3 className="font-bold text-[#002B7F] text-sm">Aktivitas Admin Terbaru</h3>
                                <p className="text-xs text-slate-500 mt-0.5">Catatan moderasi dan pengelolaan data</p>
                            </div>
                        </div>
                        {isSuperAdmin && (
                            <Link href="/admin/activity-logs" className="text-xs font-bold text-[#0070F3] hover:underline flex items-center gap-1">
                                Lihat Semua
                            </Link>
                        )}
                    </div>

                    <div className="divide-y divide-slate-100">
                        {recentActivities.map((log) => (
                            <div key={log.id} className="px-6 py-3.5 flex items-start justify-between gap-4 hover:bg-slate-50 transition">
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-slate-800 font-medium">{log.description}</p>
                                    <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5">
                                        <ShieldCheck className="w-3 h-3 text-[#0070F3]" />
                                        <span className="font-semibold text-slate-700">{log.user_name || 'Sistem'}</span>
                                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold uppercase text-[9px]">
                                            {log.user_role || '-'}
                                        </span>
                                        <span className="text-slate-400">{timeAgo(log.created_at)}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

