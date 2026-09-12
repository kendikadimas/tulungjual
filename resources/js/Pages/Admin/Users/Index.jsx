import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';
import { Search, Users, ShieldCheck, User } from 'lucide-react';

export default function Index({ users, filters = {} }) {
    const safeFilters = (filters && !Array.isArray(filters)) ? filters : {};
    const [q, setQ] = React.useState(safeFilters.q || '');

    const handleFilter = (e) => {
        e.preventDefault();
        router.get('/admin/users', { q }, { preserveState: true });
    };

    return (
        <AdminLayout title="Kelola Pengguna">
            {/* Filter */}
                <form onSubmit={handleFilter} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Cari nama, email, atau no HP..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg"
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-slate-800 text-white font-bold text-xs rounded-lg">Cari</button>
                </form>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
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
                            {users.data.map((u) => (
                                <tr key={u.id} className="hover:bg-slate-50">
                                    <td className="p-4 font-bold text-slate-900">{u.name}</td>
                                    <td className="p-4 text-slate-600">{u.email}</td>
                                    <td className="p-4 text-slate-600">{u.no_hp || '-'}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                            u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-[#002B7F]'
                                        }`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="p-4 font-bold text-[#002B7F]">{u.listings_count || 0}</td>
                                    <td className="p-4 text-slate-500">{new Date(u.created_at).toLocaleDateString('id-ID')}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => {
                                                    const newRole = u.role === 'admin' ? 'user' : 'admin';
                                                    if (confirm(`Ubah role ${u.name} menjadi ${newRole.toUpperCase()}?`)) {
                                                        router.patch(`/admin/users/${u.id}/role`, { role: newRole }, { preserveScroll: true });
                                                    }
                                                }}
                                                className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-[#0070F3] font-semibold rounded-lg text-xs"
                                            >
                                                {u.role === 'admin' ? 'Jadikan User' : 'Jadikan Admin'}
                                            </button>
                                            {u.role !== 'admin' && (
                                                <button
                                                    onClick={() => {
                                                        if (confirm(`Hapus akun pengguna ${u.name} dan seluruh iklannya?`)) {
                                                            router.delete(`/admin/users/${u.id}`);
                                                        }
                                                    }}
                                                    className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-lg text-xs"
                                                >
                                                    Hapus
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {users.links && users.links.length > 3 && (
                    <div className="flex justify-center flex-wrap gap-1 pt-6">
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
