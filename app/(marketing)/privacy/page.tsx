export default function PrivacyPage() {
  const lastUpdated = '1 Januari 2026';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 py-24 md:px-6">

        {/* Header */}
        <div className="mb-12">
          <p className="ixiera-label mb-4">Legal</p>
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
            Kebijakan Privasi
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Terakhir diperbarui: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-gray-600 dark:text-gray-400">

          <section>
            <h2 className="text-xl font-bold text-black dark:text-white mb-3">1. Siapa kami</h2>
            <p className="leading-relaxed">
              Ixiera.id adalah layanan digital agency yang menyediakan jasa web development,
              business automation, dan AI setup. Website ini dikelola oleh tim Ixiera yang
              berdomisili di Indonesia.
            </p>
            <p className="mt-3 leading-relaxed">
              Untuk pertanyaan terkait privasi, Anda dapat menghubungi kami melalui:{' '}
              <br />
              Email:{' '}
              <a href="mailto:hello@ixiera.id" className="text-black dark:text-white underline">
                hello@ixiera.id
              </a>
              <br />
              WhatsApp:{' '}
              <a href="https://wa.me/6285794744412" className="text-black dark:text-white underline">
                +62 857-9474-4412
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black dark:text-white mb-3">2. Data yang kami kumpulkan</h2>
            <p className="leading-relaxed">Kami mengumpulkan data berikut ketika Anda menggunakan layanan kami:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li><strong className="text-black dark:text-white">Data akun:</strong> nama, alamat email, dan password (terenkripsi) saat Anda mendaftar.</li>
              <li><strong className="text-black dark:text-white">Data kontak:</strong> nama, email, nomor telepon, dan pesan yang Anda kirim melalui form kontak atau lead form.</li>
              <li><strong className="text-black dark:text-white">Data penggunaan:</strong> halaman yang dikunjungi, waktu akses, dan jenis perangkat — dikumpulkan secara anonim melalui analytics.</li>
              <li><strong className="text-black dark:text-white">Data project:</strong> informasi yang Anda berikan terkait project, invoice, dan komunikasi dalam dashboard klien.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black dark:text-white mb-3">3. Bagaimana kami menggunakan data Anda</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Menghubungi Anda terkait pertanyaan atau permintaan yang Anda ajukan.</li>
              <li>Mengelola akun dan akses dashboard klien Anda.</li>
              <li>Mengirimkan informasi project, invoice, dan update layanan yang relevan.</li>
              <li>Meningkatkan kualitas layanan dan pengalaman penggunaan website.</li>
            </ul>
            <p className="mt-3 leading-relaxed">
              Kami <strong className="text-black dark:text-white">tidak menjual, menyewakan, atau membagikan</strong> data
              pribadi Anda kepada pihak ketiga untuk tujuan pemasaran.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black dark:text-white mb-3">4. Penyimpanan data</h2>
            <p className="leading-relaxed">
              Data Anda disimpan menggunakan layanan Supabase (PostgreSQL) yang dihosting
              di infrastruktur cloud dengan enkripsi standar industri. Kami menerapkan
              Row-Level Security (RLS) sehingga setiap pengguna hanya dapat mengakses
              data milik mereka sendiri.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black dark:text-white mb-3">5. Cookies</h2>
            <p className="leading-relaxed">
              Website ini menggunakan cookies teknis yang diperlukan untuk fungsi autentikasi
              dan keamanan sesi. Kami tidak menggunakan cookies untuk pelacakan iklan atau
              profiling pengguna.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black dark:text-white mb-3">6. Hak Anda</h2>
            <p className="leading-relaxed">Anda berhak untuk:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Mengakses data pribadi yang kami simpan tentang Anda.</li>
              <li>Meminta koreksi data yang tidak akurat.</li>
              <li>Meminta penghapusan data Anda dari sistem kami.</li>
              <li>Menarik persetujuan penggunaan data kapan saja.</li>
            </ul>
            <p className="mt-3 leading-relaxed">
              Untuk mengajukan permintaan di atas, hubungi kami melalui email atau WhatsApp
              yang tertera di bagian atas halaman ini.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black dark:text-white mb-3">7. Perubahan kebijakan</h2>
            <p className="leading-relaxed">
              Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu.
              Perubahan signifikan akan kami informasikan melalui email atau notifikasi
              di dashboard. Tanggal pembaruan terakhir selalu tertera di bagian atas halaman ini.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}