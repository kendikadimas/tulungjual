import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import {
    Search,
    History,
    ShieldCheck,
    CheckCircle2,
    XCircle,
    Trash2,
    UserCog,
    UserX,
    Tag,
    LogIn,
    LogOut,
    Plus,
    Pencil,
    Power,
} from 'lucide-react';

const ACTION_META = {
    'listing.approve': { icon: CheckCircle2, color: 'text-[#0070F3]', bg: 'bg-blue-50', border: 'border-blue-200', label: 'Approved Iklan' },
    'listing.reject': { icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', label: 'Rejected Iklan' },
    'listing.delete': { icon: Trash2, color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200', label: 'Hapus Iklan' },
    'user.role_update': { icon: UserCog, color: 'text-[#FF8A00]', bg: 'bg-amber-50', border: 'border-amber-200', label: 'Ubah Role' },
    'user.delete': { icon: UserX, color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200', label: 'Hapus User' },
    'category.create': { icon: Plus, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'Tambah Kategori' },
    'category.update': { icon: Pencil, color: 'text-[#0070F3]', bg: 'bg-blue-50', border: 'border-blue-200', label: 'Ubah Kategori' },
    'category.toggle': { icon: Power, color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200', label: 'Toggle Kategori' },
    'category.delete': { icon: Trash2, color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200', label: 'Hapus Kategori' },
    'auth.login': { icon: LogIn, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', label: 'Login' },
    'auth.logout': { icon: LogOut, color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200', label: 'Logout' },
};

const CATEGORY_OPTIONS = [
    { value: '', label: 'Semua Kategori' },
    { value: 'listing', label: 'Iklan' },
    { value: 'user', label: 'Pengguna' },
    { value: 'category', label: 'Kategori' },
    { value: 'auth', label: 'Autentikasi' },
];

function timeAgo(dateStr) {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins < 1) return 'Baru saja';
    if (diffMins < 60) return `${diffMins} menit lalu`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} jam lalu`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays} hari lalu`;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function Index({ logs = { data: [] }, filters = {} }) {
    const safeFilters = (filters && !Array.isArray(filters)) ? filters : {};
    const [q, setQ] = React.useState(safeFilters.q || '');
    const [category, setCategory] = React.useState(safeFilters.category || '');

    const handleFilter = (e) => {
        e.preventDefault();
        router.get('/admin/activity-logs', { q, category }, { preserveState: true });
    };

    const handleReset = () => {
        setQ('');
        setCategory('');
        router.get('/admin/activity-logs');
    };

    return (
        <AdminLayout title="Log Aktivitas">
            {/* Header Info */}
            <div className="bg-gradient-to-r from-[#001F5C] to-[#002B7F] rounded-2xl p-5 sm:p-6 text-white border border-blue-900 shadow-sm">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF8A00] flex items-center justify-center shrink-0">
                        <History className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-black">Log Aktivitas Admin</h1>
                        <p className="text-xs text-blue-200 mt-0.5">
                            Catatan lengkap seluruh aktivitas moderasi, persetujuan iklan, perubahan role, dan pengelolaan data.
                        </p>
                    </div>
                </div>
            </div>

            {/* Filter */}
            <form onSubmit={handleFilter} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Cari deskripsi, nama admin, atau subjek..."
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-[#0070F3]"
                    />
                </div>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full sm:w-44 text-xs py-2 px-3 border border-slate-300 rounded-xl focus:ring-[#0070F3] font-medium"
                >
                    {CATEGORY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>

                <button type="submit" className="w-full sm:w-auto px-5 py-2.5 bg-[#002B7F] hover:bg-[#001D56] text-white font-bold text-xs rounded-xl transition">
                    Filter
                </button>
                <button type="button" onClick={handleReset} className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition">
                    Reset
                </button>
            </form>

            {/* Timeline */}
            {logs.data.length > 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="divide-y divide-slate-100">
                        {logs.data.map((log) => {
                            const meta = ACTION_META[log.action] || {
                                icon: History, color: 'text-slate-500', bg: 'bg-slate-100', border: 'border-slate-200', label: log.action,
                            };
                            const Icon = meta.icon;
                            return (
                                <div key={log.id} className="p-4 sm:p-5 flex items-start gap-4 hover:bg-slate-50 transition">
                                    <div className={`w-9 h-9 rounded-xl ${meta.bg} ${meta.border} border flex items-center justify-center shrink-0`}>
                                        <Icon className={`w-4 h-4 ${meta.color}`} />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${meta.bg} ${meta.color} ${meta.border} border`}>
                                                {meta.label}
                                            </span>
                                            <span className="text-[11px] text-slate-400">{timeAgo(log.created_at)}</span>
                                        </div>

                                        <p className="text-sm text-slate-800 font-medium mt-1.5">{log.description}</p>

                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[11px] text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <ShieldCheck className="w-3 h-3 text-[#0070F3]" />
                                                <span className="font-semibold text-slate-700">{log.user_name || 'Sistem'}</span>
                                                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold uppercase text-[9px]">
                                                    {log.user_role || '-'}
                                                </span>
                                            </span>
                                            {log.subject_label && (
                                                <span>Subjek: <span className="font-semibold text-slate-700">{log.subject_label}</span></span>
                                            )}
                                            {log.ip_address && <span className="font-mono">{log.ip_address}</span>}
                                        </div>
                                    </div>

                                    <div className="text-[10px] text-slate-400 hidden sm:block shrink-0 font-mono">
                                        {new Date(log.created_at).toLocaleString('id-ID', {
                                            day: '2-digit', month: 'short', year: 'numeric',
                                            hour: '2-digit', minute: '2-digit',
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="bg-white p-12 rounded-2xl text-center border border-slate-200 space-y-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                        <History className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800">Belum ada log aktivitas</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Aktivitas admin akan tercatat otomatis di sini.
                    </p>
                </div>
            )}

            {/* Pagination */}
            {logs.links && logs.links.length > 3 && (
                <div className="flex justify-center flex-wrap gap-1 pt-2">
                    {logs.links.map((link, idx) => (
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
