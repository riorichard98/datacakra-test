# Deploy Node.js App di Replit + PM2 + UptimeRobot

## 1. Connect ke Replit

* Masuk ke Replit
* Pilih "Import from GitHub"
* Masukkan URL repo ini

## 2. Copy .env ke Replit

* Buat file baru dengan nama `.env`
* Salin semua isi dari file `.env` lokal ke file `.env` di Replit

## 3. Install dan Build

```bash
npm install
npm run build
```

## 4. Jalankan dengan PM2

```bash
npm install -g pm2
pm2 start dist/index.js
```

## 5. Gunakan UptimeRobot

* Buka [https://uptimerobot.com](https://uptimerobot.com)
* Daftar/Login
* Add monitor:

  * Type: HTTP(s)
  * URL: (pakai URL dari Replit, misal: `https://nama-repl.username.repl.co`)
  * Interval: 5 menit

UptimeRobot akan terus nge-ping server supaya tetap hidup.

---

Selesai.
