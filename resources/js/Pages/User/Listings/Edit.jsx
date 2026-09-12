import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import MapPicker from '@/Components/MapPicker';
import { useForm, Link, router } from '@inertiajs/react';
import {
    ArrowLeft, Save, Building2, DollarSign, MapPin, ShieldCheck, Check, User, Image as ImageIcon, Video
} from 'lucide-react';

export default function Edit({ listing }) {
    const pengiklan = listing.pengiklan_info || {};
    const existingPhotos = listing.photos || [];

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',

        // 4.1 Informasi Dasar
        jenis_iklan: listing.jenis_iklan || 'Jual',
        jenis_properti: listing.jenis_properti || 'Rumah',
        judul: listing.judul || '',
        deskripsi: listing.deskripsi || '',

        // 4.2 Harga & Transaksi
        harga: listing.harga || '',
        jenis_harga: listing.jenis_harga || 'Nego',
        bisa_nego: listing.bisa_nego ?? true,
        harga_promo: listing.harga_promo || '',
        metode_pembayaran: listing.metode_pembayaran || '',
        booking_fee: listing.booking_fee || '',

        // 4.3 Lokasi
        provinsi: listing.provinsi || '',
        kota: listing.kota || '',
        kecamatan: listing.kecamatan || '',
        kelurahan: listing.kelurahan || '',
        kode_pos: listing.kode_pos || '',
        alamat_lengkap: listing.alamat_lengkap || '',
        nama_jalan: listing.nama_jalan || '',
        nomor_jalan: listing.nomor_jalan || '',
        patokan: listing.patokan || '',
        titik_lat: listing.titik_lat || -8.067,
        titik_lng: listing.titik_lng || 111.901,
        privasi_lokasi: listing.privasi_lokasi || 'tepat',

        // 4.4 Data Fisik
        luas_tanah: listing.luas_tanah || '',
        luas_bangunan: listing.luas_bangunan || '',
        lebar_tanah: listing.lebar_tanah || '',
        panjang_tanah: listing.panjang_tanah || '',
        jumlah_lantai: listing.jumlah_lantai || '',
        kamar_tidur: listing.kamar_tidur || '',
        kamar_mandi: listing.kamar_mandi || '',
        toilet: listing.toilet || '',
        ruang_tamu: listing.ruang_tamu || '',
        ruang_keluarga: listing.ruang_keluarga || '',
        ruang_makan: listing.ruang_makan || '',
        dapur: listing.dapur || '',
        gudang: listing.gudang || '',
        balkon: listing.balkon || '',
        teras: listing.teras || '',
        garasi: listing.garasi || '',
        carport: listing.carport || '',
        kapasitas_parkir: listing.kapasitas_parkir || '',

        // 4.5 Spesifikasi Bangunan
        tahun_dibangun: listing.tahun_dibangun || '',
        tahun_renovasi: listing.tahun_renovasi || '',
        kondisi_bangunan: listing.kondisi_bangunan || 'Bagus',
        status_furnitur: listing.status_furnitur || 'Unfurnished',
        material_struktur: listing.material_struktur || '',
        material_dinding: listing.material_dinding || '',
        material_lantai: listing.material_lantai || '',
        material_atap: listing.material_atap || '',

        // 4.6 Fasilitas
        facilities: listing.facilities || [],

        // 4.7 Utilitas
        daya_listrik: listing.daya_listrik || '',
        jenis_meteran: listing.jenis_meteran || 'Token (Prabayar)',
        sumber_air: listing.sumber_air || '',
        internet_jaringan: listing.internet_jaringan || '',
        gas: listing.gas || '',

        // 4.8 Legalitas
        status_sertifikat: listing.status_sertifikat || 'SHM - Sertifikat Hak Milik',
        nomor_sertifikat: listing.nomor_sertifikat || '',
        nama_pemegang_hak: listing.nama_pemegang_hak || '',
        luas_sertifikat: listing.luas_sertifikat || '',
        status_sengketa: listing.status_sengketa || 'Bebas Sengketa',
        status_pbb: listing.status_pbb || '',
        tahun_pbb: listing.tahun_pbb || '',
        njop: listing.njop || '',
        status_pbg_imb: listing.status_pbg_imb || '',

        // 4.9 Status Properti
        kondisi_saat_ini: listing.kondisi_saat_ini || 'Kosong',
        status_transaksi: listing.status_transaksi || 'Tersedia',

        // 4.10 Akses & Lingkungan
        lebar_jalan: listing.lebar_jalan || '',
        jenis_jalan: listing.jenis_jalan || 'Aspal',
        akses_mobil: listing.akses_mobil ?? true,
        akses_truk: listing.akses_truk ?? false,
        jarak_tol: listing.jarak_tol || '',
        jarak_stasiun: listing.jarak_stasiun || '',
        jarak_bandara: listing.jarak_bandara || '',
        jarak_rs: listing.jarak_rs || '',
        jarak_sekolah: listing.jarak_sekolah || '',
        jarak_pasar: listing.jarak_pasar || '',
        jarak_pusat_kota: listing.jarak_pusat_kota || '',
        orientasi: listing.orientasi || 'Utara',
        kontur_tanah: listing.kontur_tanah || 'Datar',
        jenis_lingkungan: listing.jenis_lingkungan || '',
        bebas_banjir: listing.bebas_banjir ?? true,
        rawan_longsor: listing.rawan_longsor ?? false,

        // 4.15 Khusus Tanah
        jenis_tanah: listing.jenis_tanah || '',
        peruntukan_zonasi: listing.peruntukan_zonasi || '',
        akses_jalan_tanah: listing.akses_jalan_tanah || '',
        cocok_untuk_tanah: listing.cocok_untuk_tanah || [],

        // 4.16 Khusus Komersial
        lebar_muka: listing.lebar_muka || '',
        area_parkir: listing.area_parkir || '',
        cocok_untuk_komersial: listing.cocok_untuk_komersial || [],

        // 4.12 & 4.13 & 4.17 Data Pengiklan & Kontak
        nama_pengiklan: pengiklan.nama_pengiklan || '',
        jenis_pengiklan: pengiklan.jenis_pengiklan || 'Pemilik',
        no_wa: pengiklan.no_wa || '',
        telepon: pengiklan.telepon || '',
        email: pengiklan.email || '',
        nama_perusahaan: pengiklan.nama_perusahaan || '',
        hubungan_dengan_properti: pengiklan.hubungan_dengan_properti || 'Pemilik',
        cara_dihubungi: listing.cara_dihubungi || 'WA',
        tampilkan_no_telepon: listing.tampilkan_no_telepon ?? true,

        is_active: listing.is_active ?? true,
        new_photos: [],

        // 4.11 Video (Link Embed)
        link_video_walkthrough: (listing.videos || []).find((v) => v.tipe === 'walkthrough')?.link_video || '',
        link_video_lingkungan: (listing.videos || []).find((v) => v.tipe === 'lingkungan')?.link_video || '',
        link_video_drone: (listing.videos || []).find((v) => v.tipe === 'drone')?.link_video || '',

        // 4.14 Khusus Developer
        nama_developer: listing.developer_detail?.nama_developer || '',
        nama_proyek: listing.developer_detail?.nama_proyek || '',
        status_proyek: listing.developer_detail?.status_proyek || '',
        jumlah_unit: listing.developer_detail?.jumlah_unit || '',
        unit_tersedia: listing.developer_detail?.unit_tersedia || '',
        tipe_unit: listing.developer_detail?.tipe_unit || '',
        harga_mulai: listing.developer_detail?.harga_mulai || '',
        dev_booking_fee: listing.developer_detail?.booking_fee || '',
        dp: listing.developer_detail?.dp || '',
        pilihan_kpr: listing.developer_detail?.pilihan_kpr || '',
        bank_partner: listing.developer_detail?.bank_partner || '',
        estimasi_serah_terima: listing.developer_detail?.estimasi_serah_terima || '',
        fasilitas_cluster: listing.developer_detail?.fasilitas_cluster || '',
        video_marketing_link: listing.developer_detail?.video_marketing_link || '',
        site_plan_file: null,
        brosur_file: null,
    });

    const [newPreviews, setNewPreviews] = React.useState([]);

    const handleNewPhotosChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setData('new_photos', files);
            const previews = files.map((file) => URL.createObjectURL(file));
            setNewPreviews(previews);
        }
    };

    const toggleFacility = (fac) => {
        let updated = [...data.facilities];
        updated = updated.includes(fac) ? updated.filter((f) => f !== fac) : [...updated, fac];
        setData('facilities', updated);
    };

    const toggleCocokTanah = (item) => {
        let updated = [...data.cocok_untuk_tanah];
        updated = updated.includes(item) ? updated.filter((i) => i !== item) : [...updated, item];
        setData('cocok_untuk_tanah', updated);
    };

    const toggleCocokKomersial = (item) => {
        let updated = [...data.cocok_untuk_komersial];
        updated = updated.includes(item) ? updated.filter((i) => i !== item) : [...updated, item];
        setData('cocok_untuk_komersial', updated);
    };

    const facilityList = [
        'Carport', 'Garasi', 'Taman', 'Kolam Renang', 'Balkon', 'Teras',
        'Gudang', 'Rooftop', 'Laundry Area', 'Jemuran', 'CCTV', 'Keamanan',
        'One Gate System', 'Playground', 'Lift', 'Basement', 'Clubhouse',
        'Area Olahraga', 'Area Komersial', 'Lainnya'
    ];

    const isTanah = data.jenis_properti === 'Tanah' || data.jenis_properti === 'Kavling';
    const isKomersial = ['Ruko', 'Kios', 'Gudang', 'Kantor', 'Pabrik', 'Komersial'].includes(data.jenis_properti);
    const isDeveloper = data.jenis_pengiklan === 'Developer';

    const inputCls = 'w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl';

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/iklan-saya/${listing.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout title={`Edit Iklan - ${listing.judul}`}>
            <div className="bg-[#002B7F] text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-blue-900">
                <div className="max-w-4xl mx-auto">
                    <Link href="/iklan-saya" className="text-xs text-[#FF8A00] hover:underline flex items-center gap-1 mb-2 font-bold">
                        <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Kelola Iklan Saya
                    </Link>
                    <h1 className="text-2xl font-black">Edit Iklan Properti #{listing.id}</h1>
                    <p className="text-blue-100 text-sm mt-1">Perbarui seluruh detail properti Anda, lalu simpan perubahan.</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* 4.1 Informasi Dasar */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-[#002B7F] font-bold border-b border-slate-100 pb-3">
                            <Building2 className="w-5 h-5 text-[#0070F3]" />
                            <h3 className="text-lg text-slate-900">4.1 Informasi Dasar</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Iklan *</label>
                                <select value={data.jenis_iklan} onChange={(e) => setData('jenis_iklan', e.target.value)} className={inputCls + ' font-semibold'}>
                                    <option value="Jual">Jual</option>
                                    <option value="Sewa">Sewa</option>
                                    <option value="Jual & Sewa">Jual & Sewa</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Properti *</label>
                                <select value={data.jenis_properti} onChange={(e) => setData('jenis_properti', e.target.value)} className={inputCls + ' font-semibold'}>
                                    {['Rumah', 'Tanah', 'Apartemen', 'Ruko', 'Kios', 'Gudang', 'Kost', 'Villa', 'Kantor', 'Pabrik', 'Kavling', 'Cluster', 'Hotel', 'Komersial', 'Lainnya'].map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Iklan *</label>
                            <input type="text" value={data.judul} onChange={(e) => setData('judul', e.target.value)} className={inputCls} required />
                            {errors.judul && <p className="text-xs text-rose-600 mt-1">{errors.judul}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Properti *</label>
                            <textarea rows={5} value={data.deskripsi} onChange={(e) => setData('deskripsi', e.target.value)} className={inputCls} required />
                            {errors.deskripsi && <p className="text-xs text-rose-600 mt-1">{errors.deskripsi}</p>}
                        </div>
                    </div>

                    {/* 4.2 Harga & Transaksi */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-[#002B7F] font-bold border-b border-slate-100 pb-3">
                            <DollarSign className="w-5 h-5 text-[#FF8A00]" />
                            <h3 className="text-lg text-slate-900">4.2 Harga & Transaksi</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Harga (Rp) *</label>
                                <input type="number" value={data.harga} onChange={(e) => setData('harga', e.target.value)} className={inputCls + ' font-bold text-[#002B7F]'} required />
                                {errors.harga && <p className="text-xs text-rose-600 mt-1">{errors.harga}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Harga</label>
                                <select value={data.jenis_harga} onChange={(e) => setData('jenis_harga', e.target.value)} className={inputCls}>
                                    <option value="Nego">Nego</option>
                                    <option value="Nett">Nett (Pas)</option>
                                    <option value="Per Meter">Per Meter</option>
                                    <option value="Per Tahun">Per Tahun (Sewa)</option>
                                    <option value="Per Bulan">Per Bulan (Sewa)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Bisa Nego?</label>
                                <select value={data.bisa_nego ? '1' : '0'} onChange={(e) => setData('bisa_nego', e.target.value === '1')} className={inputCls}>
                                    <option value="1">Ya</option>
                                    <option value="0">Tidak</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Harga Promo (Opsional)</label>
                                <input type="number" value={data.harga_promo} onChange={(e) => setData('harga_promo', e.target.value)} className={inputCls} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Metode Pembayaran</label>
                                <input type="text" value={data.metode_pembayaran} onChange={(e) => setData('metode_pembayaran', e.target.value)} className={inputCls} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Booking Fee (Opsional)</label>
                                <input type="number" value={data.booking_fee} onChange={(e) => setData('booking_fee', e.target.value)} className={inputCls} />
                            </div>
                        </div>
                    </div>

                    {/* 4.3 Lokasi & Map */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-[#002B7F] font-bold border-b border-slate-100 pb-3">
                            <MapPin className="w-5 h-5 text-[#0070F3]" />
                            <h3 className="text-lg text-slate-900">4.3 Alamat & Titik Maps</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Provinsi *</label><input type="text" value={data.provinsi} onChange={(e) => setData('provinsi', e.target.value)} className={inputCls} required /></div>
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Kota *</label><input type="text" value={data.kota} onChange={(e) => setData('kota', e.target.value)} className={inputCls} required /></div>
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Kecamatan *</label><input type="text" value={data.kecamatan} onChange={(e) => setData('kecamatan', e.target.value)} className={inputCls} required /></div>
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Kelurahan *</label><input type="text" value={data.kelurahan} onChange={(e) => setData('kelurahan', e.target.value)} className={inputCls} required /></div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat Lengkap *</label>
                            <textarea rows={2} value={data.alamat_lengkap} onChange={(e) => setData('alamat_lengkap', e.target.value)} className={inputCls} required />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Nama Jalan / Blok</label><input type="text" value={data.nama_jalan} onChange={(e) => setData('nama_jalan', e.target.value)} className={inputCls} /></div>
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Patokan</label><input type="text" value={data.patokan} onChange={(e) => setData('patokan', e.target.value)} className={inputCls} /></div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Privasi Pin *</label>
                                <select value={data.privasi_lokasi} onChange={(e) => setData('privasi_lokasi', e.target.value)} className={inputCls + ' font-semibold text-[#002B7F]'}>
                                    <option value="tepat">Lokasi Tepat</option>
                                    <option value="perkiraan">Lokasi Perkiraan</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Nomor Rumah / Kavling</label><input type="text" value={data.nomor_jalan} onChange={(e) => setData('nomor_jalan', e.target.value)} className={inputCls} /></div>
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Kode Pos</label><input type="text" value={data.kode_pos} onChange={(e) => setData('kode_pos', e.target.value)} className={inputCls} /></div>
                        </div>
                        <div className="pt-2">
                            <label className="block text-xs font-semibold text-slate-700 mb-2">Koordinat Maps</label>
                            <MapPicker
                                lat={data.titik_lat}
                                lng={data.titik_lng}
                                onSelectLocation={(lat, lng) => setData({ ...data, titik_lat: lat, titik_lng: lng })}
                            />
                        </div>
                    </div>

                    {/* 4.4 Data Fisik */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="text-lg font-bold text-slate-900">4.4 Data Fisik Properti</h3>
                            <span className="text-xs text-slate-500 font-medium">Kategori: {data.jenis_properti}</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Luas Tanah (m²) *</label><input type="number" value={data.luas_tanah} onChange={(e) => setData('luas_tanah', e.target.value)} className={inputCls + ' font-bold text-[#002B7F]'} required /></div>
                            {!isTanah && <div><label className="block text-xs font-semibold text-slate-700 mb-1">Luas Bangunan (m²)</label><input type="number" value={data.luas_bangunan} onChange={(e) => setData('luas_bangunan', e.target.value)} className={inputCls} /></div>}
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Panjang Tanah (m)</label><input type="number" value={data.panjang_tanah} onChange={(e) => setData('panjang_tanah', e.target.value)} className={inputCls} /></div>
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Lebar Tanah (m)</label><input type="number" value={data.lebar_tanah} onChange={(e) => setData('lebar_tanah', e.target.value)} className={inputCls} /></div>
                        </div>
                        {!isTanah && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[
                                    ['jumlah_lantai', 'Jumlah Lantai'], ['kamar_tidur', 'Kamar Tidur'], ['kamar_mandi', 'Kamar Mandi'], ['toilet', 'Toilet Khusus'],
                                    ['ruang_tamu', 'Ruang Tamu'], ['ruang_keluarga', 'Ruang Keluarga'], ['ruang_makan', 'Ruang Makan'], ['dapur', 'Dapur'],
                                    ['gudang', 'Gudang'], ['balkon', 'Balkon'], ['teras', 'Teras'], ['garasi', 'Garasi'],
                                    ['carport', 'Carport'], ['kapasitas_parkir', 'Kapasitas Parkir'],
                                ].map(([key, label]) => (
                                    <div key={key}>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">{label}</label>
                                        <input type="number" value={data[key]} onChange={(e) => setData(key, e.target.value)} className={inputCls} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 4.5 Spesifikasi Bangunan */}
                    {!isTanah && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">4.5 Spesifikasi Bangunan & Material</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div><label className="block text-xs font-semibold text-slate-700 mb-1">Tahun Dibangun</label><input type="number" value={data.tahun_dibangun} onChange={(e) => setData('tahun_dibangun', e.target.value)} className={inputCls} /></div>
                                <div><label className="block text-xs font-semibold text-slate-700 mb-1">Tahun Renovasi</label><input type="number" value={data.tahun_renovasi} onChange={(e) => setData('tahun_renovasi', e.target.value)} className={inputCls} /></div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Kondisi Bangunan *</label>
                                    <select value={data.kondisi_bangunan} onChange={(e) => setData('kondisi_bangunan', e.target.value)} className={inputCls}>
                                        <option value="Sangat Bagus">Sangat Bagus / Baru</option>
                                        <option value="Bagus">Bagus Siap Huni</option>
                                        <option value="Butuh Renovasi">Butuh Renovasi</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Status Furnitur</label>
                                    <select value={data.status_furnitur} onChange={(e) => setData('status_furnitur', e.target.value)} className={inputCls}>
                                        <option value="Unfurnished">Unfurnished</option>
                                        <option value="Semi Furnished">Semi Furnished</option>
                                        <option value="Full Furnished">Full Furnished</option>
                                    </select>
                                </div>
                                <div><label className="block text-xs font-semibold text-slate-700 mb-1">Material Struktur</label><input type="text" value={data.material_struktur} onChange={(e) => setData('material_struktur', e.target.value)} className={inputCls} /></div>
                                <div><label className="block text-xs font-semibold text-slate-700 mb-1">Material Dinding</label><input type="text" value={data.material_dinding} onChange={(e) => setData('material_dinding', e.target.value)} className={inputCls} /></div>
                                <div><label className="block text-xs font-semibold text-slate-700 mb-1">Material Lantai</label><input type="text" value={data.material_lantai} onChange={(e) => setData('material_lantai', e.target.value)} className={inputCls} /></div>
                                <div><label className="block text-xs font-semibold text-slate-700 mb-1">Material Atap</label><input type="text" value={data.material_atap} onChange={(e) => setData('material_atap', e.target.value)} className={inputCls} /></div>
                            </div>
                        </div>
                    )}

                    {/* 4.6 Fasilitas */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">4.6 Fasilitas Properti</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {facilityList.map((fac) => {
                                const isChecked = data.facilities.includes(fac);
                                return (
                                    <button type="button" key={fac} onClick={() => toggleFacility(fac)}
                                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition ${isChecked ? 'bg-blue-50 border-[#0070F3] text-[#002B7F]' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}>
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${isChecked ? 'bg-[#0070F3] border-[#0070F3] text-white' : 'border-slate-300 bg-white'}`}>
                                            {isChecked && <Check className="w-3 h-3" />}
                                        </div>
                                        <span>{fac}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 4.7 Utilitas */}
                    {!isTanah && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">4.7 Utilitas & Sumber Daya</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div><label className="block text-xs font-semibold text-slate-700 mb-1">Daya Listrik</label><input type="text" value={data.daya_listrik} onChange={(e) => setData('daya_listrik', e.target.value)} className={inputCls} /></div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Meteran</label>
                                    <select value={data.jenis_meteran} onChange={(e) => setData('jenis_meteran', e.target.value)} className={inputCls}>
                                        <option value="Token (Prabayar)">Token (Prabayar)</option>
                                        <option value="Pascabayar">Pascabayar</option>
                                    </select>
                                </div>
                                <div><label className="block text-xs font-semibold text-slate-700 mb-1">Sumber Air</label><input type="text" value={data.sumber_air} onChange={(e) => setData('sumber_air', e.target.value)} className={inputCls} /></div>
                                <div><label className="block text-xs font-semibold text-slate-700 mb-1">Internet</label><input type="text" value={data.internet_jaringan} onChange={(e) => setData('internet_jaringan', e.target.value)} className={inputCls} /></div>
                                <div><label className="block text-xs font-semibold text-slate-700 mb-1">Gas</label><input type="text" value={data.gas} onChange={(e) => setData('gas', e.target.value)} className={inputCls} /></div>
                            </div>
                        </div>
                    )}

                    {/* 4.8 Legalitas */}
                    <div className="bg-[#001F5C] text-white p-6 sm:p-8 rounded-3xl border border-blue-900 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-blue-900 pb-3">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-[#FF8A00]" />
                                <h3 className="text-lg font-bold">4.8 Legalitas & Keamanan Dokumen</h3>
                            </div>
                            <span className="text-[11px] px-3 py-1 bg-[#FF8A00] text-white rounded-full font-bold">Protected / Hidden Public</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-blue-200 mb-1">Status Sertifikat *</label>
                                <select value={data.status_sertifikat} onChange={(e) => setData('status_sertifikat', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-[#001238] border border-blue-800 rounded-xl text-white font-semibold">
                                    <option value="SHM - Sertifikat Hak Milik">SHM</option>
                                    <option value="HGB - Hak Guna Bangunan">HGB</option>
                                    <option value="HP - Hak Pakai">HP</option>
                                    <option value="PPJB">PPJB / Akta</option>
                                    <option value="Girik / Letter C">Girik / Letter C</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-blue-200 mb-1">Status Sengketa *</label>
                                <select value={data.status_sengketa} onChange={(e) => setData('status_sengketa', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-[#001238] border border-blue-800 rounded-xl text-white font-semibold">
                                    <option value="Bebas Sengketa">Bebas Sengketa</option>
                                    <option value="Dalam Proses Hibah/Waris">Dalam Proses Hibah/Waris</option>
                                </select>
                            </div>
                            <div><label className="block text-xs font-semibold text-blue-200 mb-1">Status PBB</label><input type="text" value={data.status_pbb} onChange={(e) => setData('status_pbb', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-[#001238] border border-blue-800 rounded-xl text-white" /></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><label className="block text-xs font-semibold text-blue-200 mb-1">Nomor Sertifikat (Rahasia - Admin)</label><input type="text" value={data.nomor_sertifikat} onChange={(e) => setData('nomor_sertifikat', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-[#001238] border border-blue-800 rounded-xl text-white" /></div>
                            <div><label className="block text-xs font-semibold text-blue-200 mb-1">Nama Pemegang Hak (Rahasia - Admin)</label><input type="text" value={data.nama_pemegang_hak} onChange={(e) => setData('nama_pemegang_hak', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-[#001238] border border-blue-800 rounded-xl text-white" /></div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div><label className="block text-xs font-semibold text-blue-200 mb-1">Luas Sertifikat (m²)</label><input type="number" value={data.luas_sertifikat} onChange={(e) => setData('luas_sertifikat', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-[#001238] border border-blue-800 rounded-xl text-white" /></div>
                            <div><label className="block text-xs font-semibold text-blue-200 mb-1">Tahun PBB</label><input type="number" value={data.tahun_pbb} onChange={(e) => setData('tahun_pbb', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-[#001238] border border-blue-800 rounded-xl text-white" /></div>
                            <div><label className="block text-xs font-semibold text-blue-200 mb-1">NJOP (Rp)</label><input type="number" value={data.njop} onChange={(e) => setData('njop', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-[#001238] border border-blue-800 rounded-xl text-white" /></div>
                            <div><label className="block text-xs font-semibold text-blue-200 mb-1">Status PBG / IMB</label><input type="text" value={data.status_pbg_imb} onChange={(e) => setData('status_pbg_imb', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-[#001238] border border-blue-800 rounded-xl text-white" /></div>
                        </div>
                    </div>

                    {/* 4.9 Status Properti */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">4.9 Status Hunian Saat Ini</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Kondisi Penggunaan *</label>
                                <select value={data.kondisi_saat_ini} onChange={(e) => setData('kondisi_saat_ini', e.target.value)} className={inputCls}>
                                    <option value="Kosong">Kosong</option>
                                    <option value="Ditempati Pemilik">Ditempati Pemilik</option>
                                    <option value="Disewa Pihak Lain">Disewa Pihak Lain</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Status Ketersediaan *</label>
                                <select value={data.status_transaksi} onChange={(e) => setData('status_transaksi', e.target.value)} className={inputCls + ' font-bold text-[#002B7F]'}>
                                    <option value="Tersedia">Tersedia</option>
                                    <option value="Booking">Booking (DP Masuk)</option>
                                    <option value="Terjual">Terjual</option>
                                    <option value="Tersewa">Tersewa</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 4.10 Akses & Lingkungan */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">4.10 Akses, Lingkungan & Jarak Fasilitas Umum</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Lebar Jalan</label><input type="text" value={data.lebar_jalan} onChange={(e) => setData('lebar_jalan', e.target.value)} className={inputCls} /></div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Jalan</label>
                                <select value={data.jenis_jalan} onChange={(e) => setData('jenis_jalan', e.target.value)} className={inputCls}>
                                    <option value="Aspal">Aspal</option>
                                    <option value="Paving">Paving</option>
                                    <option value="Beton">Beton</option>
                                    <option value="Tanah / Makadam">Tanah / Makadam</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Orientasi</label>
                                <select value={data.orientasi} onChange={(e) => setData('orientasi', e.target.value)} className={inputCls}>
                                    <option value="Utara">Utara</option>
                                    <option value="Selatan">Selatan</option>
                                    <option value="Timur">Timur</option>
                                    <option value="Barat">Barat</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Kontur Tanah</label>
                                <select value={data.kontur_tanah} onChange={(e) => setData('kontur_tanah', e.target.value)} className={inputCls}>
                                    <option value="Datar">Datar</option>
                                    <option value="Miring">Miring</option>
                                    <option value="Berbukit">Berbukit</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Akses Mobil</label>
                                <select value={data.akses_mobil ? '1' : '0'} onChange={(e) => setData('akses_mobil', e.target.value === '1')} className={inputCls}><option value="1">Ya</option><option value="0">Tidak</option></select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Akses Truk</label>
                                <select value={data.akses_truk ? '1' : '0'} onChange={(e) => setData('akses_truk', e.target.value === '1')} className={inputCls}><option value="1">Ya</option><option value="0">Tidak</option></select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Bebas Banjir</label>
                                <select value={data.bebas_banjir ? '1' : '0'} onChange={(e) => setData('bebas_banjir', e.target.value === '1')} className={inputCls}><option value="1">Ya</option><option value="0">Tidak</option></select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Rawan Longsor</label>
                                <select value={data.rawan_longsor ? '1' : '0'} onChange={(e) => setData('rawan_longsor', e.target.value === '1')} className={inputCls}><option value="0">Tidak</option><option value="1">Ya</option></select>
                            </div>
                        </div>
                        <div><label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Lingkungan</label><input type="text" value={data.jenis_lingkungan} onChange={(e) => setData('jenis_lingkungan', e.target.value)} className={inputCls} /></div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Jarak ke Tol</label><input type="text" value={data.jarak_tol} onChange={(e) => setData('jarak_tol', e.target.value)} className={inputCls} /></div>
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Jarak ke Stasiun</label><input type="text" value={data.jarak_stasiun} onChange={(e) => setData('jarak_stasiun', e.target.value)} className={inputCls} /></div>
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Jarak ke Bandara</label><input type="text" value={data.jarak_bandara} onChange={(e) => setData('jarak_bandara', e.target.value)} className={inputCls} /></div>
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Jarak ke RS</label><input type="text" value={data.jarak_rs} onChange={(e) => setData('jarak_rs', e.target.value)} className={inputCls} /></div>
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Jarak ke Sekolah</label><input type="text" value={data.jarak_sekolah} onChange={(e) => setData('jarak_sekolah', e.target.value)} className={inputCls} /></div>
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Jarak ke Pasar</label><input type="text" value={data.jarak_pasar} onChange={(e) => setData('jarak_pasar', e.target.value)} className={inputCls} /></div>
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Jarak ke Pusat Kota</label><input type="text" value={data.jarak_pusat_kota} onChange={(e) => setData('jarak_pusat_kota', e.target.value)} className={inputCls} /></div>
                        </div>
                    </div>

                    {/* 4.15 Khusus Tanah */}
                    {isTanah && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">4.15 Spesifikasi Khusus Tanah & Zonasi</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div><label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Tanah</label><input type="text" value={data.jenis_tanah} onChange={(e) => setData('jenis_tanah', e.target.value)} className={inputCls} /></div>
                                <div><label className="block text-xs font-semibold text-slate-700 mb-1">Peruntukan / Zonasi</label><input type="text" value={data.peruntukan_zonasi} onChange={(e) => setData('peruntukan_zonasi', e.target.value)} className={inputCls} /></div>
                                <div><label className="block text-xs font-semibold text-slate-700 mb-1">Akses Jalan Tanah</label><input type="text" value={data.akses_jalan_tanah} onChange={(e) => setData('akses_jalan_tanah', e.target.value)} className={inputCls} /></div>
                            </div>
                            <div className="pt-2">
                                <label className="block text-xs font-semibold text-slate-700 mb-2">Cocok Untuk:</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Rumah Tinggal', 'Kavling', 'Ruko', 'Restoran', 'Gudang', 'Investasi'].map((item) => {
                                        const isChecked = data.cocok_untuk_tanah.includes(item);
                                        return (
                                            <button type="button" key={item} onClick={() => toggleCocokTanah(item)}
                                                className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition ${isChecked ? 'bg-[#0070F3] text-white border-[#0070F3]' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                                                {item}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4.16 Khusus Komersial */}
                    {isKomersial && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">4.16 Spesifikasi Khusus Ruko & Komersial</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div><label className="block text-xs font-semibold text-slate-700 mb-1">Lebar Muka (meter)</label><input type="number" step="0.1" value={data.lebar_muka} onChange={(e) => setData('lebar_muka', e.target.value)} className={inputCls} /></div>
                                <div><label className="block text-xs font-semibold text-slate-700 mb-1">Area Parkir</label><input type="text" value={data.area_parkir} onChange={(e) => setData('area_parkir', e.target.value)} className={inputCls} /></div>
                            </div>
                            <div className="pt-2">
                                <label className="block text-xs font-semibold text-slate-700 mb-2">Cocok Untuk:</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Kantor', 'Toko / Resto', 'Klinik / Apotek', 'Gudang', 'Showroom', 'Jasa / Servis'].map((item) => {
                                        const isChecked = data.cocok_untuk_komersial.includes(item);
                                        return (
                                            <button type="button" key={item} onClick={() => toggleCocokKomersial(item)}
                                                className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition ${isChecked ? 'bg-[#0070F3] text-white border-[#0070F3]' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                                                {item}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4.12 / 4.13 / 4.17 Data Pengiklan & Kontak */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-[#002B7F] font-bold border-b border-slate-100 pb-3">
                            <User className="w-5 h-5 text-[#0070F3]" />
                            <h3 className="text-lg text-slate-900">4.12 & 4.17 Data Pengiklan & Preferensi Kontak</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Nama Pengiklan *</label><input type="text" value={data.nama_pengiklan} onChange={(e) => setData('nama_pengiklan', e.target.value)} className={inputCls} required /></div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Pengiklan *</label>
                                <select value={data.jenis_pengiklan} onChange={(e) => setData('jenis_pengiklan', e.target.value)} className={inputCls + ' font-semibold'}>
                                    <option value="Pemilik">Pemilik Langsung</option>
                                    <option value="Agen">Agen Properti</option>
                                    <option value="Broker">Broker Independent</option>
                                    <option value="Developer">Developer Perumahan</option>
                                    <option value="Perusahaan">Perusahaan</option>
                                    <option value="Investor">Investor</option>
                                    <option value="Pengelola">Pengelola / Manajer</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                            </div>
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">No WhatsApp *</label><input type="text" value={data.no_wa} onChange={(e) => setData('no_wa', e.target.value)} className={inputCls + ' font-semibold'} required /></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">No Telepon</label><input type="text" value={data.telepon} onChange={(e) => setData('telepon', e.target.value)} className={inputCls} /></div>
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Email</label><input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className={inputCls} /></div>
                            <div><label className="block text-xs font-semibold text-slate-700 mb-1">Nama Perusahaan</label><input type="text" value={data.nama_perusahaan} onChange={(e) => setData('nama_perusahaan', e.target.value)} className={inputCls} /></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Metode Kontak Utama *</label>
                                <select value={data.cara_dihubungi} onChange={(e) => setData('cara_dihubungi', e.target.value)} className={inputCls + ' font-semibold text-[#002B7F]'}>
                                    <option value="Chat TulungJual">Chat TulungJual</option>
                                    <option value="WA">WhatsApp</option>
                                    <option value="Telepon">Telepon Langsung</option>
                                    <option value="Email">Email</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Hubungan dg Properti *</label>
                                <select value={data.hubungan_dengan_properti} onChange={(e) => setData('hubungan_dengan_properti', e.target.value)} className={inputCls + ' font-semibold'}>
                                    <option value="Pemilik">Pemilik</option>
                                    <option value="Agen berkuasa">Agen Berkuasa</option>
                                    <option value="Broker">Broker</option>
                                    <option value="Developer">Developer</option>
                                    <option value="Pengelola">Pengelola</option>
                                    <option value="Kuasa Pemilik">Kuasa Pemilik</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Tampilkan No. Telepon?</label>
                                <select value={data.tampilkan_no_telepon ? '1' : '0'} onChange={(e) => setData('tampilkan_no_telepon', e.target.value === '1')} className={inputCls + ' font-semibold'}>
                                    <option value="1">Ya</option>
                                    <option value="0">Tidak</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 4.14 Khusus Developer (Kondisional) */}
                    {isDeveloper && (
                        <div className="bg-[#001F5C] text-white p-6 sm:p-8 rounded-3xl border border-blue-900 shadow-sm space-y-4">
                            <div className="flex items-center gap-2 text-[#FF8A00] font-bold border-b border-blue-900 pb-3">
                                <Building2 className="w-5 h-5" />
                                <h3 className="text-lg">4.14 Informasi Khusus Developer & Proyek</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Nama Developer</label><input type="text" value={data.nama_developer} onChange={(e) => setData('nama_developer', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" /></div>
                                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Nama Proyek / Cluster</label><input type="text" value={data.nama_proyek} onChange={(e) => setData('nama_proyek', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" /></div>
                                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Status Proyek</label><input type="text" value={data.status_proyek} onChange={(e) => setData('status_proyek', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" /></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Jumlah Total Unit</label><input type="number" value={data.jumlah_unit} onChange={(e) => setData('jumlah_unit', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" /></div>
                                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Unit Masih Tersedia</label><input type="number" value={data.unit_tersedia} onChange={(e) => setData('unit_tersedia', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" /></div>
                                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Tipe Unit</label><input type="text" value={data.tipe_unit} onChange={(e) => setData('tipe_unit', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" /></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Harga Mulai (Rp)</label><input type="number" value={data.harga_mulai} onChange={(e) => setData('harga_mulai', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" /></div>
                                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Skema DP</label><input type="text" value={data.dp} onChange={(e) => setData('dp', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" /></div>
                                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Estimasi Serah Terima</label><input type="text" value={data.estimasi_serah_terima} onChange={(e) => setData('estimasi_serah_terima', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" /></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Booking Fee (Rp)</label><input type="number" value={data.dev_booking_fee} onChange={(e) => setData('dev_booking_fee', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" /></div>
                                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Pilihan KPR</label><input type="text" value={data.pilihan_kpr} onChange={(e) => setData('pilihan_kpr', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" /></div>
                                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Bank Partner</label><input type="text" value={data.bank_partner} onChange={(e) => setData('bank_partner', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" /></div>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Fasilitas Cluster</label><input type="text" value={data.fasilitas_cluster} onChange={(e) => setData('fasilitas_cluster', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" /></div>
                                <div><label className="block text-xs font-semibold text-slate-300 mb-1">Link Video Marketing (YouTube / Drive)</label><input type="url" value={data.video_marketing_link} onChange={(e) => setData('video_marketing_link', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" /></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Site Plan {listing.developer_detail?.site_plan_url ? '(sudah ada — unggah untuk ganti)' : '(Gambar / PDF)'}</label>
                                    <input type="file" onChange={(e) => setData('site_plan_file', e.target.files[0])} className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0070F3] file:text-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Brosur {listing.developer_detail?.brosur_url ? '(sudah ada — unggah untuk ganti)' : 'PDF'}</label>
                                    <input type="file" accept=".pdf" onChange={(e) => setData('brosur_file', e.target.files[0])} className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0070F3] file:text-white" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Foto Management */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-[#002B7F] font-bold border-b border-slate-100 pb-3">
                            <ImageIcon className="w-5 h-5 text-[#0070F3]" />
                            <h3 className="text-lg text-slate-900">Kelola Foto Properti</h3>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-2">Foto Saat Ini ({existingPhotos.length} Foto):</label>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                                {existingPhotos.map((p, i) => (
                                    <div key={p.id || i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group">
                                        <img src={p.url_foto} alt="existing" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (confirm('Hapus foto ini?')) {
                                                    router.delete(`/iklan-saya/${listing.id}/photos/${p.id}`, { preserveScroll: true });
                                                }
                                            }}
                                            className="absolute top-1 right-1 w-6 h-6 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-md"
                                            title="Hapus foto ini"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="pt-2 border-t border-slate-100">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Tambah Foto Baru (Opsional)</label>
                            <input type="file" multiple accept="image/*" onChange={handleNewPhotosChange}
                                className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-[#0070F3] hover:file:bg-blue-100" />
                        </div>
                        {newPreviews.length > 0 && (
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-2">
                                {newPreviews.map((src, i) => (
                                    <div key={i} className="aspect-square rounded-xl overflow-hidden border border-[#0070F3]">
                                        <img src={src} alt="new-prev" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Video via Link */}
                        <div className="pt-4 border-t border-slate-100 space-y-3">
                            <div className="flex items-center gap-2 text-[#002B7F] font-bold">
                                <Video className="w-4 h-4 text-[#FF8A00]" />
                                <h4 className="text-sm text-slate-900">Video Properti (Link Embed — YouTube / Google Drive)</h4>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Video Walkthrough</label>
                                    <input type="url" placeholder="https://youtube.com/watch?v=..." value={data.link_video_walkthrough} onChange={(e) => setData('link_video_walkthrough', e.target.value)} className={inputCls} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Video Lingkungan</label>
                                    <input type="url" placeholder="https://youtu.be/..." value={data.link_video_lingkungan} onChange={(e) => setData('link_video_lingkungan', e.target.value)} className={inputCls} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Video Drone</label>
                                    <input type="url" placeholder="https://drive.google.com/..." value={data.link_video_drone} onChange={(e) => setData('link_video_drone', e.target.value)} className={inputCls} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3">
                        <Link href="/iklan-saya" className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl">Batal</Link>
                        <button type="submit" disabled={processing}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF8A00] hover:bg-[#e67a00] text-white font-black text-xs rounded-xl shadow-md transition disabled:opacity-60">
                            <Save className="w-4 h-4" /> {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
