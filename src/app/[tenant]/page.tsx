import { notFound } from "next/navigation";
import { getTenant } from "@/lib/tenants";
import { ChatInterface } from "@/components/chat/ChatInterface";

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
      <header className="bg-primary text-primary-foreground p-4 h-16 flex items-center">
        <h1 className="text-xl font-semibold">{tenant.name}</h1>
      </header>
      <ChatInterface tenant={tenant} />
    </main>
  );
}
