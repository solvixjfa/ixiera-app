export const dynamic = "force-dynamic"
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Clock, User, CheckCircle, AlertCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TicketDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

 // 1. Cek User Login (TANPA REDIRECT!)
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-bold">Menyiapkan data overview...</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Jika tampilan ini tidak berubah, silakan muat ulang halaman.
          </p>
        </div>
      </div>
    );
  }

  // 2. Fetch Ticket Info
  const { data: ticket } = await supabase
    .from("support_tickets")
    .select("*")
    .eq("id", id)
    .single();

  if (!ticket) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" asChild>
          <Link href="/dashboard/tickets">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
          </Link>
        </Button>
        <div className="flex h-[50vh] items-center justify-center">
          <p className="text-muted-foreground">Tiket tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  // 3. Fetch Ticket Messages (Urut dari yang terlama ke terbaru)
  const { data: messages } = await supabase
    .from("ticket_messages")
    .select("*")
    .eq("ticket_id", id)
    .eq("is_internal", false) // Jangan tampilkan catatan internal admin ke klien
    .order("created_at", { ascending: true });

  // Helpers
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  const getStatusUI = (status: string) => {
    switch (status?.toLowerCase()) {
      case "resolved": return { label: "Selesai", variant: "outline" as const, icon: <CheckCircle className="w-4 h-4 mr-1 text-green-500" /> };
      case "in_progress": return { label: "Diproses", variant: "secondary" as const, icon: <Clock className="w-4 h-4 mr-1 text-blue-500" /> };
      default: return { label: "Menunggu", variant: "default" as const, icon: <AlertCircle className="w-4 h-4 mr-1" /> };
    }
  };

  const statusUI = getStatusUI(ticket.status);

  return (
    <section className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Back Button */}
      <Button variant="ghost" className="-ml-4 mb-2" asChild>
        <Link href="/dashboard/tickets">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Daftar Tiket
        </Link>
      </Button>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-muted-foreground">
              {ticket.ticket_number || "TCK-XXX"}
            </span>
            <Badge variant="outline" className="uppercase text-[10px]">
              Prioritas: {ticket.priority || "NORMAL"}
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{ticket.subject}</h1>
        </div>
        <Badge variant={statusUI.variant} className="flex items-center text-sm px-3 py-1">
          {statusUI.icon} {statusUI.label}
        </Badge>
      </div>

      {/* Original Ticket Description */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <p className="text-sm text-foreground whitespace-pre-wrap">{ticket.description}</p>
          <p className="text-xs text-muted-foreground mt-4">
            Dibuat pada: {formatDate(ticket.created_at)}
          </p>
        </CardContent>
      </Card>

      {/* Thread / Conversation */}
      <div className="space-y-6 mt-8">
        <h3 className="text-lg font-semibold tracking-tight">Riwayat Percakapan</h3>
        
        <div className="space-y-4">
          {messages && messages.length > 0 ? (
            messages.map((msg) => {
              // Jika user_id pesan sama dengan user login, berarti ini pesan klien (kanan).
              // Jika beda/kosong, berarti pesan dari Admin Ixiera (kiri).
              const isClient = msg.user_id === user.id;

              return (
                <div key={msg.id} className={`flex ${isClient ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] md:max-w-[70%] rounded-lg p-4 ${
                    isClient ? "bg-primary text-primary-foreground" : "bg-muted border"
                  }`}>
                    <div className="flex items-center gap-2 mb-2 opacity-80">
                      <User className="w-4 h-4" />
                      <span className="text-xs font-medium">
                        {isClient ? "Anda" : "Tim Support Ixiera"}
                      </span>
                      <span className="text-[10px] ml-auto">
                        {formatDate(msg.created_at)}
                      </span>
                    </div>
                    <p className={`text-sm whitespace-pre-wrap ${isClient ? "text-primary-foreground" : "text-foreground"}`}>
                      {msg.message}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-6 text-muted-foreground text-sm border-y border-dashed">
              Belum ada balasan untuk tiket ini.
            </div>
          )}
        </div>
      </div>

      {/* Reply Box (UI Only - Form Submission butuh Client Component) */}
      {ticket.status !== "resolved" && (
        <Card className="mt-8 border-primary/20 shadow-sm">
          <CardHeader className="py-4">
            <CardTitle className="text-sm">Balas Tiket</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Nantinya ini diganti dengan <form> yang memanggil Server Action */}
            <div className="space-y-4">
              <textarea 
                className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                placeholder="Ketik balasan Anda di sini..."
              />
              <div className="flex justify-end">
                <Button>
                  <Send className="w-4 h-4 mr-2" /> Kirim Balasan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}