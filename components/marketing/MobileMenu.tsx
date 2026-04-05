"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown, User as UserIcon } from "lucide-react";

import { menuItems } from "./Navbar";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  
  const { isLoaded, isSignedIn, user } = useUser();

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-[300px] sm:w-[350px] flex flex-col p-0 border-l border-border/50">
        <SheetHeader className="p-6 border-b border-border/50 text-left">
          <SheetTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Ixiera.id
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <div key={item.label} className="flex flex-col">
                {item.subItems ? (
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-xl hover:bg-muted/50 transition-all duration-200"
                  >
                    <span>{item.label}</span>
                    <ChevronDown 
                      className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${openMenus[item.label] ? 'rotate-180' : ''}`} 
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl hover:bg-muted/50 transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                )}
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openMenus[item.label] ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="flex flex-col gap-1 p-2 ml-4 bg-muted/30 rounded-lg border border-border/50">
                    {item.subItems?.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setIsOpen(false)}
                        className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          {isLoaded && (
            isSignedIn ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs font-medium text-muted-foreground">Logged in as</span>
                    <span className="text-sm font-medium truncate">{user?.primaryEmailAddress?.emailAddress}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <SignOutButton>
                    <Button variant="outline" className="w-full rounded-xl">
                      Logout
                    </Button>
                  </SignOutButton>
                  <Button className="w-full rounded-xl shadow-md" asChild>
                    <Link href="/dashboard/overview" onClick={() => setIsOpen(false)}>Dashboard</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Button variant="outline" className="w-full rounded-xl h-11" asChild>
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>Log In</Link>
                </Button>
                <Button className="w-full rounded-xl h-11 shadow-md" asChild>
                  <Link href="/auth/sign-up" onClick={() => setIsOpen(false)}>Get Started</Link>
                </Button>
              </div>
            )
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}