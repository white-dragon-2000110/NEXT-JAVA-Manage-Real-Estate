import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { PageTransition } from "@/components/ui/page-transition";

export const metadata: Metadata = {
  title: "RealEstatePro - Plataforma de Imóveis",
  description: "A plataforma mais completa para comprar, vender e alugar imóveis no Brasil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className="antialiased font-sans"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <PageTransition />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
