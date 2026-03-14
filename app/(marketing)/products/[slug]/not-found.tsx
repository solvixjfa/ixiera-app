import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-black dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
          Product Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Produk yang Anda cari tidak ditemukan. Silakan kembali ke halaman produk untuk mencari produk lainnya.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
            asChild
          >
            <Link href="/products">Kembali ke Produk</Link>
          </Button>
          <Button
            variant="outline"
            className="border-black dark:border-white text-black dark:text-white dark:hover:bg-gray-800"
            asChild
          >
            <Link href="/">Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
