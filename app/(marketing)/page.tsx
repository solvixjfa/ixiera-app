import { Hero } from '@/components/marketing/Hero';
import { DifferentiatorSection } from '@/components/marketing/DifferentiatorSection';
import { ServicesSection } from '@/components/marketing/ServicesSection';
import { HowWeWorkSection } from '@/components/marketing/HowWeWorkSection';
import { ProductCard, ProductCardSkeleton } from '@/components/products/product-card';
import { ProofSection } from '@/components/marketing/ProofSection';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Tipe data produk – sesuaikan dengan props yang diterima ProductCard
interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;        // jika pakai price_min/price_max, ganti sesuai kebutuhan
  thumbnail?: string;
  slug: string;
}

async function FeaturedProducts() {
  const supabase = createServerComponentClient({ cookies });
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, description, category, price, thumbnail, slug')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(3);

  if (error || !products) {
    console.error('Error fetching featured products:', error);
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <DifferentiatorSection />
      <ServicesSection />
      <HowWeWorkSection />

      {/* Featured Products Section */}
      <section className="w-full bg-gray-50 dark:bg-gray-900 py-20 px-4 md:py-32 md:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 text-center">
            PRODUK & DEMO
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white text-center mb-4">
            Lihat sebelum memutuskan.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto mb-12">
            Kami percaya bukti lebih kuat dari kata-kata.
            Beberapa sistem yang pernah kami bangun tersedia untuk Anda coba langsung.
          </p>

          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          }>
            <FeaturedProducts />
          </Suspense>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-black dark:border-white" asChild>
              <Link href="/products">Lihat Semua Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      <ProofSection />

      {/* CTA Bottom */}
      <section className="w-full bg-white dark:bg-gray-950 py-20 px-4 md:py-32 md:px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Siap mulai?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Ceritakan kebutuhan bisnis Anda. Konsultasi pertama gratis — tidak ada kewajiban apapun setelahnya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
              <Link href="/contact">Jadwalkan Konsultasi</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-black dark:border-white text-black dark:text-white">
              <Link href="/solutions">Lihat Layanan Kami</Link>
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            Biasanya kami merespons dalam 1x24 jam.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}