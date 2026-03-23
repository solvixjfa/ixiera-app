import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Figma,
  Github,
  HardDrive,
  Key,
  Link as LinkIcon,
  ExternalLink,
  Lock,
} from "lucide-react";

interface Asset {
  id: string;
  name: string;
  description: string;
  url: string | null;
  is_public: boolean;
  downloads_count: number;
}

/**
 * Helper function to determine icon based on asset type
 */
function getAssetIcon(url: string | null, name: string) {
  const searchText = `${url || ""} ${name}`.toLowerCase();

  if (searchText.includes("figma")) {
    return <Figma className="text-pink-500 w-5 h-5" />;
  }
  if (searchText.includes("github") || searchText.includes("repo")) {
    return <Github className="text-foreground w-5 h-5" />;
  }
  if (searchText.includes("drive")) {
    return <HardDrive className="text-blue-500 w-5 h-5" />;
  }
  if (searchText.includes("kredensial") || searchText.includes("api")) {
    return <Key className="text-yellow-500 w-5 h-5" />;
  }

  return <LinkIcon className="text-muted-foreground w-5 h-5" />;
}

export default async function AssetsPage() {
  const supabase = await createClient();

  // Get current user session
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData.user) {
    redirect("/auth/login");
  }

  // Get client_id from clients table
  const { data: clientData, error: clientError } = await supabase
    .from("clients")
    .select("id")
    .eq("user_id", authData.user.id)
    .single();

  if (clientError || !clientData) {
    // No client found
    return (
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assets & Access</h1>
          <p className="text-muted-foreground">
            Kelola dan akses semua aset digital yang dibagikan untuk Anda.
          </p>
        </div>
      </section>
    );
  }

  // Fetch assets based on client_id
  const { data: assets, error: assetsError } = await supabase
    .from("assets")
    .select("id, name, description, url, is_public, downloads_count")
    .eq("client_id", clientData.id)
    .order("created_at", { ascending: false });

  if (assetsError) {
    console.error("Error fetching assets:", assetsError);
    return <div>Error loading assets</div>;
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assets & Access</h1>
        <p className="text-muted-foreground">
          Kelola dan akses semua aset digital yang dibagikan untuk Anda.
        </p>
      </div>

      {/* Assets Grid */}
      {assets && assets.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset) => (
            <Card key={asset.id} className="flex flex-col">
              {/* Card Header */}
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-3">
                  {/* Icon */}
                  <div className="bg-muted p-2 rounded">
                    {getAssetIcon(asset.url, asset.name)}
                  </div>

                  {/* Badge */}
                  <Badge variant={asset.is_public ? "outline" : "secondary"}>
                    {asset.is_public ? "Publik" : "Private"}
                  </Badge>
                </div>
              </CardHeader>

              {/* Card Content */}
              <CardContent className="flex-grow pb-4 space-y-2">
                <h3 className="text-lg font-semibold">{asset.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {asset.description || "Tidak ada deskripsi"}
                </p>
              </CardContent>

              {/* Card Footer */}
              <CardFooter>
                {asset.url ? (
                  <Button variant="default" asChild className="w-full">
                    <a href={asset.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Buka Aset
                    </a>
                  </Button>
                ) : (
                  <Button disabled variant="outline" className="w-full">
                    <Lock className="w-4 h-4 mr-2" />
                    Akses Terbatas
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex items-center justify-center min-h-64">
          <Card className="w-full max-w-sm border-dashed">
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <LinkIcon className="w-8 h-8 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Belum ada aset digital yang dibagikan.</p>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}
