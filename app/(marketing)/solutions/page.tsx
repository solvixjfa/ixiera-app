import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, Zap, Brain, MessageCircle, ArrowRight, CheckCircle } from 'lucide-react';

export default function SolutionsPage() {
  const solutions = [
    {
      title: 'Web & App Development',
      description: 'Website bukan sekadar brosur digital.',
      longDescription:
        'Banyak bisnis punya website — tapi tidak banyak yang punya website yang benar-benar bekerja untuk mereka. Kami membangun web dan aplikasi yang cepat, scalable, dan siap diintegrasikan dengan sistem lain yang Anda punya.',
      icon: Monitor,
      benefits: [
        'Website atau web app custom sesuai kebutuhan bisnis',
        'Performa tinggi & SEO-ready dari pondasi',
        'Siap diintegrasikan dengan automation dan AI',
        'Dashboard klien untuk pantau progress real-time',
        'Dokumentasi teknis lengkap setelah selesai',
      ],
      href: '/solutions/web-app',
    },
    {
      title: 'Business Automation',
      description: 'Pekerjaan yang bisa diotomasi seharusnya tidak dikerjakan manusia.',
      longDescription:
        'Setiap jam yang dihabiskan tim Anda untuk copy-paste data, kirim laporan manual, atau follow-up satu per satu — adalah jam yang seharusnya dipakai untuk hal yang lebih penting.',
      icon: Zap,
      benefits: [
        'Mapping dan analisis workflow bisnis Anda',
        'Otomasi proses dari ujung ke ujung (form → CRM → notifikasi → laporan)',
        'Integrasi antar aplikasi yang sudah Anda pakai',
        'Monitoring dan alerting kalau ada yang tidak berjalan',
        'Training tim Anda untuk kelola sistem sendiri',
      ],
      href: '/solutions/automation',
    },
    {
      title: 'AI Internal Setup',
      description: 'AI yang tahu bisnis Anda — dan berjalan di infrastruktur Anda sendiri.',
      longDescription:
        'Banyak tools AI meminta data Anda dikirim ke server orang lain. Untuk bisnis yang menjaga privasi data klien dan internal, itu bukan pilihan yang bisa diterima. Kami setup AI yang berjalan di VPS atau hardware Anda sendiri.',
      icon: Brain,
      benefits: [
        'Setup AI di VPS atau server Anda sendiri',
        'Integrasi dengan knowledge base dan dokumen internal',
        'Interface chat yang bisa dipakai seluruh tim',
        'Privasi penuh — data tidak keluar dari infrastruktur Anda',
        'Panduan penggunaan dan onboarding tim',
      ],
      href: '/solutions/ai-internal',
    },
    {
      title: 'AI Agentic Sales & CS',
      description: 'Bukan chatbot biasa. Ini AI yang bisa closing.',
      longDescription:
        'Chatbot biasa hanya balas pesan sesuai script. AI agentic yang kami bangun memahami konteks percakapan, mengikuti alur negosiasi, dan beroperasi di WhatsApp atau web — 24 jam sehari, tanpa gaji, tanpa libur.',
      icon: MessageCircle,
      benefits: [
        'AI agent custom sesuai produk dan alur sales Anda',
        'Integrasi WhatsApp, web chat, atau platform lain',
        'Memory percakapan — AI ingat konteks dari awal',
        'Handover ke manusia saat diperlukan',
        'Dashboard monitoring performa agent',
      ],
      href: '/solutions/ai-agentic',
    },
  ];

  const commitments = [
    {
      title: 'Transparan',
      description: 'Semua progress bisa Anda pantau lewat dashboard klien, real-time.',
    },
    {
      title: 'Terdokumentasi',
      description: 'Setiap project diserahkan dengan dokumentasi teknis yang lengkap.',
    },
    {
      title: 'Bisa Dicoba',
      description: 'Demo sistem tersedia sebelum Anda memutuskan apapun.',
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-950">

        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-white dark:from-gray-950 to-gray-50 dark:to-gray-900 py-20 px-4 md:py-32 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="ixiera-label mb-4">Layanan</p>
            <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6 leading-tight">
              Satu mitra.{' '}
              <span className="block">Empat solusi yang saling terhubung.</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Bisnis Anda tidak butuh empat vendor berbeda untuk website, otomasi, dan AI.
              Ixiera mengerjakannya sebagai satu ekosistem — supaya semuanya benar-benar nyambung.
            </p>
            <Button
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
              asChild
            >
              <Link href="#layanan">Lihat Semua Layanan</Link>
            </Button>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="layanan" className="w-full py-20 px-4 md:py-32 md:px-6 bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white text-center mb-4">
              Dari website sampai AI agent —{' '}
              <span className="block">semua dalam satu mitra.</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
              Kami tidak memilih satu spesialisasi dan berhenti di sana.
              Karena bisnis Anda butuh ekosistem, bukan potongan-potongan terpisah.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solutions.map((solution) => {
                const Icon = solution.icon;
                return (
                  <Card key={solution.href} className="ixiera-card flex flex-col h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white dark:text-black" />
                      </div>
                      <CardTitle className="text-2xl">{solution.title}</CardTitle>
                      <CardDescription className="text-base font-medium text-gray-700 dark:text-gray-300">
                        {solution.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{solution.longDescription}</p>
                      <ul className="space-y-2">
                        {solution.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full group" asChild>
                        <Link href={solution.href}>
                          Pelajari Lebih Lanjut
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="w-full py-20 px-4 md:py-32 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="ixiera-label mb-4">Kenapa Percaya Kami?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              Kami tidak minta Anda percaya begitu saja.
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
              Semua sistem yang kami tawarkan sudah pernah kami bangun.
              Bukan konsep di atas kertas — Anda bisa lihat dan coba sendiri lewat demo langsung.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {commitments.map((item) => (
                <div key={item.title} className="ixiera-commitment-card p-6">
                  <h3 className="text-lg font-bold text-black dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-black dark:bg-gray-950 py-20 px-4 md:py-32 md:px-6 border-t border-gray-200 dark:border-gray-800">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Tidak yakin mulai dari mana?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Wajar. Tidak semua bisnis butuh keempat solusi sekaligus.
              Ceritakan kondisi bisnis Anda — kami bantu identifikasi mana yang paling berdampak untuk dikerjakan duluan.
            </p>
            <Button
              className="bg-white dark:bg-white text-black dark:text-black hover:bg-gray-100 dark:hover:bg-gray-200"
              asChild
            >
              <Link href="/contact">Jadwalkan Konsultasi Gratis</Link>
            </Button>
            <p className="text-sm text-gray-500 mt-4">Biasanya kami merespons dalam 1×24 jam.</p>
          </div>
        </section>

      </div>
    </>
  );
}