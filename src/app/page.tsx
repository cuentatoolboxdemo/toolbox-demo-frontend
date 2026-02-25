"use client";

import { useState } from "react";
import { TENANTS, Tenant } from "@/lib/tenants";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, ChevronRight } from "lucide-react";

export default function Home() {
  const tenants = Object.values(TENANTS);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Toolbox AI</h1>
          <p className="text-lg text-gray-500">Selecciona un asistente para comenzar</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tenants.map((tenant) => (
            <button
              key={tenant.slug}
              onClick={() => setSelectedTenant(tenant)}
              className="block group text-left w-full focus:outline-none"
            >
              <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-gray-400 group-hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center space-y-0 gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-50 transition-colors">
                    <Bot className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{tenant.displayName}</CardTitle>
                    <CardDescription className="text-xs line-clamp-1">{tenant.name}</CardDescription>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </CardHeader>
              </Card>
            </button>
          ))}
        </div>
      </div>

      {selectedTenant && (
        <LoginDialog
          tenantId={selectedTenant.slug}
          tenantName={selectedTenant.displayName}
          onClose={() => setSelectedTenant(null)}
        />
      )}
    </main>
  );
}
