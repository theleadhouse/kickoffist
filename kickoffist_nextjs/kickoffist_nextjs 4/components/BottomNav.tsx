"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href:"/today",     label:"Today",     icon:"⚡" },
  { href:"/world-cup", label:"WC 2026",   icon:"🏆" },
  { href:"/standings", label:"Standings", icon:"📊" },
  { href:"/live",      label:"Live",      icon:"🔴" },
  { href:"/predict",   label:"Predict",   icon:"🔮" },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d1117]/97 backdrop-blur border-t border-[#21262d] sm:hidden">
      <div className="flex">
        {NAV.map(item => {
          const active = path?.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[9px] font-bold uppercase tracking-wide transition-colors ${active ? "text-[#3fb950]" : "text-[#6e7681]"}`}>
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
              {active && <span className="absolute bottom-0 w-6 h-0.5 bg-[#3fb950] rounded" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
