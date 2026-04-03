"use client";

import { useState, useRef, useEffect } from "react";
import { getCalApi } from "@calcom/embed-react"; // Import Cal.com
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Calendar, CheckCircle2, RefreshCw } from "lucide-react"; // Tambah icon
import { submitContactMessage } from "./actions"; 

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // State buat UI Sukses
  const formRef = useRef<HTMLFormElement>(null);

  // Inisialisasi Cal.com
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        theme: "auto",
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    
    try {
      const result = await submitContactMessage(formData);

      if (result?.success) {
        toast.success("Pesan Berhasil Terkirim!", {
          description: "Tim Ixiera akan segera membalas pesan Anda.",
        });
        
        // Ubah jadi UI Sukses!
        setIsSubmitted(true);
        formRef.current?.reset();
      } else {
        toast.error("Gagal mengirim pesan", { description: result?.error || "Silakan coba lagi nanti." });
      }
    } catch (error) {
      toast.error("Sistem Sibuk", { description: "Gagal terhubung ke server." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-white dark:from-gray-950 to-gray-50 dark:to-gray-900 py-20 px-4 md:py-32 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6">
            Hubungi Kami
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Ada pertanyaan atau ingin diskusi project? Tim kami siap membantu Anda
          </p>
          
          {/* Tombol Cal.com yang udah Bener (Pakai data-cal-link) */}
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 h-14"
            data-cal-link="ixiera/15min"
            data-cal-config='{"layout":"month_view"}'
          >
            <Calendar className="w-5 h-5 mr-2" />
            Jadwalkan Meeting Online
          </Button>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="w-full py-20 px-4 md:py-32 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-8">Informasi Kontak</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-black dark:text-white mb-2">Email</h3>
                  <a href="mailto:hello@ixiera.id" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    hello@ixiera.id
                  </a>
                </div>

                <div>
                  <h3 className="font-bold text-black dark:text-white mb-2">WhatsApp</h3>
                  <a href="https://wa.me/6285702373412" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors block">
                    +62 857-0237-3412
                  </a>
                </div>

                <div>
                  <h3 className="font-bold text-black dark:text-white mb-2">Alamat</h3>
                  <a href="https://maps.google.com/?q=wilo+ketanireng+pasuruan+67157" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors block">
                    Wilo Ketanireng<br />Pasuruan 67157
                  </a>
                </div>

                <div>
                  <h3 className="font-bold text-black dark:text-white mb-2">Jam Operasional</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Senin - Jumat: 09:00 - 17:00<br />Sabtu: 10:00 - 14:00<br />Minggu: Tutup
                  </p>
                </div>
              </div>
            </div>

            {/* Bagian Kanan: Form atau Pesan Sukses */}
            <div>
              <h2 className="text-2xl font-bold text-black dark:text-white mb-8">Kirim Pesan</h2>

              {isSubmitted ? (
                // UI JIKA SUKSES SUBMIT
                <div className="border-2 border-primary/20 bg-primary/5 rounded-2xl p-8 text-center space-y-6">
                  <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-black dark:text-white">Pesan Diterima!</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Terima kasih telah menghubungi Ixiera. Tim kami akan segera meninjau pesan Anda dan membalasnya via WhatsApp atau Email.
                  </p>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg text-sm text-yellow-700 dark:text-yellow-400 text-left">
                    <strong>⚠️ Penting:</strong> Silakan periksa folder <b>Inbox</b> atau <b>Spam</b> pada email Anda untuk melihat tiket balasan otomatis dari kami.
                  </div>
                  <Button 
                    variant="outline" 
                    className="mt-4 w-full"
                    onClick={() => setIsSubmitted(false)}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Kirim Pesan Lainnya
                  </Button>
                </div>
              ) : (
                // UI FORM NORMAL
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input name="name" type="text" required placeholder="Nama Anda" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-primary outline-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input name="email" type="email" required placeholder="email@domain.com" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                        WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input name="whatsapp" type="tel" required placeholder="0812..." className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black dark:text-white mb-2">Topik</label>
                    <select name="topic" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white focus:ring-2 focus:ring-primary outline-none">
                      <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                      <option value="Demo/Konsultasi">Demo/Konsultasi AI & Web</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                      Pesan <span className="text-red-500">*</span>
                    </label>
                    <textarea name="message" required placeholder="Tulis pesan Anda di sini..." rows={4} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white resize-none focus:ring-2 focus:ring-primary outline-none" />
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full text-white py-6 text-md">
                    {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : null}
                    {isLoading ? "Mengirim Pesan..." : "Kirim Pesan"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (Tetap sama) */}
      <section className="w-full bg-gray-50 dark:bg-gray-900 py-20 px-4 md:py-32 md:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-black dark:text-white mb-12 text-center">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="space-y-6">
            {[
              { q: 'Berapa lama proses implementasi Ixiera?', a: 'Tergantung kebutuhan Anda, setidaknya 1-2 minggu untuk setup dan training lengkap.' },
              { q: 'Apakah data saya aman?', a: 'Kami menggunakan keamanan tingkat enterprise dan database terisolasi untuk mengamankan aset digital Anda.' },
              { q: 'Apakah bisa integrasi dengan sistem yang sudah ada?', a: 'Tentu. Solusi automasi kami dibangun untuk bisa terkoneksi dengan berbagai software yang sudah Anda gunakan (ERP, CRM, dll).' },
            ].map((item, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-950 hover:border-primary/50 transition-colors">
                <h3 className="text-lg font-bold text-black dark:text-white mb-3">{item.q}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}