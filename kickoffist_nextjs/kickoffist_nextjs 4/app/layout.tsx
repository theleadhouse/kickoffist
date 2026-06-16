import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";

const inter = Inter({ subsets: ["latin"], weight: ["400","500","600","700","800"] });

export const metadata: Metadata = {
  title: "KickoffIST — India's Football Live Scores & Fixtures",
  description: "Live scores, fixtures, results and standings — all in Indian Standard Time. FIFA World Cup 2026.",
  themeColor: "#0d1117",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0d1117] text-slate-200 antialiased min-h-screen`}>
        <TopBar />
        <main className="max-w-[1100px] mx-auto px-3 pt-2 pb-20">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
