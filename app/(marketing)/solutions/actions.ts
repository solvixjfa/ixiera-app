"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function submitLeadProject(formData: FormData, serviceName: string) {
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const description = formData.get("description") as string;
  const whatsapp = formData.get("whatsapp") as string;

  try {
    // KITA HAPUS .select() dan .single()
    const { error } = await supabase
      .from("inquiries")
      .insert([
        { 
          email, 
          company_name: company, 
          service_name: serviceName, 
          description,
          whatsapp,
          status: 'new'
        }
      ]);

    if (error) throw error;

    // Gak perlu balikin data, cukup status sukses aja
    return { success: true };
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    return { success: false, error: "Gagal mengirim permintaan." };
  }
}