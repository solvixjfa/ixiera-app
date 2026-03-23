import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Monitor, Zap, Shield, Rocket, CheckCircle2, ArrowRight } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";

export default function WebAppSolutionPage() {
  return (
    <main className="flex-1 w-full bg-background">

      {/* 1. HERO SECTION */}
      <section className="pt-24 pb-16 px-4 md:px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6">
          <Monitor className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
          Website yang benar-benar <br className="hidden md:block" />
          <span className="text-muted-foreground">bekerja untuk bisnis Anda.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          Bukan template yang sama dipakai ribuan orang lain. Kami membangun web dan aplikasi dari nol — 
          dengan arsitektur yang siap berkembang seiring bisnis Anda tumbuh.
        </p>
      </section>

      {/* 2. PAIN POINTS & SOLUSI */}
      <section className="py-16 px-4 md:px-6 border-y bg-muted/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-background p-8 rounded-2xl border shadow-sm">
            <Zap className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Cepat dari pondasi</h3>
            <p className="text-muted-foreground">
              Website lambat itu mahal — dalam bentuk pengunjung yang pergi sebelum halaman selesai muat. 
              Kami bangun dengan Next.js sehingga performa bukan afterthought, tapi bagian dari arsitekturnya.
            </p>
          </div>
          <div className="bg-background p-8 rounded-2xl border shadow-sm">
            <Shield className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Data Anda, aman</h3>
            <p className="text-muted-foreground">
              Dibangun di atas Supabase dengan Row-Level Security — artinya setiap user hanya bisa 
              mengakses data yang memang milik mereka. Bukan keamanan asal-asalan.
            </p>
          </div>
          <div className="bg-background p-8 rounded-2xl border shadow-sm">
            <Rocket className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Tidak ada batas fitur</h3>
            <p className="text-muted-foreground">
              Platform SaaS membatasi apa yang bisa Anda tambahkan. Kode kustom tidak. 
              Apapun yang bisnis Anda butuhkan ke depan, bisa dibangun di atasnya.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FITUR & TECH STACK */}
      <section className="py-20 px-4 md:px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Apa yang bisa kami bangun untuk Anda?</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Client Portal / Dashboard:</strong> Klien Anda bisa pantau progress project, 
                  invoice, dan semua aset digital mereka — tanpa perlu WhatsApp Anda setiap hari.
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">SaaS Application:</strong> Ide software Anda diwujudkan jadi produk nyata, 
                  lengkap dengan sistem langganan dan manajemen user.
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Internal Tools & ERP:</strong> Sistem manajemen inventaris, HR, atau 
                  operasional yang mengikuti SOP perusahaan Anda — bukan sebaliknya.
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Landing Page & Web Company:</strong> Bukan sekadar tampil bagus. 
                  Dioptimasi untuk SEO dan didesain untuk mengkonversi pengunjung jadi prospek.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-black dark:bg-zinc-900 rounded-2xl p-8 border dark:border-zinc-800 text-white shadow-xl">
            <h3 className="text-xl font-semibold mb-2">Tech Stack</h3>
            <p className="text-zinc-400 text-sm mb-6">Teknologi yang proven, bukan eksperimen.</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                <span className="text-zinc-400">Frontend Framework</span>
                <span className="font-mono font-medium">Next.js (React)</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                <span className="text-zinc-400">Styling & UI</span>
                <span className="font-mono font-medium">Tailwind CSS + shadcn</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                <span className="text-zinc-400">Backend & Database</span>
                <span className="font-mono font-medium">Supabase (PostgreSQL)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Hosting & Edge</span>
                <span className="font-mono font-medium">Vercel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LEAD FORM */}
      <section className="py-16 px-4 md:px-6 bg-muted/10 border-t" id="lead-form">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Ceritakan project Anda.</h2>
            <p className="text-muted-foreground">
              Tidak perlu brief panjang. Cukup gambaran kasarnya — kami bantu urai sisanya.
            </p>
          </div>
          <LeadForm serviceName="Web & App Development" />
        </div>
      </section>

    </main>
  );
}