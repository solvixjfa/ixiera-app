'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { AuthButton } from '@/components/auth-button';
import dynamic from 'next/dynamic';
import { ChevronDown } from 'lucide-react';

export const menuItems = [
  { label: 'Products', href: '/products' },
  { 
    label: 'Solutions', 
    href: '/solutions',
    subItems: [
      { label: 'Web & App Development', href: '/solutions/web-app', desc: 'Sistem kustom & portal klien' },
      { label: 'Business Automation', href: '/solutions/automation', desc: 'Otomasi alur kerja & integrasi' },
      { label: 'AI Internal Setup', href: '/solutions/ai-internal', desc: 'AI pintar untuk SOP perusahaan' },
      { label: 'AI Agentic Sales & CS', href: '/solutions/ai-agentic', desc: 'Agent AI untuk konversi sales' },
    ]
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const MobileMenu = dynamic(() => import('@/components/marketing/MobileMenu'));

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  
  // STATE BARU: Buat matiin paksa hover dropdown pas diklik
  const [hideDropdown, setHideDropdown] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // FUNGSI BARU: Bikin dropdown sembunyi 100ms biar efek hover-nya kereset
  const handleDropdownClick = () => {
    setHideDropdown(true);
    setTimeout(() => setHideDropdown(false), 100);
  };

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
            <div key={item.label} className="relative group">
              {item.subItems ? (
                <>
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </Link>
                  
                  {/* 👇 PENERAPAN TRIK HIDE: Kalau hideDropdown true, paksa disembunyiin */}
                  <div className={`absolute top-full left-0 mt-0 w-72 transition-all duration-200 ease-in-out ${
                    hideDropdown 
                      ? 'opacity-0 invisible' 
                      : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'
                  }`}>
                    <div className="pt-2">
                      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg p-2 flex flex-col gap-1">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={handleDropdownClick} // <-- PASANG FUNGSI DI SINI
                            className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                              {sub.label}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {sub.desc}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors py-2"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <ThemeSwitcher />
          <AuthButton />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeSwitcher />
          {mounted && <MobileMenu />}
        </div>
      </div>
    </nav>
  );
}