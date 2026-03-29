"use server";

import { createClient } from "@supabase/supabase-js";

// Supabase client sekarang murni pakai ANON KEY sesuai dengan settingan Vercel lu
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // <--- UDAH DIGANTI JADI ANON KEY
);

export async function submitLeadProject(formData: FormData, serviceName: string) {
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const description = formData.get("description") as string;
  const whatsapp = formData.get("whatsapp") as string;

  try {
    const { data, error } = await supabase
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
      ])
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    return { success: false, error: "Gagal mengirim permintaan." };
  }
}