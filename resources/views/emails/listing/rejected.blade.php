<x-mail::message>
# Iklan Properti Anda Ditolak

Halo **{{ $listing->user->name ?? 'Pengiklan' }}**,

Kami telah meninjau iklan properti Anda dan sayangnya iklan tersebut **belum dapat disetujui** saat ini.

**Detail Iklan:**

| | |
|---|---|
| Judul | {{ $listing->judul }} |
| Jenis | {{ $listing->jenis_iklan }} • {{ $listing->jenis_properti }} |
| Lokasi | {{ $listing->kecamatan }}, {{ $listing->kota }} |

**Alasan Penolakan:**

> {{ $listing->catatan_rejection }}

Anda dapat memperbaiki iklan sesuai catatan di atas dan mengajukan ulang untuk ditinjau kembali oleh admin.

<x-mail::button :url="$editUrl" color="primary">
Edit & Ajukan Ulang Iklan
</x-mail::button>

Jika Anda memiliki pertanyaan terkait penolakan ini, silakan hubungi admin TulungJual.id melalui WhatsApp.

Salam,
**Tim TulungJual.id**

<x-mail::subcopy>
Jika Anda tidak merasa mendaftarkan iklan ini, abaikan email ini.
</x-mail::subcopy>
</x-mail::message>
