"use client";

import { useState, useRef } from "react";
import { toast } from "sonner"; // Popup notifikasi
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Rocket, CheckCircle2, RefreshCw } from "lucide-react";

import { submitLeadProject } from "@/app/(marketing)/solutions/actions";

export function LeadForm({ serviceName }: { serviceName: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null); // Buat reset form

  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    
    try {
      const result = await submitLeadProject(formData, serviceName);
      
      if (result?.success) {
        // 1. Munculin Popup Sukses
        toast.success("Permintaan Berhasil Diterima!", {
          description: "Data Anda telah masuk ke sistem kami.",
        });
        
        // 2. Ubah UI biar gak bisa di-spam
        setIsSubmitted(true);
        
        // 3. Bersihkan sisa ketikan di form
        formRef.current?.reset(); 
      } else {
        toast.error("Terjadi Kesalahan", { 
          description: result?.error || "Gagal mengirim permintaan." 
        });
      }
    } catch (error) {
      toast.error("Sistem Sibuk / Timeout", { 
        description: "Koneksi ke server terputus. Silakan coba tekan submit lagi."
      });
    } finally {
      setIsLoading(false);
    }
  }

  // UI JIKA SUKSES SUBMIT (Mencegah Spam)
  if (isSubmitted) {
    return (
      <Card className="shadow-lg mt-12 bg-primary/5 border-2 border-primary/20">
        <CardContent className="pt-10 pb-10 flex flex-col items-center text-center space-y-4">
          <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mb-2">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">Terima Kasih!</h3>
          <p className="text-muted-foreground max-w-sm">
            Permintaan untuk <strong>{serviceName}</strong> telah kami terima. Tim kami akan segera menghubungi Anda via WhatsApp.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => setIsSubmitted(false)} // Tombol buat ngisi form lagi
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Ajukan Proyek Lainnya
          </Button>
        </CardContent>
      </Card>
    );
  }

  // UI FORM NORMAL
  return (
    <Card className="border-primary/20 shadow-lg mt-12">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Rocket className="w-6 h-6 text-primary" />
          Mulai Projects {serviceName}
        </CardTitle>
        <CardDescription>
          Ceritakan kebutuhan Anda. Kami akan buatkan proposal dan segera menghubungi Anda untuk diskusi lebih lanjut.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Tambahkan formRef di sini */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="nama@perusahaan.com" 
                defaultValue={userEmail || ""} 
                readOnly={!!userEmail} 
                className={userEmail ? "bg-muted cursor-not-allowed" : ""}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">No. WhatsApp <span className="text-red-500">*</span></Label>
              <Input id="whatsapp" name="whatsapp" type="tel" placeholder="0812xxxxxx" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Nama Perusahaan / Bisnis <span className="text-red-500">*</span></Label>
            <Input id="company" name="company" placeholder="Contoh: PT Jaya Abadi" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Apa hasil akhir yang Anda harapkan? <span className="text-red-500">*</span></Label>
            <Textarea 
              id="description" 
              name="description" 
              placeholder={`Ceritakan masalah yang ingin Anda selesaikan dengan layanan ${serviceName} ini...`}
              className="min-h-[120px]" 
              required 
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : null}
            {isLoading ? "Memproses Data..." : "Ajukan Proyek Sekarang"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}