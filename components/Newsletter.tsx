'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = async () => {
    if (!email.trim() || !email.includes('@')) {
      alert("Masukkan email yang valid ya Kak!");
      return;
    }

    setIsLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full bg-gray-50 dark:bg-zinc-900 py-20 px-4 border-t border-gray-100 dark:border-zinc-800">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4 uppercase tracking-tighter">
          Newsletter Ixiera
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Dapatkan update teknologi dan automasi terbaru langsung di inbox Kakak.
        </p>
        
        {status === 'success' ? (
          <div className="bg-black dark:bg-white p-4 rounded-lg">
            <p className="text-white dark:text-black font-bold">🎉 Terkirim! Cek email Kakak ya.</p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Kakak"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
            />
            <Button 
              onClick={handleSubscribe}
              disabled={isLoading}
              className="bg-black dark:bg-white text-white dark:text-black hover:opacity-80"
            >
              {isLoading ? '...' : 'SUBSCRIBE'}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}