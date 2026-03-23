"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// Definisikan tipe untuk state yang direturn
export type FormState = {
  error: string | null;
};

export async function loginAction(
  prevState: FormState, // <-- Tipe ini harus sesuai dengan inisial state di komponen UI
  formData: FormData
): Promise<FormState> { // <-- Return type wajib FormState
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Basic validation
  if (!email || !password) {
    return { error: "Please provide both email and password" };
  }

  let isSuccess = false;

  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    // Jika sukses, tandai true
    isSuccess = true;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "An error occurred";
    return { error: message };
  }

  // Redirect dilakukan di luar blok try/catch untuk menghindari error Next.js
  if (isSuccess) {
  redirect('/dashboard/overview')
  }

  // Fallback return (kalau-kalau tidak masuk try atau tidak error tapi tidak sukses)
  return { error: null };
}