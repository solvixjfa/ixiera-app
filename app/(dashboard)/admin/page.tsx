import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  const adminPages = [
    {
      title: 'Products',
      description: 'Manage all products, add new products, edit and delete',
      href: '/admin/products',
    },
    {
      title: 'Settings',
      description: 'Coming soon - Site settings and configuration',
      href: '#',
      disabled: true,
    },
    {
      title: 'Analytics',
      description: 'Coming soon - View sales and product analytics',
      href: '#',
      disabled: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="px-4 md:px-6 py-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-black dark:text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your Ixiera.id platform
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {adminPages.map((page) => (
              <div
                key={page.title}
                className={`border border-gray-200 dark:border-gray-800 rounded-lg p-6 ${
                  page.disabled
                    ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900'
                    : 'bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-lg transition-shadow'
                }`}
              >
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                  {page.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {page.description}
                </p>

                {page.disabled ? (
                  <Button disabled variant="outline" className="w-full">
                    Coming Soon
                  </Button>
                ) : (
                  <Button asChild className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                    <Link href={page.href}>Go to {page.title}</Link>
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Info */}
          <div className="mt-12 p-6 border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-2">
              📝 Admin Features
            </h3>
            <ul className="text-blue-800 dark:text-blue-300 space-y-2">
              <li>✅ Products Management - Add, edit, delete products</li>
              <li>🔒 Protected Routes - Requires authentication</li>
              <li>⚙️ More features coming soon</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
