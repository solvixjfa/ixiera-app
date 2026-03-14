'use client';

import { useEffect, useState } from 'react';
import { ProductCard, ProductCardSkeleton } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price_min: number | null;
  price_max: number | null;
  price_model: string | null;
  thumbnail_url?: string;
  slug: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/products');

        if (!response.ok) {
          const errorData = await response.text();
          console.error('API error response:', response.status, errorData);
          throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          setProducts(data.data);

          const uniqueCategories = Array.from(
            new Set(data.data.map((p: Product) => p.category))
          ) as string[];
          setCategories(uniqueCategories);

          setFilteredProducts(data.data);
        } else {
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) => p.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="w-full bg-gradient-to-b from-white dark:from-gray-950 to-gray-50 dark:to-gray-900 py-20 px-4 md:py-32 md:px-6">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
            Produk Kami
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Jelajahi berbagai solusi digital yang kami tawarkan
          </p>
        </div>
      </section>

      <section className="w-full py-20 px-4 md:py-32 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-lg font-bold text-black dark:text-white mb-4">
              Filter by Category
            </h2>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => setSelectedCategory('all')}
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                className={`${
                  selectedCategory === 'all'
                    ? 'bg-black dark:bg-white text-white dark:text-black'
                    : 'border-black dark:border-white text-black dark:text-white dark:hover:bg-gray-800'
                }`}
              >
                All ({products.length})
              </Button>
              {categories.map((category) => {
                const count = products.filter(
                  (p) => p.category === category
                ).length;
                return (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className={`${
                      selectedCategory === category
                        ? 'bg-black dark:bg-white text-white dark:text-black'
                        : 'border-black dark:border-white text-black dark:text-white dark:hover:bg-gray-800'
                    }`}
                  >
                    {category} ({count})
                  </Button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="mb-8 p-6 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 rounded-lg">
              <h3 className="text-lg font-bold text-red-900 dark:text-red-200 mb-2">
                Error
              </h3>
              <p className="text-red-800 dark:text-red-300">{error}</p>
            </div>
          )}

          <div>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Showing {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-600 mb-4">📦</div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No products available in this category. Try another filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-50 dark:bg-gray-900 py-20 px-4 md:py-32 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-12 text-center">
            Mengapa Pilih Kami?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Solusi Terpercaya', description: 'Dipercaya oleh lebih dari 50 agensi di Indonesia' },
              { title: 'Support 24/7', description: 'Tim support kami siap membantu Anda kapan saja' },
              { title: 'Harga Kompetitif', description: 'Dapatkan harga terbaik dengan kualitas premium' },
            ].map((item, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-950">
                <h3 className="text-xl font-bold text-black dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}