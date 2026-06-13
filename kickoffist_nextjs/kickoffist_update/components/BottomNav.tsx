"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/today", label: "Today", icon: "⚡" },
  { href: "/world-cup", label: "WC 2026", icon: "🏆" },
  { href: "/standings", label: "Standings", icon: "📊" },
  { href: "/live", label: "Live", icon: "🔴" },
  { href: "/predict", label: "Predict", icon: "🔮" },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d1117]/95 backdrop-blur-md border-t border-white/8">
      <div className="max-w-lg mx-auto flex">
        {NAV.map((item) => {
          const active = path.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-colors relative",
                active ? "text-green-400" : "text-white/30 hover:text-white/60"
              )}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span className={cn("text-[9px] font-bold uppercase tracking-wide", active && "text-green-400")}>
                {item.label}
              </span>
              {active && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-green-400 rounded-full" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
