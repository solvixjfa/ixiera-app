import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FileText, TicketIcon } from "lucide-react";

interface ClientMetricsProps {
  activeProjects: number;
  outstandingInvoices: number;
  openTickets: number;
}

export function ClientMetrics({
  activeProjects,
  outstandingInvoices,
  openTickets,
}: ClientMetricsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Active Projects Card */}
      <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Proyek Aktif
            </CardTitle>
            <Briefcase className="w-4 h-4 text-black dark:text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-black dark:text-white">
            {activeProjects}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Proyek dalam pengerjaan
          </p>
        </CardContent>
      </Card>

      {/* Outstanding Invoices Card */}
      <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Faktur Tertunggak
            </CardTitle>
            <FileText className="w-4 h-4 text-black dark:text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-black dark:text-white">
            {formatCurrency(outstandingInvoices)}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Total saldo tertunggak
          </p>
        </CardContent>
      </Card>

      {/* Open Support Tickets Card */}
      <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-gray-600 dark:text-gray-400">
              Tiket Terbuka
            </CardTitle>
            <TicketIcon className="w-4 h-4 text-black dark:text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-black dark:text-white">
            {openTickets}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Dukungan menunggu respons
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
