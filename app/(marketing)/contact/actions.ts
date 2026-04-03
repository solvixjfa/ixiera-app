"use server";

export async function submitContactMessage(formData: FormData) {
  const payload = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    whatsapp: formData.get("whatsapp") as string,
    topic: formData.get("topic") as string,
    message: formData.get("message") as string,
  };

  try {
    // Nembak ke endpoint /contacts/ yang baru kita bikin di atas
    const response = await fetch("https://ixiera-ixiera-backend.hf.space/api/contacts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return { success: true };
    } else {
      return { success: false, error: "Gagal diproses oleh server." };
    }
  } catch (error) {
    return { success: false, error: "Server sedang sibuk atau offline." };
  }
}