'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Instagram, MessageCircle } from 'lucide-react';

// Threads tidak ada di lucide-react, pakai SVG inline
function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 192 192"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-43.246-41.457-43.398h-.34c-14.993 0-27.5 6.396-35.19 18.036l13.364 9.171c5.427-8.267 13.938-10.048 21.826-10.048h.23c8.413.054 14.756 2.503 18.86 7.282 2.977 3.402 4.969 8.136 5.954 14.136a95.23 95.23 0 0 0-12.064-1.07c-12.664 0-23.325 3.51-30.223 9.876-6.398 5.9-9.777 14.032-9.51 22.968.502 16.76 13.607 26.522 36.335 26.522 12.908 0 23.432-3.604 31.26-10.71 5.684-5.22 9.216-12.34 10.539-21.284.607.344 1.188.7 1.737 1.067 8.138 5.42 12.617 13.55 12.617 23.278 0 22.652-23.388 47.244-64.262 47.244C64.208 180.91 32 149.695 32 96c0-53.695 32.208-84.91 64.738-84.91 16.44 0 30.534 6.018 40.85 17.41l13.243-11.5C137.07 4.15 118.036-3 96.738-3 49.47-3 8 40.897 8 96c0 55.103 41.47 99 88.738 99 48.842 0 76.262-30.554 76.262-63.244 0-16.148-6.43-29.32-17.463-37.668l-14 -5.1z" />
    </svg>
  );
}

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const solutions = [
    { label: 'Web & App Development', href: '/solutions/web-app' },
    { label: 'Business Automation', href: '/solutions/automation' },
    { label: 'AI Internal Setup', href: '/solutions/ai-internal' },
    { label: 'AI Agentic Sales & CS', href: '/solutions/ai-agentic' },
  ];

  const company = [
    { label: 'Blog', href: '/blog' },
    { label: 'Kontak', href: '/contact' },
    { label: 'Tentang Kami', href: '/about' },
  ];

  const legal = [
    { label: 'Privasi', href: '/privacy' },
    { label: 'Syarat & Ketentuan', href: '/terms' },
  ];

  const socials = [
    {
      label: 'WhatsApp',
      href: 'https://wa.me/6285702373412',
      icon: MessageCircle,
    },
    {
      label: 'Instagram',
      href: 'https://instagram.com/ixiera.id',
      icon: Instagram,
    },
    {
      label: 'Threads',
      href: 'https://threads.net/@ixiera.id',
      icon: ThreadsIcon,
    },
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="px-4 py-12 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">

          {/* Column 1: Company Info + Socials */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-black dark:text-white">Ixiera.id</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Mitra teknologi untuk bisnis yang ingin tumbuh dengan sistem yang benar.
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-gray-900 dark:hover:border-white transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Column 2: Layanan */}
          <div>
            <h4 className="mb-4 font-bold text-black dark:text-white">Layanan</h4>
            <ul className="space-y-3">
              {solutions.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Perusahaan */}
          <div>
            <h4 className="mb-4 font-bold text-black dark:text-white">Perusahaan</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="mb-4 font-bold text-black dark:text-white">Legal</h4>
            <ul className="space-y-3">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Ixiera.id. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}