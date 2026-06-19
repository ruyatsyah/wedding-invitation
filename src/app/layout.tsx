import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import TopLoadingBarWrapper from "@/components/TopLoadingBarWrapper";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Kabar Bahagia – Platform Undangan Pernikahan Digital",
  description: "Buat undangan pernikahan digital yang elegan, responsif, dan interaktif. Fitur RSVP instan, buku tamu digital, dan pengiriman via WhatsApp otomatis.",
  keywords: "undangan pernikahan digital, wedding invitation online, RSVP online, kabar bahagia",
  openGraph: {
    title: "Kabar Bahagia – Platform Undangan Pernikahan Digital",
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
      <body className="min-h-full antialiased">
        <Providers>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: { fontFamily: 'inherit', fontSize: '14px', fontWeight: '600', borderRadius: '12px', padding: '12px 16px' },
              success: { style: { background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' } },
              error: { style: { background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' } },
            }}
          />
          <TopLoadingBarWrapper />
          {children}
        </Providers>
      </body>
    </html>
  );
}
