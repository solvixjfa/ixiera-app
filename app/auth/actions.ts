"use server";

import { createClient } from "@/lib/supabase/server";

export type FormState = {
  error: string | null;
  success: boolean;
};

export async function loginAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please provide both email and password", success: false };
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message, success: false };
    }

    // KUNCI UTAMA: Jangan pakai redirect() di sini! 
    // Kita cuma ngasih tau komponen kalau loginnya sukses.
    return { error: null, success: true };
    
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "An error occurred";
    return { error: message, success: false };
  }
}