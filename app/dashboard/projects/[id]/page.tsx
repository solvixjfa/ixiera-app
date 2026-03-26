export const dynamic = "force-dynamic";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";

interface ProjectDetail {
  id: string;
  name: string;
  project_code: string | null;
  status: "pending" | "in_progress" | "completed";
  progress: number;
  budget: number | null;
  start_date: string | null;
  deadline: string | null;
  staging_url: string | null;
  type: string | null;
  description?: string | null;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

interface Milestone {
  id: string;
  title: string;
  status: string;
  due_date: string | null;
  payment_amount: number | null;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  // 1. Wajib Clerk Auth
  const { userId } = await auth();
  if (!userId) redirect("/auth/login");

  const supabase = await createClient();

  // 2. Ambil ID Klien sebagai Pengaman
  const { data: clientData, error: clientError } = await supabase
    .from("clients")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (clientError || !clientData) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Profil klien sedang disiapkan...</p>
      </div>
    );
  }

  // 3. Query project detail (DENGAN FILTER CLIENT ID)
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("client_id", clientData.id) // <-- KEAMANAN: Pastikan proyek ini milik klien yang sedang login
    .single();

  if (projectError || !project) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/projects">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Link>
        </Button>
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Proyek tidak ditemukan atau Anda tidak memiliki akses.</p>
        </div>
      </div>
    );
  }

  // 4. Query milestones for this project
  const { data: milestones, error: milestonesError } = await supabase
    .from("project_milestones")
    .select("id, title, status, due_date, payment_amount")
    .eq("project_id", id)
    .order("due_date", { ascending: true });

  // Helper function to determine badge variant based on status
  const getBadgeVariant = (status: string): "default" | "secondary" | "outline" => {
    switch (status) {
      case "in_progress":
        return "default";
      case "pending":
        return "secondary";
      case "completed":
        return "outline";
      default:
        return "default";
    }
  };

  // Helper function to format status in Indonesian
  const formatStatus = (status: string): string => {
    switch (status) {
      case "in_progress":
        return "Berlangsung";
      case "pending":
        return "Tertunda";
      case "completed":
        return "Selesai";
      default:
        return status;
    }
  };

  // Helper function to format date safely
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "-";
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  // Helper function to format currency safely
  const formatRupiah = (amount: number | null): string => {
    if (!amount) amount = 0;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href="/dashboard/projects">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Proyek
        </Link>
      </Button>

      {/* Header Section */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <Badge variant={getBadgeVariant(project.status)}>
            {formatStatus(project.status)}
          </Badge>
        </div>

        {/* Project Code and Date Range */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Kode Proyek:</span> {project.project_code || "-"}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Timeline:</span> {formatDate(project.start_date)} -{" "}
            {formatDate(project.deadline)}
          </p>
          {project.description && (
            <p className="text-sm text-foreground mt-3">{project.description}</p>
          )}
        </div>
      </div>

      {/* Metrics Grid (3 Columns) */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Card 1: Total Budget */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Anggaran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatRupiah(project.budget)}</p>
          </CardContent>
        </Card>

        {/* Card 2: Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Progres Keseluruhan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-2xl font-bold">{project.progress || 0}%</p>
              <Progress value={project.progress || 0} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Staging URL */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              URL Staging
            </CardTitle>
          </CardHeader>
          <CardContent>
            {project.staging_url ? (
              <Button variant="outline" size="sm" asChild className="w-full">
                <a href={project.staging_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Buka Staging
                </a>
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">Belum tersedia</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Milestones Section */}
      <div className="space-y-6 mt-8">
        <h2 className="text-2xl font-bold tracking-tight">Milestones & Timeline</h2>

        {!milestones || milestones.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="pt-8 pb-8 text-center">
              <p className="text-muted-foreground">
                Belum ada milestone yang dijadwalkan.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6 ml-3 border-l-2 border-muted pl-6">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="relative">
                {/* Bullet Timeline */}
                <div className="absolute -left-[33px] top-4 h-4 w-4 rounded-full border-2 border-background bg-primary" />
                
                {/* Milestone Card */}
                <Card>
                  <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle className="text-base">{milestone.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tenggat: {formatDate(milestone.due_date)}
                      </p>
                    </div>
                    <Badge variant={getBadgeVariant(milestone.status)}>
                      {formatStatus(milestone.status)}
                    </Badge>
                  </CardHeader>
                  
                  {/* Tampilkan nominal pembayaran jika ada */}
                  {milestone.payment_amount && milestone.payment_amount > 0 ? (
                    <CardContent className="py-0 pb-4">
                      <div className="inline-flex items-center text-sm font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
                        Pembayaran: {formatRupiah(milestone.payment_amount)}
                      </div>
                    </CardContent>
                  ) : null}
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}