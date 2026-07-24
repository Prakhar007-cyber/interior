import type { Metadata } from "next";
import { Fraunces, Archivo } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Preloader } from "@/components/layout/Preloader";
import { TransitionProvider } from "@/components/layout/PageTransition";

// Editorial display serif — variable, with optical sizing for large headings.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

// Clean architectural grotesque for body + UI.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ateliervera.example"),
  title: {
    default: "Atelier Véra — Interior Architecture & Design",
    template: "%s — Atelier Véra",
  },
  description:
    "Atelier Véra is a luxury interior architecture and design studio in India, shaping considered residential, hospitality and commercial spaces around the people who live in them.",
  keywords: [
    "interior design India",
    "luxury interiors",
    "interior architecture",
    "villa design",
    "penthouse interiors",
  ],
  openGraph: {
    title: "Atelier Véra — Interior Architecture & Design",
    description: "Spaces, shaped around you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${archivo.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="cursor-none-desktop min-h-dvh overflow-x-hidden">
        <Preloader />
        <CustomCursor />
        <TransitionProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </TransitionProvider>
      </body>
    </html>
  );
}
