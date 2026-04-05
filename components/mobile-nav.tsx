"use client"; 

import { useState } from "react"; // <-- 1. IMPORT useState
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, LayoutDashboard, Briefcase, FolderLock, Receipt, LifeBuoy, LogOut } from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard/overview", icon: LayoutDashboard },
  { label: "Projects", href: "/dashboard/projects", icon: Briefcase },
  { label: "Assets & Access", href: "/dashboard/assets", icon: FolderLock },
  { label: "Billing", href: "/dashboard/billing", icon: Receipt },
  { label: "Support", href: "/dashboard/tickets", icon: LifeBuoy },
];

export function MobileNav() {
  // 2. BIKIN STATE BUAT KONTROL BUKA-TUTUP MENU
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <div className="md:hidden">
      {/* 3. PASANG STATE KE COMPONENT SHEET */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0 flex flex-col bg-background">
          <SheetTitle className="sr-only">Menu Navigasi Mobile</SheetTitle>
          <div className="h-16 flex items-center px-6 border-b border-border/50">
            <h1 className="text-xl font-bold tracking-tight">Ixiera.id</h1>
          </div>
          <nav className="flex-1 overflow-y-auto space-y-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)} // <-- 4. TUTUP MENU PAS LINK DIKLIK
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-border/50">
            <Button variant="destructive" className="w-full justify-start" asChild>
              <Link href="/auth/logout" onClick={() => setIsOpen(false)}> {/* <-- TUTUP JUGA PAS LOGOUT DIKLIK */}
                <LogOut className="h-5 w-5 mr-3" />
                <span>Logout</span>
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}