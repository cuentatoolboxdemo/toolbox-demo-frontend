import { notFound } from "next/navigation";
import { getTenant } from "@/lib/tenants";

interface TenantPageProps {
  params: { tenant: string };
}

export default function TenantPage({ params }: TenantPageProps) {
  const tenant = getTenant(params.tenant);

  if (!tenant) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-xl font-semibold">{tenant.name}</h1>
        <p className="text-sm opacity-80">Ask me anything about {tenant.displayName}</p>
      </header>
    </main>
  );
}
