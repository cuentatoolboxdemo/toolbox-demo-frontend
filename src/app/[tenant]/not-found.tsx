import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TenantNotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-semibold">Tenant not found</h1>
      <p className="text-muted-foreground max-w-sm">
        This organization doesn&apos;t have an AI assistant configured. Check the URL and try again.
      </p>
      <Button variant="outline" asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </main>
  );
}
