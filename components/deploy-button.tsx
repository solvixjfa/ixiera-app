import Link from "next/link";
import { Button } from "./ui/button";

export function DeployButton() {
  return (
    <Button asChild>
      <Link href="https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-supabase">
        Deploy
      </Link>
    </Button>
  );
}
