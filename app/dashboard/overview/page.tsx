import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { StatCards } from "@/components/dashboard/StatCards";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; 

export default async function OverviewPage() {
  // Error 1 Fix: Tambahkan 'await' karena di Next.js 16 cookies() adalah Promise
  const cookieStore = await cookies(); 

  // Inisialisasi Supabase Server Client
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
        <p className="text-muted-foreground">Profil klien sedang disiapkan...</p>
      </div>
    );
  }

  // 3. Ambil Data Metrik secara Paralel
  const [
    { count: activeProjectsCount },
    { data: unpaidInvoices },
    { count: openTicketsCount },
    { data: recentProjects }
  ] = await Promise.all([
    supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("client_id", client.id)
      .neq("status", "completed"),

    supabase
      .from("invoices")
      .select("balance_due")
      .eq("client_id", client.id)
      .eq("status", "unpaid"),

    supabase
      .from("support_tickets")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("status", "open"),

    supabase
      .from("projects")
      .select("*")
      .eq("client_id", client.id)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  // Kalkulasi total tagihan
  const totalUnpaid = unpaidInvoices?.reduce(
    (sum, inv) => sum + Number(inv.balance_due || 0), 
    0
  ) || 0;

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">
          Selamat datang kembali, pantau metrik dan aktivitas Anda di sini.
        </p>
      </div>

      <StatCards
        activeProjects={activeProjectsCount || 0}
        totalUnpaid={totalUnpaid}
        openTickets={openTicketsCount || 0}
      />

      {/* Recent Projects Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Proyek Terbaru</h2>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Proyek</TableHead>
                <TableHead>Kode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Dibuat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentProjects && recentProjects.length > 0 ? (
                recentProjects.map((project: any) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.code}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                        {project.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(project.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                    Tidak ada proyek terbaru
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}