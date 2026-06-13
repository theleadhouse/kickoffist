import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "800", "900"] });

export const metadata: Metadata = {
  title: "KickoffIST — India's Football Calendar",
  description: "Live scores, fixtures and results — all in Indian Standard Time. Never miss a kickoff.",
  keywords: "football, soccer, India, IST, World Cup 2026, Premier League, ISL, live scores",
  openGraph: {
    title: "KickoffIST — India's Football Calendar",
    description: "Every match in Indian Standard Time. Live scores, fixtures, results.",
    url: "https://kickoffist.com",
    siteName: "KickoffIST",
    images: [{ url: "https://kickoffist.com/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "KickoffIST", description: "India's Football Calendar in IST" },
  themeColor: "#16A34A",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        <TopBar />
        <main className="max-w-lg mx-auto px-4 pt-4 pb-28 min-h-screen">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
