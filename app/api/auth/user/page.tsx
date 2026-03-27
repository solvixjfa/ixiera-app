"use client";
import { useClerk } from "@clerk/nextjs";
import { useEffect } from "react";

export default function LogoutPage() {
  const { signOut } = useClerk();
  useEffect(() => {
    signOut({ redirectUrl: '/auth/login' });
  }, [signOut]);

  return (
    <div className="flex h-screen items-center justify-center bg-muted/10">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-muted-foreground font-medium">Keluar dari Ixiera...</p>
      </div>
    </div>
  );
}