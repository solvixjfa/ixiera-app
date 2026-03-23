"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createTicket(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll(); } } }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Unauthorized");

  const subject = formData.get("subject") as string;
  const category = formData.get("category") as string;
  const priority = formData.get("priority") as string;
  const description = formData.get("description") as string;

  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (clientError || !client) throw new Error("Client profile not found");

  const ticketNumber = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;

  const { error: insertError } = await supabase.from("support_tickets").insert({
    client_id: client.id,
    user_id: user.id,
    ticket_number: ticketNumber,
    subject,
    category,
    priority,
    description,
    status: "open",
  });

  if (insertError) throw new Error(insertError.message);

  // INI KUNCINYA: Jangan pakai redirect di server action, return ini aja
  return { success: true }; 
}