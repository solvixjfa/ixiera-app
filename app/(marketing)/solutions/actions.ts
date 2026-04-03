"use server";

export async function submitLeadProject(formData: FormData, serviceName: string) {
  // 1. Tangkap data dari form UI lu
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const description = formData.get("description") as string;
  const whatsapp = formData.get("whatsapp") as string;

  // 2. Bungkus datanya sesuai sama nama variabel di Pydantic schema FastAPI lu
  const payload = {
    email: email,
    company_name: company,
    service_name: serviceName,
    description: description,
    whatsapp: whatsapp
  };

  try {
    // 3. Tembak roketnya ke awan Hugging Face!
    const response = await fetch("https://ixiera-ixiera-backend.hf.space/api/leads/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    // 4. Cek kalau backend ngasih lampu hijau
    if (response.ok && result.success) {
      return { success: true };
    } else {
      console.error("Backend nolak paketnya:", result);
      return { success: false, error: "Gagal diproses oleh server." };
    }

  } catch (error) {
    console.error("Gagal nyambung ke API:", error);
    return { success: false, error: "Server sedang sibuk atau offline." };
  }
}