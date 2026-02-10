# DracinAja

[![License](https://img.shields.io/github/license/Sansekai/DracinAja)](https://github.com/Sansekai/DracinAja/blob/main/LICENSE)
[![Repository](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/Sansekai/DracinAja)

![Preview](public/preview.png)

DracinAja adalah platform streaming drama pendek (vertical drama) modern yang menampilkan konten dari bebebrapa platform populer. Dibangun dengan teknologi web terkini untuk performa maksimal dan pengalaman pengguna yang premium.

## Persyaratan Sistem
Sebelum memulai, pastikan komputer Anda sudah terinstall:
- [Node.js](https://nodejs.org/) (Versi 18 LTS atau 20 LTS disarankan)
- Git (Opsional)

## Panduan Instalasi (Localhost)

Ikuti langkah-langkah berikut untuk menjalankan project ini di komputer Anda:

### 1. Clone Repository
1.  Buka terminal (Command Prompt/PowerShell).
2.  Clone repository ini ke komputer Anda:
    ```bash
    git clone https://github.com/Sansekai/DracinAja.git
    ```
3.  Masuk ke folder project:
    ```bash
    cd DracinAja
    ```

### 2. Install Dependencies
Install semua library yang dibutuhkan project ini:
```bash
npm install
# atau jika menggunakan yarn
yarn install
# atau pnpm
pnpm install
```

### 3. Konfigurasi Environment Variable
Salin file bernama `.env.example` menjadi `.env`

### 4. Jalankan Development Server
Mulai server lokal untuk pengembangan:
```bash
npm run dev
```

Buka browser dan kunjungi [http://localhost:3000](http://localhost:3000).

## Script Perintah
| Command | Fungsi |
|---------|--------|
| `npm run dev` | Menjalankan server development |
| `npm run build` | Membuat build production |
| `npm run start` | Menjalankan build production |
| `npm run lint` | Cek error coding style (Linting) |

## Struktur Folder
```text
src/
├── app/                    # Halaman & Routing (Next.js App Router)
│   ├── (auth)/             # Route Group untuk fitur Login/Register
│   ├── (main)/             # Route Group untuk konten utama (Home, Search)
│   ├── api/                # API Routes untuk integrasi backend
│   ├── drama/              # Halaman detail & Video player
│   ├── privacy-policy/     # Halaman kebijakan privasi
│   ├── cookie-policy/      # Halaman kebijakan cookie
│   └── layout.tsx          # Root layout aplikasi
├── components/             # Reusable UI Components
│   ├── ui/                 # Base components (Shadcn UI)
│   ├── player/             # Komponen khusus video player
│   ├── cards/              # Komponen card drama/koleksi
│   ├── layouts/            # Navbar, Sidebar, Footer
│   ├── GoogleAd.tsx        # Komponen Google AdSense
│   └── ConsentBanner.tsx   # Banner consent pengguna
├── hooks/                  # Custom React Hooks (useAuth, usePlayer, dll)
├── lib/                    # Helper functions & konfigurasi library (Prisma, Axios)
├── services/               # Logic fetching data & business logic
├── types/                  # TypeScript interfaces & types definitions
└── styles/                 # Global CSS & Tailwind configuration
```

## Monetisasi dengan Google AdSense
Aplikasi ini telah diintegrasikan dengan Google AdSense untuk monetisasi melalui iklan. Implementasi ini mematuhi kebijakan Google AdSense dan mencakup:

- Sistem consent cookie untuk kepatuhan GDPR
- Halaman kebijakan privasi dan cookie
- Penempatan iklan yang sesuai pedoman Google
- Perlindungan terhadap tampilan iklan sebelum consent diberikan
- Iklan video di halaman watch dengan penjadwalan sesuai kebijakan (muncul setiap 10 episode, maksimal 2 kali per 10 episode)

### Konfigurasi
Untuk mengaktifkan Google AdSense, tambahkan variabel lingkungan berikut ke file `.env.local`:
```
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-yourpublisherid
```

Lihat dokumentasi lebih lanjut di `GOOGLE_ADSENSE_IMPLEMENTATION.md`.

## Iklan Video
Fitur iklan video diimplementasikan di halaman watch untuk semua platform dengan aturan:

- Iklan muncul setiap kelipatan 10 episode (ep 10, 20, 30, dst)
- Maksimal 2 iklan per blok 10 episode
- Tombol lewati muncul setelah 5 detik sesuai kebijakan Google
- Iklan tidak mengganggu pengalaman menonton utama

## Penempatan Iklan
Iklan banner juga ditampilkan di halaman utama dan halaman detail:

- Iklan banner di halaman utama muncul di bagian bawah sebelum footer
- Iklan banner di halaman detail muncul di bawah informasi drama
- Iklan hanya muncul setelah pengguna menyetujui cookie
- Semua penempatan iklan dirancang untuk mematuhi kebijakan Google AdSense

Lihat dokumentasi kepatuhan di `ADSENSE_COMPLIANCE.md` dan panduan penempatan di `AD_PLACEMENT_GUIDELINES.md`.
