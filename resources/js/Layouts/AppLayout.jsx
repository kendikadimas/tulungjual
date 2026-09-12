import React from 'react';
import PublicNavbar from '@/Components/PublicNavbar';
import PublicFooter from '@/Components/PublicFooter';
import { Head } from '@inertiajs/react';

export default function AppLayout({ children, title }) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-[#0070F3] selection:text-white font-sans antialiased">
            {title && <Head title={title} />}
            <PublicNavbar />
            <main className="flex-1">
                {children}
            </main>
            <PublicFooter />
        </div>
    );
}
