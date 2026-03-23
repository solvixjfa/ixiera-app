import { Brain, Server, Lock, Users, CheckCircle2 } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";

export default function AIInternalSolutionPage() {
  return (
    <main className="flex-1 w-full bg-background">

      {/* 1. HERO SECTION */}
      <section className="pt-24 pb-16 px-4 md:px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6">
          <Brain className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
          AI yang tahu bisnis Anda — <br className="hidden md:block" />
          <span className="text-muted-foreground">dan tidak pernah membocorkan datanya.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          Kebanyakan tools AI meminta data Anda dikirim ke server orang lain.
          Untuk bisnis yang serius menjaga privasi klien dan data internal —
          itu bukan pilihan yang bisa diterima.
        </p>
      </section>

      {/* 2. PAIN POINTS & SOLUSI */}
      <section className="py-16 px-4 md:px-6 border-y bg-muted/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-background p-8 rounded-2xl border shadow-sm">
            <Lock className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Data tidak pernah keluar</h3>
            <p className="text-muted-foreground">
              AI berjalan di VPS atau hardware Anda sendiri. Tidak ada data yang
              dikirim ke server pihak ketiga — percakapan, dokumen, dan knowledge base
              semuanya tetap di infrastruktur Anda.
            </p>
          </div>
          <div className="bg-background p-8 rounded-2xl border shadow-sm">
            <Brain className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">AI yang paham konteks bisnis Anda</h3>
            <p className="text-muted-foreground">
              Bukan AI generik yang tidak tahu apa-apa tentang perusahaan Anda.
              Kami integrasikan dengan dokumen internal, SOP, dan knowledge base
              sehingga jawabannya relevan dan akurat.
            </p>
          </div>
          <div className="bg-background p-8 rounded-2xl border shadow-sm">
            <Users className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Seluruh tim bisa pakai</h3>
            <p className="text-muted-foreground">
              Interface chat yang familiar — seperti ChatGPT, tapi milik perusahaan Anda.
              Tidak perlu training teknis. Tim langsung bisa produktif dari hari pertama.
            </p>
          </div>
        </div>
      </section>

      {/* 3. USE CASES & TECH STACK */}
      <section className="py-20 px-4 md:px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Siapa yang paling terbantu?</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Tim Marketing:</strong> Generate konten, caption,
                  email campaign, dan brief kreatif — dengan tone dan gaya yang konsisten sesuai brand.
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Tim Sales:</strong> Akses cepat ke informasi produk,
                  harga, dan spesifikasi tanpa harus membuka dokumen satu per satu di tengah presentasi.
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">HR & Operasional:</strong> Karyawan tanya soal SOP,
                  cuti, atau kebijakan internal — AI jawab instan, tanpa harus ganggu HR setiap saat.
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Manajemen & Eksekutif:</strong> Ringkasan laporan,
                  analisis data, dan draft dokumen — selesai dalam menit, bukan jam.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-black dark:bg-zinc-900 rounded-2xl p-8 border dark:border-zinc-800 text-white shadow-xl">
            <h3 className="text-xl font-semibold mb-2">Infrastruktur AI</h3>
            <p className="text-zinc-400 text-sm mb-6">Data Anda, di tempat Anda.</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                <span className="text-zinc-400">AI Model</span>
                <span className="font-mono font-medium text-right">Local LLM (self-hosted)</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                <span className="text-zinc-400">Knowledge Base</span>
                <span className="font-mono font-medium text-right">RAG (pgvector)</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                <span className="text-zinc-400">Infrastruktur</span>
                <span className="font-mono font-medium text-right">VPS / On-premise</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Interface</span>
                <span className="font-mono font-medium text-right">Web chat / Custom UI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LEAD FORM */}
      <section className="py-16 px-4 md:px-6 bg-muted/10 border-t" id="lead-form">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Tim Anda butuh AI yang seperti apa?</h2>
            <p className="text-muted-foreground">
              Ceritakan kebutuhan dan kondisi infrastruktur Anda sekarang —
              kami bantu tentukan setup yang paling tepat.
            </p>
          </div>
          <LeadForm serviceName="AI Internal Setup" />
        </div>
      </section>

    </main>
  );
}