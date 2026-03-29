// @ts-nocheck
// hook github workflows

Deno.serve(async (req) => {
  try {
    // 1. Tangkap data dari Webhook Supabase (Tabel inquiries)
    const payload = await req.json();
    const { email, company_name, service_name, whatsapp, description } = payload.record;

    // 2. Ambil kunci rahasia dari environment awan Supabase
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

    if (!RESEND_API_KEY || !TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error("Missing API Keys di Supabase Dashboard Secrets");
    }

    // 3. Tugas 1: Kirim Email Konfirmasi ke Klien (via Resend)
    const sendEmail = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Ixiera.id <hello@mail.ixiera.id>", // Pastikan domain ini sudah di-verify di Resend
        to: email,
        subject: `Permintaan Layanan ${service_name} Diterima 🚀`,
        html: `
          <div style="font-family: sans-serif; line-height: 1.6;">
            <h2>Halo tim ${company_name},</h2>
            <p>Terima kasih telah menghubungi <b>Ixiera.id</b>. Kami telah menerima detail kebutuhan Anda untuk proyek: <strong>${service_name}</strong>.</p>
            <p>Tim kami sedang meninjau permintaan Anda dan akan segera menghubungi Anda melalui nomor WhatsApp (<strong>${whatsapp}</strong>) untuk diskusi lebih lanjut.</p>
            <hr />
            <p>Salam hangat,<br/><b>Ixiera Automation System</b></p>
          </div>
        `
      })
    });

    // 4. Tugas 2: Kirim Notifikasi ke Telegram Admin (Lu)
    const telegramText = `
🚨 <b>ADA INQUIRY BARU!</b> 🚨

🏢 <b>Perusahaan:</b> ${company_name}
🎯 <b>Layanan:</b> ${service_name}
📧 <b>Email:</b> ${email}
📱 <b>WhatsApp:</b> ${whatsapp}
💬 <b>Deskripsi:</b> 
<i>${description}</i>

<i>Segera cek dashboard admin untuk follow-up.</i>
    `;
    
    const sendTelegram = fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        chat_id: TELEGRAM_CHAT_ID, 
        text: telegramText, 
        parse_mode: "HTML" 
      })
    });

    // 5. Eksekusi KEDUANYA secara PARALEL (Lebih cepat)
    await Promise.allSettled([sendEmail, sendTelegram]);

    return new Response(JSON.stringify({ success: true, message: "Email & Telegram sent" }), { 
      headers: { "Content-Type": "application/json" } 
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" } 
    });
  }
});