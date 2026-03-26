"use server";

import { auth } from "@clerk/nextjs/server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createTicket(formData: FormData) {
  // 1. Cek keamanan Clerk
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // 2. Ambil data dari form
  const subject = formData.get("subject") as string;
  const category = formData.get("category") as string;
  const priority = formData.get("priority") as string;
  const description = formData.get("description") as string;

  const supabase = await createClient();

  // 3. Cari ID Klien
  const { data: client } = await supabase
    .from("clients")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (!client) throw new Error("Client not found");

  // 4. Generate Nomor Tiket Otomatis
  const ticketNumber = `TCK-${new Date().toISOString().slice(2,10).replace(/-/g,'')}-${Math.floor(Math.random() * 10000)}`;

  // 5. Insert ke tabel support_tickets
  const { error } = await supabase.from("support_tickets").insert({
    client_id: client.id,
    user_id: userId,
    ticket_number: ticketNumber,
    subject: subject,
    title: subject,
    priority: priority,
    status: "open",
    description: description
  });

  if (error) {
    console.error("Insert Ticket Error:", error);
    return { success: false, error: error.message };
  }

  // 6. Refresh halaman daftar tiket biar tiket baru langsung muncul
  revalidatePath("/dashboard/tickets");
  return { success: true };
}