import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileCheck, MessageSquare } from "lucide-react";

export function QuickActions() {
  return (
    <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-black dark:text-white">
          Aksi Cepat
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Request New Service Button */}
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 h-12 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-black dark:text-white"
          >
            <Plus className="w-4 h-4" />
            <span>Minta Layanan Baru</span>
          </Button>

          {/* View Contracts Button */}
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 h-12 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-black dark:text-white"
          >
            <FileCheck className="w-4 h-4" />
            <span>Lihat Kontrak</span>
          </Button>

          {/* Contact Support Button */}
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 h-12 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-black dark:text-white"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Hubungi Dukungan</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
