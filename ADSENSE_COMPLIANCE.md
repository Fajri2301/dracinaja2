# Kepatuhan Google AdSense untuk Iklan Video

## Kebijakan Utama

### 1. Penempatan Iklan
- Iklan video muncul setiap 10 episode, maksimal 2 kali per blok 10 episode
- Iklan tidak mengganggu pengalaman menonton utama
- Iklan hanya muncul saat transisi antar episode

### 2. Tombol Lewati
- Tombol "Lewati Iklan" muncul setelah 5 detik
- Sesuai dengan kebijakan Google AdSense tentang tombol lewati
- Desain tombol tidak menyerupai tombol kontrol video utama

### 3. Kebijakan Konten
- Iklan tidak menampilkan konten eksplisit
- Iklan tidak menyesatkan pengguna
- Iklan tidak dipaksakan ditonton (ada tombol lewati)

### 4. Pengalaman Pengguna
- Iklan tidak menghalangi konten utama secara permanen
- Ada tombol tutup darurat untuk iklan
- Durasi iklan terbatas (simulasi 10 detik)

## Implementasi Teknis

### 1. Jadwal Iklan
- Iklan muncul setiap kelipatan 10 episode (ep 10, 20, 30, dst)
- Maksimal 2 iklan per blok 10 episode
- Contoh: Untuk 60 episode, akan ada maksimal 12 iklan

### 2. Logika Penjadwalan
- Digunakan useRef untuk melacak episode mana yang sudah menampilkan iklan
- Algoritma memastikan tidak lebih dari 2 iklan per 10 episode
- Sistem ini mencegah penyalahgunaan penjadwalan iklan

### 3. Integrasi dengan Platform
- Komponen VideoAd dirancang untuk digunakan di semua platform
- Mudah diintegrasikan ke halaman watch manapun
- Parameter disesuaikan dengan kebutuhan masing-masing platform

## Kepatuhan yang Dijamin

### 1. Kebijakan Program Iklan Google
- [x] Tidak menampilkan iklan di halaman tanpa konten asli
- [x] Tidak menempatkan iklan di posisi yang membingungkan
- [x] Tidak menggunakan teknik clickbait untuk iklan

### 2. Kebijakan Format Iklan
- [x] Iklan video memiliki tombol lewati yang jelas
- [x] Iklan tidak meniru elemen kontrol video utama
- [x] Iklan tidak memaksa pengguna menonton durasi tertentu

### 3. Kebijakan Pengalaman Pengguna
- [x] Iklan tidak mengganggu konten utama
- [x] Pengguna dapat dengan mudah menutup iklan
- [x] Tidak ada iklan yang muncul secara tak terduga

## Rekomendasi untuk Publisher

### 1. Sebelum Submit ke AdSense
- Uji coba implementasi di berbagai perangkat
- Pastikan iklan muncul sesuai jadwal
- Verifikasi bahwa tombol lewati berfungsi dengan baik

### 2. Setelah Disetujui
- Pantau CTR dan engagement iklan
- Pastikan tidak ada pelanggaran kebijakan dari iklan pihak ketiga
- Lakukan audit berkala terhadap penempatan iklan

## Troubleshooting

### Iklan Tidak Muncul
- Periksa apakah consent cookie telah diberikan
- Verifikasi ID AdSense di .env.local
- Pastikan slot iklan telah dibuat di dashboard AdSense

### Tombol Lewati Tidak Berfungsi
- Periksa koneksi internet
- Verifikasi bahwa fungsi callback diimplementasikan dengan benar
- Pastikan tidak ada error di console browser