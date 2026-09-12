import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import MapPicker from '@/Components/MapPicker';
import { useForm, Link } from '@inertiajs/react';
import { 
    PlusCircle, 
    Upload, 
    Trash2, 
    ShieldCheck, 
    MapPin, 
    Building2, 
    DollarSign, 
    Image as ImageIcon, 
    User, 
    Check,
    Building,
    FileText,
    Settings,
    PhoneCall,
    Share2,
    Compass,
    Wrench,
    AlertCircle,
    Video,
    Wallet
} from 'lucide-react';

export default function Create({ categories = [], payment = {} }) {
    const paymentEnabled = payment?.enabled !== false && payment?.enabled !== 0 && payment?.enabled !== '0';
    const { data, setData, post, processing, errors } = useForm({
        // 4.1 Informasi Dasar (wajib)
        jenis_iklan: 'Jual',
        jenis_properti: 'Rumah',
        judul: '',
        deskripsi: '',

        // 4.2 Harga & Transaksi
        harga: '',
        jenis_harga: 'Nego',
        bisa_nego: true,
        harga_promo: '',
        metode_pembayaran: 'Cash, KPR',
        booking_fee: '',

        // 4.3 Lokasi
        provinsi: 'Jawa Timur',
        kota: 'Kab. Tulungagung',
        kecamatan: '',
        kelurahan: '',
        kode_pos: '',
        alamat_lengkap: '',
        nama_jalan: '',
        nomor_jalan: '',
        patokan: '',
        titik_lat: -8.067,
        titik_lng: 111.901,
        privasi_lokasi: 'tepat',

        // 4.4 Data Fisik
        luas_tanah: '',
        luas_bangunan: '',
        lebar_tanah: '',
        panjang_tanah: '',
        jumlah_lantai: '1',
        kamar_tidur: '2',
        kamar_mandi: '1',
        toilet: '0',
        ruang_tamu: '1',
        ruang_keluarga: '1',
        ruang_makan: '1',
        dapur: '1',
        gudang: '0',
        balkon: '0',
        teras: '1',
        garasi: '0',
        carport: '1',
        kapasitas_parkir: '1',

        // 4.5 Spesifikasi Bangunan
        tahun_dibangun: new Date().getFullYear(),
        tahun_renovasi: '',
        kondisi_bangunan: 'Sangat Bagus',
        status_furnitur: 'Semi Furnished',
        material_struktur: 'Beton Bertulang',
        material_dinding: 'Bata Merah',
        material_lantai: 'Granit 60x60',
        material_atap: 'Baja Ringan & Genteng Beton',

        // 4.6 Fasilitas (multi-select)
        facilities: ['Carport', 'Taman', 'CCTV', 'One Gate System'],

        // 4.7 Utilitas
        daya_listrik: '1300 VA',
        jenis_meteran: 'Token (Prabayar)',
        sumber_air: 'PDAM',
        internet_jaringan: 'Fiber Optic',
        gas: 'Tabung LPG',

        // 4.8 Legalitas
        status_sertifikat: 'SHM - Sertifikat Hak Milik',
        nomor_sertifikat: '',
        nama_pemegang_hak: '',
        luas_sertifikat: '',
        status_sengketa: 'Bebas Sengketa',
        status_pbb: 'Lunas',
        tahun_pbb: new Date().getFullYear(),
        njop: '',
        status_pbg_imb: 'Ada (IMB/PBG)',

        // 4.9 Status Properti
        kondisi_saat_ini: 'Kosong',
        status_transaksi: 'Tersedia',

        // 4.10 Akses & Lingkungan
        lebar_jalan: '6 meter (2 mobil papasan)',
        jenis_jalan: 'Aspal',
        akses_mobil: true,
        akses_truk: false,
        jarak_tol: '15 Menit',
        jarak_stasiun: '10 Menit',
        jarak_bandara: '90 Menit',
        jarak_rs: '5 Menit',
        jarak_sekolah: '3 Menit',
        jarak_pasar: '5 Menit',
        jarak_pusat_kota: '5 Menit',
        orientasi: 'Utara',
        kontur_tanah: 'Datar',
        jenis_lingkungan: 'Perumahan Tenang',
        bebas_banjir: true,
        rawan_longsor: false,

        // 4.11 Foto & Video
        photos: [],
        link_video_walkthrough: '',
        link_video_lingkungan: '',
        link_video_drone: '',

        // 4.12 Data Pengiklan
        nama_pengiklan: '',
        jenis_pengiklan: 'Pemilik',
        no_wa: '',
        telepon: '',
        email: '',
        nama_perusahaan: '',

        // 4.13 Hubungan Pengiklan-Properti
        hubungan_dengan_properti: 'Pemilik',
        pernyataan_kewenangan: false,

        // 4.14 Khusus Developer
        nama_developer: '',
        nama_proyek: '',
        status_proyek: 'Tahap Penjualan & Pembangunan',
        jumlah_unit: '',
        unit_tersedia: '',
        tipe_unit: '',
        harga_mulai: '',
        dev_booking_fee: '',
        dp: '0%',
        pilihan_kpr: 'Mandiri, BCA, BRI, BNI, BTN',
        bank_partner: 'Bank Mandiri & BCA',
        estimasi_serah_terima: 'Desember 2026',
        fasilitas_cluster: 'Clubhouse, One Gate System, Playground, Security 24 Jam',
        site_plan_file: null,
        brosur_file: null,
        video_marketing_link: '',

        // 4.15 Khusus Tanah
        jenis_tanah: 'Darat / Pekarangan',
        peruntukan_zonasi: 'Komersial & Pemukiman',
        akses_jalan_tanah: 'Lebar 8m Asfal',
        cocok_untuk_tanah: ['Rumah Tinggal', 'Kavling', 'Ruko', 'Investasi'],

        // 4.16 Khusus Ruko/Komersial
        lebar_muka: '6.5',
        area_parkir: 'Luas Halaman Depan',
        cocok_untuk_komersial: ['Kantor', 'Toko / Resto', 'Klinik / Apotek'],

        // 4.17 Kontak & Privasi
        cara_dihubungi: 'WA',
        tampilkan_no_telepon: true,

        // 4.18 Persetujuan (3 checkbox wajib)
        setuju_sk: false,
        setuju_benar: false,
        setuju_platform: false,

        // 4.19 Bukti Pembayaran
        payment_proof_file: null,
        payment_method: '',
        payment_sender_name: '',
    });

    const [previewPhotos, setPreviewPhotos] = React.useState([]);

    const formatRupiah = (val) => {
        if (!val) return 'Rp 0';
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
    };

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const updated = [...data.photos, ...files];
            setData('photos', updated);
            const previews = updated.map((file) => URL.createObjectURL(file));
            setPreviewPhotos(previews);
        }
    };

    const removePhoto = (index) => {
        const updated = data.photos.filter((_, i) => i !== index);
        setData('photos', updated);
        const previews = updated.map((file) => URL.createObjectURL(file));
        setPreviewPhotos(previews);
    };

    const toggleFacility = (fac) => {
        let updated = [...data.facilities];
        if (updated.includes(fac)) {
            updated = updated.filter((f) => f !== fac);
        } else {
            updated.push(fac);
        }
        setData('facilities', updated);
    };

    const toggleCocokTanah = (item) => {
        let updated = [...data.cocok_untuk_tanah];
        if (updated.includes(item)) {
            updated = updated.filter((i) => i !== item);
        } else {
            updated.push(item);
        }
        setData('cocok_untuk_tanah', updated);
    };

    const toggleCocokKomersial = (item) => {
        let updated = [...data.cocok_untuk_komersial];
        if (updated.includes(item)) {
            updated = updated.filter((i) => i !== item);
        } else {
            updated.push(item);
        }
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

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/pasang-iklan', {
            forceFormData: true,
        });
    };

    const isAllAgreed = data.setuju_sk && data.setuju_benar && data.setuju_platform;
    const isPaymentReady = !paymentEnabled || !!data.payment_proof_file;
    const canSubmit = isAllAgreed && isPaymentReady;

    return (
        <AppLayout title="Pasang Iklan Properti - TulungJual.id">
            <div className="bg-[#002B7F] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-blue-900">
                <div className="max-w-4xl mx-auto">
                    <span className="px-3.5 py-1 bg-[#FF8A00] text-white font-bold text-xs rounded-full inline-block mb-2">
                        Formulir Terpadu 18 Seksi (Sesuai Spesifikasi Properti)
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-black">Pasang Iklan Properti Baru</h1>
                    <p className="text-blue-100 text-sm mt-1">
                        Isi informasi properti Anda secara rinci agar tampil menonjol dan menarik calon pembeli/penyewa potensial.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* 4.1 Informasi Dasar */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-[#002B7F] font-bold border-b border-slate-100 pb-3">
                            <Building2 className="w-5 h-5 text-[#0070F3]" />
                            <h3 className="text-lg text-slate-900">4.1 Informasi Dasar (Wajib)</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Iklan *</label>
                                <select 
                                    value={data.jenis_iklan} 
                                    onChange={(e) => setData('jenis_iklan', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl font-semibold text-[#002B7F] bg-blue-50/50"
                                >
                                    <option value="Jual">Jual</option>
                                    <option value="Sewa">Sewa</option>
                                    <option value="Jual & Sewa">Jual & Sewa</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Properti *</label>
                                <select 
                                    value={data.jenis_properti} 
                                    onChange={(e) => setData('jenis_properti', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl font-semibold text-slate-900"
                                >
                                    {categories.map((c) => (
                                        <option key={c.id} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Iklan *</label>
                            <input 
                                type="text" 
                                placeholder="Contoh: Rumah Minimalis Modern 2 Lantai Siap Huni di Pusat Kota" 
                                value={data.judul} 
                                onChange={(e) => setData('judul', e.target.value)}
                                className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-[#0070F3]"
                                required
                            />
                            {errors.judul && <p className="text-xs text-rose-600 mt-1">{errors.judul}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Lengkap *</label>
                            <textarea 
                                rows={5} 
                                placeholder="Jelaskan keunggulan, pencahayaan, keamanan, akses transportasi, serta alasan dijual/disewakan..." 
                                value={data.deskripsi} 
                                onChange={(e) => setData('deskripsi', e.target.value)}
                                className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-[#0070F3]"
                                required
                            />
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
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Harga Penawaran (Rp) *</label>
                                <input 
                                    type="number" 
                                    placeholder="850000000" 
                                    value={data.harga} 
                                    onChange={(e) => setData('harga', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl font-bold text-[#002B7F]"
                                    required
                                />
                                {errors.harga && <p className="text-xs text-rose-600 mt-1">{errors.harga}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Harga *</label>
                                <select 
                                    value={data.jenis_harga} 
                                    onChange={(e) => setData('jenis_harga', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                >
                                    <option value="Nego">Nego</option>
                                    <option value="Nett">Nett (Pas)</option>
                                    <option value="Per Meter">Per Meter</option>
                                    <option value="Per Tahun">Per Tahun (Sewa)</option>
                                    <option value="Per Bulan">Per Bulan (Sewa)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Bisa Nego? *</label>
                                <select 
                                    value={data.bisa_nego ? '1' : '0'} 
                                    onChange={(e) => setData('bisa_nego', e.target.value === '1')}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                >
                                    <option value="1">Ya (Bisa Nego)</option>
                                    <option value="0">Tidak (Harga Pas)</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Harga Promo (Opsional)</label>
                                <input 
                                    type="number" 
                                    placeholder="820000000" 
                                    value={data.harga_promo} 
                                    onChange={(e) => setData('harga_promo', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Metode Pembayaran</label>
                                <input 
                                    type="text" 
                                    placeholder="Cash, KPR, Bertahap" 
                                    value={data.metode_pembayaran} 
                                    onChange={(e) => setData('metode_pembayaran', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Booking Fee (Opsional)</label>
                                <input 
                                    type="number" 
                                    placeholder="10000000" 
                                    value={data.booking_fee} 
                                    onChange={(e) => setData('booking_fee', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 4.3 Lokasi & Map Picker */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-[#002B7F] font-bold border-b border-slate-100 pb-3">
                            <MapPin className="w-5 h-5 text-[#0070F3]" />
                            <h3 className="text-lg text-slate-900">4.3 Alamat & Titik Maps Properti</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Provinsi *</label>
                                <input 
                                    type="text" 
                                    value={data.provinsi} 
                                    onChange={(e) => setData('provinsi', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Kota / Kabupaten *</label>
                                <input 
                                    type="text" 
                                    value={data.kota} 
                                    onChange={(e) => setData('kota', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Kecamatan *</label>
                                <input 
                                    type="text" 
                                    placeholder="Kedungwaru" 
                                    value={data.kecamatan} 
                                    onChange={(e) => setData('kecamatan', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Kelurahan *</label>
                                <input 
                                    type="text" 
                                    placeholder="Banjarsari" 
                                    value={data.kelurahan} 
                                    onChange={(e) => setData('kelurahan', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat Lengkap *</label>
                            <textarea 
                                rows={2} 
                                placeholder="Alamat lengkap lokasi properti..." 
                                value={data.alamat_lengkap} 
                                onChange={(e) => setData('alamat_lengkap', e.target.value)}
                                className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Jalan / Blok</label>
                                <input 
                                    type="text" 
                                    placeholder="Jl. Pahlawan" 
                                    value={data.nama_jalan} 
                                    onChange={(e) => setData('nama_jalan', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Patokan Lokasi</label>
                                <input 
                                    type="text" 
                                    placeholder="Depan SPBU / Masjid" 
                                    value={data.patokan} 
                                    onChange={(e) => setData('patokan', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Privasi Pin Lokasi *</label>
                                <select 
                                    value={data.privasi_lokasi} 
                                    onChange={(e) => setData('privasi_lokasi', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl font-semibold text-[#002B7F] bg-blue-50/50"
                                >
                                    <option value="tepat">Lokasi Tepat (Pin Presisi Alamat)</option>
                                    <option value="perkiraan">Lokasi Perkiraan (Privasi Radius Area)</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor Rumah / Kavling</label>
                                <input 
                                    type="text" 
                                    placeholder="No. 45" 
                                    value={data.nomor_jalan} 
                                    onChange={(e) => setData('nomor_jalan', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Kode Pos</label>
                                <input 
                                    type="text" 
                                    placeholder="66224" 
                                    value={data.kode_pos} 
                                    onChange={(e) => setData('kode_pos', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Interactive Leaflet Map Picker */}
                        <div className="pt-2">
                            <label className="block text-xs font-semibold text-slate-700 mb-2">Tentukan Koordinat Maps</label>
                            <MapPicker
                                lat={data.titik_lat}
                                lng={data.titik_lng}
                                onSelectLocation={(lat, lng) => {
                                    setData({
                                        ...data,
                                        titik_lat: lat,
                                        titik_lng: lng,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    {/* 4.4 Data Fisik Properti Complete */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="text-lg font-bold text-slate-900">4.4 Data Fisik Properti</h3>
                            <span className="text-xs text-slate-500 font-medium">Kategori: {data.jenis_properti}</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Luas Tanah (m²) *</label>
                                <input 
                                    type="number" 
                                    placeholder="120" 
                                    value={data.luas_tanah} 
                                    onChange={(e) => setData('luas_tanah', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl font-bold text-[#002B7F]"
                                    required
                                />
                            </div>
                            {!isTanah && (
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Luas Bangunan (m²)</label>
                                    <input 
                                        type="number" 
                                        placeholder="150" 
                                        value={data.luas_bangunan} 
                                        onChange={(e) => setData('luas_bangunan', e.target.value)}
                                        className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Panjang Tanah (m)</label>
                                <input 
                                    type="number" 
                                    placeholder="15" 
                                    value={data.panjang_tanah} 
                                    onChange={(e) => setData('panjang_tanah', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Lebar Tanah (m)</label>
                                <input 
                                    type="number" 
                                    placeholder="8" 
                                    value={data.lebar_tanah} 
                                    onChange={(e) => setData('lebar_tanah', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                />
                            </div>
                        </div>

                        {!isTanah && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Jumlah Lantai</label>
                                    <input type="number" value={data.jumlah_lantai} onChange={(e) => setData('jumlah_lantai', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Kamar Tidur</label>
                                    <input type="number" value={data.kamar_tidur} onChange={(e) => setData('kamar_tidur', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Kamar Mandi</label>
                                    <input type="number" value={data.kamar_mandi} onChange={(e) => setData('kamar_mandi', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Toilet Khusus</label>
                                    <input type="number" value={data.toilet} onChange={(e) => setData('toilet', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Ruang Tamu</label>
                                    <input type="number" value={data.ruang_tamu} onChange={(e) => setData('ruang_tamu', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Ruang Keluarga</label>
                                    <input type="number" value={data.ruang_keluarga} onChange={(e) => setData('ruang_keluarga', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Ruang Makan</label>
                                    <input type="number" value={data.ruang_makan} onChange={(e) => setData('ruang_makan', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Dapur</label>
                                    <input type="number" value={data.dapur} onChange={(e) => setData('dapur', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Gudang</label>
                                    <input type="number" value={data.gudang} onChange={(e) => setData('gudang', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Balkon</label>
                                    <input type="number" value={data.balkon} onChange={(e) => setData('balkon', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Teras</label>
                                    <input type="number" value={data.teras} onChange={(e) => setData('teras', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Carport</label>
                                    <input type="number" value={data.carport} onChange={(e) => setData('carport', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Garasi</label>
                                    <input type="number" value={data.garasi} onChange={(e) => setData('garasi', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Kapasitas Parkir</label>
                                    <input type="number" value={data.kapasitas_parkir} onChange={(e) => setData('kapasitas_parkir', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 4.5 Spesifikasi Bangunan Complete */}
                    {!isTanah && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                                4.5 Spesifikasi Bangunan & Material
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Tahun Dibangun</label>
                                    <input type="number" placeholder="2022" value={data.tahun_dibangun} onChange={(e) => setData('tahun_dibangun', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Tahun Renovasi (Opsional)</label>
                                    <input type="number" placeholder="2024" value={data.tahun_renovasi} onChange={(e) => setData('tahun_renovasi', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Kondisi Bangunan *</label>
                                    <select 
                                        value={data.kondisi_bangunan} 
                                        onChange={(e) => setData('kondisi_bangunan', e.target.value)}
                                        className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                    >
                                        <option value="Sangat Bagus">Sangat Bagus / Baru</option>
                                        <option value="Bagus">Bagus Siap Huni</option>
                                        <option value="Butuh Renovasi">Butuh Renovasi</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Status Furnitur</label>
                                    <select 
                                        value={data.status_furnitur} 
                                        onChange={(e) => setData('status_furnitur', e.target.value)}
                                        className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                    >
                                        <option value="Unfurnished">Unfurnished (Kosong)</option>
                                        <option value="Semi Furnished">Semi Furnished</option>
                                        <option value="Full Furnished">Full Furnished</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Material Struktur</label>
                                    <input 
                                        type="text" 
                                        value={data.material_struktur} 
                                        onChange={(e) => setData('material_struktur', e.target.value)}
                                        className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Material Dinding</label>
                                    <input type="text" placeholder="Bata Merah / Hebel" value={data.material_dinding} onChange={(e) => setData('material_dinding', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Material Lantai</label>
                                    <input type="text" placeholder="Granit 60x60 / Keramik" value={data.material_lantai} onChange={(e) => setData('material_lantai', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Material Atap</label>
                                    <input type="text" placeholder="Baja Ringan & Genteng" value={data.material_atap} onChange={(e) => setData('material_atap', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4.6 Fasilitas (Multi-Select) */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                            4.6 Fasilitas Properti
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {facilityList.map((fac) => {
                                const isChecked = data.facilities.includes(fac);
                                return (
                                    <button
                                        type="button"
                                        key={fac}
                                        onClick={() => toggleFacility(fac)}
                                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition ${
                                            isChecked 
                                                ? 'bg-blue-50 border-[#0070F3] text-[#002B7F] shadow-sm' 
                                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                        }`}
                                    >
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${isChecked ? 'bg-[#0070F3] border-[#0070F3] text-white' : 'border-slate-300 bg-white'}`}>
                                            {isChecked && <Check className="w-3 h-3" />}
                                        </div>
                                        <span>{fac}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 4.7 Utilitas & Daya */}
                    {!isTanah && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                                4.7 Utilitas & Sumber Daya
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Daya Listrik</label>
                                    <input type="text" value={data.daya_listrik} onChange={(e) => setData('daya_listrik', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Meteran</label>
                                    <select value={data.jenis_meteran} onChange={(e) => setData('jenis_meteran', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl">
                                        <option value="Token (Prabayar)">Token (Prabayar)</option>
                                        <option value="Pascabayar">Pascabayar</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Sumber Air</label>
                                    <input type="text" value={data.sumber_air} onChange={(e) => setData('sumber_air', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Internet & Jaringan</label>
                                    <input type="text" value={data.internet_jaringan} onChange={(e) => setData('internet_jaringan', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Gas</label>
                                    <input type="text" placeholder="Tabung LPG / Pipa Gas" value={data.gas} onChange={(e) => setData('gas', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4.8 Legalitas & Dokumen (Sensitif) */}
                    <div className="bg-[#001F5C] text-white p-6 sm:p-8 rounded-3xl border border-blue-900 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-blue-900 pb-3">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-[#FF8A00]" />
                                <h3 className="text-lg font-bold">4.8 Legalitas & Keamanan Dokumen</h3>
                            </div>
                            <span className="text-[11px] px-3 py-1 bg-[#FF8A00] text-white rounded-full font-bold">
                                Protected / Hidden Public
                            </span>
                        </div>

                        <div className="p-3 bg-blue-950/60 rounded-xl text-xs text-blue-200 border border-blue-800">
                            <strong>Garansi Privasi:</strong> Nomor Sertifikat & Nama Pemegang Hak HANYA disimpan di database internal dan TIDAK akan pernah dirender pada halaman/API publik (Hanya visible di Admin Panel).
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-blue-200 mb-1">Status Sertifikat *</label>
                                <select 
                                    value={data.status_sertifikat} 
                                    onChange={(e) => setData('status_sertifikat', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 bg-[#001238] border border-blue-800 rounded-xl text-white font-semibold"
                                >
                                    <option value="SHM - Sertifikat Hak Milik">SHM - Sertifikat Hak Milik</option>
                                    <option value="HGB - Hak Guna Bangunan">HGB - Hak Guna Bangunan</option>
                                    <option value="HP - Hak Pakai">HP - Hak Pakai</option>
                                    <option value="PPJB">PPJB / Akta Jual Beli</option>
                                    <option value="Girik / Letter C">Girik / Letter C</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-blue-200 mb-1">Status Sengketa *</label>
                                <select 
                                    value={data.status_sengketa} 
                                    onChange={(e) => setData('status_sengketa', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 bg-[#001238] border border-blue-800 rounded-xl text-white font-semibold"
                                >
                                    <option value="Bebas Sengketa">Bebas Sengketa</option>
                                    <option value="Dalam Proses Hibah/Waris">Dalam Proses Hibah/Waris</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-blue-200 mb-1">Status PBB & PBG/IMB</label>
                                <input type="text" placeholder="PBB Lunas / IMB Ada" value={data.status_pbb} onChange={(e) => setData('status_pbb', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-[#001238] border border-blue-800 rounded-xl text-white" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div>
                                <label className="block text-xs font-semibold text-blue-200 mb-1">Nomor Sertifikat (Rahasia - Khusus Admin)</label>
                                <input 
                                    type="text" 
                                    placeholder="Nomor SHM / HGB" 
                                    value={data.nomor_sertifikat} 
                                    onChange={(e) => setData('nomor_sertifikat', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 bg-[#001238] border border-blue-800 rounded-xl text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-blue-200 mb-1">Nama Pemegang Hak (Rahasia - Khusus Admin)</label>
                                <input 
                                    type="text" 
                                    placeholder="Nama di Sertifikat" 
                                    value={data.nama_pemegang_hak} 
                                    onChange={(e) => setData('nama_pemegang_hak', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 bg-[#001238] border border-blue-800 rounded-xl text-white"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                            <div>
                                <label className="block text-xs font-semibold text-blue-200 mb-1">Luas Sertifikat (m²)</label>
                                <input type="number" placeholder="120" value={data.luas_sertifikat} onChange={(e) => setData('luas_sertifikat', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-[#001238] border border-blue-800 rounded-xl text-white" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-blue-200 mb-1">Tahun PBB</label>
                                <input type="number" placeholder="2025" value={data.tahun_pbb} onChange={(e) => setData('tahun_pbb', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-[#001238] border border-blue-800 rounded-xl text-white" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-blue-200 mb-1">NJOP (Rp)</label>
                                <input type="number" placeholder="450000000" value={data.njop} onChange={(e) => setData('njop', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-[#001238] border border-blue-800 rounded-xl text-white" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-blue-200 mb-1">Status PBG / IMB</label>
                                <input type="text" placeholder="Ada (IMB 2022)" value={data.status_pbg_imb} onChange={(e) => setData('status_pbg_imb', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-[#001238] border border-blue-800 rounded-xl text-white" />
                            </div>
                        </div>
                    </div>

                    {/* 4.9 Status Properti */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                            4.9 Status Hunian Saat Ini
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Kondisi Penggunaan Saat Ini *</label>
                                <select value={data.kondisi_saat_ini} onChange={(e) => setData('kondisi_saat_ini', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl">
                                    <option value="Kosong">Kosong (Tidak Dihuni)</option>
                                    <option value="Ditempati Pemilik">Ditempati Pemilik</option>
                                    <option value="Disewa Pihak Lain">Disewa Pihak Lain</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Status Ketersediaan *</label>
                                <select value={data.status_transaksi} onChange={(e) => setData('status_transaksi', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl font-bold text-[#002B7F]">
                                    <option value="Tersedia">Tersedia</option>
                                    <option value="Booking">Booking (DP Masuk)</option>
                                    <option value="Terjual">Terjual</option>
                                    <option value="Tersewa">Tersewa</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 4.10 Akses & Lingkungan & Jarak Lokasi */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                            4.10 Akses, Lingkungan & Jarak Fasilitas Umum
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Lebar Jalan</label>
                                <input type="text" placeholder="6 meter" value={data.lebar_jalan} onChange={(e) => setData('lebar_jalan', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Jalan</label>
                                <select value={data.jenis_jalan} onChange={(e) => setData('jenis_jalan', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl">
                                    <option value="Aspal">Aspal</option>
                                    <option value="Paving">Paving</option>
                                    <option value="Beton">Beton</option>
                                    <option value="Tanah / Makadam">Tanah / Makadam</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Orientasi Hadap</label>
                                <select value={data.orientasi} onChange={(e) => setData('orientasi', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl">
                                    <option value="Utara">Utara</option>
                                    <option value="Selatan">Selatan</option>
                                    <option value="Timur">Timur</option>
                                    <option value="Barat">Barat</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Kontur Tanah</label>
                                <select value={data.kontur_tanah} onChange={(e) => setData('kontur_tanah', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl">
                                    <option value="Datar">Datar</option>
                                    <option value="Miring">Miring</option>
                                    <option value="Berbukit">Berbukit</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Akses Mobil</label>
                                <select value={data.akses_mobil ? '1' : '0'} onChange={(e) => setData('akses_mobil', e.target.value === '1')} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl">
                                    <option value="1">Ya</option>
                                    <option value="0">Tidak</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Akses Truk</label>
                                <select value={data.akses_truk ? '1' : '0'} onChange={(e) => setData('akses_truk', e.target.value === '1')} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl">
                                    <option value="1">Ya</option>
                                    <option value="0">Tidak</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Lingkungan</label>
                                <input type="text" placeholder="Perumahan Tenang" value={data.jenis_lingkungan} onChange={(e) => setData('jenis_lingkungan', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Bebas Banjir</label>
                                <select value={data.bebas_banjir ? '1' : '0'} onChange={(e) => setData('bebas_banjir', e.target.value === '1')} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl">
                                    <option value="1">Ya</option>
                                    <option value="0">Tidak</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Rawan Longsor</label>
                                <select value={data.rawan_longsor ? '1' : '0'} onChange={(e) => setData('rawan_longsor', e.target.value === '1')} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl">
                                    <option value="0">Tidak</option>
                                    <option value="1">Ya</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Jarak ke Bandara</label>
                                <input type="text" value={data.jarak_bandara} onChange={(e) => setData('jarak_bandara', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Jarak ke Pasar</label>
                                <input type="text" value={data.jarak_pasar} onChange={(e) => setData('jarak_pasar', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Jarak ke Pusat Kota</label>
                                <input type="text" value={data.jarak_pusat_kota} onChange={(e) => setData('jarak_pusat_kota', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Jarak ke Tol</label>
                                <input type="text" value={data.jarak_tol} onChange={(e) => setData('jarak_tol', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Jarak ke Stasiun</label>
                                <input type="text" value={data.jarak_stasiun} onChange={(e) => setData('jarak_stasiun', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Jarak ke Rumah Sakit</label>
                                <input type="text" value={data.jarak_rs} onChange={(e) => setData('jarak_rs', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Jarak ke Sekolah</label>
                                <input type="text" value={data.jarak_sekolah} onChange={(e) => setData('jarak_sekolah', e.target.value)} className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl" />
                            </div>
                        </div>
                    </div>

                    {/* 4.14 Khusus Developer (Kondisional) */}
                    {isDeveloper && (
                        <div className="bg-[#001F5C] text-white p-6 sm:p-8 rounded-3xl border border-blue-900 shadow-sm space-y-4">
                            <div className="flex items-center gap-2 text-[#FF8A00] font-bold border-b border-blue-900 pb-3">
                                <Building className="w-5 h-5" />
                                <h3 className="text-lg">4.14 Informasi Khusus Developer & Proyek</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Developer</label>
                                    <input type="text" value={data.nama_developer} onChange={(e) => setData('nama_developer', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Proyek / Cluster</label>
                                    <input type="text" value={data.nama_proyek} onChange={(e) => setData('nama_proyek', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Status Proyek</label>
                                    <input type="text" placeholder="Tahap Penjualan & Pembangunan" value={data.status_proyek} onChange={(e) => setData('status_proyek', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Jumlah Total Unit</label>
                                    <input type="number" placeholder="50" value={data.jumlah_unit} onChange={(e) => setData('jumlah_unit', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Unit Masih Tersedia</label>
                                    <input type="number" placeholder="18" value={data.unit_tersedia} onChange={(e) => setData('unit_tersedia', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Tipe Unit</label>
                                    <input type="text" placeholder="Tipe 45/90, 70/120" value={data.tipe_unit} onChange={(e) => setData('tipe_unit', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Harga Mulai (Rp)</label>
                                    <input type="number" placeholder="650000000" value={data.harga_mulai} onChange={(e) => setData('harga_mulai', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Skema DP & Booking</label>
                                    <input type="text" placeholder="DP 0% / Booking 5jt" value={data.dp} onChange={(e) => setData('dp', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Estimasi Serah Terima</label>
                                    <input type="text" placeholder="Desember 2026" value={data.estimasi_serah_terima} onChange={(e) => setData('estimasi_serah_terima', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Booking Fee (Rp)</label>
                                    <input type="number" placeholder="5000000" value={data.dev_booking_fee} onChange={(e) => setData('dev_booking_fee', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Pilihan KPR</label>
                                    <input type="text" placeholder="KPR / Cash Bertahap" value={data.pilihan_kpr} onChange={(e) => setData('pilihan_kpr', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Bank Partner</label>
                                    <input type="text" placeholder="Mandiri, BCA, BRI, BNI" value={data.bank_partner} onChange={(e) => setData('bank_partner', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 pt-1">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Fasilitas Cluster</label>
                                    <input type="text" placeholder="Clubhouse, One Gate System, Playground, Security 24 Jam" value={data.fasilitas_cluster} onChange={(e) => setData('fasilitas_cluster', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Link Video Marketing (YouTube / Drive)</label>
                                    <input type="url" placeholder="https://youtube.com/watch?v=..." value={data.video_marketing_link} onChange={(e) => setData('video_marketing_link', e.target.value)} className="w-full text-xs px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Upload File Site Plan (Gambar / PDF)</label>
                                    <input type="file" onChange={(e) => setData('site_plan_file', e.target.files[0])} className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0070F3] file:text-white" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">Upload Brosur PDF Project</label>
                                    <input type="file" accept=".pdf" onChange={(e) => setData('brosur_file', e.target.files[0])} className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0070F3] file:text-white" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4.15 Khusus Tanah (Kondisional) */}
                    {isTanah && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                                4.15 Spesifikasi Khusus Tanah & Zonasi
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Tanah</label>
                                    <input type="text" value={data.jenis_tanah} onChange={(e) => setData('jenis_tanah', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Peruntukan / Zonasi</label>
                                    <input type="text" value={data.peruntukan_zonasi} onChange={(e) => setData('peruntukan_zonasi', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Akses Jalan Tanah</label>
                                    <input type="text" placeholder="Lebar 8m Asfal" value={data.akses_jalan_tanah} onChange={(e) => setData('akses_jalan_tanah', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl" />
                                </div>
                            </div>
                            <div className="pt-2">
                                <label className="block text-xs font-semibold text-slate-700 mb-2">Cocok Untuk (Pilih Semua yang Berfungsi):</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Rumah Tinggal', 'Kavling', 'Ruko', 'Restoran', 'Gudang', 'Investasi'].map((item) => {
                                        const isChecked = data.cocok_untuk_tanah.includes(item);
                                        return (
                                            <button
                                                type="button"
                                                key={item}
                                                onClick={() => toggleCocokTanah(item)}
                                                className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition ${
                                                    isChecked ? 'bg-[#0070F3] text-white border-[#0070F3]' : 'bg-slate-100 text-slate-700 border-slate-200'
                                                }`}
                                            >
                                                {item}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4.16 Khusus Ruko & Komersial (Kondisional) */}
                    {isKomersial && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                                4.16 Spesifikasi Khusus Ruko & Properti Komersial
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Lebar Muka (meter)</label>
                                    <input type="number" step="0.1" value={data.lebar_muka} onChange={(e) => setData('lebar_muka', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Area Parkir</label>
                                    <input type="text" value={data.area_parkir} onChange={(e) => setData('area_parkir', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl" />
                                </div>
                            </div>
                            <div className="pt-2">
                                <label className="block text-xs font-semibold text-slate-700 mb-2">Cocok Untuk (Pilih Semua yang Berfungsi):</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Kantor', 'Toko / Resto', 'Klinik / Apotek', 'Gudang', 'Showroom', 'Jasa / Servis'].map((item) => {
                                        const isChecked = data.cocok_untuk_komersial.includes(item);
                                        return (
                                            <button
                                                type="button"
                                                key={item}
                                                onClick={() => toggleCocokKomersial(item)}
                                                className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition ${
                                                    isChecked ? 'bg-[#0070F3] text-white border-[#0070F3]' : 'bg-slate-100 text-slate-700 border-slate-200'
                                                }`}
                                            >
                                                {item}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4.11 Foto & Video (Min 5 Wajib Foto) */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-[#002B7F] font-bold border-b border-slate-100 pb-3">
                            <ImageIcon className="w-5 h-5 text-[#0070F3]" />
                            <h3 className="text-lg text-slate-900">4.11 Upload Foto (Minimal 5 Foto) & Embed Video</h3>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Upload Foto Properti (Minimal 5 Foto) *</label>
                            <input 
                                type="file" 
                                multiple 
                                accept="image/*" 
                                onChange={handlePhotoChange}
                                className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-[#0070F3] hover:file:bg-blue-100"
                            />
                            {errors.photos && <p className="text-xs text-rose-600 mt-1">{errors.photos}</p>}
                        </div>

                        {previewPhotos.length > 0 && (
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-2">
                                {previewPhotos.map((src, i) => (
                                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group">
                                        <img src={src} alt="prev" className="w-full h-full object-cover" />
                                        <button 
                                            type="button" 
                                            onClick={() => removePhoto(i)}
                                            className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-full opacity-80 hover:opacity-100"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Video via Link (embed YouTube/Drive) */}
                        <div className="pt-4 border-t border-slate-100 space-y-3">
                            <div className="flex items-center gap-2 text-[#002B7F] font-bold">
                                <Video className="w-4 h-4 text-[#FF8A00]" />
                                <h4 className="text-sm text-slate-900">Video Properti (Link Embed — YouTube / Google Drive)</h4>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Video Walkthrough</label>
                                    <input type="url" placeholder="https://youtube.com/watch?v=..." value={data.link_video_walkthrough} onChange={(e) => setData('link_video_walkthrough', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-[#0070F3]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Video Lingkungan</label>
                                    <input type="url" placeholder="https://youtu.be/..." value={data.link_video_lingkungan} onChange={(e) => setData('link_video_lingkungan', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-[#0070F3]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Video Drone</label>
                                    <input type="url" placeholder="https://drive.google.com/..." value={data.link_video_drone} onChange={(e) => setData('link_video_drone', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-[#0070F3]" />
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-500">* Tempel tautan video (tanpa upload file). Hanya domain YouTube & Google Drive yang akan di-embed otomatis.</p>
                        </div>
                    </div>

                    {/* 4.12 & 4.13 & 4.17 Data Pengiklan & Privasi Kontak */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-[#002B7F] font-bold border-b border-slate-100 pb-3">
                            <User className="w-5 h-5 text-[#0070F3]" />
                            <h3 className="text-lg text-slate-900">4.12 & 4.17 Data Pengiklan & Preferensi Kontak</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Pengiklan *</label>
                                <input 
                                    type="text" 
                                    value={data.nama_pengiklan} 
                                    onChange={(e) => setData('nama_pengiklan', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl font-semibold"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Jenis Pengiklan *</label>
                                <select 
                                    value={data.jenis_pengiklan} 
                                    onChange={(e) => setData('jenis_pengiklan', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl font-semibold"
                                >
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
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">No WhatsApp Active *</label>
                                <input 
                                    type="text" 
                                    placeholder="08123456789" 
                                    value={data.no_wa} 
                                    onChange={(e) => setData('no_wa', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl font-semibold"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">No Telepon (Opsional)</label>
                                <input 
                                    type="text" 
                                    placeholder="0355-xxxxxx" 
                                    value={data.telepon} 
                                    onChange={(e) => setData('telepon', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Email (Opsional)</label>
                                <input 
                                    type="email" 
                                    placeholder="email@contoh.com" 
                                    value={data.email} 
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Perusahaan (Opsional)</label>
                                <input 
                                    type="text" 
                                    placeholder="PT Contoh Properti" 
                                    value={data.nama_perusahaan} 
                                    onChange={(e) => setData('nama_perusahaan', e.target.value)}
                                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Metode Kontak Utama *</label>
                                <select value={data.cara_dihubungi} onChange={(e) => setData('cara_dihubungi', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl font-semibold text-[#002B7F] bg-blue-50/50">
                                    <option value="Chat TulungJual">Chat TulungJual</option>
                                    <option value="WA">WhatsApp</option>
                                    <option value="Telepon">Telepon Langsung</option>
                                    <option value="Email">Email</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Hubungan Pengiklan dengan Properti *</label>
                                <select value={data.hubungan_dengan_properti} onChange={(e) => setData('hubungan_dengan_properti', e.target.value)} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl font-semibold">
                                    <option value="Pemilik">Pemilik</option>
                                    <option value="Agen berkuasa">Agen Berkuasa</option>
                                    <option value="Broker">Broker</option>
                                    <option value="Developer">Developer</option>
                                    <option value="Pengelola">Pengelola</option>
                                    <option value="Kuasa Pemilik">Kuasa Pemilik</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Tampilkan Nomor Telepon di Publik? *</label>
                                <select value={data.tampilkan_no_telepon ? '1' : '0'} onChange={(e) => setData('tampilkan_no_telepon', e.target.value === '1')} className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl font-semibold">
                                    <option value="1">Ya (Tampilkan No. Telepon)</option>
                                    <option value="0">Tidak (Sembunyikan No. Telepon)</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-2">
                            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-800">
                                <input 
                                    type="checkbox" 
                                    checked={data.pernyataan_kewenangan} 
                                    onChange={(e) => setData('pernyataan_kewenangan', e.target.checked)}
                                    className="rounded border-slate-300 text-[#0070F3] focus:ring-[#0070F3]"
                                    required
                                />
                                <span>Saya menyatakan secara sah memiliki hak/kewenangan atas pemasaran properti ini. *</span>
                            </label>
                        </div>
                    </div>

                    {/* 4.19 Bukti Pembayaran */}
                    {paymentEnabled && (
                        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <div className="flex items-center gap-2 text-[#002B7F] font-bold border-b border-slate-100 pb-3">
                                <Wallet className="w-5 h-5 text-[#FF8A00]" />
                                <h3 className="text-lg text-slate-900">4.19 Bukti Pembayaran (Wajib)</h3>
                            </div>

                            {/* Instruksi Transfer */}
                            <div className="bg-[#001F5C] text-white rounded-2xl p-5 space-y-3">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-xs text-blue-200">Nominal Wajib Transfer</span>
                                    <span className="text-lg font-black text-[#FF8A00]">
                                        {formatRupiah(payment?.amount || 0)}
                                    </span>
                                </div>
                                <div className="pt-3 border-t border-blue-900 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                                    <div>
                                        <span className="text-blue-300 block text-[10px]">Bank</span>
                                        <span className="font-bold">{payment?.bank_name || '-'}</span>
                                    </div>
                                    <div>
                                        <span className="text-blue-300 block text-[10px]">Nomor Rekening</span>
                                        <span className="font-bold font-mono">{payment?.bank_account || '-'}</span>
                                    </div>
                                    <div>
                                        <span className="text-blue-300 block text-[10px]">Atas Nama</span>
                                        <span className="font-bold">{payment?.bank_holder || '-'}</span>
                                    </div>
                                </div>
                            </div>

                            {Array.isArray(payment?.instructions) && payment.instructions.length > 0 && (
                                <ol className="space-y-1.5 text-xs text-slate-600 list-decimal list-inside bg-amber-50 border border-amber-200 rounded-2xl p-4">
                                    {payment.instructions.map((ins, i) => (
                                        <li key={i}>{ins}</li>
                                    ))}
                                </ol>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Pengirim / Pemilik Rekening</label>
                                    <input
                                        type="text"
                                        placeholder="Nama sesuai rekening pengirim"
                                        value={data.payment_sender_name}
                                        onChange={(e) => setData('payment_sender_name', e.target.value)}
                                        className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                    />
                                    {errors.payment_sender_name && <p className="text-xs text-rose-600 mt-1">{errors.payment_sender_name}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Metode / Bank Pengirim</label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: Transfer BCA / M-Banking"
                                        value={data.payment_method}
                                        onChange={(e) => setData('payment_method', e.target.value)}
                                        className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl"
                                    />
                                    {errors.payment_method && <p className="text-xs text-rose-600 mt-1">{errors.payment_method}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Upload Bukti Transfer (JPG, PNG, atau PDF — maks 5 MB) *
                                </label>
                                <input
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={(e) => setData('payment_proof_file', e.target.files[0] || null)}
                                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-[#FF8A00] hover:file:bg-amber-100"
                                />
                                {errors.payment_proof_file && <p className="text-xs text-rose-600 mt-1">{errors.payment_proof_file}</p>}
                                {payment?.wa_confirmation && (
                                    <p className="text-[11px] text-slate-500 mt-2">
                                        Setelah mengunggah, Anda dapat konfirmasi via WhatsApp{' '}
                                        <a
                                            href={`https://wa.me/${String(payment.wa_confirmation).replace(/\D/g, '').replace(/^0/, '62')}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[#0070F3] font-bold hover:underline"
                                        >
                                            di sini
                                        </a>.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* 4.18 Persetujuan (3 Wajib) */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                            4.18 Persetujuan & Pernyataan Hukum (Wajib Dicentang Semua)
                        </h3>

                        <div className="space-y-3 text-xs text-slate-700">
                            <label className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={data.setuju_sk} 
                                    onChange={(e) => setData('setuju_sk', e.target.checked)}
                                    className="mt-0.5 rounded border-slate-300 text-[#0070F3] focus:ring-[#0070F3]"
                                />
                                <span>1. Saya telah membaca dan menyetujui seluruh <Link href="/syarat-ketentuan" className="text-[#0070F3] underline font-bold">Syarat & Ketentuan</Link> pengiklanan TulungJual.id.</span>
                            </label>

                            <label className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={data.setuju_benar} 
                                    onChange={(e) => setData('setuju_benar', e.target.checked)}
                                    className="mt-0.5 rounded border-slate-300 text-[#0070F3] focus:ring-[#0070F3]"
                                />
                                <span>2. Saya menjamin seluruh data, spesifikasi, dan foto yang diunggah adalah benar, akurat, dan dapat dipertanggungjawabkan.</span>
                            </label>

                            <label className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={data.setuju_platform} 
                                    onChange={(e) => setData('setuju_platform', e.target.checked)}
                                    className="mt-0.5 rounded border-slate-300 text-[#0070F3] focus:ring-[#0070F3]"
                                />
                                <span>3. Saya memahami bahwa TulungJual.id berfungsi sebagai platform marketplace penghubung dan tidak bertanggung jawab atas sengketa fisik/hukum antar pihak.</span>
                            </label>
                        </div>

                        <div className="pt-4">
                            {!isPaymentReady && (
                                <p className="text-xs text-rose-600 font-semibold mb-3 text-center">
                                    Unggah bukti pembayaran terlebih dahulu pada seksi 4.19 sebelum mengajukan iklan.
                                </p>
                            )}
                            <button
                                type="submit"
                                disabled={!canSubmit || processing}
                                className={`w-full py-4 text-center text-sm font-black rounded-2xl shadow-lg transition ${
                                    canSubmit && !processing
                                        ? 'bg-[#FF8A00] hover:bg-[#e67a00] text-white shadow-orange-100'
                                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                }`}
                            >
                                {processing ? 'Memproses Pengajuan...' : 'Kirim & Ajukan Iklan Properti'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
