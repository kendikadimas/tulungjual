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
    Image as ImageIcon
} from 'lucide-react';

export default function Show({ listing }) {
    const [rejectModalOpen, setRejectModalOpen] = React.useState(false);

    const approveForm = useForm({});
    const rejectForm = useForm({
        catatan_rejection: '',
    });

    const handleApprove = () => {
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

    const formatRupiah = (val) => {
        if (!val) return 'Rp 0';
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
    };

    const pengiklan = listing.pengiklan_info || {};
    const dev = listing.developer_detail || {};
    const photos = listing.photos || [];
    const videos = listing.videos || [];

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
                            disabled={approveForm.processing}
                            className="px-5 py-2 bg-[#FF8A00] hover:bg-[#e67a00] text-white font-black text-xs rounded-xl transition flex items-center gap-1.5 shadow"
                        >
                            <CheckCircle2 className="w-4 h-4" /> Setujui & Tayangkan
                        </button>
                    )}
                </div>
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
                                <p className="text-sm font-bold text-[#002B7F] mt-1">{formatRupiah(listing.harga)}</p>
                                <p className="text-xs text-slate-500 mt-2">{listing.alamat_lengkap} ({listing.kelurahan}, {listing.kecamatan}, {listing.kota})</p>
                            </div>
                            <div className="pt-2">
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
                                <div><span className="text-slate-400 block">Kondisi Bangunan:</span> <span className="font-semibold text-slate-800">{listing.kondisi_bangunan || '-'}</span></div>
                                <div><span className="text-slate-400 block">Furnitur:</span> <span className="font-semibold text-slate-800">{listing.status_furnitur || '-'}</span></div>
                                <div><span className="text-slate-400 block">Tahun Bangun / Renovasi:</span> <span className="font-semibold text-slate-800">{listing.tahun_dibangun || '-'} / {listing.tahun_renovasi || '-'}</span></div>
                                <div><span className="text-slate-400 block">Kondisi Saat Ini:</span> <span className="font-semibold text-slate-800">{listing.kondisi_saat_ini || '-'}</span></div>
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
                                <div><span className="text-slate-400 block">Jarak RS / Sekolah:</span> <span className="font-semibold text-slate-800">{listing.jarak_rs || '-'} / {listing.jarak_sekolah || '-'}</span></div>
                                <div><span className="text-slate-400 block">Jarak Pasar / Pusat Kota:</span> <span className="font-semibold text-slate-800">{listing.jarak_pasar || '-'} / {listing.jarak_pusat_kota || '-'}</span></div>
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
                                </div>
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
                                <div><span className="text-slate-400 block">Nama Pengiklan di Form:</span> <span className="font-bold">{pengiklan.nama_pengiklan}</span></div>
                                <div><span className="text-slate-400 block">Jenis Pengiklan:</span> <span className="font-bold">{pengiklan.jenis_pengiklan}</span></div>
                                <div><span className="text-slate-400 block">Nomor WhatsApp:</span> <span className="font-bold text-[#0070F3]">{pengiklan.no_wa}</span></div>
                                <div><span className="text-slate-400 block">Hubungan dg Properti:</span> <span className="font-bold">{pengiklan.hubungan_dengan_properti}</span></div>
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
        </AdminLayout>
    );
}
