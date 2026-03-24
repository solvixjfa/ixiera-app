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
  project_code: string;
  status: "pending" | "in_progress" | "completed";
  progress: number;
  budget: number;
  start_date: string;
  deadline: string;
  staging_url: string | null;
  type: string;
  description?: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}
interface Milestone {
  id: string;
  title: string;
  status: string;
  due_date: string;
  payment_amount: number;
}
export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Get current user session
  const { data: authData, error: authError } = await supabase.auth.getUser();

  // Query project detail by id
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
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
          <p className="text-muted-foreground text-lg">Proyek tidak ditemukan</p>
        </div>
      </div>
    );
  }
// Query milestones for this project
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

  // Helper function to format date in Indonesian locale
  const formatDate = (dateString: string): string => {
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  // Helper function to format currency to Rupiah
  const formatRupiah = (amount: number): string => {
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
            <span className="font-medium">Kode Proyek:</span> {project.project_code}
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
              <p className="text-2xl font-bold">{project.progress}%</p>
              <Progress value={project.progress} className="h-2" />
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
                  {milestone.payment_amount > 0 && (
                    <CardContent className="py-0 pb-4">
                      <div className="inline-flex items-center text-sm font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
                        Pembayaran: {formatRupiah(milestone.payment_amount)}
                      </div>
                    </CardContent>
                  )}
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
  );
}
