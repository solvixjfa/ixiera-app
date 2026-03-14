'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/theme-switcher';
import dynamic from 'next/dynamic';

// Import MobileMenu secara dinamis tanpa SSR
const MobileMenu = dynamic(() => import('@/components/marketing/MobileMenu'), {
  ssr: false,
});

const menuItems = [
  { label: 'Products', href: '/products' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Ixiera.id
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <ThemeSwitcher />
          <Button
            variant="outline"
            className="border-black dark:border-white text-black dark:text-white dark:hover:bg-gray-800 hover:bg-gray-100"
            asChild
          >
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200" asChild>
            <Link href="/auth/sign-up">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeSwitcher />
          <MobileMenu />   {/* Ganti dengan komponen baru */}
        </div>
      </div>
    </nav>
  );
}