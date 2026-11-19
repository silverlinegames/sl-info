import type { NextConfig } from "next";

/**
 * Silverline Games — sitio de presentación.
 *
 * - Por defecto compila como app normal de Next.js (dev / Vercel).
 * - Con NEXT_STATIC_EXPORT=1 genera un sitio estático en ./out
 *   (usado por GitHub Actions para desplegar en GitHub Pages).
 * - NEXT_PUBLIC_BASE_PATH permite servir el sitio bajo un subdirectorio
 *   (por ejemplo "/sl-info" en GitHub Pages).
 */
const isStaticExport = process.env.NEXT_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  allowedDevOrigins: ["https://*.space-z.ai"],
  ...(isStaticExport ? { output: "export" as const } : {}),
  ...(process.env.NEXT_PUBLIC_BASE_PATH
    ? { basePath: process.env.NEXT_PUBLIC_BASE_PATH }
    : {}),
};

export default nextConfig;
