import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, RefreshCw, Bot, Workflow, CheckCircle2 } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";

export default function AutomationSolutionPage() {
  return (
    <main className="flex-1 w-full bg-background">

      {/* 1. HERO SECTION */}
      <section className="pt-24 pb-16 px-4 md:px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6">
          <Workflow className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
          Pekerjaan yang bisa diotomasi <br className="hidden md:block" />
          <span className="text-muted-foreground">seharusnya tidak dikerjakan manusia.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          Setiap jam yang dihabiskan tim Anda untuk copy-paste data, kirim laporan manual,
          atau follow-up satu per satu — adalah jam yang seharusnya dipakai untuk hal yang lebih penting.
        </p>
      </section>

      {/* 2. PAIN POINTS & SOLUSI */}
      <section className="py-16 px-4 md:px-6 border-y bg-muted/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-background p-8 rounded-2xl border shadow-sm">
            <RefreshCw className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Waktu yang tidak bisa dibeli balik</h3>
            <p className="text-muted-foreground">
              Rekap data harian yang memakan 4 jam? Sistem bisa menyelesaikannya dalam 4 detik.
              Biarkan tim Anda fokus pada hal yang membutuhkan pikiran manusia.
            </p>
          </div>
          <div className="bg-background p-8 rounded-2xl border shadow-sm">
            <Bot className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Manusia bisa lelah, sistem tidak</h3>
            <p className="text-muted-foreground">
              Salah input, data tidak sinkron, invoice terlewat — semua itu terjadi karena manusia.
              Otomasi menghilangkan variabel itu dari persamaan.
            </p>
          </div>
          <div className="bg-background p-8 rounded-2xl border shadow-sm">
            <Zap className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Semua aplikasi Anda, satu ekosistem</h3>
            <p className="text-muted-foreground">
              WhatsApp, CRM, Google Sheets, e-commerce — semuanya jalan sendiri-sendiri sekarang.
              Kami hubungkan semuanya sehingga data mengalir otomatis tanpa campur tangan manual.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FITUR & TECH STACK */}
      <section className="py-20 px-4 md:px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Contoh alur yang sudah kami otomasi:</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Lead Routing Otomatis:</strong> Prospek masuk dari iklan →
                  langsung masuk CRM → pesan sapaan WhatsApp terkirim dalam hitungan detik.
                  Tanpa ada yang kelewatan.
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Auto-Invoicing & Follow-up:</strong> Klien setuju project →
                  invoice dibuat otomatis → pengingat dikirim sendiri kalau mendekati jatuh tempo.
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Sinkronisasi E-Commerce:</strong> Pesanan masuk →
                  stok berkurang di database → notifikasi ke tim gudang — semuanya tanpa satu pun klik manual.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-black dark:bg-zinc-900 rounded-2xl p-8 border dark:border-zinc-800 text-white shadow-xl">
            <h3 className="text-xl font-semibold mb-2">Infrastruktur Otomasi</h3>
            <p className="text-zinc-400 text-sm mb-6">Fleksibel — menyesuaikan tools yang sudah ada.</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                <span className="text-zinc-400">Core Engine</span>
                <span className="font-mono font-medium text-right">n8n</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                <span className="text-zinc-400">Data Flow</span>
                <span className="font-mono font-medium text-right">Webhook & REST API</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                <span className="text-zinc-400">Database & Storage</span>
                <span className="font-mono font-medium text-right">Supabase</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Messaging API</span>
                <span className="font-mono font-medium text-right">Evolution API / Meta Graph</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LEAD FORM */}
      <section className="py-16 px-4 md:px-6 bg-muted/10 border-t" id="lead-form">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Proses mana yang paling menyita waktu tim Anda?</h2>
            <p className="text-muted-foreground">
              Ceritakan — kami bantu identifikasi mana yang bisa diotomasi duluan dan dampaknya paling besar.
            </p>
          </div>
          <LeadForm serviceName="Business Automation" />
        </div>
      </section>

    </main>
  );
}