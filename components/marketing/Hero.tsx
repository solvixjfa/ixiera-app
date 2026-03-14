import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export function Hero() {
  return (
    <section className="w-full bg-white dark:bg-gray-950 py-20 px-4 md:py-32 md:px-6">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white mb-6">
          We Build Systems,
          <br />
          Not Just Websites.
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          Ixiera membantu bisnis Anda tumbuh dengan web development, otomasi proses, dan AI —
          yang benar-benar bekerja untuk Anda.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="lg" className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
            <Link href="/contact">Mulai Konsultasi</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-black dark:border-white text-black dark:text-white">
            <Link href="#services">Lihat Layanan ↓</Link>
          </Button>
        </div>

        {/* Trust Signals */}
        <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Konsultasi pertama gratis
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Respons dalam 1×24 jam
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Semua project didokumentasi & bisa dipantau
          </span>
        </div>
      </div>
    </section>
  );
}