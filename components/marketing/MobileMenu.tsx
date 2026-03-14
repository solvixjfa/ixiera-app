"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const menuItems = [
  { label: 'Products', href: '/products' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function MobileMenu() {   // <-- default export
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="flex flex-col gap-4">
          <div className="text-lg font-bold text-black dark:text-white">Menu</div>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 border-t border-gray-200 dark:border-gray-800 pt-4">
            <Button
              variant="outline"
              className="w-full border-black dark:border-white text-black dark:text-white dark:hover:bg-gray-800 hover:bg-gray-100"
              asChild
            >
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200" asChild>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}