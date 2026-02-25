"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginDialog({
    tenantId,
    tenantName,
    onClose,
}: {
    tenantId: string;
    tenantName: string;
    onClose: () => void;
}) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();

            if (data.success) {
                if (data.role === "admin") {
                    router.push(`/admin/${tenantId}`);
                } else {
                    router.push(`/${tenantId}`);
                }
            } else {
                setError(data.error || "Contraseña incorrecta");
            }
        } catch {
            setError("Error de red");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-sm p-8 rounded-2xl border bg-card shadow-lg animate-in zoom-in-95">
                <h2 className="text-xl font-semibold mb-2">Acceso requerido</h2>
                <p className="text-sm text-gray-500 mb-6">
                    Introduce tu contraseña para acceder a <strong>{tenantName}</strong>.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
                    />
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Verificando..." : "Acceder"}
                        </Button>
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                </form>
            </div>
        </div>
    );
}
