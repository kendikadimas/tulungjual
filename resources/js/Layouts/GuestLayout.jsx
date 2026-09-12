import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#F0F4FF] pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/" className="flex flex-col items-center gap-1 group">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-[#002B7F] flex items-center justify-center shadow">
                            <span className="text-white font-black text-lg leading-none">T</span>
                        </div>
                        <span className="text-2xl font-black text-[#002B7F] tracking-tight">
                            Tulung<span className="text-[#FF8A00]">Jual</span>
                            <span className="text-[#0070F3]">.id</span>
                        </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">Marketplace Properti Tulungagung</span>
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-6 shadow-md border border-slate-200 sm:max-w-md sm:rounded-2xl">
                {children}
            </div>

            <p className="mt-6 text-xs text-slate-400">
                &copy; {new Date().getFullYear()} TulungJual.id &mdash; Semua hak dilindungi
            </p>
        </div>
    );
}
