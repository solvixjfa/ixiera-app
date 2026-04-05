import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server'; // <-- Pastiin path ini bener sesuai setup Supabase lu

// Ini biar Next.js ngambil data terbaru tiap halaman di-load
export const revalidate = 0; 

export default async function BlogPage() {
  const supabase = await createClient();
  
  // Tarik data blog dari Supabase, urutkan dari yang terbaru
  const { data: blogPosts, error } = await supabase
    .from('blog_posts')
    .select('id, title, excerpt, slug, category, created_at')
    .order('created_at', { ascending: false });

  // Fungsi buat ngubah format tanggal Supabase jadi format cantik
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-white dark:from-gray-950 to-gray-50 dark:to-gray-900 py-20 px-4 md:py-32 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
            Blog Ixiera
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Artikel, tips, dan insights untuk mengembangkan bisnis Anda
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="w-full py-20 px-4 md:py-32 md:px-6">
        <div className="mx-auto max-w-4xl">
          
          {error ? (
            <div className="text-center text-red-500 py-10">Gagal memuat artikel.</div>
          ) : !blogPosts || blogPosts.length === 0 ? (
            <div className="text-center text-gray-500 py-10">Belum ada artikel yang dipublikasikan.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post: any) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <div className="group border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full flex flex-col bg-white dark:bg-gray-900">
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          {post.category || 'Uncategorized'}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(post.created_at)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <Button variant="link" className="p-0 h-auto font-semibold text-black dark:text-white">
                        Baca Selengkapnya →
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}