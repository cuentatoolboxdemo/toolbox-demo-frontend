import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toolbox AI",
  description: "AI-powered RAG training web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
