'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, GitBranch, Zap } from 'lucide-react';

export function SolutionsSection() {
  const solutions = [
    {
      icon: Code,
      title: 'Custom Development',
      description: 'Web & mobile app sesuai kebutuhan bisnis Anda.',
      href: '/solutions/custom',
    },
    {
      icon: GitBranch,
      title: 'Integration Service',
      description: 'Hubungkan sistem lama dengan teknologi modern.',
      href: '/solutions/integration',
    },
    {
      icon: Zap,
      title: 'Automation',
      description: 'Otomatisasi workflow dan laporan.',
      href: '/solutions/automation',
    },
  ];

  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 py-20 px-4 md:py-32 md:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
            Solutions We Provide
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            End-to-end digital solutions untuk membantu bisnis anda berkembang
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution) => {
            const IconComponent = solution.icon;
            return (
              <Card key={solution.title} className="p-8 border border-gray-200 dark:border-gray-800 hover:shadow-lg dark:hover:shadow-lg transition-shadow">
                {/* Icon */}
                <IconComponent className="w-12 h-12 text-black dark:text-white mb-4" />

                {/* Title */}
                <h3 className="text-xl font-bold text-black dark:text-white mb-3">
                  {solution.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-4">{solution.description}</p>

                {/* Learn More Link */}
                <Button
                  variant="link"
                  className="text-black p-0 h-auto hover:text-gray-700"
                  asChild
                >
                  <a href={solution.href}>Learn more →</a>
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
