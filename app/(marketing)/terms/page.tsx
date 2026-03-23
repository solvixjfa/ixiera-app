export default function TermsPage() {
  const lastUpdated = '1 Januari 2026';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 py-24 md:px-6">

        {/* Header */}
        <div className="mb-12">
          <p className="ixiera-label mb-4">Legal</p>
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
            Syarat & Ketentuan
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Terakhir diperbarui: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-gray-600 dark:text-gray-400">

          <section>
            <h2 className="text-xl font-bold text-black dark:text-white mb-3">1. Penerimaan syarat</h2>
            <p className="leading-relaxed">
              Dengan mengakses atau menggunakan layanan Ixiera.id, Anda menyetujui
              syarat dan ketentuan yang tercantum di halaman ini. Jika Anda tidak
              menyetujui sebagian atau seluruh syarat ini, harap tidak menggunakan
              layanan kami.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black dark:text-white mb-3">2. Layanan yang kami sediakan</h2>
            <p className="leading-relaxed">
              Ixiera.id menyediakan layanan digital agency meliputi web & app development,
              business automation, AI internal setup, dan AI agentic sales & customer service.
              Detail scope, deliverable, timeline, dan biaya setiap project disepakati secara
              tertulis dalam proposal atau kontrak kerja sebelum pekerjaan dimulai.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black dark:text-white mb-3">3. Akun dan dashboard klien</h2>
            <p className="leading-relaxed">
              Akun yang Anda buat di platform Ixiera.id bersifat personal dan tidak dapat
              dipindahtangankan. Anda bertanggung jawab menjaga kerahasiaan kredensial akun Anda.
              Segera informasikan kepada kami jika terjadi akses tidak sah ke akun Anda.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black dark:text-white mb-3">4. Pembayaran dan pengembalian dana</h2>
            <p className="leading-relaxed">
              Pembayaran dilakukan sesuai skema yang disepakati dalam proposal — umumnya
              berupa down payment di awal dan pelunasan setelah deliverable diserahkan.
            </p>
            <p className="mt-3 leading-relaxed">Pengembalian dana dapat dipertimbangkan jika:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Ixiera.id gagal memenuhi deliverable yang telah disepakati.</li>
              <li>Project dibatalkan sebelum pekerjaan dimulai.</li>
            </ul>
            <p className="mt-3 leading-relaxed">
              Pengembalian dana tidak berlaku untuk pekerjaan yang sudah selesai dikerjakan
              atau untuk pembatalan yang dilakukan oleh klien setelah pekerjaan berjalan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black dark:text-white mb-3">5. Kepemilikan hasil kerja</h2>
            <p className="leading-relaxed">
              Setelah pelunasan penuh, seluruh hasil kerja (kode, desain, konten) menjadi
              milik klien sepenuhnya, kecuali disepakati lain secara tertulis.
            </p>
            <p className="mt-3 leading-relaxed">
              Ixiera.id berhak mencantumkan project yang sudah selesai sebagai portofolio
              kecuali klien secara eksplisit meminta kerahasiaan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black dark:text-white mb-3">6. Keterbatasan tanggung jawab</h2>
            <p className="leading-relaxed">
              Ixiera.id tidak bertanggung jawab atas kerugian tidak langsung yang timbul
              dari penggunaan atau ketidakmampuan menggunakan layanan kami, termasuk
              namun tidak terbatas pada kehilangan pendapatan, kehilangan data, atau
              gangguan bisnis.
            </p>
            <p className="mt-3 leading-relaxed">
              Total tanggung jawab kami tidak melebihi jumlah yang telah Anda bayarkan
              untuk layanan yang bersangkutan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black dark:text-white mb-3">7. Hukum yang berlaku</h2>
            <p className="leading-relaxed">
              Syarat dan ketentuan ini tunduk pada hukum yang berlaku di Republik Indonesia.
              Setiap perselisihan akan diselesaikan secara musyawarah terlebih dahulu.
              Apabila tidak tercapai kesepakatan, penyelesaian dilakukan melalui jalur hukum
              yang berlaku di Indonesia.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black dark:text-white mb-3">8. Perubahan syarat</h2>
            <p className="leading-relaxed">
              Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan
              signifikan akan diberitahukan kepada pengguna terdaftar melalui email atau
              notifikasi dashboard. Penggunaan layanan setelah perubahan berlaku
              dianggap sebagai penerimaan syarat baru.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-black dark:text-white mb-3">9. Hubungi kami</h2>
            <p className="leading-relaxed">
              Untuk pertanyaan terkait syarat dan ketentuan ini, hubungi kami melalui:
              <br />
              Email:{' '}
              <a href="mailto:hello@ixiera.id" className="text-black dark:text-white underline">
                hello@ixiera.id
              </a>
              <br />
              WhatsApp:{' '}
              <a href="https://wa.me/6285794744412" className="text-black dark:text-white underline">
                +62 857-0237-3412
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}