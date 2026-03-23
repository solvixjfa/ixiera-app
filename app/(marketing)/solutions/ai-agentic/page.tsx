import { MessageCircle, Clock, GitBranch, TrendingUp, CheckCircle2 } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";

export default function AIAgenticSolutionPage() {
  return (
    <main className="flex-1 w-full bg-background">

      {/* 1. HERO SECTION */}
      <section className="pt-24 pb-16 px-4 md:px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6">
          <MessageCircle className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
          Bukan chatbot biasa. <br className="hidden md:block" />
          <span className="text-muted-foreground">Ini AI yang bisa closing.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          Chatbot biasa hanya balas pesan sesuai script — dan stuck begitu ada pertanyaan
          di luar itu. AI agentic yang kami bangun memahami konteks, mengikuti alur percakapan,
          dan mendorong konversi. 24 jam sehari, tanpa gaji, tanpa libur.
        </p>
      </section>

      {/* 2. PAIN POINTS & SOLUSI */}
      <section className="py-16 px-4 md:px-6 border-y bg-muted/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-background p-8 rounded-2xl border shadow-sm">
            <Clock className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Prospek tidak menunggu</h3>
            <p className="text-muted-foreground">
              Prospek yang tidak direspons dalam 5 menit pertama? Kemungkinan besar sudah
              ke kompetitor. AI agent kami merespons instan — kapanpun prospek menghubungi,
              termasuk tengah malam.
            </p>
          </div>
          <div className="bg-background p-8 rounded-2xl border shadow-sm">
            <GitBranch className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Berpikir, bukan hanya membalas</h3>
            <p className="text-muted-foreground">
              AI agentic bisa memahami maksud di balik pertanyaan, menelusuri informasi
              produk, dan menyesuaikan pendekatan berdasarkan konteks percakapan —
              bukan sekadar cocokkan kata kunci.
            </p>
          </div>
          <div className="bg-background p-8 rounded-2xl border shadow-sm">
            <TrendingUp className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Tim Anda untuk yang penting</h3>
            <p className="text-muted-foreground">
              Biarkan AI handle pertanyaan umum, kualifikasi prospek, dan follow-up awal.
              Tim Anda fokus ke closing yang butuh sentuhan manusia — bukan menjawab
              pertanyaan yang sama berulang kali.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FITUR & TECH STACK */}
      <section className="py-20 px-4 md:px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Apa yang AI agent ini bisa lakukan?</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Kualifikasi prospek otomatis:</strong> AI menggali
                  kebutuhan, budget, dan timeline — lalu meneruskan ke tim sales hanya yang benar-benar
                  siap difollow-up.
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Ingat seluruh riwayat percakapan:</strong> Prospek
                  tidak perlu mengulang cerita dari awal setiap kali menghubungi —
                  AI ingat konteks dari percakapan sebelumnya.
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Handover ke manusia saat tepat:</strong> Ketika
                  situasi butuh keputusan atau negosiasi serius, AI serahkan percakapan ke tim Anda —
                  lengkap dengan ringkasan konteksnya.
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Dashboard monitoring:</strong> Pantau volume
                  percakapan, tingkat respons, dan performa agent secara real-time.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-black dark:bg-zinc-900 rounded-2xl p-8 border dark:border-zinc-800 text-white shadow-xl">
            <h3 className="text-xl font-semibold mb-2">Tech Stack</h3>
            <p className="text-zinc-400 text-sm mb-6">Multi-step reasoning — bukan sekadar FAQ bot.</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                <span className="text-zinc-400">AI Orchestration</span>
                <span className="font-mono font-medium text-right">LangGraph (Python)</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                <span className="text-zinc-400">Knowledge Base</span>
                <span className="font-mono font-medium text-right">RAG (pgvector)</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                <span className="text-zinc-400">Channel</span>
                <span className="font-mono font-medium text-right">WhatsApp / Web Chat</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">CRM Integration</span>
                <span className="font-mono font-medium text-right">Chatwoot / Custom</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LEAD FORM */}
      <section className="py-16 px-4 md:px-6 bg-muted/10 border-t" id="lead-form">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Berapa banyak prospek yang tidak sempat Anda respons hari ini?</h2>
            <p className="text-muted-foreground">
              Ceritakan volume dan channel yang Anda pakai sekarang —
              kami bantu hitung berapa yang bisa di-handle AI.
            </p>
          </div>
          <LeadForm serviceName="AI Agentic Sales & CS" />
        </div>
      </section>

    </main>
  );
}