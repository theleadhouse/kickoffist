"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  {href:"/today",     label:"Today",  icon:"⚡"},
  {href:"/world-cup", label:"WC2026", icon:"🏆"},
  {href:"/standings", label:"Table",  icon:"📊"},
  {href:"/live",      label:"Live",   icon:"🔴"},
  {href:"/predict",   label:"AI",     icon:"🔮"},
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0e1117]/97 backdrop-blur border-t border-white/7 sm:hidden">
      <div className="flex">
        {NAV.map(item=>{
          const active = path?.startsWith(item.href);
          return(
            <Link key={item.href} href={item.href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[9px] font-bold uppercase tracking-wide transition-colors relative ${active?"text-red-400":"text-white/30"}`}>
              <span className="text-[16px] leading-none">{item.icon}</span>
              {item.label}
              {active && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-red-500 rounded"/>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
