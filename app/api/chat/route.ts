import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Pakai Node.js runtime dulu biar stabil di local
export const runtime = 'nodejs'; 

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { messages, sessionId, context } = await request.json();
    
    // 1. Panggil Groq dengan timeout lebih lama
    const aiRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}` 
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'Anda adalah Ixiera AI. Bantu klien dan pancing Nama/WA.' },
          ...messages.map((m: any) => ({ role: m.role, content: m.content }))
        ],
      }),
    });

    if (!aiRes.ok) {
      const errDetail = await aiRes.text();
      throw new Error(`Groq Error: ${errDetail}`);
    }

    const data = await aiRes.json();
    const aiText = data.choices?.[0]?.message?.content || "Maaf, saya gagal memproses jawaban.";

    // 2. Simpan ke Supabase (Fix Error Constraint: Manual Check & Update/Insert)
    const { data: existingSession } = await supabase
      .from('ai_conversations')
      .select('session_id')
      .eq('session_id', sessionId)
      .maybeSingle();

    let dbError;

    if (existingSession) {
      // Jika session_id sudah ada -> UPDATE
      const { error } = await supabase
        .from('ai_conversations')
        .update({
          messages: [...messages, { role: 'assistant', content: aiText }],
          context: context || {},
          tokens_used: data.usage?.total_tokens || 0,
          updated_at: new Date().toISOString(),
        })
        .eq('session_id', sessionId);
      dbError = error;
    } else {
      // Jika session_id belum ada -> INSERT
      const { error } = await supabase
        .from('ai_conversations')
        .insert([{
          session_id: sessionId,
          messages: [...messages, { role: 'assistant', content: aiText }],
          context: context || {},
          model: 'llama-3.3-70b-versatile',
          tokens_used: data.usage?.total_tokens || 0,
          updated_at: new Date().toISOString(),
        }]);
      dbError = error;
    }

    if (dbError) {
      console.error("SUPABASE ERROR:", dbError.message);
    }

    return NextResponse.json({ response: aiText });

  } catch (err: any) {
    console.error("API ROUTE CRASH:", err.message);
    return NextResponse.json({ response: "Aduh, sistem lagi ada kendala teknis bentar ya Kak." }, { status: 200 });
  }
}