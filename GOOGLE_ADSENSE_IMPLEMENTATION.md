# Dokumentasi Implementasi Google AdSense

## Ringkasan
Dokumen ini menjelaskan implementasi Google AdSense di aplikasi DracinAja untuk monetisasi melalui iklan.

## Komponen Utama

### 1. GoogleAd Component (`src/components/GoogleAd.tsx`)
Komponen ini menangani tampilan iklan Google AdSense dan hanya menampilkannya setelah pengguna memberikan consent untuk cookie.

### 2. Consent Banner (`src/components/ConsentBanner.tsx`)
Komponen ini menampilkan banner consent kepada pengguna untuk menyetujui penggunaan cookie dan iklan.

### 3. Halaman Kebijakan
- `src/app/privacy-policy/page.tsx` - Halaman kebijakan privasi
- `src/app/cookie-policy/page.tsx` - Halaman kebijakan cookie

## Konfigurasi

### Variabel Lingkungan
Tambahkan variabel berikut ke file `.env.local`:
```
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-yourpublisherid
```

### Script dan Meta Tag
- Script AdSense ditambahkan di `src/app/layout.tsx`
- Meta tag akun AdSense ditambahkan di `src/app/layout.tsx`

## Persyaratan Google AdSense

### 1. Kebijakan Privasi
- Harus memiliki halaman kebijakan privasi yang jelas
- Harus menjelaskan penggunaan cookie dan teknologi pelacakan

### 2. Kebijakan Cookie
- Harus memberi tahu pengguna tentang penggunaan cookie
- Harus mendapatkan consent sebelum menampilkan iklan

### 3. Penempatan Iklan
- Iklan harus ditempatkan dengan cara yang tidak mengganggu pengalaman pengguna
- Tidak boleh menipu pengguna untuk mengklik iklan

### 4. Konten Berkualitas
- Situs harus memiliki konten asli dan berkualitas
- Minimal 20-30 halaman konten sebelum mendaftar AdSense

## Implementasi Consent

### Mekanisme Consent
1. Banner consent ditampilkan kepada pengguna baru
2. Pengguna harus menyetujui atau menolak cookie
3. Pilihan disimpan di localStorage
4. Iklan hanya ditampilkan jika consent diberikan

### Penanganan Consent
- Jika consent tidak diberikan, iklan tidak ditampilkan
- Jika consent diubah, halaman perlu direload untuk menerapkan perubahan

## Testing

### Uji Consent Flow
1. Hapus localStorage item `cookie_consent`
2. Muat ulang halaman
3. Pastikan banner consent muncul
4. Uji kedua opsi (terima/tolak)
5. Verifikasi perilaku iklan sesuai dengan consent

### Uji Tampilan Iklan
1. Pastikan iklan muncul hanya setelah consent diberikan
2. Pastikan tidak ada error di console terkait AdSense
3. Uji tampilan di berbagai ukuran layar

## Troubleshooting

### Iklan Tidak Muncul
- Pastikan ID AdSense benar dan aktif
- Pastikan consent telah diberikan
- Periksa console untuk error AdSense

### Error di Console
- Pastikan script AdSense dimuat dengan benar
- Pastikan tidak ada pemblokir iklan aktif
- Periksa apakah penggunaan cookie telah disetujui

## Catatan Penting

- Jangan menampilkan iklan sebelum consent diberikan
- Pastikan kebijakan privasi dan cookie up-to-date
- Ikuti pedoman Google AdSense untuk penempatan iklan
- Gunakan ID AdSense yang sah dan aktif