import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <Link
            href="/dashboard"
            className="text-xl font-bold text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Ixiera.id
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {user.email}
            </span>
            <LogoutButton />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <div className="px-4 py-12 md:px-6 md:py-16">
          <div className="mx-auto max-w-4xl">
            {/* Welcome Section */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
                Selamat datang! 👋
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Email: <span className="font-semibold">{user.email}</span>
              </p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Projects Card */}
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                  Projects
                </h3>
                <p className="text-3xl font-bold text-black dark:text-white mb-4">
                  0
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total project kamu
                </p>
              </div>

              {/* Clients Card */}
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                  Clients
                </h3>
                <p className="text-3xl font-bold text-black dark:text-white mb-4">
                  0
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total client terdaftar
                </p>
              </div>

              {/* Revenue Card */}
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900 hover:shadow-lg dark:hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-black dark:text-white mb-2">
                  Revenue
                </h3>
                <p className="text-3xl font-bold text-black dark:text-white mb-4">
                  Rp 0
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total revenue bulan ini
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900">
              <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
                Quick Actions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 py-6"
                  asChild
                >
                  <Link href="#projects">Create New Project</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-black dark:border-white text-black dark:text-white dark:hover:bg-gray-800 hover:bg-gray-100 py-6"
                  asChild
                >
                  <Link href="#clients">Add New Client</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-black dark:border-white text-black dark:text-white dark:hover:bg-gray-800 hover:bg-gray-100 py-6"
                  asChild
                >
                  <Link href="#invoices">Create Invoice</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-black dark:border-white text-black dark:text-white dark:hover:bg-gray-800 hover:bg-gray-100 py-6"
                  asChild
                >
                  <Link href="/admin/products">Manage Products</Link>
                </Button>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-12 border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
                💡 Tip
              </h3>
              <p className="text-blue-800 dark:text-blue-200">
                Dashboard ini adalah halaman yang dilindungi. Hanya user yang sudah login yang bisa mengakses halaman ini. Coba logout dan akses kembali untuk melihat redirect ke login page.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
