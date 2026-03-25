"use client";
export const dynamic = "force-dynamic"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { createTicket } from "./actions";

export default function NewTicketPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    
    try {
      const result = await createTicket(formData);
      
      // Kalau sukses masuk DB, jalankan toast dan pindah halaman
      if (result?.success) {
        toast.success("Tiket Berhasil Dikirim!", {
          description: "Tim teknis Ixiera akan segera mengecek kendala Anda.",
        });
        router.push("/dashboard/tickets"); 
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error("Gagal Mengirim Tiket", {
        description: "Pastikan koneksi internet stabil atau coba beberapa saat lagi.",
      });
    }
  }

  return (
    <section className="max-w-2xl mx-auto space-y-6 pb-12">
      <Button variant="ghost" className="-ml-4" asChild>
        <Link href="/dashboard/tickets">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Daftar Tiket
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Buat Tiket Bantuan</CardTitle>
          <CardDescription>
            Deskripsikan kendala atau permintaan Anda secara detail agar tim teknis Ixiera dapat merespon dengan cepat.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subject">Subjek / Judul Kendala <span className="text-red-500">*</span></Label>
              <Input id="subject" name="subject" placeholder="Contoh: Bot WhatsApp AI tidak membalas" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Kategori <span className="text-red-500">*</span></Label>
                <Select name="category" required>
                  <SelectTrigger><SelectValue placeholder="Pilih Kategori" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">Error / Bug Sistem</SelectItem>
                    <SelectItem value="request">Request Fitur Baru</SelectItem>
                    <SelectItem value="question">Pertanyaan / Konsultasi</SelectItem>
                    <SelectItem value="billing">Kendala Tagihan</SelectItem>
                    <SelectItem value="other">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Tingkat Prioritas <span className="text-red-500">*</span></Label>
                <Select name="priority" required>
                  <SelectTrigger><SelectValue placeholder="Pilih Prioritas" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Rendah (Tidak mendesak)</SelectItem>
                    <SelectItem value="medium">Sedang (Mengganggu sebagian pekerjaan)</SelectItem>
                    <SelectItem value="high">Tinggi (Sistem mati total/kritis)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detail Kendala <span className="text-red-500">*</span></Label>
              <Textarea id="description" name="description" placeholder="Jelaskan detail kendala..." className="min-h-[150px]" required />
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button variant="outline" type="button" disabled={isLoading} asChild>
                <Link href="/dashboard/tickets">Batal</Link>
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                {isLoading ? "Mengirim..." : "Kirim Tiket"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}