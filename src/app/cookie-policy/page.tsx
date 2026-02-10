import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Kebijakan Cookie</h1>
      
      <div className="prose prose-invert max-w-none">
        <p><strong>Terakhir diperbarui:</strong> Februari 11, 2026</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Apa itu Cookie?</h2>
        <p>
          Cookie adalah file kecil yang berisi huruf dan angka yang dipasang di perangkat Anda 
          (seperti komputer atau smartphone) ketika Anda mengakses situs web. Cookie digunakan 
          untuk mengidentifikasi perangkat Anda saat Anda kembali ke situs web tertentu.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Bagaimana Kami Menggunakan Cookie</h2>
        <p>
          Kami menggunakan cookie untuk berbagai tujuan, termasuk:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>Menyediakan fungsi dan fitur situs web</li>
          <li>Meningkatkan kinerja dan fungsionalitas situs web</li>
          <li>Menganalisis bagaimana situs web digunakan</li>
          <li>Menyediakan iklan yang relevan</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Jenis Cookie yang Kami Gunakan</h2>
        <p>
          <strong>Cookie Wajib:</strong> Cookie ini diperlukan untuk menjalankan situs web dan 
          tidak dapat dinonaktifkan dalam sistem kami. Biasanya diatur sebagai respons terhadap 
          tindakan Anda yang merupakan bagian dari navigasi situs web, seperti login atau mengisi 
          formulir.
        </p>
        <p>
          <strong>Cookie Analitik:</strong> Cookie ini memungkinkan kami untuk menghitung jumlah 
          kunjungan dan sumber lalu lintas sehingga kami dapat mengukur dan meningkatkan kinerja 
          situs web kami.
        </p>
        <p>
          <strong>Cookie Iklan:</strong> Cookie ini digunakan untuk membuat profil minat Anda 
          dan menampilkan iklan yang relevan dengan Anda di situs web lain. Ini biasanya ditempatkan 
          oleh jaringan iklan dengan izin dari pemilik situs web.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Google AdSense dan Cookie</h2>
        <p>
          Situs web kami menggunakan Google AdSense untuk menampilkan iklan. Google menggunakan 
          cookie yang disebut cookie DART untuk menayangkan iklan kepada pengguna berdasarkan 
          kunjungan mereka ke situs web kami dan situs lainnya di Internet.
        </p>
        <p>
          Anda dapat memilih untuk tidak menggunakan cookie DART dengan mengunjungi 
          <Link href="https://policies.google.com/technologies/ads" className="text-primary hover:underline">
            Kebijakan Iklan Google
          </Link>.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Pengelolaan Cookie</h2>
        <p>
          Anda dapat mengontrol dan/atau menghapus cookie sesuai keinginan. Anda dapat menghapus 
          semua cookie yang disimpan di komputer Anda dan mengatur sebagian besar browser untuk 
          mencegah pemasangan cookie. Namun, jika Anda melakukan ini, Anda mungkin harus secara 
          manual menyesuaikan beberapa preferensi setiap kali Anda mengunjungi situs web, dan 
          beberapa layanan dan fungsionalitas mungkin tidak berfungsi.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Persetujuan</h2>
        <p>
          Dengan menggunakan situs web kami, Anda menyetujui penggunaan cookie sesuai dengan 
          Kebijakan Cookie ini. Jika Anda tidak menyetujui penggunaan cookie, Anda harus 
          menyesuaikan pengaturan browser Anda untuk menolak cookie atau tidak menggunakan 
          situs web kami.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Perubahan pada Kebijakan Ini</h2>
        <p>
          Kami dapat memperbarui Kebijakan Cookie kami dari waktu ke waktu. Kami akan memberi tahu 
          Anda tentang perubahan apa pun dengan memposting Kebijakan Cookie baru di halaman ini.
        </p>
      </div>
    </div>
  );
}