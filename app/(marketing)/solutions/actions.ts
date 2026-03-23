"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function submitLeadProject(formData: FormData, serviceName: string) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll(); } } }
  );

  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const description = formData.get("description") as string;

  // Cek apakah user sedang login
  const { data: { user } } = await supabase.auth.getUser();

  let clientId = null;

  // Kalau user udah login, cari client_id-nya
  if (user) {
    const { data: client } = await supabase
      .from("clients")
      .select("id")
      .eq("user_id", user.id)
      .single();
    
    if (client) clientId = client.id;
  }

  // 1. Simpan ke tabel projects (Pastikan lu punya tabel projects di Supabase ya!)
  // Kolom 'email' disimpan juga buat jaga-jaga kalau dia belum punya akun (guest)
  const { error } = await supabase.from("projects").insert({
    client_id: clientId, // Bisa null kalau dia belum login
    user_id: user?.id || null, // Bisa null kalau belum login
    guest_email: email, // Simpan emailnya buat di-link nanti pas dia daftar
    service_name: serviceName,
    company_name: company,
    description: description,
    status: "pending_review", // Status awal
  });

  if (error) {
    console.error("Error insert project:", error);
    throw new Error("Gagal menyimpan permintaan proyek.");
  }

  // Beritahu form apakah orang ini udah login atau belum
  return { 
    success: true, 
    isLoggedIn: !!user 
  };
}