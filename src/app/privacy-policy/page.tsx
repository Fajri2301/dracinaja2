import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Kebijakan Privasi</h1>
      
      <div className="prose prose-invert max-w-none">
        <p><strong>Terakhir diperbarui:</strong> Februari 11, 2026</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Informasi Umum</h2>
        <p>
          Selamat datang di DracinAja ("Kami", "Aplikasi", "Situs"). 
          Kami menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. 
          Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan membagikan informasi 
          ketika Anda menggunakan layanan kami.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Penggunaan Layanan</h2>
        <p>
          Dengan mengakses dan menggunakan situs web kami, Anda menyetujui pengumpulan dan penggunaan 
          informasi sesuai dengan Kebijakan Privasi ini.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Informasi yang Kami Kumpulkan</h2>
        <p>
          Kami tidak mengumpulkan informasi pribali Anda secara langsung. Namun, kami menggunakan 
          layanan pihak ketiga seperti Google Analytics dan Google AdSense yang mungkin mengumpulkan 
          informasi tentang perilaku Anda di situs kami.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Google AdSense</h2>
        <p>
          Situs web kami menggunakan Google AdSense untuk menampilkan iklan. Google, sebagai vendor 
          pihak ketiga, menggunakan cookie untuk menayangkan iklan berdasarkan kunjungan sebelumnya 
          ke situs web Anda. Penggunaan cookie DART oleh Google memungkinkan mereka untuk menayangkan 
          iklan kepada pengguna berdasarkan kunjungan mereka ke situs web Anda dan situs lainnya di Internet.
        </p>
        <p>
          Anda dapat memilih untuk tidak menggunakan cookie DART dengan mengunjungi 
          <Link href="https://policies.google.com/technologies/ads" className="text-primary hover:underline">
            Kebijakan Iklan Google
          </Link>.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Cookie dan Teknologi Serupa</h2>
        <p>
          Kami menggunakan cookie dan teknologi pelacakan serupa untuk menyimpan dan mengingat preferensi 
          Anda, melacak penggunaan layanan kami, dan mengoperasikan iklan. Anda dapat mengatur browser 
          Anda untuk menolak semua cookie atau untuk memberi tahu Anda kapan cookie sedang dikirim.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Layanan Pihak Ketiga</h2>
        <p>
          Kami tidak bertanggung jawab atas konten atau praktik privasi dari situs web pihak ketiga 
          yang mungkin ditautkan dari layanan kami. Kami menyarankan Anda untuk meninjau kebijakan 
          privasi dari situs web tersebut.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Perubahan pada Kebijakan Ini</h2>
        <p>
          Kami dapat memperbarui Kebijakan Privasi kami dari waktu ke waktu. Kami akan memberi tahu 
          Anda tentang perubahan apa pun dengan memposting Kebijakan Privasi baru di halaman ini.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Kontak Kami</h2>
        <p>
          Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami melalui 
          email atau formulir kontak di situs web kami.
        </p>
      </div>
    </div>
  );
}