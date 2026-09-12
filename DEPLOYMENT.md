# Deployment CI/CD (GitHub Actions)

Deployment otomatis ke server produksi berjalan setiap kali ada push ke branch `main`
(atau manual lewat tab **Actions → Deploy to Production → Run workflow**).

## Alur Pipeline

```
push ke main
      │
      ▼
┌─────────────┐    ┌───────────────┐    ┌──────────┐
│  Run Tests  │───▶│ Build Assets  │───▶│  Deploy  │
│ (MySQL 8)   │    │ (npm build)   │    │  (SSH)   │
└─────────────┘    └───────────────┘    └──────────┘
```

1. **Run Tests** — menjalankan `php artisan test` di runner GitHub dengan MySQL.
   Kalau ada test gagal, deploy dibatalkan.
2. **Build Assets** — menjalankan `npm run build` di runner, lalu hasilnya
   (`public/build`) di-upload sebagai artifact. Ini penting karena server produksi
   belum tentu punya Node.js.
3. **Deploy** — SSH ke server: `git pull`, `composer install --no-dev`,
   `migrate --force`, upload aset hasil build, dan rebuild cache Laravel.

---

## Setup GitHub Secrets

Buka **Repository → Settings → Secrets and variables → Actions → New repository secret**,
lalu tambahkan satu per satu:

| Nama Secret | Contoh Nilai | Keterangan |
|---|---|---|
| `SSH_HOST` | `tanggamus.xyz` | Hostname atau IP server |
| `SSH_USER` | `tult6834` | Username SSH / cPanel |
| `SSH_PASSWORD` | `********` | Password SSH (JANGAN ditulis di file workflow) |
| `SSH_PORT` | `22` | Opsional, default `22` |
| `DEPLOY_PATH` | `/home/tult6834/tulungjual` | Path absolut folder project di server |
| `PHP_BIN` | `/usr/local/bin/php84` | Opsional. Isi jika PHP default server bukan 8.4 |
| `APP_URL` | `https://tulungjual.id` | Opsional, untuk link di GitHub Environment |

> **Penting:** password tidak boleh ditulis langsung di `deploy.yml`.
> File workflow ini di-commit ke repository, sedangkan Secrets dienkripsi
> oleh GitHub dan hanya tersedia saat workflow berjalan.

### Tips menentukan `PHP_BIN`

Cek versi PHP dan lokasinya di server:

```bash
which php
php -v
ls /usr/local/bin/php*    # cPanel biasanya punya php, php81, php82, php83, php84
```

Jika versi default bukan PHP 8.4, isi `PHP_BIN` dengan path yang tepat,
misalnya `/usr/local/bin/php84`.

### Cara memasukkan secret lewat CLI (opsional)

```bash
gh secret set SSH_HOST --body "tanggamus.xyz"
gh secret set SSH_USER --body "tult6834"
gh secret set SSH_PASSWORD --body "password-anda"
gh secret set SSH_PORT --body "22"
gh secret set DEPLOY_PATH --body "/home/tult6834/tulungjual"
```

---

## Prasyarat di Server Produksi

### 1. Repository sudah di-clone

```bash
cd ~
git clone https://github.com/<user>/<repo>.git tulungjual
cd tulungjual
```

Jika repo private, gunakan **Personal Access Token** pada URL clone, atau
atur deploy key di GitHub.

### 2. File `.env` sudah dikonfigurasi

`.env` **tidak** ikut ter-deploy (masuk `.gitignore`). Buat manual di server:

```bash
cp .env.example .env
php artisan key:generate --force
nano .env
```

Sesuaikan minimal:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://domain-anda.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=namadb
DB_USERNAME=userdb
DB_PASSWORD=passworddb

FILESYSTEM_DISK=public

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database

MAIL_MAILER=smtp
MAIL_HOST=mail.domain-anda.com
MAIL_PORT=587
MAIL_USERNAME=no-reply@domain-anda.com
MAIL_PASSWORD=passwordemail
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="no-reply@domain-anda.com"
MAIL_FROM_NAME="TulungJual.id"
```

### 3. Setelah deploy pertama, jalankan seeder

```bash
php artisan db:seed --class=UserSeeder --force
php artisan db:seed --class=CategorySeeder --force
```

---

## Symlink `public/storage`

Laravel perlu symlink dari `public/storage` ke `storage/app/public` agar file
unggahan (foto properti, bukti pembayaran, brosur developer) dapat diakses publik.

Workflow sudah mencoba membuat symlink otomatis:

```bash
ln -s "$(pwd)/storage/app/public" public/storage
```

### Jika `php artisan storage:link` gagal

Di shared hosting, `symlink()`, `exec()`, dan `proc_open()` sering masuk
`disable_functions` di `php.ini`. Gejalanya:

```
Call to undefined function Illuminate\Filesystem\exec()
Call to undefined function Laravel\Prompts\proc_open()
```

Solusinya, **jangan pakai `php artisan storage:link`**. Gunakan salah satu cara:

**A. Lewat SSH**

```bash
cd ~/tulungjual
ln -s "$(pwd)/storage/app/public" public/storage
ls -la public/storage
```

**B. Lewat cPanel File Manager**

1. Masuk ke folder `public` di project
2. Klik **+ Create** → **Create Symbolic Link**
3. Target: `/home/tult6834/tulungjual/storage/app/public`
4. Nama link: `storage`

**C. Minta support hosting** mengaktifkan fungsi `symlink` dan `exec`.

Sementara itu, karena `proc_open()` juga diblokir, **selalu gunakan flag `--force`**
untuk perintah artisan yang biasanya interaktif:

```bash
php artisan migrate --force
php artisan db:seed --class=UserSeeder --force
```

---

## Checklist Production

- [ ] `APP_ENV=production` dan `APP_DEBUG=false`
- [ ] `APP_URL` sudah HTTPS
- [ ] `FILESYSTEM_DISK=public`
- [ ] Document root domain mengarah ke folder `public` (bukan root project)
- [ ] Symlink `public/storage` sudah dibuat
- [ ] Permission `storage` dan `bootstrap/cache` dapat ditulis (`775`)
- [ ] `php artisan db:seed --class=UserSeeder --force` sudah dijalankan
- [ ] Mailer SMTP sudah teruji (untuk notifikasi approve/reject)

---

## Troubleshooting

| Masalah | Penyebab | Solusi |
|---|---|---|
| `Call to undefined function proc_open()` | Fungsi diblokir di `php.ini` | Pakai flag `--force` pada perintah artisan |
| `Call to undefined function exec()` | Fungsi diblokir di `php.ini` | Buat symlink manual (lihat di atas) |
| Gambar unggahan 404 | Symlink `public/storage` belum ada | Buat symlink manual |
| `Permission denied` saat deploy | Akun SSH tidak punya akses tulis | Jalankan `chmod -R 775 storage bootstrap/cache` |
| Asset lama masih muncul | Cache view/config basi | Workflow sudah menjalankan `optimize:clear` |
| Migrasi gagal saat deploy | Konflik schema | Jalankan manual: `php artisan migrate --force` |
