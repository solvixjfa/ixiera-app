"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Receipt, LifeBuoy } from "lucide-react";

interface StatCardsProps {
  activeProjects: number;
  totalUnpaid: number;
  openTickets: number;
}

export function StatCards({
  activeProjects,
  totalUnpaid,
  openTickets,
}: StatCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Card 1: Active Projects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Proyek Aktif</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeProjects}</div>
          <p className="text-xs text-muted-foreground">
            Proyek dalam proses
          </p>
        </CardContent>
      </Card>

      {/* Card 2: Unpaid Invoices */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unpaid Invoices</CardTitle>
          <Receipt className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalUnpaid)}</div>
          <p className="text-xs text-muted-foreground">
            Total tagihan
          </p>
        </CardContent>
      </Card>

      {/* Card 3: Open Tickets */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
          <LifeBuoy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{openTickets}</div>
          <p className="text-xs text-muted-foreground">
            Tiket menunggu balasan
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
