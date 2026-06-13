"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/today", label: "Today", icon: "⚡" },
  { href: "/world-cup", label: "World Cup", icon: "🏆" },
  { href: "/live", label: "Live", icon: "🔴" },
  { href: "/predict", label: "Predict", icon: "🔮" },
];

export default function BottomNav() {
  const path = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 safe-area-pb">
      <div className="max-w-lg mx-auto flex">
        {NAV.map((item) => {
          const active = path.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-colors",
                active ? "text-green-600" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-wide",
                active && "text-green-600"
              )}>
                {item.label}
              </span>
              {active && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-green-600 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
