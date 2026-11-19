import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Silverline Games — Estudio independiente de videojuegos",
  description:
    "Silverline Games es un estudio independiente que crea juegos originales de todos los géneros: historia, cooperativo y acción. Conoce a EDR, nuestro primer juego, el plan de inversión y al equipo detrás del dragón.",
  keywords: [
    "Silverline Games",
    "EDR",
    "videojuegos",
    "estudio independiente",
    "juegos cooperativos",
    "Steam",
    "indie games",
  ],
  authors: [{ name: "Silverline Games" }],
  openGraph: {
    title: "Silverline Games",
    description:
      "Estudio independiente de videojuegos. Historia, cooperativo, acción y más. EDR, nuestro primer juego, en camino.",
    siteName: "Silverline Games",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
