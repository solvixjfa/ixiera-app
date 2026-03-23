import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-white dark:from-gray-950 to-gray-50 dark:to-gray-900 py-20 px-4 md:py-32 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
            Hubungi Kami
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Ada pertanyaan? Tim kami siap membantu Anda
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="w-full py-20 px-4 md:py-32 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-8">Informasi Kontak</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-black dark:text-white mb-2">Email</h3>
                  <a
                    href="mailto:hello@ixiera.id"
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    hello@ixiera.id
                  </a>
                </div>

                <div>
                  <h3 className="font-bold text-black dark:text-white mb-2">Telepon</h3>
                  <a
                    href="tel:+62123456789"
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    +62 (123) 456-789
                  </a>
                </div>

                <div>
                  <h3 className="font-bold text-black dark:text-white mb-2">Alamat</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Jalan Inovasi No. 123<br />
                    Jakarta, Indonesia 12345
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-black dark:text-white mb-2">Jam Operasional</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Senin - Jumat: 09:00 - 17:00<br />
                    Sabtu: 10:00 - 14:00<br />
                    Minggu: Tutup
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-8">Kirim Pesan</h2>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    placeholder="Nama Anda"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                    Topik
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white">
                    <option>Pilih topik</option>
                    <option>Pertanyaan Umum</option>
                    <option>Demo/Konsultasi</option>
                    <option>Partnership</option>
                    <option>Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                    Pesan
                  </label>
                  <textarea
                    placeholder="Tulis pesan Anda di sini..."
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
                  />
                </div>

                <Button className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 py-3">
                  Kirim Pesan
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-gray-50 dark:bg-gray-900 py-20 px-4 md:py-32 md:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-black dark:text-white mb-12 text-center">
            Pertanyaan yang Sering Diajukan
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'Berapa lama proses implementasi Ixiera?',
                a: 'Tergantung kebutuhan Anda, setidaknya 1-2 minggu untuk setup dan training lengkap.',
              },
              {
                q: 'Apakah ada free trial?',
                a: 'Ya, kami menyediakan free trial selama 14 hari tanpa perlu kartu kredit.',
              },
              {
                q: 'Apakah data saya aman?',
                a: 'Kami menggunakan enkripsi tingkat enterprise dan compliance internasional untuk keamanan data Anda.',
              },
              {
                q: 'Bagaimana support Anda?',
                a: 'Tim support kami tersedia 24/7 melalui email, chat, dan phone untuk membantu Anda.',
              },
            ].map((item, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-950">
                <h3 className="text-lg font-bold text-black dark:text-white mb-3">{item.q}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
