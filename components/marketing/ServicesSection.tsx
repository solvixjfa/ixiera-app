import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Monitor, Zap, Brain, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Monitor,
    title: 'Web & App Development',
    description: 'Website yang cepat, scalable, dan siap berkembang bersama bisnis Anda. Dibangun dengan teknologi modern — bukan template yang semua orang pakai.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Vercel'],
    href: '/solutions/web-app',
  },
  {
    icon: Zap,
    title: 'Business Automation',
    description: 'Kalau tim Anda masih copy-paste data setiap hari — itu bukan kerja keras, itu pemborosan. Kami otomasi proses bisnis dari ujung ke ujung.',
    tags: ['n8n', 'Webhook', 'API Integration', 'No-code / Low-code'],
    href: '/solutions/automation',
  },
  {
    icon: Brain,
    title: 'AI Internal Setup',
    description: 'AI yang tahu SOP perusahaan Anda, bantu tim marketing menulis konten, menjawab pertanyaan internal, dan berjalan di infrastruktur Anda sendiri. Data tidak pernah keluar.',
    tags: ['Local LLM', 'Self-hosted', 'VPS / On-premise', 'Custom Knowledge Base'],
    href: '/solutions/ai-internal',
  },
  {
    icon: MessageCircle,
    title: 'AI Agentic Sales & CS',
    description: 'Bukan sekadar chatbot yang balas pesan. Ini AI agent yang bisa berpikir, mengikuti alur percakapan, memahami produk Anda, dan mendorong konversi — 24 jam sehari.',
    tags: ['LangGraph', 'WhatsApp / Web', 'RAG', 'Multi-step Reasoning'],
    href: '/solutions/ai-agent',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="w-full bg-white dark:bg-gray-950 py-20 px-4 md:py-32 md:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 text-center">
          Apa yang kami kerjakan
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white text-center mb-4">
          Dari website sampai AI agent —
          <br />
          semua dalam satu mitra.
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto mb-12">
          Kami tidak memilih satu spesialisasi dan berhenti di sana.
          Karena bisnis Anda butuh ekosistem, bukan potongan-potongan terpisah.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Card key={idx} className="flex flex-col h-full border-gray-200 dark:border-gray-800 hover:shadow-lg transition">
                <CardHeader>
                  <div className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white dark:text-black" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="p-0 h-auto text-black dark:text-white hover:bg-transparent hover:underline group" asChild>
                    <Link href={service.href}>
                      Pelajari lebih lanjut
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}