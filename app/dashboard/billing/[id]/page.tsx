import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, Copy, Upload } from "lucide-react";

interface Invoice {
  id: string;
  invoice_number: string;
  title: string;
  issue_date: string;
  due_date: string;
  total_amount: number;
  balance_due: number;
  subtotal: number;
  tax_amount: number;
  [key: string]: any;
}

interface PageProps {
  params: Promise<{ id: string }>;
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

export default async function InvoiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Get current user session
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    redirect("/auth/login");
  }

  // Fetch invoice detail by id
  const { data: invoice, error: invoiceError } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .single();

  if (invoiceError || !invoice) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/billing">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Link>
        </Button>
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Invoice tidak ditemukan</p>
        </div>
      </div>
    );
  }

  const isFullyPaid = invoice.balance_due === 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild>
        <Link href="/dashboard/billing">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Tagihan
        </Link>
      </Button>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Invoice #{invoice.invoice_number}</h1>
        <Badge variant={isFullyPaid ? "outline" : "secondary"}>
          {isFullyPaid ? "Lunas" : "Belum Dibayar"}
        </Badge>
      </div>

      {/* Main Grid (2 Columns) */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column: Invoice Details (col-span-2) */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{invoice.title}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Tanggal Terbit</p>
                <p className="text-sm font-semibold">{formatDate(invoice.issue_date)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Jatuh Tempo</p>
                <p className="text-sm font-semibold">{formatDate(invoice.due_date)}</p>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Cost Breakdown */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatRupiah(invoice.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pajak</span>
                <span className="font-medium">{formatRupiah(invoice.tax_amount)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Total Amount */}
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">Total Tagihan</span>
              <span className="text-xl font-bold">{formatRupiah(invoice.total_amount)}</span>
            </div>

            {/* Balance Due */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground font-medium">Sisa Pembayaran</span>
              <span className={`font-bold text-lg ${!isFullyPaid ? "text-destructive" : "text-green-600"}`}>
                {formatRupiah(invoice.balance_due)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Payment Instructions (col-span-1) */}
        <Card className="md:col-span-1 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CreditCard className="w-4 h-4" />
              Metode Pembayaran
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-grow">
            {isFullyPaid ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-md text-sm text-center border border-green-200">
                <p className="font-medium">Terima kasih!</p>
                <p className="mt-1">Pembayaran untuk invoice ini telah lunas.</p>
              </div>
            ) : (
              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">Transfer Bank (Manual)</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Nama Bank</p>
                    <p className="font-semibold">SeaBank</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-xs">Nomor Rekening</p>
                    <div className="flex items-center justify-between">
                      <p className="font-mono font-semibold">9012-3456-7890</p>
                      <button className="text-muted-foreground hover:text-foreground">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-xs">Atas Nama</p>
                    <p className="font-semibold">Ixiera Teknologi</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          {!isFullyPaid && (
            <CardFooter>
              <Button className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Konfirmasi Pembayaran
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
