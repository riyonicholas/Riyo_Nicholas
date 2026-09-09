import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portofolio | Praktisi Teknologi & Kreator Visual",
  description:
    "Praktisi teknologi dan kreator visual yang bergerak aktif di tiga bidang utama: Front-End Development & UI/UX, Desain Grafis, dan Teknisi Perangkat Keras (Smartphone & PC).",
  keywords: ["front-end development", "ui ux design", "desain grafis", "teknisi perangkat keras", "smartphone repair", "portofolio"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
