import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsProps {
  activeProjects: number;
  outstandingInvoices: number;
  openTickets: number;
}

export function ClientStats({ activeProjects, outstandingInvoices, openTickets }: StatsProps) {
  const stats = [
    { title: "Active Projects", value: activeProjects, desc: "Proyek berjalan" },
    { title: "Invoices Due", value: `Rp ${outstandingInvoices.toLocaleString('id-ID')}`, desc: "Tagihan belum dibayar" },
    { title: "Open Tickets", value: openTickets, desc: "Support aktif" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-gray-200 dark:border-gray-800 shadow-none hover:border-black dark:hover:border-white transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
            <p className="text-xs text-gray-400 mt-1">{stat.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}