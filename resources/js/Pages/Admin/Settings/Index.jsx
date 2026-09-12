import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Wallet, Save, Landmark, Info, Crown, MessageCircle } from 'lucide-react';

const inputCls = 'w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-[#0070F3]';

export default function Index({ settings = {} }) {
    const { data, setData, put, processing, errors } = useForm({
        enabled: settings.enabled ?? true,
        amount: settings.amount ?? 0,
        bank_name: settings.bank_name || '',
        bank_account: settings.bank_account || '',
        bank_holder: settings.bank_holder || '',
        instructions: (settings.instructions || []).join('\n'),
        wa_confirmation: settings.wa_confirmation || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put('/admin/settings', { preserveScroll: true });
    };

    return (
        <AdminLayout title="Pengaturan Pembayaran">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#001F5C] to-[#002B7F] rounded-2xl p-5 sm:p-6 text-white border border-blue-900 shadow-sm">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF8A00] flex items-center justify-center shrink-0">
                        <Wallet className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-black flex items-center gap-2">
                            Pengaturan Pembayaran
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-black uppercase bg-[#FF8A00]">
                                <Crown className="w-2.5 h-2.5" /> Super Admin
                            </span>
                        </h1>
                        <p className="text-xs text-blue-200 mt-0.5">
                            Atur nominal biaya pengajuan iklan dan rekening tujuan transfer yang ditampilkan ke pengiklan.
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                        <div className="flex items-center gap-2 text-[#002B7F] font-bold border-b border-slate-100 pb-3">
                            <Landmark className="w-5 h-5 text-[#0070F3]" />
                            <h3 className="text-base text-slate-900">Rekening & Nominal</h3>
                        </div>

                        {/* Toggle */}
                        <label className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                            <div>
                                <p className="text-sm font-bold text-slate-800">Wajibkan Bukti Pembayaran</p>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Jika aktif, pengiklan wajib mengunggah bukti transfer sebelum iklan diajukan.
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={data.enabled}
                                onChange={(e) => setData('enabled', e.target.checked)}
                                className="w-5 h-5 rounded border-slate-300 text-[#0070F3] focus:ring-[#0070F3] shrink-0"
                            />
                        </label>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Nominal Biaya Pengajuan (Rp) *</label>
                            <input
                                type="number"
                                min="0"
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                                placeholder="50000"
                                className={inputCls}
                            />
                            {errors.amount && <p className="text-xs text-rose-600 mt-1">{errors.amount}</p>}
                            {Number(data.amount) > 0 && (
                                <p className="text-[11px] text-slate-500 mt-1">
                                    Tampil sebagai:{' '}
                                    <span className="font-bold text-[#002B7F]">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(data.amount))}
                                    </span>
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Bank / E-Wallet *</label>
                                <input
                                    type="text"
                                    value={data.bank_name}
                                    onChange={(e) => setData('bank_name', e.target.value)}
                                    placeholder="Bank Mandiri"
                                    className={inputCls}
                                />
                                {errors.bank_name && <p className="text-xs text-rose-600 mt-1">{errors.bank_name}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor Rekening *</label>
                                <input
                                    type="text"
                                    value={data.bank_account}
                                    onChange={(e) => setData('bank_account', e.target.value)}
                                    placeholder="1450-0099-8877-6"
                                    className={`${inputCls} font-mono`}
                                />
                                {errors.bank_account && <p className="text-xs text-rose-600 mt-1">{errors.bank_account}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Atas Nama Rekening *</label>
                            <input
                                type="text"
                                value={data.bank_holder}
                                onChange={(e) => setData('bank_holder', e.target.value)}
                                placeholder="TulungJual.id"
                                className={inputCls}
                            />
                            {errors.bank_holder && <p className="text-xs text-rose-600 mt-1">{errors.bank_holder}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor WhatsApp Konfirmasi</label>
                            <div className="relative">
                                <MessageCircle className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    value={data.wa_confirmation}
                                    onChange={(e) => setData('wa_confirmation', e.target.value)}
                                    placeholder="6285222111193"
                                    className={`${inputCls} pl-9`}
                                />
                            </div>
                            <p className="text-[11px] text-slate-500 mt-1">
                                Ditampilkan ke pengiklan untuk konfirmasi setelah mengunggah bukti transfer.
                            </p>
                            {errors.wa_confirmation && <p className="text-xs text-rose-600 mt-1">{errors.wa_confirmation}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Instruksi Pembayaran (satu baris satu poin)</label>
                            <textarea
                                rows={6}
                                value={data.instructions}
                                onChange={(e) => setData('instructions', e.target.value)}
                                placeholder={"Transfer sesuai nominal ke rekening resmi di atas.\nSimpan struk / screenshot bukti transfer."}
                                className={`${inputCls} font-mono leading-relaxed`}
                            />
                            <p className="text-[11px] text-slate-500 mt-1">
                                Setiap baris akan ditampilkan sebagai satu poin bernomor pada formulir pengiklan.
                            </p>
                            {errors.instructions && <p className="text-xs text-rose-600 mt-1">{errors.instructions}</p>}
                        </div>

                        <div className="pt-2 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF8A00] hover:bg-[#e67a00] text-white font-black text-xs rounded-xl shadow-md transition disabled:opacity-60"
                            >
                                <Save className="w-4 h-4" /> {processing ? 'Menyimpan...' : 'Simpan Pengaturan'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-slate-700 font-bold border-b border-slate-100 pb-3">
                            <Info className="w-4 h-4 text-[#0070F3]" />
                            <h3 className="text-sm">Pratinjau di Form Pengiklan</h3>
                        </div>

                        {data.enabled ? (
                            <div className="space-y-3">
                                <div className="bg-[#001F5C] text-white rounded-2xl p-4 space-y-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-[11px] text-blue-200">Nominal Wajib Transfer</span>
                                        <span className="text-base font-black text-[#FF8A00]">
                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(data.amount) || 0)}
                                        </span>
                                    </div>
                                    <div className="pt-2.5 border-t border-blue-900 space-y-2 text-[11px]">
                                        <div className="flex justify-between gap-2">
                                            <span className="text-blue-300">Bank</span>
                                            <span className="font-bold text-right">{data.bank_name || '-'}</span>
                                        </div>
                                        <div className="flex justify-between gap-2">
                                            <span className="text-blue-300">No. Rekening</span>
                                            <span className="font-bold font-mono text-right">{data.bank_account || '-'}</span>
                                        </div>
                                        <div className="flex justify-between gap-2">
                                            <span className="text-blue-300">Atas Nama</span>
                                            <span className="font-bold text-right">{data.bank_holder || '-'}</span>
                                        </div>
                                    </div>
                                </div>

                                {data.instructions?.trim() && (
                                    <ol className="space-y-1.5 text-[11px] text-slate-600 list-decimal list-inside bg-amber-50 border border-amber-200 rounded-2xl p-3.5">
                                        {data.instructions.split('\n').filter((l) => l.trim()).map((line, i) => (
                                            <li key={i}>{line}</li>
                                        ))}
                                    </ol>
                                )}
                            </div>
                        ) : (
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                                <p className="text-xs text-slate-500">
                                    Fitur bukti pembayaran <strong>nonaktif</strong>. Pengiklan dapat langsung mengajukan iklan tanpa upload bukti transfer.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
