import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Receipt, Calendar, ArrowRight } from "lucide-react";

interface Invoice {
  id: string;
  invoice_number: string;
  title: string;
  issue_date: string;
  due_date: string;
  total_amount: number;
  balance_due: number;
}

/**
 * Helper function to determine invoice status and badge variant
 */
function getInvoiceStatus(balanceDue: number, dueDate: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDateObj = new Date(dueDate);
  dueDateObj.setHours(0, 0, 0, 0);

  if (balanceDue === 0) {
    return {
      status: "Lunas",
      variant: "outline" as const,
    };
  }

  if (balanceDue > 0 && dueDateObj < today) {
    return {
      status: "Jatuh Tempo",
      variant: "destructive" as const,
    };
  }

  return {
    status: "Belum Dibayar",
    variant: "secondary" as const,
  };
}

/**
 * Helper function to format date in Indonesian locale
 */
function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

/**
 * Helper function to format currency to Rupiah
 */
function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function BillingPage() {
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

  // Get client_id from clients table
  const { data: clientData, error: clientError } = await supabase
    .from("clients")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (clientError || !clientData) {
    // No client found
    return (
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tagihan & Pembayaran</h1>
          <p className="text-muted-foreground">
            Kelola dan pantau semua tagihan proyek Anda.
          </p>
        </div>
      </section>
    );
  }

  // Fetch invoices based on client_id
  const { data: invoices, error: invoicesError } = await supabase
    .from("invoices")
    .select("id, invoice_number, title, issue_date, due_date, total_amount, balance_due")
    .eq("client_id", clientData.id)
    .order("issue_date", { ascending: false });

  if (invoicesError) {
    console.error("Error fetching invoices:", invoicesError);
    return <div>Error loading invoices</div>;
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tagihan & Pembayaran</h1>
        <p className="text-muted-foreground">
          Kelola dan pantau semua tagihan proyek Anda.
        </p>
      </div>

      {/* Invoices Grid */}
      {invoices && invoices.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {invoices.map((invoice) => {
            const { status, variant } = getInvoiceStatus(invoice.balance_due, invoice.due_date);

            return (
              <Card key={invoice.id} className="flex flex-col">
                {/* Card Header */}
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm text-muted-foreground">{invoice.invoice_number}</p>
                    <Badge variant={variant}>{status}</Badge>
                  </div>
                </CardHeader>

                {/* Card Content */}
                <CardContent className="flex-grow space-y-4 pb-4">
                  {/* Invoice Title */}
                  <h3 className="font-semibold text-lg line-clamp-1">{invoice.title}</h3>

                  {/* Total Amount */}
                  <p className="text-2xl font-bold text-foreground">
                    {formatRupiah(invoice.total_amount)}
                  </p>

                  {/* Due Date */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Jatuh Tempo: {formatDate(invoice.due_date)}</span>
                  </div>
                </CardContent>

                {/* Card Footer */}
                <CardFooter>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href={`/dashboard/billing/${invoice.id}`}>
                      Lihat Detail
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex items-center justify-center min-h-64">
          <Card className="w-full max-w-sm border-dashed">
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <Receipt className="w-8 h-8 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Tidak ada tagihan.</p>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}
