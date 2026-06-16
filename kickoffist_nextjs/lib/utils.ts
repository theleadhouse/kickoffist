import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const IST_OFFSET = 5.5 * 60 * 60 * 1000; // +5:30

// ─── IST HELPERS ─────────────────────────────────────────────────────────────

function toIST(utc: string): Date {
  return new Date(new Date(utc).getTime() + IST_OFFSET);
}

export function toISTTime(utc: string): string {
  try {
    const d = toIST(utc);
    const h = d.getUTCHours();
    const m = d.getUTCMinutes();
    const h12 = h % 12 || 12;
    const ampm = h < 12 ? "AM" : "PM";
    return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
  } catch { return "--:--"; }
}

export function toISTDate(utc: string): string {
  try {
    const d = toIST(utc);
    const y = d.getUTCFullYear();
    const mo = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${y}-${mo}-${day}`;
  } catch { return ""; }
}

export function todayIST(): string {
  return toISTDate(new Date().toISOString());
}

export function tomorrowIST(): string {
  return toISTDate(new Date(Date.now() + 86400000).toISOString());
}

export function currentISTClock(): string {
  const d = toIST(new Date().toISOString());
  return `${String(d.getUTCHours()).padStart(2,"0")}:${String(d.getUTCMinutes()).padStart(2,"0")}`;
}

export function toISTDateLabel(utc: string): string {
  try {
    const istDate = toISTDate(utc);
    const today   = todayIST();
    const tmrw    = tomorrowIST();
    if (istDate === today) return "Today";
    if (istDate === tmrw)  return "Tomorrow";
    const d = toIST(utc);
    const DAYS  = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${DAYS[d.getUTCDay()]}, ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
  } catch { return ""; }
}

// ─── FLAGS ───────────────────────────────────────────────────────────────────
const FLAGS: Record<string, string> = {
  "Mexico":"🇲🇽","South Africa":"🇿🇦","South Korea":"🇰🇷","Korea Republic":"🇰🇷",
  "Czechia":"🇨🇿","Czech Republic":"🇨🇿","Canada":"🇨🇦","Bosnia-Herzegovina":"🇧🇦",
  "Bosnia and Herzegovina":"🇧🇦","Bosnia & Herz.":"🇧🇦","USA":"🇺🇸","United States":"🇺🇸",
  "Paraguay":"🇵🇾","Qatar":"🇶🇦","Switzerland":"🇨🇭","Brazil":"🇧🇷","Morocco":"🇲🇦",
  "Haiti":"🇭🇹","Scotland":"🏴󠁧󠁢󠁳󠁣󠁴󠁿","Australia":"🇦🇺","Turkey":"🇹🇷","Türkiye":"🇹🇷",
  "Germany":"🇩🇪","Curacao":"🇨🇼","Curaçao":"🇨🇼","Netherlands":"🇳🇱","Japan":"🇯🇵",
  "Ivory Coast":"🇨🇮","Côte d'Ivoire":"🇨🇮","Ecuador":"🇪🇨","Sweden":"🇸🇪","Tunisia":"🇹🇳",
  "Spain":"🇪🇸","Cape Verde":"🇨🇻","Cabo Verde":"🇨🇻","Belgium":"🇧🇪","Egypt":"🇪🇬",
  "Saudi Arabia":"🇸🇦","Uruguay":"🇺🇾","Iran":"🇮🇷","IR Iran":"🇮🇷","New Zealand":"🇳🇿",
  "France":"🇫🇷","Senegal":"🇸🇳","Iraq":"🇮🇶","Norway":"🇳🇴","Argentina":"🇦🇷",
  "Algeria":"🇩🇿","Austria":"🇦🇹","Jordan":"🇯🇴","Portugal":"🇵🇹","DR Congo":"🇨🇩",
  "England":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","Croatia":"🇭🇷","Ghana":"🇬🇭","Panama":"🇵🇦","Uzbekistan":"🇺🇿",
  "Colombia":"🇨🇴","India":"🇮🇳","TBD":"⚽",
};

export function getFlag(name: string): string {
  return FLAGS[name] || "🏳️";
}

export function getFlagUrl(name: string): string { return ""; }

// ─── COMPETITIONS ─────────────────────────────────────────────────────────────
export const COMPETITIONS = {
  WC:  { id:2000, name:"FIFA World Cup",  code:"WC",  icon:"🏆", color:"amber",  borderColor:"border-l-amber-500" },
  PL:  { id:2021, name:"Premier League",  code:"PL",  icon:"⚽", color:"purple", borderColor:"border-l-purple-600" },
  CL:  { id:2001, name:"Champions League",code:"CL",  icon:"⭐", color:"blue",   borderColor:"border-l-blue-600" },
  ISL: { id:7025, name:"ISL",             code:"ISL", icon:"🇮🇳", color:"green",  borderColor:"border-l-green-600" },
};

// ─── COUNTDOWN ────────────────────────────────────────────────────────────────
export function getCountdown(utcDate: string): string | null {
  const diff = new Date(utcDate).getTime() - Date.now();
  if (diff <= 0 || diff > 48 * 3600000) return null;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  if (h === 0 && m === 0) return `${s}s`;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

// ─── CALENDAR ─────────────────────────────────────────────────────────────────
export function generateGoogleCalURL(m: { home:string; away:string; utcDate:string; competition:string }): string {
  const s = new Date(m.utcDate);
  const e = new Date(s.getTime() + 7200000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g,"").slice(0,15)+"Z";
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`⚽ ${m.home} vs ${m.away}`)}&dates=${fmt(s)}/${fmt(e)}&details=${encodeURIComponent(m.competition+" — KickoffIST.com")}`;
}

export function generateICS(m: { home:string; away:string; utcDate:string; competition:string }): string {
  const s = new Date(m.utcDate);
  const e = new Date(s.getTime() + 7200000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g,"").slice(0,15)+"Z";
  return `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:⚽ ${m.home} vs ${m.away}\nDTSTART:${fmt(s)}\nDTEND:${fmt(e)}\nDESCRIPTION:${m.competition}\nEND:VEVENT\nEND:VCALENDAR`;
}

// kept for compat
export function todayLabel(): string { return todayIST(); }
export function tomorrowLabel(): string { return tomorrowIST(); }
