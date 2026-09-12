import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import TulungJualLogo from '@/Components/TulungJualLogo';
import { 
    Home, 
    Search, 
    PlusCircle, 
    Phone, 
    Mail, 
    Menu, 
    X,
    LayoutDashboard,
    LogOut
} from 'lucide-react';

export default function PublicNavbar() {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
            {/* Top Bar Info (Biru Tua) */}
            <div className="bg-[#002B7F] text-white text-xs py-1.5 px-4 hidden sm:block">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <span className="flex items-center gap-1.5 font-medium">
                            <Phone className="w-3.5 h-3.5 text-[#FF8A00]" /> WA: 085222111193
                        </span>
                        <span className="flex items-center gap-1.5 font-medium">
                            <Mail className="w-3.5 h-3.5 text-[#FF8A00]" /> Email: tulungjual@gmail.com
                        </span>
                    </div>
                    <div className="text-blue-200 font-medium">
                        Marketplace Properti — Temukan Properti yang Tepat
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Brand Logo Resmi */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="group">
                            <TulungJualLogo showTagline={false} />
                        </Link>

                        <nav className="hidden md:flex items-center space-x-1 pl-4 border-l border-slate-200">
                            <Link 
                                href="/" 
                                className="px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#0070F3] hover:bg-slate-50 transition"
                            >
                                Beranda
                            </Link>
                            <Link 
                                href="/listing" 
                                className="px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#0070F3] hover:bg-slate-50 transition"
                            >
                                Cari Properti
                            </Link>
                            <Link 
                                href="/syarat-ketentuan" 
                                className="px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#0070F3] hover:bg-slate-50 transition"
                            >
                                S&K
                            </Link>
                            <Link 
                                href="/tentang-kontak" 
                                className="px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#0070F3] hover:bg-slate-50 transition"
                            >
                                Tentang Kami
                            </Link>
                        </nav>
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href={auth.user ? "/pasang-iklan" : "/login"}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0070F3] hover:bg-[#005bb5] text-white text-sm font-bold shadow-md shadow-blue-200 transition"
                        >
                            <PlusCircle className="w-4 h-4 text-[#FF8A00]" />
                            Pasang Iklan
                        </Link>

                        {auth.user ? (
                            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                                <Link
                                    href={auth.user.role === 'admin' ? '/admin/dashboard' : '/iklan-saya'}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-[#002B7F] bg-blue-50 hover:bg-blue-100 transition"
                                >
                                    <LayoutDashboard className="w-4 h-4 text-[#0070F3]" />
                                    {auth.user.role === 'admin' ? 'Admin Panel' : 'Iklan Saya'}
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50"
                                    title="Keluar"
                                >
                                    <LogOut className="w-4 h-4" />
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-bold text-[#002B7F] hover:bg-blue-50 rounded-xl transition"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 text-sm font-bold text-white bg-[#FF8A00] hover:bg-[#e67a00] rounded-xl shadow-md shadow-orange-100 transition"
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
                    <Link
                        href="/"
                        className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Beranda
                    </Link>
                    <Link
                        href="/listing"
                        className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Cari Properti
                    </Link>
                    <Link
                        href="/syarat-ketentuan"
                        className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Syarat & Ketentuan
                    </Link>
                    <Link
                        href="/tentang-kontak"
                        className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Tentang & Kontak
                    </Link>
                    <div className="pt-3 border-t border-slate-200 space-y-2">
                        <Link
                            href={auth.user ? "/pasang-iklan" : "/login"}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#0070F3] text-white rounded-xl font-bold"
                        >
                            <PlusCircle className="w-4 h-4 text-[#FF8A00]" />
                            Pasang Iklan Sekarang
                        </Link>
                        {auth.user ? (
                            <Link
                                href={auth.user.role === 'admin' ? '/admin/dashboard' : '/iklan-saya'}
                                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 text-[#002B7F] rounded-xl font-bold"
                            >
                                Dashboard ({auth.user.name})
                            </Link>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                <Link
                                    href="/login"
                                    className="py-2.5 text-center border border-slate-300 rounded-xl text-[#002B7F] font-bold"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/register"
                                    className="py-2.5 text-center bg-[#FF8A00] text-white font-bold rounded-xl"
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
