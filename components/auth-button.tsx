"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useUser, SignOutButton } from "@clerk/nextjs";

export function AuthButton() {
  // Mesin baru pakai Clerk 
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return null; // Tampilan kosong bentar pas Clerk lagi mikir
  }

  // SAKLAR OTOMATIS NYALA 
  return isSignedIn ? (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600 dark:text-gray-400 hidden lg:inline">
        {user?.primaryEmailAddress?.emailAddress}
      </span>
      
      {/* TOMBOL DASHBOARD BARU */}
      <Button
        className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
        asChild
      >
        <Link href="/dashboard/overview">Dashboard</Link>
      </Button>

      {/* Logout langsung ditangani Clerk */}
      <SignOutButton>
        <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
          Logout
        </Button>
      </SignOutButton>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        className="border-black dark:border-white text-black dark:text-white dark:hover:bg-gray-800 hover:bg-gray-100"
        asChild
      >
        <Link href="/auth/login">Login</Link>
      </Button>
      <Button
        className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
        asChild
      >
        <Link href="/auth/sign-up">Get Started</Link>
      </Button>
    </div>
  );
}