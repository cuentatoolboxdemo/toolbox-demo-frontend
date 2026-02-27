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
  ide_marketing: {
    slug: "ide_marketing",
    name: "IDE Marketing Assistant",
    displayName: "IDE Marketing",
    theme: {
      primary: "#C00B00",
      primaryText: "#FFFFFF",
      avatarGlow: "#FF1A0D",
      avatarPulse: "#8B0000",
      ring: "#FF6B6B",
      logoUrl: "/icons/IDE Marketing_idNTrdiV4p_1.png",
    },
  },
  calzedonia: {
    slug: "calzedonia",
    name: "Calzedonia AI Assistant",
    displayName: "Calzedonia",
    theme: {
      primary: "#8F2C4B",
      primaryText: "#FFFFFF",
      avatarGlow: "#B33D62",
      avatarPulse: "#6B1E36",
      ring: "#D4708F",
      logoUrl: "/icons/Calzedonia_idFVQbCbFh_1.png",
    },
  },
  sabor_a_espana: {
    slug: "sabor_a_espana",
    name: "Sabor a España Assistant",
    displayName: "Sabor a España",
    theme: {
      primary: "#FF9C00",
      primaryText: "#FFFFFF",
      avatarGlow: "#FFB733",
      avatarPulse: "#D98200",
      ring: "#FFD080",
      logoUrl: "/icons/sabor1.png",
    },
  },
  segurcaixa_adeslas: {
    slug: "segurcaixa_adeslas",
    name: "SegurCaixa Adeslas Assistant",
    displayName: "SegurCaixa Adeslas",
    theme: {
      primary: "#0F77AE",
      primaryText: "#FFFFFF",
      avatarGlow: "#1A9AD9",
      avatarPulse: "#0A5A82",
      ring: "#6BB8D9",
      logoUrl: "/icons/segurcaixa.png",
    },
  },
  michelin: {
    slug: "michelin",
    name: "Michelin Assistant",
    displayName: "Michelin",
    theme: {
      primary: "#27509b",
      primaryText: "#FFFFFF",
      avatarGlow: "#4b7abf",
      avatarPulse: "#1d3e7a",
      ring: "#fce500",
      logoUrl: "/icons/Michelin_Logo_1.png",
    },
  },
  renault: {
    slug: "renault",
    name: "Renault Group Assistant",
    displayName: "Renault Group",
    theme: {
      primary: "#FFCC00",
      primaryText: "#000000",
      avatarGlow: "#FFE680",
      avatarPulse: "#CCAA00",
      ring: "#000000",
      logoUrl: "/icons/Renault Group_idyA4uV4ea_2.png",
    },
  },
};

export function getTenant(slug: string): Tenant | null {
  return TENANTS[slug] ?? null;
}
