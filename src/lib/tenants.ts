export type Tenant = {
  slug: string;
  name: string;        // e.g. "Calzedonia AI Assistant"
  displayName: string; // e.g. "Calzedonia"
};

export const TENANTS: Record<string, Tenant> = {
  calzedonia: {
    slug: "calzedonia",
    name: "Calzedonia AI Assistant",
    displayName: "Calzedonia",
  },
  sabores: {
    slug: "sabores",
    name: "Sabores AI Assistant",
    displayName: "Sabores",
  },
};

export function getTenant(slug: string): Tenant | null {
  return TENANTS[slug] ?? null;
}
