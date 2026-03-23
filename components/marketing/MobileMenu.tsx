"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";

// SINKRONISASI: Ambil daftar menu dari Navbar
import { menuItems } from "./Navbar";

interface User {
  id: string;
  email: string;
}

export default function MobileMenu() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // State untuk ngontrol dropdown mana yang kebuka
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  // Fungsi buat nutup/buka dropdown
  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

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
      <SheetContent side="right" className="overflow-y-auto">
        <div className="flex flex-col gap-6">
          <div className="text-lg font-bold text-black dark:text-white">Menu</div>
          
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <div key={item.label} className="flex flex-col gap-2">
                
                {/* Kalau PUNYA subItems, bikin jadi tombol Dropdown */}
                {item.subItems ? (
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className="flex items-center justify-between text-base font-medium text-gray-900 dark:text-white hover:text-primary transition-colors text-left"
                  >
                    {item.label}
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform ${openMenus[item.label] ? 'rotate-180' : ''}`} 
                    />
                  </button>
                ) : (
                  // Kalau GAK PUNYA subItems, jadi Link biasa
                  <Link
                    href={item.href}
                    className="text-base font-medium text-gray-900 dark:text-white hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
                
                {/* Render subItems cuma kalau openMenus[item.label] itu TRUE */}
                {item.subItems && openMenus[item.label] && (
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

          <div className="flex flex-col gap-2 border-t border-gray-200 dark:border-gray-800 pt-6">
            {!loading && (
              user ? (
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