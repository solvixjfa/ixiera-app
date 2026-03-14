import {
  Code2,
  Database,
  Flame,
  Palette,
  Users,
  Globe,
} from "lucide-react";

const integrations = [
  { name: "Next.js", icon: Code2 },
  { name: "Supabase", icon: Database },
  { name: "Firebase", icon: Flame },
  { name: "Tailwind CSS", icon: Palette },
  { name: "CRM", icon: Users },
  { name: "Open Source", icon: Globe },
];

// Duplikasi untuk efek infinite
const duplicatedIntegrations = [...integrations, ...integrations];

export function IntegrationsSection() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white text-center mb-4">
          Teknologi & Integrasi
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12">
          Kami menggunakan stack modern dan dapat diintegrasikan dengan berbagai layanan.
        </p>

        {/* Baris pertama bergerak ke kiri */}
        <div className="relative flex overflow-hidden group">
          <div className="flex animate-marquee-left whitespace-nowrap">
            {duplicatedIntegrations.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${item.name}-${index}`}
                  className="mx-3 flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2"
                >
                  <Icon className="w-5 h-5 text-black dark:text-white" />
                  <span className="text-sm font-medium text-black dark:text-white">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Baris kedua bergerak ke kanan */}
        <div className="relative flex overflow-hidden mt-4 group">
          <div className="flex animate-marquee-right whitespace-nowrap">
            {duplicatedIntegrations.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${item.name}-${index}-2`}
                  className="mx-3 flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2"
                >
                  <Icon className="w-5 h-5 text-black dark:text-white" />
                  <span className="text-sm font-medium text-black dark:text-white">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}