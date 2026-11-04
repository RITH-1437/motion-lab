import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import { CustomCursor } from "@/components/common/CustomCursor";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { CinematicPreloader } from "@/components/common/CinematicPreloader";
import { siteConfig } from "@/config/site";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Three.js",
    "React Three Fiber",
    "WebGL",
    "GSAP",
    "Creative Coding",
    "Animation Playground",
    "Shaders",
    "Lenis",
  ],
  authors: [{ name: "Motion Lab Team" }],
};

export const viewport: Viewport = {
  themeColor: "#080A12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
     * No hard-coded "dark" class here — ThemeProvider applies
     * "dark" or "light" on the client based on localStorage / OS preference.
     * We default to dark via CSS :root so there's no FOUC on first load.
     */
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-accent-violet/30 selection:text-accent-cyan overflow-x-hidden min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300`}
      >
        <ThemeProvider>
          <SmoothScroll>
            <CustomCursor />
            <CinematicPreloader />
            <Navbar />
            <main className="flex-1 w-full pt-16">{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
