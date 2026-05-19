import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wevitation – Platform Undangan Pernikahan Digital",
  description: "Buat undangan pernikahan digital yang elegan, responsif, dan interaktif. Fitur RSVP instan, buku tamu digital, dan pengiriman via WhatsApp otomatis.",
  keywords: "undangan pernikahan digital, wedding invitation online, RSVP online, wevitation",
  openGraph: {
    title: "Wevitation – Platform Undangan Pernikahan Digital",
    description: "Buat undangan pernikahan digital yang elegan dan interaktif.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
