# Penempatan Iklan di DracinAja

## Gambaran Umum

Dokumen ini menjelaskan penempatan iklan di aplikasi DracinAja, termasuk di halaman utama, halaman detail, dan halaman watch. Semua penempatan dirancang untuk mematuhi kebijakan Google AdSense dan menyediakan pengalaman pengguna yang optimal.

## Jenis Iklan

### 1. Iklan Banner
- Ditampilkan di halaman utama dan halaman detail
- Menggunakan komponen `GoogleAd` yang hanya muncul setelah pengguna menyetujui cookie
- Format responsif untuk menyesuaikan berbagai ukuran layar

### 2. Iklan Video
- Ditampilkan di halaman watch (saat menonton)
- Muncul setiap 10 episode, maksimal 2 kali per blok 10 episode
- Dilengkapi tombol lewati setelah 5 detik sesuai kebijakan Google

## Penempatan Spesifik

### 1. Halaman Utama (`/`)
- Iklan banner ditempatkan di bagian bawah halaman utama
- Tepat sebelum footer untuk tidak mengganggu konten utama
- Hanya muncul setelah pengguna memberikan consent cookie

### 2. Halaman Detail (`/detail/:platform/:bookId`)
- Iklan banner ditempatkan di bagian bawah halaman detail
- Di bawah informasi drama dan sebelum daftar episode
- Tidak mengganggu informasi utama tentang drama

### 3. Halaman Watch (`/watch/:platform/:bookId`)
- Iklan video muncul saat transisi antar episode
- Muncul setiap kelipatan 10 episode (ep 10, 20, 30, dst)
- Maksimal 2 iklan per blok 10 episode
- Durasi iklan terbatas dan dilengkapi tombol lewati

## Kepatuhan Google AdSense

### 1. Penempatan Iklan
- [x] Iklan tidak ditempatkan di area yang bisa diklik untuk menonton konten
- [x] Iklan tidak meniru elemen UI asli situs
- [x] Iklan tidak ditempatkan di area yang bisa membingungkan pengguna

### 2. Consent Pengguna
- [x] Iklan hanya muncul setelah pengguna menyetujui cookie
- [x] Tersedia banner consent untuk pengaturan cookie
- [x] Pengguna dapat menolak iklan dan cookie

### 3. Kualitas Konten
- [x] Iklan tidak menggantikan konten asli
- [x] Iklan tidak mengganggu pengalaman menonton
- [x] Situs memiliki konten asli yang cukup sebelum menampilkan iklan

## Implementasi Teknis

### 1. Komponen Iklan
- `GoogleAd.tsx`: Komponen banner iklan yang mengecek consent cookie
- `VideoAd.tsx`: Komponen iklan video dengan timer dan tombol lewati
- `ConsentBanner.tsx`: Banner untuk meminta consent pengguna

### 2. Penjadwalan Iklan
- Iklan video dijadwalkan setiap 10 episode
- Algoritma mencegah lebih dari 2 iklan per blok 10 episode
- Digunakan useRef untuk melacak episode mana yang sudah menampilkan iklan

### 3. UI/UX
- Iklan menyesuaikan desain keseluruhan situs
- Tidak mengganggu elemen kontrol video utama
- Desain responsif untuk berbagai ukuran layar

## Rekomendasi untuk Publisher

### 1. Sebelum Submit ke AdSense
- Uji semua penempatan iklan di berbagai perangkat
- Pastikan consent banner muncul dan berfungsi dengan baik
- Verifikasi bahwa iklan hanya muncul setelah consent diberikan

### 2. Setelah Disetujui
- Monitor CTR dan engagement iklan
- Pastikan tidak ada pelanggaran kebijakan dari iklan pihak ketiga
- Lakukan audit berkala terhadap penempatan iklan

## Troubleshooting

### Iklan Tidak Muncul
- Periksa apakah consent cookie telah diberikan
- Verifikasi ID AdSense di .env.local
- Pastikan slot iklan telah dibuat di dashboard AdSense

### Iklan Muncul Tanpa Consent
- Periksa logika di komponen GoogleAd
- Pastikan localStorage item 'cookie_consent' diatur dengan benar
- Verifikasi bahwa ConsentBanner muncul dan berfungsi