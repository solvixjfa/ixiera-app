'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    // Get current year on client side only
    setCurrentYear(new Date().getFullYear());
  }, []);

  const solutions = [
    { label: 'Custom Development', href: '/solutions/custom' },
    { label: 'Integration Service', href: '/solutions/integration' },
    { label: 'Automation', href: '/solutions/automation' },
  ];

  const company = [
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'About', href: '/about' },
  ];

  const legal = [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="px-4 py-12 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">
          {/* Column 1: Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-black dark:text-white">Ixiera.id</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Hybrid Agency Platform untuk kemudahan manage project dan client.
            </p>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="mb-4 font-bold text-black dark:text-white">Solutions</h4>
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

          {/* Column 3: Company */}
          <div>
            <h4 className="mb-4 font-bold text-black dark:text-white">Company</h4>
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
