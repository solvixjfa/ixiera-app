"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Rocket } from "lucide-react";

// Import Server Action yang udah kita bikin tadi
import { submitLeadProject } from "@/app/(marketing)/solutions/actions";

export function LeadForm({ serviceName }: { serviceName: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Clerk otomatis deteksi user (tanpa useEffect yang bikin error/loading lama)
  const { isSignedIn, user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    
    try {
      // Tembak data ke actions.ts
      const result = await submitLeadProject(formData, serviceName);
      
      if (result?.success) {
        toast.success("Permintaan Berhasil Diterima!", {
          description: "Tim kami akan segera meninjau permintaan Anda.",
        });

        // SMART REDIRECT
        if (isSignedIn) {
          // Kalau udah punya akun, langsung lempar ke Dashboard
          router.push("/dashboard/overview");
        } else {
          // Kalau belum punya akun, arahkan ke Sign Up + bawa emailnya biar gak ngetik 2x
          router.push(`/auth/sign-up?email=${formData.get("email")}`); 
        }
      } else {
        toast.error("Terjadi Kesalahan", { description: result?.error || "Gagal mengirim permintaan." });
      }
    } catch (error) {
      toast.error("Terjadi Kesalahan", { description: "Sistem sedang sibuk. Silakan coba lagi."});
    } finally {
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
          Ceritakan kebutuhan Anda. Kami akan buatkan proposal dan segera menghubungi Anda untuk diskusi lebih lanjut.
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
              placeholder="nama@perusahaan.com" 
              defaultValue={userEmail || ""} // Auto isi kalau udah login Clerk
              readOnly={!!userEmail} // Kunci field kalau udah login
              className={userEmail ? "bg-muted cursor-not-allowed" : ""}
              required 
            />
            {userEmail && <p className="text-xs text-muted-foreground">Email terdeteksi otomatis dari akun Anda.</p>}
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