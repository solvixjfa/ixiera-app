import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  const values = [
    {
      title: 'Transparan',
      description:
        'Klien tidak perlu menebak-nebak progress project mereka. Setiap pekerjaan terdokumentasi dan bisa dipantau langsung.',
    },
    {
      title: 'Jujur secara teknis',
      description:
        'Kami tidak menjual solusi yang tidak Anda butuhkan. Kalau automation sudah cukup, kami bilang. Kalau AI tidak akan berdampak signifikan untuk bisnis Anda sekarang, kami bilang.',
    },
    {
      title: 'Sistem, bukan ketergantungan',
      description:
        'Tujuan kami bukan membuat Anda bergantung pada kami selamanya. Setiap project diserahkan dengan dokumentasi lengkap supaya Anda bisa kelola sendiri — atau lanjutkan bersama kami.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 md:px-6 max-w-4xl mx-auto text-center">
        <p className="ixiera-label mb-4">Tentang Kami</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-black dark:text-white">
          Kami percaya teknologi <br className="hidden md:block" />
          <span className="text-gray-500 dark:text-gray-400">seharusnya membebaskan, bukan memperumit.</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Ixiera lahir dari frustrasi yang sama dengan yang dirasakan banyak pemilik bisnis —
          terlalu banyak tools, terlalu banyak vendor, dan tidak ada yang benar-benar saling terhubung.
        </p>
      </section>

      {/* Story */}
      <section className="py-16 px-4 md:px-6 border-y bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
          <p>
            Ixiera.id dibangun dengan satu keyakinan sederhana: bisnis yang serius butuh mitra teknologi
            yang bisa bicara dalam bahasa bisnis — bukan hanya bahasa kode.
          </p>
          <p>
            Kami adalah jaringan spesialis teknologi yang bekerja bersama untuk satu tujuan —
            membangun sistem digital yang benar-benar berfungsi untuk bisnis klien kami.
            Dari web development, business automation, AI internal, sampai AI agentic sales —
            semuanya dikerjakan sebagai satu ekosistem yang saling terhubung.
          </p>
          <p>
            Berbeda dari agency tradisional yang hanya menyerahkan hasil akhir dan pergi,
            kami memberikan klien akses penuh ke seluruh prosesnya — dashboard real-time,
            dokumentasi teknis, dan AI assistant yang siap menjawab pertanyaan kapanpun.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 md:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="ixiera-label mb-4">Nilai Kami</p>
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
            Cara kami bekerja.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div key={value.title} className="ixiera-commitment-card p-8">
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-black dark:bg-gray-950 py-20 px-4 md:px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Kenalan dulu?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Konsultasi pertama gratis. Tidak ada kewajiban apapun setelahnya.
          </p>
          <Button className="bg-white text-black hover:bg-gray-100" asChild>
            <Link href="/contact">Mulai Percakapan</Link>
          </Button>
        </div>
      </section>

    </div>
  );
}