import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, useForm, router } from '@inertiajs/react';
import { 
    ArrowLeft, 
    CheckCircle2, 
    XCircle, 
    ShieldCheck, 
    Building2, 
    AlertTriangle,
    Clock,
    FileText,
    Video,
    Wallet,
    ExternalLink,
    Image as ImageIcon
} from 'lucide-react';

export default function Show({ listing }) {
    const [rejectModalOpen, setRejectModalOpen] = React.useState(false);
    const [rejectPaymentOpen, setRejectPaymentOpen] = React.useState(false);

    const approveForm = useForm({});
    const rejectForm = useForm({
        catatan_rejection: '',
    });
    const verifyPaymentForm = useForm({ payment_note: '' });
    const rejectPaymentForm = useForm({ payment_note: '' });

    const handleApprove = () => {
        if (!paymentVerified) {
            alert('Verifikasi bukti pembayaran terlebih dahulu sebelum menyetujui iklan.');
            return;
        }
        if (confirm('Setujui iklan ini agar langsung tayang di listing publik?')) {
            approveForm.post(`/admin/listings/${listing.id}/approve`);
        }
    };

    const handleRejectSubmit = (e) => {
        e.preventDefault();
        rejectForm.post(`/admin/listings/${listing.id}/reject`, {
            onSuccess: () => setRejectModalOpen(false),
        });
    };

    const handleVerifyPayment = () => {
        if (confirm('Verifikasi bukti pembayaran ini sebagai valid?')) {
            verifyPaymentForm.post(`/admin/listings/${listing.id}/verify-payment`, { preserveScroll: true });
        }
    };

    const handleRejectPaymentSubmit = (e) => {
        e.preventDefault();
        rejectPaymentForm.post(`/admin/listings/${listing.id}/reject-payment`, {
            preserveScroll: true,
            onSuccess: () => setRejectPaymentOpen(false),
        });
    };

    const formatRupiah = (val) => {
        if (!val) return 'Rp 0';
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
    };

    const pengiklan = listing.pengiklan_info || {};
    const dev = listing.developer_detail || {};
    const photos = listing.photos || [];
    const videos = listing.videos || [];
    const paymentVerified = listing.payment_status === 'verified';

    return (
        <AdminLayout title={`Audit Iklan #${listing.id}`}>
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <Link href="/admin/listings" className="text-xs text-[#0070F3] hover:underline flex items-center gap-1 mb-1 font-bold">
                        <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Daftar Iklan
                    </Link>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <h2 className="text-lg font-black text-slate-900">Audit & Moderasi Iklan #{listing.id}</h2>
                        {listing.status_approval === 'approved' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-[#002B7F]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#0070F3]" /> Approved
                            </span>
                        )}
                        {listing.status_approval === 'pending' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                                <Clock className="w-3.5 h-3.5 text-amber-600" /> Pending
                            </span>
                        )}
                        {listing.status_approval === 'rejected' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800">
                                <XCircle className="w-3.5 h-3.5" /> Rejected
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate max-w-lg">{listing.judul}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <button
                        onClick={() => {
                            if (confirm('Hapus iklan ini secara permanen dari sistem?')) {
                                router.delete(`/admin/listings/${listing.id}`);
                            }
                        }}
                        className="px-4 py-2 bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-600 font-bold text-xs rounded-xl transition"
                    >
                        Hapus
                    </button>
                    {listing.status_approval !== 'rejected' && (
                        <button
                            onClick={() => setRejectModalOpen(true)}
                            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                        >
                            <XCircle className="w-4 h-4" /> Tolak
                        </button>
                    )}
                    {listing.status_approval !== 'approved' && (
                        <button
                            onClick={handleApprove}
                            disabled={approveForm.processing || !paymentVerified}
                            title={!paymentVerified ? 'Verifikasi pembayaran terlebih dahulu' : 'Setujui iklan'}
                            className={`px-5 py-2 font-black text-xs rounded-xl transition flex items-center gap-1.5 shadow ${
                                paymentVerified
                                    ? 'bg-[#FF8A00] hover:bg-[#e67a00] text-white'
                                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                            }`}
                        >
                            <CheckCircle2 className="w-4 h-4" /> Setujui & Tayangkan
                        </button>
                    )}
                </div>
            </div>

            {/* PAYMENT AUDIT BOX */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#0070F3] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                        <Wallet className="w-6 h-6 text-[#0070F3]" />
                        <h3 className="text-lg font-black text-[#002B7F]">Verifikasi Bukti Pembayaran</h3>
                    </div>
                    {listing.payment_status === 'verified' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi
                        </span>
                    )}
                    {listing.payment_status === 'pending' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            <Clock className="w-3.5 h-3.5" /> Menunggu Verifikasi
                        </span>
                    )}
                    {listing.payment_status === 'rejected' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                            <XCircle className="w-3.5 h-3.5" /> Ditolak
                        </span>
                    )}
                    {(listing.payment_status === 'unpaid' || !listing.payment_status) && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                            Belum Bayar
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div><span className="text-slate-400 block">Nominal Tagihan:</span> <span className="font-bold text-slate-800">{listing.payment_amount ? formatRupiah(listing.payment_amount) : '-'}</span></div>
                    <div><span className="text-slate-400 block">Nama Pengirim:</span> <span className="font-bold text-slate-800">{listing.payment_sender_name || '-'}</span></div>
                    <div><span className="text-slate-400 block">Metode Pengirim:</span> <span className="font-bold text-slate-800">{listing.payment_method || '-'}</span></div>
                    <div><span className="text-slate-400 block">Diverifikasi Pada:</span> <span className="font-bold text-slate-800">{listing.payment_verified_at ? new Date(listing.payment_verified_at).toLocaleString('id-ID') : '-'}</span></div>
                </div>

                {listing.payment_note && (
                    <div className={`text-xs p-3.5 rounded-2xl border ${listing.payment_status === 'verified' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'}`}>
                        <span className="font-bold block mb-0.5">Catatan Verifikasi:</span>
                        {listing.payment_note}
                    </div>
                )}

                {listing.payment_proof_url ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                            {/\.pdf($|\?)/i.test(listing.payment_proof_url) ? (
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
                                    <FileText className="w-8 h-8 text-[#0070F3] mx-auto" />
                                    <p className="text-xs text-slate-600 font-semibold">Bukti pembayaran berupa dokumen PDF</p>
                                    <a href={listing.payment_proof_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0070F3] hover:bg-[#005bb5] text-white rounded-xl text-xs font-bold transition">
                                        <ExternalLink className="w-3.5 h-3.5" /> Buka Dokumen
                                    </a>
                                </div>
                            ) : (
                                <a href={listing.payment_proof_url} target="_blank" rel="noreferrer" className="block rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 group relative">
                                    <img src={listing.payment_proof_url} alt="Bukti pembayaran" className="w-full max-h-80 object-contain" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                                        <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-bold bg-black/60 px-3 py-1.5 rounded-lg transition">
                                            Klik untuk perbesar
                                        </span>
                                    </div>
                                </a>
                            )}
                        </div>

                        <div className="space-y-2">
                            <button
                                onClick={handleVerifyPayment}
                                disabled={verifyPaymentForm.processing || listing.payment_status === 'verified'}
                                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <CheckCircle2 className="w-3.5 h-3.5" /> Verifikasi Pembayaran
                            </button>
                            <button
                                onClick={() => setRejectPaymentOpen(true)}
                                disabled={listing.payment_status === 'rejected' || !listing.payment_proof_url}
                                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <XCircle className="w-3.5 h-3.5" /> Tolak Bukti
                            </button>
                            <p className="text-[11px] text-slate-500 leading-relaxed">
                                Iklan hanya dapat disetujui setelah bukti pembayaran diverifikasi.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl text-center">
                        <AlertTriangle className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                        <p className="text-xs font-bold text-amber-800">Pengiklan belum mengunggah bukti pembayaran</p>
                        <p className="text-[11px] text-amber-600 mt-1">Iklan tidak dapat disetujui sebelum pembayaran diverifikasi.</p>
                    </div>
                )}
            </div>

            {/* SENSITIVE LEGAL AUDIT BOX */}
                <div className="bg-slate-900 text-amber-100 p-6 sm:p-8 rounded-3xl border-2 border-[#FF8A00] shadow-md space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-6 h-6 text-[#FF8A00]" />
                            <h3 className="text-lg font-black text-[#FF8A00]">
                                DATA LEGALITAS SENSITIF (KHUSUS REVIEW ADMIN)
                            </h3>
                        </div>
                        <span className="text-xs bg-[#FF8A00] text-slate-950 font-black px-3 py-1 rounded-full">
                            AUDIT KEABSAHAN
                        </span>
                    </div>

                    <p className="text-xs text-slate-300">
                        Field di bawah ini disembunyikan secara permanen dari publik dan API umum demi keamanan pemilik properti:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm bg-black/40 p-4 rounded-2xl border border-slate-800">
                        <div>
                            <span className="text-xs text-[#FF8A00] block font-semibold">Nomor Sertifikat:</span>
                            <span className="font-mono text-white text-base font-bold">
                                {listing.nomor_sertifikat || 'Belum diisi / Tidak dicantumkan'}
                            </span>
                        </div>
                        <div>
                            <span className="text-xs text-[#FF8A00] block font-semibold">Nama Pemegang Hak:</span>
                            <span className="font-mono text-white text-base font-bold">
                                {listing.nama_pemegang_hak || 'Belum diisi / Tidak dicantumkan'}
                            </span>
                        </div>
                        <div>
                            <span className="text-xs text-[#FF8A00] block font-semibold">Status Sertifikat:</span>
                            <span className="text-white font-bold">{listing.status_sertifikat}</span>
                        </div>
                        <div>
                            <span className="text-xs text-[#FF8A00] block font-semibold">Luas di Sertifikat:</span>
                            <span className="text-white font-bold">{listing.luas_sertifikat ? `${listing.luas_sertifikat} m²` : '-'}</span>
                        </div>
                        <div>
                            <span className="text-xs text-[#FF8A00] block font-semibold">Status Sengketa:</span>
                            <span className={`font-bold ${listing.status_sengketa && listing.status_sengketa.toLowerCase().includes('tidak') ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {listing.status_sengketa || '-'}
                            </span>
                        </div>
                        <div>
                            <span className="text-xs text-[#FF8A00] block font-semibold">Status PBG / IMB:</span>
                            <span className="text-white font-bold">{listing.status_pbg_imb || '-'}</span>
                        </div>
                        <div>
                            <span className="text-xs text-[#FF8A00] block font-semibold">Status PBB:</span>
                            <span className="text-white font-bold">{listing.status_pbb || '-'}</span>
                        </div>
                        <div>
                            <span className="text-xs text-[#FF8A00] block font-semibold">Tahun PBB:</span>
                            <span className="text-white font-bold">{listing.tahun_pbb || '-'}</span>
                        </div>
                        <div>
                            <span className="text-xs text-[#FF8A00] block font-semibold">NJOP:</span>
                            <span className="text-white font-bold">{listing.njop ? formatRupiah(listing.njop) : '-'}</span>
                        </div>
                    </div>
                </div>

                {/* Listing Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Info */}
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <div className="flex items-center gap-2 font-bold text-slate-900 border-b border-slate-100 pb-3">
                                <Building2 className="w-5 h-5 text-[#0070F3]" />
                                <h3>Informasi Iklan & Lokasi</h3>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">{listing.judul}</h2>
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#002B7F] text-xs font-bold">
                                        {listing.jenis_iklan}
                                    </span>
                                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold">
                                        {listing.jenis_properti}
                                    </span>
                                    <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs font-bold">
                                        Status: {listing.status_transaksi}
                                    </span>
                                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${listing.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                                        {listing.is_active ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                </div>
                                <p className="text-sm font-bold text-[#002B7F] mt-3">{formatRupiah(listing.harga)}</p>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-slate-600">
                                    <span>Jenis Harga: <span className="font-semibold text-slate-800">{listing.jenis_harga || '-'}</span></span>
                                    <span>{listing.bisa_nego ? 'Bisa Nego' : 'Harga Pas'}</span>
                                    {listing.harga_promo && <span className="text-rose-600 font-semibold">Promo: {formatRupiah(listing.harga_promo)}</span>}
                                    {listing.metode_pembayaran && <span>Pembayaran: <span className="font-semibold text-slate-800">{listing.metode_pembayaran}</span></span>}
                                    {listing.booking_fee && <span>Booking Fee: <span className="font-semibold text-slate-800">{formatRupiah(listing.booking_fee)}</span></span>}
                                </div>
                            </div>

                            {/* Lokasi */}
                            <div className="pt-3 border-t border-slate-100">
                                <h4 className="text-xs font-bold text-slate-700 mb-2">Lokasi</h4>
                                <p className="text-xs text-slate-600 mb-3">{listing.alamat_lengkap} ({listing.kelurahan}, {listing.kecamatan}, {listing.kota}, {listing.provinsi})</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs">
                                    <div><span className="text-slate-400 block">Provinsi:</span> <span className="font-semibold text-slate-800">{listing.provinsi || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Kota / Kabupaten:</span> <span className="font-semibold text-slate-800">{listing.kota || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Kecamatan:</span> <span className="font-semibold text-slate-800">{listing.kecamatan || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Kelurahan / Desa:</span> <span className="font-semibold text-slate-800">{listing.kelurahan || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Kode Pos:</span> <span className="font-semibold text-slate-800">{listing.kode_pos || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Nama Jalan / Blok:</span> <span className="font-semibold text-slate-800">{listing.nama_jalan || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Nomor:</span> <span className="font-semibold text-slate-800">{listing.nomor_jalan || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Patokan:</span> <span className="font-semibold text-slate-800">{listing.patokan || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Privasi Lokasi:</span> <span className="font-semibold text-slate-800">{listing.privasi_lokasi === 'perkiraan' ? 'Perkiraan (disamarkan)' : 'Tepat'}</span></div>
                                    <div><span className="text-slate-400 block">Koordinat:</span> <span className="font-semibold text-slate-800 font-mono text-[11px]">{listing.titik_lat && listing.titik_lng ? `${listing.titik_lat}, ${listing.titik_lng}` : '-'}</span></div>
                                </div>
                            </div>

                            {/* Kontak & Privasi */}
                            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                                <div><span className="text-slate-400 block">Cara Dihubungi:</span> <span className="font-semibold text-slate-800">{listing.cara_dihubungi || '-'}</span></div>
                                <div><span className="text-slate-400 block">Tampilkan No. Telepon:</span> <span className="font-semibold text-slate-800">{listing.tampilkan_no_telepon ? 'Ya' : 'Tidak'}</span></div>
                            </div>

                            <div className="pt-3 border-t border-slate-100">
                                <h4 className="text-xs font-bold text-slate-700 mb-1">Deskripsi:</h4>
                                <p className="text-xs text-slate-600 whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-100">{listing.deskripsi}</p>
                            </div>
                        </div>

                        {/* Photos Audit */}
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <div className="flex items-center gap-2 font-bold text-slate-900 border-b border-slate-100 pb-3">
                                <ImageIcon className="w-5 h-5 text-[#0070F3]" />
                                <h3>Foto Terunggah ({photos.length} Foto)</h3>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {photos.map((p, i) => (
                                    <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                                        <img src={p.url_foto} alt="audit" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>

                            {videos.length > 0 && (
                                <div className="pt-2 border-t border-slate-100">
                                    <h4 className="text-xs font-bold text-slate-700 mb-2">Link Video ({videos.length}):</h4>
                                    <div className="space-y-1.5">
                                        {videos.map((v, i) => (
                                            <a key={i} href={v.link_video} target="_blank" rel="noreferrer"
                                                className="flex items-center justify-between gap-2 p-2.5 bg-slate-50 hover:bg-blue-50 rounded-xl border border-slate-200 text-xs">
                                                <span className="uppercase font-bold text-[#002B7F]">{v.tipe}</span>
                                                <span className="text-[#0070F3] truncate">{v.link_video}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Data Fisik & Spesifikasi */}
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">Data Fisik & Spesifikasi Bangunan</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs">
                                <div><span className="text-slate-400 block">Luas Tanah:</span> <span className="font-semibold text-slate-800">{listing.luas_tanah ? `${listing.luas_tanah} m²` : '-'}</span></div>
                                <div><span className="text-slate-400 block">Luas Bangunan:</span> <span className="font-semibold text-slate-800">{listing.luas_bangunan ? `${listing.luas_bangunan} m²` : '-'}</span></div>
                                <div><span className="text-slate-400 block">Dimensi (P x L):</span> <span className="font-semibold text-slate-800">{listing.panjang_tanah && listing.lebar_tanah ? `${listing.panjang_tanah} x ${listing.lebar_tanah} m` : '-'}</span></div>
                                <div><span className="text-slate-400 block">Jumlah Lantai:</span> <span className="font-semibold text-slate-800">{listing.jumlah_lantai || '-'}</span></div>
                                <div><span className="text-slate-400 block">Kamar Tidur / Mandi:</span> <span className="font-semibold text-slate-800">{listing.kamar_tidur || 0} / {listing.kamar_mandi || 0}</span></div>
                                <div><span className="text-slate-400 block">Toilet Khusus:</span> <span className="font-semibold text-slate-800">{listing.toilet || 0}</span></div>
                                <div><span className="text-slate-400 block">Ruang Tamu:</span> <span className="font-semibold text-slate-800">{listing.ruang_tamu || 0}</span></div>
                                <div><span className="text-slate-400 block">Ruang Keluarga:</span> <span className="font-semibold text-slate-800">{listing.ruang_keluarga || 0}</span></div>
                                <div><span className="text-slate-400 block">Ruang Makan:</span> <span className="font-semibold text-slate-800">{listing.ruang_makan || 0}</span></div>
                                <div><span className="text-slate-400 block">Dapur:</span> <span className="font-semibold text-slate-800">{listing.dapur || 0}</span></div>
                                <div><span className="text-slate-400 block">Gudang:</span> <span className="font-semibold text-slate-800">{listing.gudang || 0}</span></div>
                                <div><span className="text-slate-400 block">Balkon / Teras:</span> <span className="font-semibold text-slate-800">{listing.balkon || 0} / {listing.teras || 0}</span></div>
                                <div><span className="text-slate-400 block">Garasi / Carport:</span> <span className="font-semibold text-slate-800">{listing.garasi || 0} / {listing.carport || 0}</span></div>
                                <div><span className="text-slate-400 block">Kapasitas Parkir:</span> <span className="font-semibold text-slate-800">{listing.kapasitas_parkir ? `${listing.kapasitas_parkir} Kendaraan` : '-'}</span></div>
                                <div><span className="text-slate-400 block">Kondisi Bangunan:</span> <span className="font-semibold text-slate-800">{listing.kondisi_bangunan || '-'}</span></div>
                                <div><span className="text-slate-400 block">Furnitur:</span> <span className="font-semibold text-slate-800">{listing.status_furnitur || '-'}</span></div>
                                <div><span className="text-slate-400 block">Tahun Bangun / Renovasi:</span> <span className="font-semibold text-slate-800">{listing.tahun_dibangun || '-'} / {listing.tahun_renovasi || '-'}</span></div>
                                <div><span className="text-slate-400 block">Kondisi Saat Ini:</span> <span className="font-semibold text-slate-800">{listing.kondisi_saat_ini || '-'}</span></div>
                            </div>

                            <div className="pt-3 border-t border-slate-100">
                                <h4 className="text-xs font-bold text-slate-700 mb-2">Material Bangunan</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-4 text-xs">
                                    <div><span className="text-slate-400 block">Struktur:</span> <span className="font-semibold text-slate-800">{listing.material_struktur || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Dinding:</span> <span className="font-semibold text-slate-800">{listing.material_dinding || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Lantai:</span> <span className="font-semibold text-slate-800">{listing.material_lantai || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Atap:</span> <span className="font-semibold text-slate-800">{listing.material_atap || '-'}</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Fasilitas & Utilitas */}
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">Fasilitas & Utilitas</h3>
                            <div>
                                <span className="text-xs text-slate-400 block mb-1.5">Fasilitas:</span>
                                {listing.facilities && listing.facilities.length > 0 ? (
                                    <div className="flex flex-wrap gap-1.5">
                                        {listing.facilities.map((f, i) => (
                                            <span key={i} className="px-2.5 py-1 bg-blue-50 text-[#002B7F] rounded-lg text-xs font-semibold border border-blue-100">{f}</span>
                                        ))}
                                    </div>
                                ) : <span className="text-xs text-slate-500">-</span>}
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-4 text-xs pt-2 border-t border-slate-100">
                                <div><span className="text-slate-400 block">Daya Listrik:</span> <span className="font-semibold text-slate-800">{listing.daya_listrik || '-'}</span></div>
                                <div><span className="text-slate-400 block">Jenis Meteran:</span> <span className="font-semibold text-slate-800">{listing.jenis_meteran || '-'}</span></div>
                                <div><span className="text-slate-400 block">Sumber Air:</span> <span className="font-semibold text-slate-800">{listing.sumber_air || '-'}</span></div>
                                <div><span className="text-slate-400 block">Internet:</span> <span className="font-semibold text-slate-800">{listing.internet_jaringan || '-'}</span></div>
                                <div><span className="text-slate-400 block">Gas:</span> <span className="font-semibold text-slate-800">{listing.gas || '-'}</span></div>
                            </div>
                        </div>

                        {/* Akses & Lingkungan */}
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">Akses, Lingkungan & Jarak</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs">
                                <div><span className="text-slate-400 block">Lebar / Jenis Jalan:</span> <span className="font-semibold text-slate-800">{listing.lebar_jalan || '-'} ({listing.jenis_jalan || '-'})</span></div>
                                <div><span className="text-slate-400 block">Akses Mobil / Truk:</span> <span className="font-semibold text-slate-800">{listing.akses_mobil ? 'Mobil' : '-'} {listing.akses_truk ? '/ Truk' : ''}</span></div>
                                <div><span className="text-slate-400 block">Orientasi:</span> <span className="font-semibold text-slate-800">{listing.orientasi || '-'}</span></div>
                                <div><span className="text-slate-400 block">Kontur Tanah:</span> <span className="font-semibold text-slate-800">{listing.kontur_tanah || '-'}</span></div>
                                <div><span className="text-slate-400 block">Jenis Lingkungan:</span> <span className="font-semibold text-slate-800">{listing.jenis_lingkungan || '-'}</span></div>
                                <div><span className="text-slate-400 block">Bebas Banjir / Longsor:</span> <span className="font-semibold text-slate-800">{listing.bebas_banjir ? 'Bebas Banjir' : '-'} {listing.rawan_longsor ? '/ Rawan Longsor' : ''}</span></div>
                                <div><span className="text-slate-400 block">Jarak Tol / Stasiun:</span> <span className="font-semibold text-slate-800">{listing.jarak_tol || '-'} / {listing.jarak_stasiun || '-'}</span></div>
                                <div><span className="text-slate-400 block">Jarak Bandara / RS:</span> <span className="font-semibold text-slate-800">{listing.jarak_bandara || '-'} / {listing.jarak_rs || '-'}</span></div>
                                <div><span className="text-slate-400 block">Jarak Sekolah / Pasar:</span> <span className="font-semibold text-slate-800">{listing.jarak_sekolah || '-'} / {listing.jarak_pasar || '-'}</span></div>
                                <div><span className="text-slate-400 block">Jarak Pusat Kota:</span> <span className="font-semibold text-slate-800">{listing.jarak_pusat_kota || '-'}</span></div>
                            </div>
                        </div>

                        {/* Khusus Tanah / Komersial */}
                        {(['Tanah', 'Kavling', 'Ruko', 'Kios', 'Gudang', 'Kantor', 'Pabrik', 'Komersial'].includes(listing.jenis_properti)) && (
                            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                                <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">Spesifikasi Khusus ({listing.jenis_properti})</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs">
                                    <div><span className="text-slate-400 block">Jenis Tanah:</span> <span className="font-semibold text-slate-800">{listing.jenis_tanah || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Peruntukan / Zonasi:</span> <span className="font-semibold text-slate-800">{listing.peruntukan_zonasi || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Akses Jalan Tanah:</span> <span className="font-semibold text-slate-800">{listing.akses_jalan_tanah || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Lebar Muka:</span> <span className="font-semibold text-slate-800">{listing.lebar_muka ? `${listing.lebar_muka} m` : '-'}</span></div>
                                    <div><span className="text-slate-400 block">Area Parkir:</span> <span className="font-semibold text-slate-800">{listing.area_parkir || '-'}</span></div>
                                </div>
                                {listing.cocok_untuk_tanah && listing.cocok_untuk_tanah.length > 0 && (
                                    <div className="pt-2 border-t border-slate-100">
                                        <span className="text-xs text-slate-400 block mb-1.5">Cocok Untuk (Tanah):</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {listing.cocok_untuk_tanah.map((c, i) => (
                                                <span key={i} className="px-2.5 py-1 bg-blue-50 text-[#002B7F] rounded-lg text-xs font-semibold border border-blue-100">{c}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {listing.cocok_untuk_komersial && listing.cocok_untuk_komersial.length > 0 && (
                                    <div className="pt-2 border-t border-slate-100">
                                        <span className="text-xs text-slate-400 block mb-1.5">Cocok Untuk (Komersial):</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {listing.cocok_untuk_komersial.map((c, i) => (
                                                <span key={i} className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-semibold border border-amber-100">{c}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Khusus Developer */}
                        {dev && dev.nama_developer && (
                            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                                <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">Detail Proyek Developer</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs">
                                    <div><span className="text-slate-400 block">Developer:</span> <span className="font-semibold text-slate-800">{dev.nama_developer}</span></div>
                                    <div><span className="text-slate-400 block">Nama Proyek:</span> <span className="font-semibold text-slate-800">{dev.nama_proyek || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Status Proyek:</span> <span className="font-semibold text-slate-800">{dev.status_proyek || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Sisa / Total Unit:</span> <span className="font-semibold text-slate-800">{dev.unit_tersedia || '-'} / {dev.jumlah_unit || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Tipe Unit:</span> <span className="font-semibold text-slate-800">{dev.tipe_unit || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Harga Mulai:</span> <span className="font-semibold text-slate-800">{dev.harga_mulai ? formatRupiah(dev.harga_mulai) : '-'}</span></div>
                                    <div><span className="text-slate-400 block">Booking Fee / DP:</span> <span className="font-semibold text-slate-800">{formatRupiah(dev.booking_fee)} / {dev.dp || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Bank Partner:</span> <span className="font-semibold text-slate-800">{dev.bank_partner || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Estimasi Serah Terima:</span> <span className="font-semibold text-slate-800">{dev.estimasi_serah_terima || '-'}</span></div>
                                    <div><span className="text-slate-400 block">Pilihan KPR:</span> <span className="font-semibold text-slate-800">{dev.pilihan_kpr || '-'}</span></div>
                                    <div className="col-span-2 sm:col-span-3"><span className="text-slate-400 block">Fasilitas Cluster:</span> <span className="font-semibold text-slate-800">{dev.fasilitas_cluster || '-'}</span></div>
                                </div>
                                {(dev.brosur_url || dev.site_plan_url || dev.video_marketing_link) && (
                                    <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                                        {dev.brosur_url && (
                                            <a href={dev.brosur_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition border border-rose-200">
                                                <FileText className="w-3.5 h-3.5" /> Lihat Brosur
                                            </a>
                                        )}
                                        {dev.site_plan_url && (
                                            <a href={dev.site_plan_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-[#0070F3] rounded-xl text-xs font-bold transition border border-blue-200">
                                                <FileText className="w-3.5 h-3.5" /> Lihat Site Plan
                                            </a>
                                        )}
                                        {dev.video_marketing_link && (
                                            <a href={dev.video_marketing_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition border border-slate-200">
                                                <Video className="w-3.5 h-3.5" /> Video Marketing
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Pengiklan Data & Audit Summary */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <div className="flex items-center gap-2 font-bold text-slate-900 border-b border-slate-100 pb-3">
                                <Building2 className="w-5 h-5 text-[#0070F3]" />
                                <h3>Data Akun Pengiklan</h3>
                            </div>
                            <div className="space-y-2.5 text-xs text-slate-700">
                                <div><span className="text-slate-400 block">Nama Akun:</span> <span className="font-bold">{listing.user?.name}</span></div>
                                <div><span className="text-slate-400 block">Email Akun:</span> <span className="font-bold">{listing.user?.email}</span></div>
                                <div><span className="text-slate-400 block">No. HP Akun:</span> <span className="font-bold">{listing.user?.no_hp || '-'}</span></div>
                                <div><span className="text-slate-400 block">Nama Pengiklan di Form:</span> <span className="font-bold">{pengiklan.nama_pengiklan}</span></div>
                                <div><span className="text-slate-400 block">Jenis Pengiklan:</span> <span className="font-bold">{pengiklan.jenis_pengiklan}</span></div>
                                <div><span className="text-slate-400 block">Nama Perusahaan:</span> <span className="font-bold">{pengiklan.nama_perusahaan || '-'}</span></div>
                                <div><span className="text-slate-400 block">Nomor WhatsApp:</span> <span className="font-bold text-[#0070F3]">{pengiklan.no_wa}</span></div>
                                <div><span className="text-slate-400 block">Hubungan dg Properti:</span> <span className="font-bold">{pengiklan.hubungan_dengan_properti}</span></div>
                                <div className="pt-2 border-t border-slate-100">
                                    <span className="text-slate-400 block mb-1">Pernyataan Kewenangan:</span>
                                    <span className={`font-bold ${pengiklan.pernyataan_kewenangan ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {pengiklan.pernyataan_kewenangan ? '✓ Disetujui oleh Pengiklan' : '✗ Belum Disetujui'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            {/* Rejection Modal */}
            {rejectModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
                        <div className="flex items-center gap-2 text-rose-600 font-bold text-lg">
                            <AlertTriangle className="w-5 h-5" />
                            Tolak Pengajuan Iklan
                        </div>
                        <form onSubmit={handleRejectSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Catatan / Alasan Penolakan (Akan dibaca oleh User Pengiklan) *
                                </label>
                                <textarea
                                    rows={4}
                                    value={rejectForm.data.catatan_rejection}
                                    onChange={(e) => rejectForm.setData('catatan_rejection', e.target.value)}
                                    placeholder="Contoh: Foto kurang jelas, data legalitas tidak lengkap, atau nomor sertifikat belum valid..."
                                    className="w-full text-xs p-3 border border-slate-300 rounded-2xl focus:ring-rose-500"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setRejectModalOpen(false)}
                                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={rejectForm.processing}
                                    className="px-5 py-2.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow"
                                >
                                    Kirim Penolakan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Reject Payment Modal */}
            {rejectPaymentOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
                        <div className="flex items-center gap-2 text-rose-600 font-bold text-lg">
                            <Wallet className="w-5 h-5" />
                            Tolak Bukti Pembayaran
                        </div>
                        <form onSubmit={handleRejectPaymentSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Alasan Penolakan (Akan dibaca oleh Pengiklan) *
                                </label>
                                <textarea
                                    rows={4}
                                    value={rejectPaymentForm.data.payment_note}
                                    onChange={(e) => rejectPaymentForm.setData('payment_note', e.target.value)}
                                    placeholder="Contoh: Nominal transfer tidak sesuai, bukti buram, atau rekening tujuan salah..."
                                    className="w-full text-xs p-3 border border-slate-300 rounded-2xl focus:ring-rose-500"
                                    required
                                />
                                {rejectPaymentForm.errors.payment_note && (
                                    <p className="text-xs text-rose-600 mt-1">{rejectPaymentForm.errors.payment_note}</p>
                                )}
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setRejectPaymentOpen(false)}
                                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={rejectPaymentForm.processing}
                                    className="px-5 py-2.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow"
                                >
                                    Tolak Bukti
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
