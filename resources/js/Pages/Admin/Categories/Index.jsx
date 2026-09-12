import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

export default function Index({ categories = [] }) {
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        slug: '',
    });

    const [editingId, setEditingId] = React.useState(null);
    const [editName, setEditName] = React.useState('');
    const [editSlug, setEditSlug] = React.useState('');

    const handleCreate = (e) => {
        e.preventDefault();
        post('/admin/categories', {
            onSuccess: () => reset(),
        });
    };

    const [togglingId, setTogglingId] = React.useState(null);
    const handleToggle = (id) => {
        if (togglingId) return;
        setTogglingId(id);
        router.patch(`/admin/categories/${id}/toggle`, {}, {
            preserveScroll: true,
            onFinish: () => setTogglingId(null),
        });
    };

    const startEdit = (c) => {
        setEditingId(c.id);
        setEditName(c.name);
        setEditSlug(c.slug);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditName('');
        setEditSlug('');
    };

    const submitEdit = (id) => {
        router.put(`/admin/categories/${id}`, {
            name: editName,
            slug: editSlug,
        }, {
            preserveScroll: true,
            onSuccess: () => cancelEdit(),
        });
    };

    const handleDelete = (c) => {
        if (confirm(`Hapus kategori "${c.name}"?`)) {
            router.delete(`/admin/categories/${c.id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="Kategori Properti">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Add Category Form */}
                    <div className="md:col-span-1">
                        <form onSubmit={handleCreate} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="font-bold text-[#002B7F] text-sm flex items-center gap-1.5">
                                <Plus className="w-4 h-4 text-[#0070F3]" /> Tambah Kategori Baru
                            </h3>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Kategori</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Penthouse"
                                    value={data.name}
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            name: e.target.value,
                                            slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                                        });
                                    }}
                                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Slug</label>
                                <input
                                    type="text"
                                    placeholder="penthouse"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-2.5 bg-[#FF8A00] hover:bg-[#e67a00] text-white font-bold text-xs rounded-xl shadow transition"
                            >
                                Tambahkan Kategori
                            </button>
                        </form>
                    </div>

                    {/* Category List */}
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase text-slate-500">
                                        <th className="p-4">Nama</th>
                                        <th className="p-4">Slug</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-xs">
                                    {categories.map((c) => (
                                        <tr key={c.id} className="hover:bg-slate-50">
                                            {editingId === c.id ? (
                                                <>
                                                    <td className="p-3">
                                                        <input type="text" value={editName}
                                                            onChange={(e) => { setEditName(e.target.value); setEditSlug(e.target.value.toLowerCase().replace(/\s+/g, '-')); }}
                                                            className="w-full text-xs px-2.5 py-1.5 border border-[#0070F3] rounded-lg" />
                                                    </td>
                                                    <td className="p-3">
                                                        <input type="text" value={editSlug}
                                                            onChange={(e) => setEditSlug(e.target.value)}
                                                            className="w-full text-xs px-2.5 py-1.5 border border-[#0070F3] rounded-lg font-mono" />
                                                    </td>
                                                    <td className="p-3">
                                                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-[#002B7F]">
                                                            {c.is_active ? 'Aktif' : 'Nonaktif'}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button onClick={() => submitEdit(c.id)}
                                                                className="px-3 py-1 bg-[#0070F3] hover:bg-[#005bb5] text-white font-bold rounded-lg text-xs">
                                                                Simpan
                                                            </button>
                                                            <button onClick={cancelEdit}
                                                                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg">
                                                                <X className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="p-4 font-bold text-slate-900">{c.name}</td>
                                                    <td className="p-4 font-mono text-slate-500">{c.slug}</td>
                                                    <td className="p-4">
                                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                                            c.is_active ? 'bg-blue-100 text-[#002B7F]' : 'bg-slate-100 text-slate-500'
                                                        }`}>
                                                            {c.is_active ? 'Aktif' : 'Nonaktif'}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button onClick={() => handleToggle(c.id)}
                                                                disabled={togglingId === c.id}
                                                                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs disabled:opacity-50 disabled:cursor-not-allowed">
                                                                {c.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                                                            </button>
                                                            <button onClick={() => startEdit(c)}
                                                                className="p-1.5 bg-blue-50 hover:bg-blue-100 text-[#0070F3] rounded-lg" title="Ubah">
                                                                <Pencil className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button onClick={() => handleDelete(c)}
                                                                className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg" title="Hapus">
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        </AdminLayout>
    );
}
