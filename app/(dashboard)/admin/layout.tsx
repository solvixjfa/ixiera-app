import Link from 'next/link';
import { LogoutButton } from '@/components/logout-button';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-black">
      {/* Sidebar + Main */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-950 border-r border-gray-800 min-h-screen fixed left-0 top-0">
          <div className="p-6 border-b border-gray-800">
            <Link href="/dashboard" className="text-xl font-bold text-white">
              Ixiera Admin
            </Link>
          </div>

          <nav className="p-6 space-y-4">
            <Link
              href="/admin"
              className="block px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              Admin Dashboard
            </Link>
            <Link
              href="/admin/products"
              className="block px-4 py-2 rounded-lg bg-gray-800 text-white transition-colors"
            >
              Products
            </Link>
            <Link
              href="/dashboard"
              className="block px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              User Dashboard
            </Link>
            {/* Add more admin pages here */}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64">
          <div className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
            <div className="px-6 py-4 flex justify-between items-center">
              <h2 className="text-gray-400">{user.email}</h2>
              <LogoutButton />
            </div>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
