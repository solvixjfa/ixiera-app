export const dynamic = "force-dynamic"
import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function TicketsPage() {
  const cookieStore = await cookies();

  // Inisialisasi Supabase Server Client (Sesuai referensi Anda)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );

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

  // 2. Ambil ID Klien berdasarkan User
  const { data: client } = await supabase
    .from("clients")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!client) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Profil klien tidak ditemukan...</p>
      </div>
    );
  }

  // 3. Fetch Data Tickets berdasarkan client_id
  const { data: tickets } = await supabase
    .from("support_tickets")
    .select("*")
    .eq("client_id", client.id)
    .order("created_at", { ascending: false });

  // Helper UI Status
  const renderStatus = (status: string) => {
    switch (status?.toLowerCase()) {
      case "resolved":
        return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">Selesai</span>;
      case "in_progress":
        return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">Diproses</span>;
      case "open":
      default:
        return <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">Menunggu</span>;
    }
  };

  // Helper UI Priority
  const renderPriority = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return <span className="text-red-600 font-medium">Tinggi</span>;
      case "medium":
        return <span className="text-yellow-600 font-medium">Sedang</span>;
      case "low":
        return <span className="text-green-600 font-medium">Rendah</span>;
      default:
        return <span className="text-muted-foreground">-</span>;
    }
  };

  return (
    <section className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pusat Bantuan</h1>
          <p className="text-muted-foreground mt-1">
            Pantau status laporan dan buat tiket bantuan baru di sini.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/tickets/new">
            <Plus className="w-4 h-4 mr-2" />
            Buat Tiket Baru
          </Link>
        </Button>
      </div>

      {/* Tickets Table Section */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nomor Tiket</TableHead>
              <TableHead>Subjek</TableHead>
              <TableHead>Prioritas</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal Dibuat</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets && tickets.length > 0 ? (
              tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium text-muted-foreground">
                    {ticket.ticket_number || "TCK-XXX"}
                  </TableCell>
                  <TableCell className="font-medium">{ticket.subject}</TableCell>
                  <TableCell>{renderPriority(ticket.priority)}</TableCell>
                  <TableCell>{renderStatus(ticket.status)}</TableCell>
                  <TableCell>
                    {new Date(ticket.created_at).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/tickets/${ticket.id}`}>
                        Detail <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  Belum ada tiket bantuan yang dibuat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}