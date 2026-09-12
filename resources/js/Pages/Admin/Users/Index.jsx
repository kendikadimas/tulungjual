import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { Search, ShieldCheck, Crown, User as UserIcon, Ban } from 'lucide-react';

const ROLE_BADGE = {
    super_admin: {
        cls: 'bg-amber-100 text-amber-800 border-amber-200',
        icon: Crown,
        label: 'Super Admin',
    },
    admin: {
        cls: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: ShieldCheck,
        label: 'Admin',
    },
    user: {
        cls: 'bg-blue-100 text-[#002B7F] border-blue-200',
        icon: UserIcon,
        label: 'User',
    },
};

const ROLE_OPTIONS = [
    { value: '', label: 'Semua Role' },
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
    { value: 'super_admin', label: 'Super Admin' },
];

export default function Index({ users, filters = {}, canManageRoles = false }) {
    const safeFilters = (filters && !Array.isArray(filters)) ? filters : {};
    const { auth } = usePage().props;
    const currentUserId = auth?.user?.id;
    const [q, setQ] = React.useState(safeFilters.q || '');
    const [role, setRole] = React.useState(safeFilters.role || '');

    const handleFilter = (e) => {
        e.preventDefault();
        router.get('/admin/users', { q, role }, { preserveState: true });
    };

    const handleReset = () => {
        setQ('');
        setRole('');
        router.get('/admin/users');
    };

    const changeRole = (u, newRole) => {
        if (newRole === u.role) return;
        if (confirm(`Ubah role "${u.name}" dari ${ROLE_BADGE[u.role]?.label || u.role} menjadi ${ROLE_BADGE[newRole]?.label || newRole}?`)) {
            router.patch(`/admin/users/${u.id}/role`, { role: newRole }, { preserveScroll: true });
        }
    };

    const deleteUser = (u) => {
        if (confirm(`Hapus akun pengguna "${u.name}" dan seluruh iklannya?`)) {
            router.delete(`/admin/users/${u.id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="Kelola Pengguna">
            {/* Info banner when not super admin */}
            {!canManageRoles && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                    <Ban className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-amber-800">Mode Admin Terbatas</p>
                        <p className="text-xs text-amber-600 mt-0.5">
                            Anda dapat mengelola pengguna, namun hanya <strong>Super Admin</strong> yang dapat mengubah role akun menjadi admin.
                        </p>
                    </div>
                </div>
            )}

            {/* Filter */}
            <form onSubmit={handleFilter} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Cari nama, email, atau no HP..."
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-[#0070F3]"
                    />
                </div>

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full sm:w-44 text-xs py-2 px-3 border border-slate-300 rounded-xl focus:ring-[#0070F3] font-medium"
                >
                    {ROLE_OPTIONS.map((opt) => (
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

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase text-slate-500">
                                <th className="p-4">Nama</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">No. HP</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Total Iklan</th>
                                <th className="p-4">Tanggal Daftar</th>
                                <th className="p-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                            {users.data.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center">
                                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-3">
                                            <UserIcon className="w-6 h-6" />
                                        </div>
                                        <p className="text-sm font-bold text-slate-700">Tidak ada pengguna ditemukan</p>
                                        <p className="text-xs text-slate-500 mt-1">Coba ubah kata kunci atau filter role.</p>
                                    </td>
                                </tr>
                            )}
                            {users.data.map((u) => {
                                const badge = ROLE_BADGE[u.role] || ROLE_BADGE.user;
                                const BadgeIcon = badge.icon;
                                const isSelf = u.id === currentUserId;
                                return (
                                    <tr key={u.id} className="hover:bg-slate-50">
                                        <td className="p-4 font-bold text-slate-900">
                                            {u.name}
                                            {isSelf && <span className="ml-2 text-[10px] font-bold text-[#0070F3]">(Anda)</span>}
                                        </td>
                                        <td className="p-4 text-slate-600">{u.email}</td>
                                        <td className="p-4 text-slate-600">{u.no_hp || '-'}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${badge.cls}`}>
                                                <BadgeIcon className="w-3 h-3" />
                                                {badge.label}
                                            </span>
                                        </td>
                                        <td className="p-4 font-bold text-[#002B7F]">{u.listings_count || 0}</td>
                                        <td className="p-4 text-slate-500">{new Date(u.created_at).toLocaleDateString('id-ID')}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {canManageRoles && !isSelf && u.role !== 'super_admin' && (
                                                    <select
                                                        value={u.role}
                                                        onChange={(e) => changeRole(u, e.target.value)}
                                                        className="text-xs py-1.5 px-2 border border-slate-300 rounded-lg font-semibold text-slate-700 focus:ring-[#0070F3]"
                                                    >
                                                        <option value="user">User</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                )}

                                                {canManageRoles && !isSelf && u.role === 'super_admin' && (
                                                    <span className="text-[10px] text-slate-400 italic">Role terkunci</span>
                                                )}

                                                {isSelf && (
                                                    <span className="text-[10px] text-slate-400 italic">Akun sendiri</span>
                                                )}

                                                {/* Delete: cannot delete self, super admin, or admin (unless super admin) */}
                                                {!isSelf && u.role !== 'super_admin' && (canManageRoles || u.role === 'user') && (
                                                    <button
                                                        onClick={() => deleteUser(u)}
                                                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-lg text-xs transition"
                                                    >
                                                        Hapus
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {users.links && users.links.length > 3 && (
                <div className="flex justify-center flex-wrap gap-1 pt-2">
                    {users.links.map((link, idx) => (
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
