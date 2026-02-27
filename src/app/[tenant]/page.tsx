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
    <main className="h-[100dvh] flex flex-col bg-background">
      {tenant.slug === "sabor_a_espana" ? (
        <header className="bg-gradient-to-r from-[#FF9C00] to-[#E58C00] text-white p-4 h-24 flex flex-col items-center justify-center shadow-md relative z-10 shrink-0">
          {tenant.theme.logoUrl && (
            <img
              src={tenant.theme.logoUrl}
              alt={tenant.displayName}
              className="h-16 w-auto object-contain drop-shadow-md"
            />
          )}
        </header>
      ) : (
        <header className="bg-primary text-primary-foreground p-4 h-16 flex items-center shrink-0">
          <h1 className="text-xl font-semibold">{tenant.name}</h1>
        </header>
      )}
      <ChatInterface tenant={tenant} />
    </main>
  );
}
