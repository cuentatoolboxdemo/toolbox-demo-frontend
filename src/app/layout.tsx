import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toolbox AI",
  description: "AI-powered answers from your company documents",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Toolbox AI" />
        <meta name="theme-color" content="#18181b" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
