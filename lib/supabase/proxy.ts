import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// =========================================================================
//  KONFIGURASI RUTE (Edit di sini )
// =========================================================================
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

  // Inisialisasi Supabase Client
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

  // Ambil data user yang sedang login
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Jika user BELUM login dan mencoba akses rute yang dilindungi -> Lempar ke Login
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // 2. Jika user SUDAH login tapi malah buka halaman Login/Sign-up -> Lempar ke Overview
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isAuthRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = DEFAULT_DASHBOARD_PATH; 
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}