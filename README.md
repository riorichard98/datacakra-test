# Node.js App – Local Development & Deployment with Fly.io

## 🚀 Jalankan Secara Lokal

### 1. Clone Repository

### 2. Setup Environment Variable

* Buat file `.env` di root folder.
* Salin semua variabel dari `.env` lokal kamu ke file tersebut.

### 3. Install Dependencies & generate prisma

```bash
npm install
npx prisma generate
```

### 4. Jalankan Aplikasi

```bash
npm run start
```

> Pastikan kamu sudah build project (jika menggunakan TypeScript):

```bash
npm run build
```

---

## ☁️ Deploy ke Fly.io

### Prasyarat

* Akun [Fly.io](https://fly.io)
* `flyctl` CLI (jika belum, install dengan perintah berikut):

```bash
curl -L https://fly.io/install.sh | sh
```

Pastikan `flyctl` tersedia di PATH kamu. Cek dengan:

```bash
flyctl --version
```

---

### 1. Login ke Fly.io

```bash
flyctl auth login
```

---

### 2. Inisialisasi Project

Jika belum punya `fly.toml`, jalankan:

```bash
flyctl launch
```

* Pilih nama aplikasi
* Pilih region (misalnya: `sin` untuk Singapura)
* Pilih "No" saat ditanya apakah ingin membuat database
* Pilih "Yes" untuk membuat dan menyimpan `fly.toml`

> Jika sudah punya `fly.toml`, lewati langkah ini.

---

### 3. Deploy Aplikasi

```bash
flyctl deploy
```

Tunggu proses selesai. Fly akan membangun dan menjalankan aplikasi kamu.

---

### 4. Buka Aplikasi

```bash
flyctl open
```

Atau buka manual via URL:

```
https://your-app-name.fly.dev
```

---

Selesai ✅
