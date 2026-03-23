"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

// SINKRONISASI: Ambil daftar menu dari Navbar
import { menuItems } from "./Navbar";

interface User {
  id: string;
  email: string;
}

export default function MobileMenu() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Cek apakah user sudah login (sama kayak di Desktop)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/user");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      {/* Tambahin overflow-y-auto biar kalau layarnya kecil, menunya bisa di-scroll ke bawah */}
      <SheetContent side="right" className="overflow-y-auto">
        <div className="flex flex-col gap-6">
          <div className="text-lg font-bold text-black dark:text-white">Menu</div>
          
          {/* 👇 INI BAGIAN YANG DI-UPGRADE 👇 */}
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <div key={item.label} className="flex flex-col gap-2">
                {/* Menu Utama (Products, Solutions, Blog, dll) */}
                <Link
                  href={item.href}
                  className="text-base font-medium text-gray-900 dark:text-white hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
                
                {/* Kalau ada subItems (Khusus Solutions), render menjorok ke dalam */}
                {item.subItems && (
                  <div className="flex flex-col gap-3 border-l-2 border-gray-200 dark:border-gray-800 ml-2 pl-4 mt-1">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* 👆 SELESAI UPGRADE 👆 */}

          {/* Action Buttons di bagian bawah mobile menu */}
          <div className="flex flex-col gap-2 border-t border-gray-200 dark:border-gray-800 pt-6">
            {!loading && (
              user ? (
                // SAKLAR ON: TAMPILAN KALAU SUDAH LOGIN
                <>
                  <div className="text-sm text-gray-500 mb-2 px-1 truncate">
                    {user.email}
                  </div>
                  <Button 
                    className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200" 
                    asChild
                  >
                    <Link href="/dashboard/overview">Dashboard</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-black dark:border-white text-black dark:text-white dark:hover:bg-gray-800 hover:bg-gray-100"
                    asChild
                  >
                    <Link href="/auth/logout">Logout</Link>
                  </Button>
                </>
              ) : (
                // SAKLAR OFF: TAMPILAN KALAU BELUM LOGIN
                <>
                  <Button
                    variant="outline"
                    className="w-full border-black dark:border-white text-black dark:text-white dark:hover:bg-gray-800 hover:bg-gray-100"
                    asChild
                  >
                    <Link href="/auth/login">Login</Link>
                  </Button>
                  <Button 
                    className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200" 
                    asChild
                  >
                    <Link href="/auth/sign-up">Get Started</Link>
                  </Button>
                </>
              )
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}