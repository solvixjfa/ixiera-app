import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, GitBranch, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';

export default function SolutionsPage() {
  const solutions = [
    {
      title: 'Custom Development',
      description: 'Bangun fitur khusus yang sesuai dengan kebutuhan unik agensi Anda.',
      longDescription:
        'Kami membantu Anda mengembangkan solusi perangkat lunak yang dirancang khusus untuk mengatasi tantangan spesifik bisnis Anda. Dari aplikasi web hingga mobile, tim ahli kami siap mewujudkan ide Anda.',
      icon: Code,
      benefits: [
        'Konsultasi dan analisis kebutuhan',
        'Desain dan prototyping',
        'Pengembangan dengan teknologi modern (Next.js, React, Node.js)',
        'Pengujian dan jaminan kualitas',
        'Deployment dan maintenance',
      ],
      href: '/solutions/custom',
    },
    {
      title: 'Integration Service',
      description: 'Integrasikan tools dan platform yang sudah Anda gunakan dengan lancar.',
      longDescription:
        'Kami menyediakan layanan integrasi untuk menghubungkan berbagai sistem seperti CRM, ERP, aplikasi akuntansi, dan platform pemasaran Anda agar dapat bekerja secara harmonis dan otomatis.',
      icon: GitBranch,
      benefits: [
        'Integrasi API dan webhook',
        'Sinkronisasi data real-time',
        'Migrasi data antar platform',
        'Kustomisasi alur kerja',
        'Dukungan untuk berbagai platform (Salesforce, HubSpot, Shopify, dll.)',
      ],
      href: '/solutions/integration',
    },
    {
      title: 'Automation',
      description: 'Otomatiskan tugas berulang dan workflow untuk meningkatkan efisiensi.',
      longDescription:
        'Optimalkan operasional agensi Anda dengan otomatisasi cerdas. Kurangi pekerjaan manual, minimalkan kesalahan, dan fokus pada hal-hal yang benar-benar penting.',
      icon: Zap,
      benefits: [
        'Otomatisasi pemasaran email',
        'Manajemen lead otomatis',
        'Penjadwalan dan pengingat otomatis',
        'Laporan otomatis',
        'Integrasi dengan AI untuk pengambilan keputusan',
      ],
      href: '/solutions/automation',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-gray-950">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-white dark:from-gray-950 to-gray-50 dark:to-gray-900 py-20 px-4 md:py-32 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
              Solusi untuk Bisnis Agensi Anda
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Kami menyediakan berbagai solusi terbaik untuk meningkatkan efisiensi, produktivitas, dan pertumbuhan agensi
              Anda. Dari pengembangan kustom hingga integrasi dan otomatisasi, kami siap membantu.
            </p>
            <Button
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
              asChild
            >
              <Link href="#solusi">Jelajahi Solusi</Link>
            </Button>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solusi" className="w-full py-20 px-4 md:py-32 md:px-6 bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white text-center mb-4">
              Solusi Unggulan Kami
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
              Pilih solusi yang tepat untuk kebutuhan agensi Anda. Setiap solusi dirancang untuk memberikan dampak
              maksimal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution) => {
                const Icon = solution.icon;
                return (
                  <Card key={solution.href} className="flex flex-col h-full hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white dark:text-black" />
                      </div>
                      <CardTitle className="text-2xl">{solution.title}</CardTitle>
                      <CardDescription className="text-base">{solution.description}</CardDescription>
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

        {/* Why Choose Us */}
        <section className="w-full py-20 px-4 md:py-32 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6">Mengapa Memilih Ixiera?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">Pengalaman & Keahlian</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tim kami terdiri dari para ahli dengan pengalaman bertahun-tahun di industri teknologi.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">Pendekatan Personal</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Kami mendengarkan kebutuhan unik Anda dan memberikan solusi yang tepat.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">Dukungan Berkelanjutan</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Kami tidak hanya membangun, tetapi juga mendukung Anda setelah implementasi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-black dark:bg-gray-950 py-20 px-4 md:py-32 md:px-6 border-t border-gray-200 dark:border-gray-800">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-white mb-6">
              Siap mengubah agensi Anda?
            </h2>
            <p className="text-xl text-gray-300 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Hubungi tim kami hari ini untuk konsultasi gratis dan temukan solusi terbaik untuk kebutuhan Anda.
            </p>
            <Button className="bg-white dark:bg-white text-black dark:text-black hover:bg-gray-100 dark:hover:bg-gray-200" asChild>
              <Link href="/contact">Hubungi Kami Sekarang</Link>
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}