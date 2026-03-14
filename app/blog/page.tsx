import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: '5 Cara Meningkatkan Produktivitas Agensi Anda',
      excerpt: 'Pelajari strategi efektif untuk meningkatkan produktivitas dan efisiensi tim agensi Anda',
      date: '5 Maret 2026',
      category: 'Productivity',
      slug: 'meningkatkan-produktivitas',
    },
    {
      id: 2,
      title: 'Manfaat Automation dalam Agensi Digital',
      excerpt: 'Eksplorasi bagaimana automation dapat menghemat waktu dan biaya operasional agensi Anda',
      date: '2 Maret 2026',
      category: 'Automation',
      slug: 'manfaat-automation',
    },
    {
      id: 3,
      title: 'Integrasi Tools: Best Practices untuk Agensi',
      excerpt: 'Panduan lengkap untuk mengintegrasikan berbagai tools dalam workflow agensi Anda',
      date: '28 Februari 2026',
      category: 'Integration',
      slug: 'best-practices-integrasi',
    },
    {
      id: 4,
      title: 'Manajemen Klien yang Lebih Baik dengan Ixiera',
      excerpt: 'Sistem yang mudah untuk mengelola klien, project, dan invoice dalam satu platform',
      date: '25 Februari 2026',
      category: 'Management',
      slug: 'manajemen-klien-ixiera',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-white dark:from-gray-950 to-gray-50 dark:to-gray-900 py-20 px-4 md:py-32 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
            Blog Ixiera
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Artikel, tips, dan insights untuk mengembangkan agensi Anda
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="w-full py-20 px-4 md:py-32 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <div className="group border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full flex flex-col bg-white dark:bg-gray-900">
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
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
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full bg-gray-50 dark:bg-gray-900 py-20 px-4 md:py-32 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-black dark:text-white mb-6">
            Subscribe ke Newsletter Kami
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Dapatkan tips dan artikel terbaru langsung ke email Anda
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email Anda"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
            <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
