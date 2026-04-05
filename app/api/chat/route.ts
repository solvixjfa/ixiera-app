import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'; 

export async function POST(request: NextRequest) {
  try {
    const { messages, sessionId } = await request.json();
    
    // Tembak langsung ke Direct API Hugging Face 
    const HF_BACKEND_URL = process.env.HF_BACKEND_URL || 'https://ixiera-ixiera-backend.hf.space/api/chat/';

    const response = await fetch(HF_BACKEND_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: 'ixiera-hq', // Sesuai dengan yang kita test di Swagger
        session_id: sessionId,
        messages: messages
      }),
    });

    if (!response.ok) {
      const errDetail = await response.text();
      throw new Error(`Backend Python Error: ${errDetail}`);
    }

    const data = await response.json();
    
    // Balikin jawaban AI-nya ke frontend
    return NextResponse.json({ response: data.response });

  } catch (err: any) {
    console.error("API ROUTE CRASH:", err.message);
    return NextResponse.json({ response: "Aduh, sistem lagi ada kendala teknis bentar ya Kak." }, { status: 200 });
  }
}