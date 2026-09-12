import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';
import {
    LayoutDashboard,
    FileText,
    Users,
    Tag,
    LogOut,
    Globe,
    Menu,
    X,
    Clock,
    ChevronRight,
} from 'lucide-react';

const navItems = [
    {
        label: 'Overview',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
    },
    {
        label: 'Kelola Iklan',
        href: '/admin/listings',
        icon: FileText,
        badgeKey: 'pending',
    },
    {
        label: 'Kelola Pengguna',
        href: '/admin/users',
        icon: Users,
    },
    {
        label: 'Kategori Properti',
        href: '/admin/categories',
        icon: Tag,
    },
];

export default function AdminLayout({ children, title }) {
    const { auth, pendingCount = 0 } = usePage().props;
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    const isActive = (href) => {
        if (href === '/admin/dashboard') return currentPath === '/admin/dashboard';
        return currentPath.startsWith(href);
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="px-6 py-5 border-b border-white/10">
                <Link href="/admin/dashboard" className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-[#FF8A00] rounded-xl flex items-center justify-center shrink-0">
                        <LayoutDashboard className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <div className="text-white font-black text-sm leading-tight">TulungJual.id</div>
                        <div className="text-blue-300 text-[10px] font-semibold uppercase tracking-widest">Admin Panel</div>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold transition group ${
                                active
                                    ? 'bg-[#0070F3] text-white shadow-md'
                                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-blue-300 group-hover:text-white'}`} />
                                {item.label}
                            </div>
                            {item.badgeKey === 'pending' && pendingCount > 0 && (
                                <span className="text-[10px] font-black bg-[#FF8A00] text-white px-2 py-0.5 rounded-full min-w-[20px] text-center">
                                    {pendingCount}
                                </span>
                            )}
                            {active && <ChevronRight className="w-3.5 h-3.5 text-white/70" />}
                        </Link>
                    );
                })}

                <div className="pt-3 border-t border-white/10 mt-3">
                    <a
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold text-blue-200 hover:bg-white/10 hover:text-white transition"
                    >
                        <Globe className="w-4 h-4 text-blue-300" />
                        Lihat Situs Publik
                    </a>
                </div>
            </nav>

            {/* User Info & Logout */}
            <div className="px-3 py-4 border-t border-white/10 space-y-2">
                <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#0070F3] flex items-center justify-center text-white font-black text-sm shrink-0">
                            {user?.name?.[0]?.toUpperCase() || 'A'}
                        </div>
                        <div className="min-w-0">
                            <p className="text-white text-xs font-bold truncate">{user?.name || 'Admin'}</p>
                            <p className="text-blue-300 text-[10px] truncate">{user?.email || ''}</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold text-blue-200 hover:bg-rose-600/20 hover:text-rose-300 transition"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900 antialiased font-sans">
            {title && <Head title={`${title} — Admin TulungJual`} />}

            {/* Sidebar Desktop */}
            <aside className="hidden lg:flex lg:flex-col fixed inset-y-0 left-0 w-64 bg-[#001F5C] z-30">
                <SidebarContent />
            </aside>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Mobile Drawer */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-[#001F5C] z-50 lg:hidden flex flex-col transform transition-transform duration-200 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="absolute top-4 right-4">
                    <button onClick={() => setSidebarOpen(false)} className="text-blue-200 hover:text-white p-1">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64 flex flex-col min-h-screen">
                {/* Top Header Bar */}
                <header className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <span className="text-sm font-bold text-slate-800 hidden sm:block">{title || 'Admin Panel'}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        {pendingCount > 0 && (
                            <Link
                                href="/admin/listings?status=pending"
                                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl text-xs font-bold border border-amber-200 transition"
                            >
                                <Clock className="w-3.5 h-3.5 text-[#FF8A00]" />
                                {pendingCount} Pending
                            </Link>
                        )}
                        <div className="text-xs font-semibold text-slate-600 hidden sm:block">{user?.name}</div>
                        <div className="w-8 h-8 rounded-xl bg-[#0070F3] flex items-center justify-center text-white font-black text-sm">
                            {user?.name?.[0]?.toUpperCase() || 'A'}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                    <FlashMessage />
                    {children}
                </main>
            </div>
        </div>
    );
}
