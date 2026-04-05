import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Tembak ke endpoint Newsletter HF lu
    // Kalau env HF_BACKEND_URL lu /api/chat/, kita replace jadi /api/newsletter/
    const HF_URL = process.env.HF_BACKEND_URL 
      ? process.env.HF_BACKEND_URL.replace('/api/chat/', '/api/newsletter/') 
      : 'https://ixiera-ixiera-backend.hf.space/api/newsletter/';

    const response = await fetch(HF_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error('Gagal dari backend HF');

    const data = await response.json();
    return NextResponse.json(data);

  } catch (err: any) {
    console.error("API ROUTE CRASH:", err.message);
    return NextResponse.json({ success: false, message: "Terjadi kesalahan." }, { status: 500 });
  }
}