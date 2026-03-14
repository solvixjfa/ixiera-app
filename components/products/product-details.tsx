'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    category: string;
    description: string;
    full_description?: string;
    features?: string[];
    technologies?: string[];
    price: number;
    thumbnail?: string;
    is_active: boolean;
  };
  relatedProducts: Array<{
    id: string;
    name: string;
    slug: string;
    thumbnail?: string;
    category: string;
    price: number;
  }>;
}

export function ProductDetails({ product, relatedProducts }: ProductDetailsProps) {
  const faqs = [
    {
      q: 'Apakah saya bisa mencoba terlebih dahulu?',
      a: 'Ya, kami menyediakan free trial selama 14 hari tanpa perlu kartu kredit.',
    },
    {
      q: 'Berapa lama proses implementasi?',
      a: 'Tergantung tingkat kompleksitas, biasanya 1-4 minggu untuk setup lengkap.',
    },
    {
      q: 'Apakah ada support setelah implementasi?',
      a: 'Ya, kami menyediakan support 24/7 dan training untuk tim Anda.',
    },
    {
      q: 'Bisakah saya upgrade/downgrade paket?',
      a: 'Tentu saja, Anda bisa mengubah paket kapan saja sesuai kebutuhan.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section with Product Info */}
      <section className="w-full bg-gradient-to-b from-white dark:from-gray-950 to-gray-50 dark:to-gray-900 py-20 px-4 md:py-32 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                {product.thumbnail ? (
                  <Image
                    src={product.thumbnail}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400 dark:text-gray-600">No Image</span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <Badge className="w-fit mb-4 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200">
                {product.category}
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
                {product.name}
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Mulai dari</p>
                <p className="text-4xl font-bold text-black dark:text-white">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">/bulan atau sesuai kebutuhan</p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 py-6">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="border-black dark:border-white text-black dark:text-white dark:hover:bg-gray-800 py-6"
                >
                  Request Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {product.features && product.features.length > 0 && (
        <section className="w-full py-20 px-4 md:py-32 md:px-6 bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-12">
              Fitur-fitur Unggulan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-black dark:bg-white">
                      <span className="text-white dark:text-black font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-black dark:text-white">
                      {feature}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Full Description Section */}
      {product.full_description && (
        <section className="w-full py-20 px-4 md:py-32 md:px-6">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-6">
              Deskripsi Lengkap
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {product.full_description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Technologies Section */}
      {product.technologies && product.technologies.length > 0 && (
        <section className="w-full py-20 px-4 md:py-32 md:px-6 bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-12">
              Teknologi yang Digunakan
            </h2>

            <div className="flex flex-wrap gap-4">
              {product.technologies.map((tech, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="px-4 py-2 text-base border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="w-full py-20 px-4 md:py-32 md:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-12 text-center">
            Pertanyaan yang Sering Diajukan
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900 cursor-pointer group"
              >
                <summary className="font-bold text-black dark:text-white text-lg list-none flex justify-between items-center">
                  {faq.q}
                  <span className="ml-4 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="text-gray-600 dark:text-gray-400 mt-4">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="w-full py-20 px-4 md:py-32 md:px-6 bg-gray-50 dark:bg-gray-900">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-12">
              Produk Terkait
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((related) => (
                <Link key={related.id} href={`/products/${related.slug}`}>
                  <Card className="overflow-hidden hover:shadow-lg dark:hover:shadow-lg transition-shadow cursor-pointer h-full">
                    {/* Thumbnail */}
                    <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800">
                      {related.thumbnail ? (
                        <Image
                          src={related.thumbnail}
                          alt={related.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400 dark:text-gray-600">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <Badge className="mb-3 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200">
                        {related.category}
                      </Badge>

                      <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                        {related.name}
                      </h3>

                      <p className="text-xl font-bold text-black dark:text-white">
                        Rp {related.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="w-full bg-black dark:bg-gray-950 py-20 px-4 md:py-32 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white dark:text-white mb-6">
            Siap untuk memulai?
          </h2>
          <p className="text-xl text-gray-300 dark:text-gray-400 mb-8">
            Hubungi tim sales kami untuk konsultasi gratis dan penawaran khusus
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white dark:bg-white text-black dark:text-black hover:bg-gray-100 dark:hover:bg-gray-200 px-8 py-6">
              Schedule Demo
            </Button>
            <Button
              variant="outline"
              className="border-white dark:border-white text-white dark:text-white dark:hover:bg-gray-800 px-8 py-6"
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
