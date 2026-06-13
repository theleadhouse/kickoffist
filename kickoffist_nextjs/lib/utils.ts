import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toZonedTime, format as tzFormat } from "date-fns-tz";
import { format, isToday, isTomorrow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const IST = "Asia/Kolkata";

// ─── IST CONVERSIONS ─────────────────────────────────────────────────────────

/** Convert UTC ISO string to IST time like "03:30 AM" */
export function toISTTime(utc: string): string {
  try {
    const d = toZonedTime(new Date(utc), IST);
    return tzFormat(d, "hh:mm aa", { timeZone: IST }).toUpperCase();
  } catch {
    return "--:--";
  }
}

/** Convert UTC ISO string to IST date string "2026-06-13" */
export function toISTDate(utc: string): string {
  try {
    const d = toZonedTime(new Date(utc), IST);
    return tzFormat(d, "yyyy-MM-dd", { timeZone: IST });
  } catch {
    return "";
  }
}

/** Get today's date in IST as "2026-06-13" */
export function todayIST(): string {
  const d = toZonedTime(new Date(), IST);
  return tzFormat(d, "yyyy-MM-dd", { timeZone: IST });
}

/** Get tomorrow's date in IST */
export function tomorrowIST(): string {
  const d = toZonedTime(new Date(Date.now() + 86400000), IST);
  return tzFormat(d, "yyyy-MM-dd", { timeZone: IST });
}

/** Get current IST time as HH:MM */
export function currentISTClock(): string {
  const d = toZonedTime(new Date(), IST);
  return tzFormat(d, "HH:mm", { timeZone: IST });
}

/** Format IST date to readable label */
export function toISTDateLabel(utc: string): string {
  try {
    const d = toZonedTime(new Date(utc), IST);
    const localDate = new Date(
      d.getFullYear(), d.getMonth(), d.getDate()
    );
    if (isToday(localDate)) return "Today";
    if (isTomorrow(localDate)) return "Tomorrow";
    return format(localDate, "EEE, d MMM");
  } catch {
    return "";
  }
}

// ─── FLAG EMOJI MAP ───────────────────────────────────────────────────────────
const FLAGS: Record<string, string> = {
  "Mexico": "🇲🇽", "South Africa": "🇿🇦", "South Korea": "🇰🇷",
  "Korea Republic": "🇰🇷", "Czechia": "🇨🇿", "Czech Republic": "🇨🇿",
  "Canada": "🇨🇦", "Bosnia-Herzegovina": "🇧🇦", "Bosnia and Herzegovina": "🇧🇦",
  "USA": "🇺🇸", "United States": "🇺🇸", "Paraguay": "🇵🇾", "Qatar": "🇶🇦",
  "Switzerland": "🇨🇭", "Brazil": "🇧🇷", "Morocco": "🇲🇦", "Haiti": "🇭🇹",
  "Scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "Australia": "🇦🇺", "Turkey": "🇹🇷", "Germany": "🇩🇪",
  "Curacao": "🇨🇼", "Curaçao": "🇨🇼", "Netherlands": "🇳🇱", "Japan": "🇯🇵",
  "Ivory Coast": "🇨🇮", "Côte d'Ivoire": "🇨🇮", "Ecuador": "🇪🇨", "Sweden": "🇸🇪",
  "Tunisia": "🇹🇳", "Spain": "🇪🇸", "Cape Verde": "🇨🇻", "Cabo Verde": "🇨🇻",
  "Belgium": "🇧🇪", "Egypt": "🇪🇬", "Saudi Arabia": "🇸🇦", "Uruguay": "🇺🇾",
  "Iran": "🇮🇷", "IR Iran": "🇮🇷", "New Zealand": "🇳🇿", "France": "🇫🇷",
  "Senegal": "🇸🇳", "Iraq": "🇮🇶", "Norway": "🇳🇴", "Argentina": "🇦🇷",
  "Algeria": "🇩🇿", "Austria": "🇦🇹", "Jordan": "🇯🇴", "Portugal": "🇵🇹",
  "DR Congo": "🇨🇩", "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Croatia": "🇭🇷", "Ghana": "🇬🇭",
  "Panama": "🇵🇦", "Uzbekistan": "🇺🇿", "Colombia": "🇨🇴", "India": "🇮🇳",
  "Manchester United": "🔴", "Arsenal": "🔴", "Manchester City": "🔵",
  "Liverpool": "🔴", "Chelsea": "🔵", "Tottenham": "⚪", "Aston Villa": "🟣",
};

export function getFlag(teamName: string): string {
  return FLAGS[teamName] || "🏳️";
}

// ─── FLAG API URL ─────────────────────────────────────────────────────────────
const COUNTRY_CODES: Record<string, string> = {
  "Brazil": "BR", "Morocco": "MA", "Argentina": "AR", "Algeria": "DZ",
  "England": "GB-ENG", "Croatia": "HR", "Germany": "DE", "France": "FR",
  "Spain": "ES", "Portugal": "PT", "Netherlands": "NL", "Belgium": "BE",
  "Japan": "JP", "South Korea": "KR", "Korea Republic": "KR",
  "Mexico": "MX", "USA": "US", "United States": "US", "Canada": "CA",
  "Australia": "AU", "Uruguay": "UY", "Iran": "IR", "IR Iran": "IR",
  "Saudi Arabia": "SA", "Ecuador": "EC", "Switzerland": "CH",
  "Senegal": "SN", "Denmark": "DK", "Poland": "PL", "Ghana": "GH",
  "Cameroon": "CM", "Serbia": "RS", "Wales": "GB-WLS", "Qatar": "QA",
  "South Africa": "ZA", "Czechia": "CZ", "Tunisia": "TN", "Sweden": "SE",
  "Norway": "NO", "Turkey": "TR", "Egypt": "EG", "Iraq": "IQ",
  "Jordan": "JO", "Panama": "PA", "Haiti": "HT", "Paraguay": "PY",
  "Colombia": "CO", "Austria": "AT", "India": "IN", "Scotland": "GB-SCT",
};

export function getFlagUrl(teamName: string): string {
  const code = COUNTRY_CODES[teamName];
  if (!code) return "";
  return `https://flagsapi.com/${code.split("-")[0]}/flat/64.png`;
}

// ─── COMPETITION CONFIG ───────────────────────────────────────────────────────
export const COMPETITIONS = {
  WC:  { id: 2000, name: "FIFA World Cup 2026", code: "WC",  icon: "🏆", color: "amber",  borderColor: "border-l-amber-500" },
  PL:  { id: 2021, name: "Premier League",       code: "PL",  icon: "⚽", color: "purple", borderColor: "border-l-purple-600" },
  CL:  { id: 2001, name: "Champions League",     code: "CL",  icon: "⭐", color: "blue",   borderColor: "border-l-blue-600" },
  ISL: { id: 7025, name: "ISL",                  code: "ISL", icon: "🇮🇳", color: "green",  borderColor: "border-l-green-600" },
};

// ─── COUNTDOWN HELPER ─────────────────────────────────────────────────────────
export function getCountdown(utcDate: string): string | null {
  const diff = new Date(utcDate).getTime() - Date.now();
  if (diff <= 0) return null;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  if (h > 48) return null;
  if (h === 0 && m === 0) return `${s}s`;
  if (h === 0) return `${m}m ${s}s`;
  return `${h}h ${m}m`;
}

// ─── CALENDAR HELPERS ─────────────────────────────────────────────────────────
export function generateGoogleCalURL(match: { home: string; away: string; utcDate: string; competition: string }): string {
  const start = new Date(match.utcDate);
  const end = new Date(start.getTime() + 7200000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
  const title = `⚽ ${match.home} vs ${match.away}`;
  const details = `${match.competition} — KickoffIST.com`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${fmt(start)}/${fmt(end)}&details=${encodeURIComponent(details)}`;
}

export function generateICS(match: { home: string; away: string; utcDate: string; competition: string }): string {
  const start = new Date(match.utcDate);
  const end = new Date(start.getTime() + 7200000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//KickoffIST//EN",
    "BEGIN:VEVENT",
    `SUMMARY:⚽ ${match.home} vs ${match.away}`,
    `DTSTART:${fmt(start)}`, `DTEND:${fmt(end)}`,
    `DESCRIPTION:${match.competition} — KickoffIST.com`,
    `URL:https://kickoffist.com`,
    "END:VEVENT", "END:VCALENDAR"
  ].join("\n");
}
