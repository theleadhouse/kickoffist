import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import LiveTicker from "@/components/LiveTicker";

const inter = Inter({ subsets: ["latin"], weight: ["400","500","600","700","800"] });

export const metadata: Metadata = {
  title: "KickoffIST — Live Football Scores in IST | FIFA World Cup 2026",
  description: "Live scores, fixtures, results and standings from FIFA World Cup 2026 in Indian Standard Time.",
  themeColor: "#0f1923",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopBar />
        <div className="max-w-[1100px] mx-auto px-3 pt-2 pb-20">
          <LiveTicker />
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
