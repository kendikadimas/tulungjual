import React from 'react';
import { Link } from '@inertiajs/react';
import TulungJualLogo from '@/Components/TulungJualLogo';
import { Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export default function PublicFooter() {
    return (
        <footer className="bg-[#001D56] text-slate-300 pt-16 pb-12 border-t border-[#002B7F]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-blue-900/60">
                    {/* Brand & Info */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white/95 p-3 rounded-2xl inline-block shadow-md">
                            <TulungJualLogo showTagline={true} />
                        </div>
                        <p className="text-sm text-blue-100/80 leading-relaxed max-w-sm pt-2">
                            "Marketplace properti yang membantu orang menemukan properti dengan lebih percaya diri."
                        </p>
                        <div className="space-y-2.5 pt-2">
                            <a 
                                href="https://wa.me/6285222111193" 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center gap-2.5 text-sm text-slate-200 hover:text-[#FF8A00] transition"
                            >
                                <Phone className="w-4 h-4 text-[#FF8A00]" />
                                <span>WA: 085222111193</span>
                            </a>
                            <a 
                                href="mailto:tulungjual@gmail.com" 
                                className="flex items-center gap-2.5 text-sm text-slate-200 hover:text-[#FF8A00] transition"
                            >
                                <Mail className="w-4 h-4 text-[#FF8A00]" />
                                <span>tulungjual@gmail.com</span>
                            </a>
                            <div className="flex items-center gap-2.5 text-sm text-slate-400">
                                <MapPin className="w-4 h-4 text-[#0070F3]" />
                                <span>Indonesia</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-[#FF8A00]">
                            Jelajah Properti
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link href="/listing?jenis_properti=Rumah" className="hover:text-blue-300 transition">Rumah Dijual</Link></li>
                            <li><Link href="/listing?jenis_properti=Tanah" className="hover:text-blue-300 transition">Tanah Kavling</Link></li>
                            <li><Link href="/listing?jenis_properti=Ruko" className="hover:text-blue-300 transition">Ruko & Komersial</Link></li>
                            <li><Link href="/listing?jenis_properti=Cluster" className="hover:text-blue-300 transition">Cluster Perumahan</Link></li>
                            <li><Link href="/listing?jenis_properti=Apartemen" className="hover:text-blue-300 transition">Apartemen & Kost</Link></li>
                        </ul>
                    </div>

                    {/* Legal & Info */}
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-[#FF8A00]">
                            Informasi & Bantuan
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link href="/syarat-ketentuan" className="hover:text-blue-300 transition">Syarat & Ketentuan</Link></li>
                            <li><Link href="/tentang-kontak" className="hover:text-blue-300 transition">Tentang TulungJual</Link></li>
                            <li><Link href="/tentang-kontak#kontak" className="hover:text-blue-300 transition">Hubungi Kami</Link></li>
                            <li><a href="https://wa.me/6285222111193?text=Halo%20Admin%20TulungJual,%20saya%20butuh%20bantuan" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition">Pusat Bantuan WA</a></li>
                        </ul>
                    </div>

                    {/* Pasang Iklan CTA */}
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-[#FF8A00]">
                            Untuk Pengiklan
                        </h4>
                        <p className="text-xs text-blue-100/70 mb-4 leading-relaxed">
                            Jangkau ribuan calon pembeli dan penyewa potensial tanpa biaya tersembunyi.
                        </p>
                        <Link 
                            href="/pasang-iklan" 
                            className="inline-flex items-center justify-center w-full px-4 py-3 rounded-xl bg-[#FF8A00] hover:bg-[#e67a00] text-white font-bold text-sm transition shadow-lg shadow-orange-950"
                        >
                            Pasang Iklan Gratis
                        </Link>
                    </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-blue-200/60">
                    <p>© {new Date().getFullYear()} TulungJual.id. Seluruh hak cipta dilindungi undang-undang.</p>
                    <div className="flex items-center gap-2 text-blue-200">
                        <ShieldCheck className="w-4 h-4 text-[#FF8A00]" />
                        Marketplace Properti — Temukan Properti yang Tepat.
                    </div>
                </div>
            </div>
        </footer>
    );
}
