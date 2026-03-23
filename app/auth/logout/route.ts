import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch (error) {
            // Abaikan error jika dipanggil dari Server Component
          }
        },
      },
    }
  );

  // Perintah ke Supabase untuk menghapus sesi user saat ini
  await supabase.auth.signOut();

  // Redirect user kembali ke halaman login
  return NextResponse.redirect(new URL("/auth/login", request.url));
}