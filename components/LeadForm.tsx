"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Rocket } from "lucide-react";
import { submitLeadProject } from "@/app/(marketing)/solutions/actions";

// PROPS: Inilah yang bikin 1 form bisa dipakai di 4 layanan berbeda!
export function LeadForm({ serviceName }: { serviceName: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  // Efek untuk auto-detect email kalau udah login
  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch("/api/auth/user");
      if (res.ok) {
        const data = await res.json();
        if (data.user) setUserEmail(data.user.email);
      }
    };
    checkUser();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    
    try {
      // Kirim form data dan NAMA LAYANAN ke server
      const result = await submitLeadProject(formData, serviceName);
      
      if (result?.success) {
        toast.success("Permintaan Berhasil Diterima!", {
          description: "Sistem sedang menyiapkan ruang kerja Anda.",
        });

        // SMART REDIRECT
        if (result.isLoggedIn) {
          router.push("/dashboard/overview"); // Langsung masuk dashboard
        } else {
          // Arahkan ke Sign Up biar dia bikin akun pakai email yang tadi diisi
          router.push(`/auth/sign-up?email=${formData.get("email")}`); 
        }
      }
    } catch (error) {
      toast.error("Terjadi Kesalahan", { description: "Gagal mengirim permintaan. Coba lagi."});
      setIsLoading(false);
    }
  }

  return (
    <Card className="border-primary/20 shadow-lg mt-12">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Rocket className="w-6 h-6 text-primary" />
          Mulai Projects {serviceName}
        </CardTitle>
        <CardDescription>
          Ceritakan kebutuhan Anda. Kami akan buatkan proposal dan langsung menyiapkan ruang projects di Client Portal Anda.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="nama@kamu.com" 
              defaultValue={userEmail || ""} // Auto isi kalau udah login
              readOnly={!!userEmail} // Lock (kunci) kalau udah login
              className={userEmail ? "bg-muted" : ""}
              required 
            />
            {userEmail && <p className="text-xs text-muted-foreground">Email terdeteksi otomatis dari akun Anda.</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Nama Perusahaan / Bisnis <span className="text-red-500">*</span></Label>
            <Input id="company" name="company" placeholder="Contoh:  Jaya Abadi" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Apa hasil akhir yang Anda harapkan? <span className="text-red-500">*</span></Label>
            <Textarea 
              id="description" 
              name="description" 
              placeholder={`Ceritakan masalah yang ingin Anda selesaikan dengan ${serviceName}...`}
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