"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogoutButton } from "./logout-button";

interface User {
  id: string;
  email: string;
}

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return null;
  }

  // SAKLAR OTOMATIS NYALA 
  return user ? (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600 dark:text-gray-400 hidden lg:inline">
        {user.email}
      </span>
      
      {/*  TOMBOL DASHBOARD BARU */}
      <Button
        className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
        asChild
      >
        <Link href="/dashboard/overview">Dashboard</Link>
      </Button>

      <LogoutButton />
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