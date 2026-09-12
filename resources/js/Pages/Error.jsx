import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { Home, Search, ArrowLeft, AlertTriangle, ShieldOff, ServerCrash } from 'lucide-react';

const ERROR_CONFIG = {
    404: {
        icon: Search,
        title: 'Halaman Tidak Ditemukan',
        message: 'Properti atau halaman yang Anda cari tidak ada, sudah dihapus, atau alamat URL-nya salah.',
        color: 'text-[#0070F3]',
        bg: 'bg-blue-50',
    },
    403: {
        icon: ShieldOff,
        title: 'Akses Ditolak',
        message: 'Anda tidak memiliki izin untuk mengakses halaman ini.',
        color: 'text-amber-500',
        bg: 'bg-amber-50',
    },
    500: {
        icon: ServerCrash,
        title: 'Kesalahan Server',
        message: 'Terjadi kesalahan pada server kami. Tim kami sedang menangani masalah ini.',
        color: 'text-rose-500',
        bg: 'bg-rose-50',
    },
    503: {
        icon: ServerCrash,
        title: 'Layanan Tidak Tersedia',
        message: 'Server sedang dalam pemeliharaan. Silakan coba beberapa saat lagi.',
        color: 'text-rose-500',
        bg: 'bg-rose-50',
    },
};

export default function Error({ status }) {
    const config = ERROR_CONFIG[status] || {
        icon: AlertTriangle,
        title: 'Terjadi Kesalahan',
        message: 'Terjadi kesalahan yang tidak terduga. Silakan kembali ke beranda.',
        color: 'text-slate-500',
        bg: 'bg-slate-50',
    };

    const IconComponent = config.icon;

    return (
        <AppLayout title={`${status} - ${config.title} | TulungJual.id`}>
            <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
                <div className="max-w-lg w-full text-center space-y-8">
                    {/* Icon & Status Code */}
                    <div className="space-y-4">
                        <div className={`w-24 h-24 ${config.bg} rounded-3xl flex items-center justify-center mx-auto`}>
                            <IconComponent className={`w-12 h-12 ${config.color}`} />
                        </div>
                        <div className="text-8xl font-black text-[#002B7F] opacity-10 -mt-4 leading-none select-none">
                            {status}
                        </div>
                    </div>

                    {/* Text */}
                    <div className="space-y-3 -mt-6">
                        <h1 className="text-2xl sm:text-3xl font-black text-[#002B7F]">
                            {config.title}
                        </h1>
                        <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                            {config.message}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#002B7F] hover:bg-[#001f5c] text-white font-bold rounded-2xl text-sm shadow transition"
                        >
                            <Home className="w-4 h-4" />
                            Ke Beranda
                        </Link>
                        <Link
                            href="/listing"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF8A00] hover:bg-[#e67a00] text-white font-bold rounded-2xl text-sm shadow transition"
                        >
                            <Search className="w-4 h-4" />
                            Cari Properti
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-sm transition"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                        </button>
                    </div>

                    {/* Branding */}
                    <p className="text-xs text-slate-400">
                        TulungJual.id — Marketplace Properti Terpercaya
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
