import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_ROUTES = [
  "/dashboard"
];

const AUTH_ROUTES = [
  "/auth/login", 
  "/auth/sign-up"
];

const DEFAULT_DASHBOARD_PATH = "/dashboard/overview";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // FIX 1: Copy cookie pas lempar ke halaman Login
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    const redirectResponse = NextResponse.redirect(url);
    
    // Salin paksa semua karcis ke lemparan baru
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectResponse;
  }

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // FIX 2: Copy cookie pas lempar ke Dashboard (biar karcis nggak hilang)
  if (isAuthRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = DEFAULT_DASHBOARD_PATH; 
    const redirectResponse = NextResponse.redirect(url);
    
    // Salin paksa semua karcis ke lemparan baru
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectResponse;
  }

  return supabaseResponse;
}