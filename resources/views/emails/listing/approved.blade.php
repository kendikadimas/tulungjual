<x-mail::message>
# Selamat! Iklan Anda Telah Disetujui

Halo **{{ $listing->user->name ?? 'Pengiklan' }}**,

Kabar baik! Iklan properti Anda telah ditinjau dan **disetujui** oleh tim admin TulungJual.id. Iklan Anda kini sudah tayang dan dapat dilihat oleh calon pembeli/penyewa.

**Detail Iklan:**

| | |
|---|---|
| Judul | {{ $listing->judul }} |
| Jenis | {{ $listing->jenis_iklan }} • {{ $listing->jenis_properti }} |
| Lokasi | {{ $listing->kecamatan }}, {{ $listing->kota }} |
| Harga | Rp {{ number_format($listing->harga, 0, ',', '.') }} |

<x-mail::button :url="$listingUrl" color="primary">
Lihat Iklan Saya
</x-mail::button>

**Tips agar iklan Anda cepat terjual:**
- Pastikan nomor WhatsApp Anda aktif dan dapat dihubungi
- Tambahkan foto-foto berkualitas tinggi jika belum ada
- Balas pesan dari calon pembeli dengan cepat

Terima kasih telah mempercayakan pemasaran properti Anda di TulungJual.id.

Salam,
**Tim TulungJual.id**

<x-mail::subcopy>
Jika Anda tidak merasa mendaftarkan iklan ini, abaikan email ini atau hubungi admin melalui WhatsApp.
</x-mail::subcopy>
</x-mail::message>
