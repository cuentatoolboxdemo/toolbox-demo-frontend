export type TenantTheme = {
  primary: string;
  primaryText: string;
  avatarGlow: string;
  avatarPulse: string;
  ring: string;
  logoUrl?: string; // e.g. "/calzedonia-logo.png"
};

export type Tenant = {
  slug: string;
  name: string;        // e.g. "Calzedonia AI Assistant"
  displayName: string; // e.g. "Calzedonia"
  theme: TenantTheme;
};

export const TENANTS: Record<string, Tenant> = {
  calzedonia: {
    slug: "calzedonia",
    name: "Calzedonia AI Assistant",
    displayName: "Calzedonia",
    theme: {
      primary: "#000000",       // Black
      primaryText: "#ffffff",   // White
      avatarGlow: "#4b5563",    // Gray-600
      avatarPulse: "#000000",   // Black
      ring: "#d1d5db",          // Gray-300
    },
  },
  sabores: {
    slug: "sabores",
    name: "Sabores AI Assistant",
    displayName: "Sabores",
    theme: {
      primary: "#ea580c",       // Orange-600
      primaryText: "#ffffff",
      avatarGlow: "#f97316",    // Orange-500
      avatarPulse: "#c2410c",   // Orange-700
      ring: "#fdba74",          // Orange-300
    },
  },
  ide_marketing: {
    slug: "ide_marketing",
    name: "IDE Marketing Assistant",
    displayName: "IDE Marketing",
    theme: {
      primary: "#2563eb",       // Blue-600
      primaryText: "#ffffff",
      avatarGlow: "#3b82f6",    // Blue-500
      avatarPulse: "#4f46e5",   // Indigo-600
      ring: "#93c5fd",          // Blue-300
    },
  },
};

export function getTenant(slug: string): Tenant | null {
  return TENANTS[slug] ?? null;
}
