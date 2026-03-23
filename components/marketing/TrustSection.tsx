'use client';
import Image from 'next/image';

interface LogoItem {
  name: string;
  slug?: string; // For Simple Icons
  url?: string;  // For external CDNs
  color: string;
}

const techStackLogos: LogoItem[] = [
  { name: 'Next.js', slug: 'nextdotjs', color: '000000' },
  { name: 'Supabase', slug: 'supabase', color: '3FCF8E' },
  { name: 'Hetzner', slug: 'hetzner', color: 'D70015' },
  { name: 'Coolify', slug: 'coolify', color: '0EA5E9' },
  { name: 'n8n', slug: 'n8n', color: 'EB424B' },
  { name: 'Google Cloud', slug: 'googlecloud', color: '4285F4' },
  { name: 'LangGraph', slug: 'langgraph', color: '1FB29E' },
];

const integrationLogos: LogoItem[] = [
  { name: 'WhatsApp', slug: 'whatsapp', color: '25D366' },
  { name: 'Instagram', slug: 'instagram', color: 'E4405F' },
  { name: 'Facebook', slug: 'facebook', color: '1877F2' },
  { name: 'Threads', slug: 'threads', color: '000000' },
  { name: 'Stripe', url: 'https://www.vectorlogo.zone/logos/stripe/stripe-ar21.svg', color: '5469D4' },
  { name: 'Google Sheets', slug: 'googlesheets', color: '0F9D58' },
];

export function TrustSection() {
  // Duplicate logos for seamless loop
  const duplicatedTechStack = [...techStackLogos, ...techStackLogos, ...techStackLogos];
  const duplicatedIntegrations = [...integrationLogos, ...integrationLogos, ...integrationLogos];

  return (
    <section className="w-full bg-white dark:bg-gray-950 py-20 px-4 md:py-32 md:px-6 border-y border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl">
        {/* Tech Stack Section */}
        <div className="mb-20 md:mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-3">
              Our Core Tech Stack
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Built with the most reliable and scalable technologies in the industry.
            </p>
          </div>

          {/* Marquee Container - Left to Right */}
          <div className="relative overflow-hidden">
            {/* Left Fade Gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
            
            {/* Right Fade Gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />

            {/* Scrolling Container */}
            <div className="flex animate-marquee-left gap-8 md:gap-12 py-8">
              {duplicatedTechStack.map((logo, index) => {
                const logoSrc = logo.slug ? `https://cdn.simpleicons.org/${logo.slug}/808080` : logo.url;
                return (
                  <div
                    key={`tech-${index}`}
                    className="flex-shrink-0 flex items-center justify-center"
                  >
                    <div className="group cursor-pointer transition-all duration-300 hover:scale-110">
                      <Image
                        src={logoSrc!}
                        alt={logo.name}
                        width={64}
                        height={64}
                        unoptimized
                        className="w-14 h-14 md:w-16 md:h-16 object-contain transition-all duration-300 filter group-hover:drop-shadow-lg"
                        style={{
                          filter: 'grayscale(1)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.filter = 'grayscale(0)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.filter = 'grayscale(1)';
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Integrations Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-3">
              Seamless Integrations
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Connect with the platforms your business already uses.
            </p>
          </div>

          {/* Marquee Container - Right to Left */}
          <div className="relative overflow-hidden">
            {/* Left Fade Gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
            
            {/* Right Fade Gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />

            {/* Scrolling Container */}
            <div className="flex animate-marquee-right gap-8 md:gap-12 py-8">
              {duplicatedIntegrations.map((logo, index) => {
                const logoSrc = logo.slug ? `https://cdn.simpleicons.org/${logo.slug}/808080` : logo.url;
                return (
                  <div
                    key={`integration-${index}`}
                    className="flex-shrink-0 flex items-center justify-center"
                  >
                    <div className="group cursor-pointer transition-all duration-300 hover:scale-110">
                      <Image
                        src={logoSrc!}
                        alt={logo.name}
                        width={64}
                        height={64}
                        unoptimized
                        className="w-14 h-14 md:w-16 md:h-16 object-contain transition-all duration-300 filter group-hover:drop-shadow-lg"
                        style={{
                          filter: 'grayscale(1)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.filter = 'grayscale(0)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.filter = 'grayscale(1)';
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
