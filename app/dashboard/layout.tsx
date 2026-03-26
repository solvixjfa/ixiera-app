export const dynamic = "force-dynamic"
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { MobileNav } from "@/components/mobile-nav";
import {
  LayoutDashboard, Briefcase, FolderLock,
  Receipt, LifeBuoy, LogOut,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const { userId } = await auth();
  if (!userId) redirect("/auth/login");

  const user = await currentUser();

  const navItems = [
    { label: "Overview", href: "/dashboard/overview", icon: LayoutDashboard },
    { label: "Projects", href: "/dashboard/projects", icon: Briefcase },
    { label: "Assets & Access", href: "/dashboard/assets", icon: FolderLock },
    { label: "Billing", href: "/dashboard/billing", icon: Receipt },
    { label: "Support", href: "/dashboard/tickets", icon: LifeBuoy },
    { label: "Logout", href: "/auth/logout", icon: LogOut },
  ];

  return (
    <div className="flex h-screen bg-muted/10">
      <aside className="hidden md:flex flex-col w-64 border-r bg-background">
        <div className="h-16 flex items-center px-6 border-b">
          <h1 className="text-xl font-bold tracking-tight">Ixiera.id</h1>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b bg-background flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <MobileNav />
            <h2 className="text-lg font-semibold">Client Portal</h2>
          </div>
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center uppercase">
            <span className="text-sm font-medium text-muted-foreground">
              {user?.emailAddresses?.[0]?.emailAddress?.charAt(0) ?? "U"}
            </span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
      </div>

      <Toaster richColors position="top-right" />
    </div>
  );
}