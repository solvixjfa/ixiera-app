'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';

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

function formatPrice(price_min: number | null): string {
  if (!price_min) return 'Hubungi Kami';
  return `Mulai Rp ${price_min.toLocaleString('id-ID')}`;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg dark:hover:shadow-lg transition-shadow group cursor-pointer h-full">
        {/* Thumbnail */}
        <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
          {product.thumbnail_url ? (
            <Image
              src={product.thumbnail_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400 dark:text-gray-600">No Image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-3">
            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border-blue-200 dark:border-blue-800">
              {product.category}
            </Badge>
          </div>

          <h3 className="text-lg font-bold text-black dark:text-white mb-2 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="text-xl font-bold text-black dark:text-white">
            {formatPrice(product.price_min)}
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="w-full h-48" />
      <div className="p-4 space-y-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-7 w-32" />
      </div>
    </Card>
  );
}