import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export default function Terms() {
    const termSections = [
        {
            no: "1",
            title: "Ketentuan Umum Platform",
            content: "TulungJual.id adalah marketplace properti terintegrasi yang berfungsi sebagai platform media penghubung antara Pengiklan (Pemilik, Agen, Developer, Investor) dan Pencari Properti. TulungJual.id bukan merupakan agen properti perantara yang mengambil komisi transaksi fisik."
        },
        {
            no: "2",
            title: "Persyaratan Akun & Registrasi",
            content: "Setiap Pengguna yang mendaftar wajib mengisi Nama, Nomor WhatsApp/HP aktif, dan Email. Registrasi bersifat langsung aktif tanpa kerumitan OTP/verifikasi email, namun pengguna bertanggung jawab penuh atas kerahasiaan kredensial akun."
        },
        {
            no: "3",
            title: "Pemasangan Iklan Properti",
            content: "Pengiklan dapat memasang iklan secara gratis dengan mengisi formulir terpadu. Semua data yang diinput wajib akurat, sah, dan tidak menyesatkan calon pembeli."
        },
        {
            no: "4",
            title: "Hak & Kewenangan Atas Properti",
            content: "Pengiklan menyatakan dan menjamin secara hukum bahwa mereka memiliki hak milik sah, surat kuasa jual/sewa resmi, atau wewenang legal atas properti yang diiklankan di platform TulungJual.id."
        },
        {
            no: "5",
            title: "Perlindungan & Privasi Data Legalitas",
            content: "Data sensitif seperti Nomor Sertifikat dan Nama Pemegang Hak yang diisi pada formulir legalitas dilindungi dan disimpan aman dalam database. Data ini TIDAK AKAN PERNAH dirender di halaman publik maupun endpoint API terbuka, dan hanya dapat ditinjau oleh Admin TulungJual.id untuk kepentingan peninjauan."
        },
        {
            no: "6",
            title: "Privasi Kontak & Nomor Telepon",
            content: "Pengiklan memiliki kontrol penuh melalui pilihan opsi privasi untuk menampilkan atau menyembunyikan nomor telepon pribadi pada tampilan publik iklan."
        },
        {
            no: "7",
            title: "Tanggung Jawab Konten Iklan",
            content: "Seluruh konten berupa judul, deskripsi, harga, spesifikasi fisik, foto, dan link video yang diunggah sepenuhnya menjadi tanggung jawab Pengiklan. TulungJual.id dibebaskan dari tuntutan hukum atas kesalahan atau pemalsuan data oleh Pengiklan."
        },
        {
            no: "8",
            title: "Proses Moderasi & Approval Admin",
            content: "Admin TulungJual.id berhak melakukan peninjauan (review), menyetujui (approve), meminta perbaikan, atau menolak (reject) iklan yang dinilai melanggar ketentuan atau tidak sesuai standar kualitas data."
        },
        {
            no: "9",
            title: "Ketentuan Upload Foto Properti",
            content: "Foto yang diunggah wajib berjumlah minimal 5 (lima) foto berkualitas jelas, asli, tidak mengandung watermark merek competitor lain, serta tidak mengandung unsur pornografi/SARA/kekerasan."
        },
        {
            no: "10",
            title: "Ketentuan Media Video",
            content: "Sistem tidak menyimpan file video langsung untuk efisiensi. Pengiklan hanya diperbolehkan menyertakan link embed video walkthrough, lingkungan, atau drone dari layanan pihak ketiga seperti YouTube atau Google Drive."
        },
        {
            no: "11",
            title: "Ketentuan Pengiklan Khusus Developer",
            content: "Pengiklan kategori Developer wajib menyertakan detail proyek perumahan secara transparan meliputi sisa unit, estimasi serah terima, pilihan KPR bank partner, serta site plan/brosur yang valid."
        },
        {
            no: "12",
            title: "Ketersediaan & Pembaruan Status Properti",
            content: "Pengiklan berkewajiban untuk segera memperbarui status ketersediaan properti (Tersedia, Booking, Terjual, atau Tersewa) melalui dashboard pribadi jika terjadi perubahan transaksi."
        },
        {
            no: "13",
            title: "Mekanisme Laporan Iklan Bermasalah",
            content: "Pengguna publik yang menemukan kejanggalan atau penipuan iklan dapat menggunakan tombol 'Laporkan Iklan'. Laporan akan diarahkan secara otomatis ke WhatsApp CS Admin (085222111193) dengan pesan pre-filled link properti untuk ditindaklanjuti."
        },
        {
            no: "14",
            title: "Layanan Gratis & Bebas Komisi",
            content: "Penggunaan platform TulungJual.id saat ini bersifat gratis. TulungJual.id tidak memotong komisi transaksi hasil kesepakatan antara Pembeli/Penyewa dan Pengiklan."
        },
        {
            no: "15",
            title: "Penolakan Jaminan (Disclaimer)",
            content: "TulungJual.id menyediakan platform sebagaimana adanya (as-is) dan tidak menjamin bahwa properti yang diiklankan pasti akan terjual/tersewa dalam jangka waktu tertentu."
        },
        {
            no: "16",
            title: "Batasan Tanggung Jawab Hukum",
            content: "TulungJual.id tidak bertanggung jawab atas segala bentuk kerugian materiil maupun non-materiil yang timbul akibat transaksi langsung antar pengguna di luar kontrol sistem platform."
        },
        {
            no: "17",
            title: "Penonaktifan & Penghapusan Akun",
            content: "TulungJual.id berhak membekukan atau menghapus akun pengguna yang secara sengaja melakukan spamming, penipuan, pemalsuan sertifikat, atau tindakan merugikan pihak lain."
        },
        {
            no: "18",
            title: "Perubahan Syarat & Ketentuan",
            content: "TulungJual.id berhak memperbarui dokumen Syarat & Ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya. Pengguna disarankan untuk memeriksa halaman ini secara berkala."
        },
        {
            no: "19",
            title: "Hukum yang Berlaku & Kontak Pengaduan",
            content: "Syarat & Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Republik Indonesia. Pertanyaan dan kendala layanan dapat disampaikan melalui WhatsApp CS di 085222111193 atau Email tulungjual@gmail.com."
        }
    ];

    return (
        <AppLayout title="Syarat & Ketentuan - TulungJual.id">
            <div className="bg-[#002B7F] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-blue-900">
                <div className="max-w-4xl mx-auto text-center space-y-3">
                    <span className="px-3.5 py-1 bg-[#FF8A00] text-white rounded-full text-xs font-bold inline-block">
                        Dokumen Legalitas & Aturan Penggunaan
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black">Syarat & Ketentuan Layanan</h1>
                    <p className="text-blue-100 text-sm max-w-xl mx-auto">
                        Harap membaca 19 poin ketentuan di bawah ini sebelum menggunakan platform TulungJual.id.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
                    <div className="border-b border-slate-100 pb-4">
                        <h2 className="text-xl font-bold text-[#002B7F] flex items-center gap-2">
                            <ShieldCheck className="w-6 h-6 text-[#0070F3]" />
                            Ringkasan Aturan Penggunaan Platform
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                            Terakhir Diperbarui: 6 September 2026 • Versi 1.0 (Fase 1 Release)
                        </p>
                    </div>

                    <div className="space-y-6">
                        {termSections.map((item) => (
                            <div key={item.no} className="p-5 rounded-2xl bg-blue-50/30 border border-blue-100 space-y-2">
                                <div className="flex items-center gap-3">
                                    <span className="w-7 h-7 rounded-full bg-[#0070F3] text-white text-xs font-black flex items-center justify-center shrink-0">
                                        {item.no}
                                    </span>
                                    <h3 className="text-base font-bold text-[#002B7F]">
                                        {item.title}
                                    </h3>
                                </div>
                                <p className="text-xs text-slate-700 leading-relaxed pl-10">
                                    {item.content}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
                        Membutuhkan bantuan atau klarifikasi seputar aturan pengiklanan? <br />
                        Hubungi Layanan Pengaduan Resmi: <a href="https://wa.me/6285222111193" target="_blank" rel="noreferrer" className="text-[#0070F3] font-bold hover:underline">WhatsApp 085222111193</a> | Email: <a href="mailto:tulungjual@gmail.com" className="text-[#0070F3] font-bold hover:underline">tulungjual@gmail.com</a>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
