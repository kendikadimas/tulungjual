import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Phone, Mail, MapPin, Building2, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';

export default function About() {
    return (
        <AppLayout title="Tentang Kami & Kontak - TulungJual.id">
            {/* Header */}
            <div className="bg-[#002B7F] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-blue-900">
                <div className="max-w-4xl mx-auto text-center space-y-3">
                    <span className="px-3.5 py-1 bg-[#FF8A00] text-white rounded-full text-xs font-bold inline-block">
                        Profil & Layanan Bantuan
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black">Tentang TulungJual.id</h1>
                    <p className="text-blue-100 text-sm max-w-xl mx-auto">
                        "Marketplace properti yang membantu orang menemukan properti dengan lebih percaya diri."
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
                {/* About Content */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
                    <div className="max-w-3xl space-y-4">
                        <h2 className="text-2xl font-bold text-[#002B7F]">Tentang Platform Kami</h2>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            <strong>TulungJual.id</strong> hadir sebagai solusi marketplace properti modern di Indonesia yang menghubungkan pemilik rumah/tanah, agen properti profesional, developer perumahan, investor, dan pencari properti dalam satu platform terpadu.
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Kami berfokus pada transparansi spesifikasi, keamanan privasi data legalitas, serta kemudahan komunikasi langsung tanpa hambatan perantara yang tersembunyi.
                        </p>
                    </div>

                    {/* Visi Misi */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div className="p-6 bg-blue-50/40 rounded-2xl border border-blue-100 space-y-2">
                            <h3 className="text-base font-bold text-[#002B7F] flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-[#0070F3]" />
                                Visi Utama
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Menjadi platform pencarian dan pemasaran properti nomor satu yang paling tepercaya, efisien, dan transparan bagi seluruh lapisan masyarakat.
                            </p>
                        </div>
                        <div className="p-6 bg-blue-50/40 rounded-2xl border border-blue-100 space-y-2">
                            <h3 className="text-base font-bold text-[#002B7F] flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-[#0070F3]" />
                                Komitmen Privasi
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Menjaga kerahasiaan dokumen sertifikat dan identitas pemegang hak asli di tingkat database sehingga Pengiklan dapat memasang iklan dengan tenang.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div id="kontak" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
                    <h2 className="text-2xl font-bold text-[#002B7F] border-b border-slate-100 pb-4">
                        Hubungi Tim Kami
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <p className="text-sm text-slate-600">
                                Memiliki pertanyaan mengenai cara pemasangan iklan, kemitraan developer, atau ingin menyampaikan keluhan layanan? Hubungi kami langsung:
                            </p>

                            <div className="space-y-3">
                                <a 
                                    href="https://wa.me/6285222111193"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3.5 p-4 rounded-2xl bg-blue-50 border border-blue-200 text-[#002B7F] hover:bg-blue-100 transition"
                                >
                                    <div className="w-10 h-10 bg-[#0070F3] text-white rounded-xl flex items-center justify-center font-bold">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-[#0070F3] font-semibold">WhatsApp Layanan CS</div>
                                        <div className="text-base font-bold">085222111193</div>
                                    </div>
                                </a>

                                <a 
                                    href="mailto:tulungjual@gmail.com"
                                    className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 hover:bg-slate-100 transition"
                                >
                                    <div className="w-10 h-10 bg-[#002B7F] text-white rounded-xl flex items-center justify-center font-bold">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 font-semibold">Email Pengaduan & Informasi</div>
                                        <div className="text-base font-bold">tulungjual@gmail.com</div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="p-6 bg-[#001F5C] text-white rounded-2xl border border-blue-900 space-y-4">
                            <h3 className="text-lg font-bold text-[#FF8A00] flex items-center gap-2">
                                <MessageSquare className="w-5 h-5" />
                                Jam Operasional Layanan
                            </h3>
                            <div className="space-y-2 text-xs text-slate-300">
                                <div className="flex justify-between border-b border-blue-900 pb-2">
                                    <span>Senin - Jumat:</span>
                                    <span className="font-semibold text-white">08.00 - 17.00 WIB</span>
                                </div>
                                <div className="flex justify-between border-b border-blue-900 pb-2">
                                    <span>Sabtu:</span>
                                    <span className="font-semibold text-white">08.00 - 15.00 WIB</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Minggu / Hari Libur:</span>
                                    <span className="font-semibold text-[#FF8A00]">Respon via WhatsApp</span>
                                </div>
                            </div>
                            <p className="text-[11px] text-blue-200/80 pt-2 leading-relaxed">
                                Pesan yang dikirim di luar jam kerja akan direspon pada jam operasional berikutnya.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
