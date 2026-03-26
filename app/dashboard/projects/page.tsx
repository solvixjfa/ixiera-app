export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  project_code: string | null;
  status: "pending" | "in_progress" | "completed";
  progress: number;
  deadline: string | null;
  type: string | null;
  staging_url: string | null;
}

export default async function ProjectsPage() {
  // 1. Wajib Clerk Auth
  const { userId } = await auth();
  if (!userId) redirect("/auth/login");

  // 2. Init Supabase
  const supabase = await createClient();

  // 3. Ambil client_id berdasarkan Clerk user_id
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

  // 4. Fetch Projects
  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("id, name, project_code, status, progress, deadline, type, staging_url")
    .eq("client_id", clientData.id)
    .order("created_at", { ascending: false });

  if (projectsError) {
    console.error("Error fetching projects:", projectsError);
    return (
      <div className="p-4 border border-red-200 bg-red-50 text-red-800 rounded-md text-center max-w-md mx-auto mt-10">
        Gagal memuat daftar proyek. Silakan coba lagi nanti.
      </div>
    );
  }

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

  // Helper function to format date in Indonesian locale (dengan fallback jika null)
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "-";
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
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

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Proyek Saya</h1>
        <p className="text-muted-foreground">
          Pantau status, progres, dan detail pengerjaan proyek Anda.
        </p>
      </div>

      {/* Projects Grid */}
      {projects && projects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg font-bold">{project.name}</CardTitle>
                  <Badge variant={getBadgeVariant(project.status)}>
                    {formatStatus(project.status)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex-grow space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Kode:</span> {project.project_code || "-"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Tipe:</span> {project.type || "Development"}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progres</span>
                    <span className="text-sm font-semibold">{project.progress || 0}%</span>
                  </div>
                  <Progress value={project.progress || 0} className="h-2" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Deadline:</span> {formatDate(project.deadline)}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="flex items-center gap-2">
                {project.staging_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.staging_url} target="_blank" rel="noopener noreferrer">
                      Buka Staging
                    </a>
                  </Button>
                )}
                {/* Tombol Detail Proyek untuk menuju halaman [id] */}
                <Button size="sm" asChild className="flex-1">
                  <Link href={`/dashboard/projects/${project.id}`}>
                    Detail Proyek
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-64">
          <Card className="w-full max-w-sm">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">Belum ada proyek yang berjalan</p>
            </CardContent> 
          </Card>
        </div>
      )}
    </section>
  );
}