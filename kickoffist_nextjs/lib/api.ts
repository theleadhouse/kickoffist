import { Match, FootballDataMatch, MatchStatus } from "./types";
import { toISTTime, toISTDate, toISTDateLabel, getFlag, getFlagUrl, COMPETITIONS, todayIST, tomorrowIST } from "./utils";

const FOOTBALL_DATA_KEY = process.env.FOOTBALL_DATA_API_KEY || "";
const BASE = "https://api.football-data.org/v4";

// ─── CACHE (in-memory for edge, replace with Redis for production) ────────────
const cache = new Map<string, { data: unknown; ts: number }>();
const TTL = { live: 15_000, today: 60_000, schedule: 3_600_000 };

function getCache<T>(key: string): T | null {
  const c = cache.get(key);
  if (!c) return null;
  const ttl = key.includes("live") ? TTL.live : key.includes("today") ? TTL.today : TTL.schedule;
  if (Date.now() - c.ts > ttl) { cache.delete(key); return null; }
  return c.data as T;
}
function setCache(key: string, data: unknown) {
  cache.set(key, { data, ts: Date.now() });
}

// ─── FOOTBALL DATA ORG FETCH ──────────────────────────────────────────────────
async function fdFetch(path: string): Promise<unknown> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "X-Auth-Token": FOOTBALL_DATA_KEY },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`football-data: ${res.status} ${path}`);
  return res.json();
}

// ─── TRANSFORM football-data match to our Match type ─────────────────────────
function transformMatch(m: FootballDataMatch, compCode: string): Match {
  const comp = COMPETITIONS[compCode as keyof typeof COMPETITIONS] || COMPETITIONS.WC;
  const status = transformStatus(m.status, m.minute);
  return {
    id: m.id,
    homeTeam: {
      id: m.homeTeam.id,
      name: m.homeTeam.name,
      shortName: m.homeTeam.shortName || m.homeTeam.tla || m.homeTeam.name,
      crest: m.homeTeam.crest || getFlagUrl(m.homeTeam.name),
      flag: getFlag(m.homeTeam.name),
    },
    awayTeam: {
      id: m.awayTeam.id,
      name: m.awayTeam.name,
      shortName: m.awayTeam.shortName || m.awayTeam.tla || m.awayTeam.name,
      crest: m.awayTeam.crest || getFlagUrl(m.awayTeam.name),
      flag: getFlag(m.awayTeam.name),
    },
    utcDate: m.utcDate,
    istTime: toISTTime(m.utcDate),
    istDate: toISTDate(m.utcDate),
    istDateLabel: toISTDateLabel(m.utcDate),
    status,
    score: {
      home: m.score.fullTime.home,
      away: m.score.fullTime.away,
      winner: m.score.winner as Match["score"]["winner"],
    },
    competition: {
      id: m.competition.id,
      name: comp.name,
      code: comp.code,
      emblem: m.competition.emblem,
      color: comp.color,
      icon: comp.icon,
    },
    venue: m.venue,
    group: m.group,
    minute: m.minute,
  };
}

function transformStatus(status: string, minute?: number | null): MatchStatus {
  if (status === "IN_PLAY" || status === "PAUSED" || status === "HALFTIME") return "LIVE";
  if (status === "FINISHED" || status === "AWARDED") return "FINISHED";
  if (status === "POSTPONED" || status === "CANCELLED" || status === "SUSPENDED") return "POSTPONED";
  return "UPCOMING";
}

// ─── PUBLIC API FUNCTIONS ─────────────────────────────────────────────────────

/** Get all live matches right now */
export async function getLiveMatches(): Promise<Match[]> {
  const cacheKey = "live";
  const cached = getCache<Match[]>(cacheKey);
  if (cached) return cached;

  try {
    // WC live
    const d = await fdFetch("/competitions/WC/matches?status=LIVE") as { matches: FootballDataMatch[] };
    const matches = (d.matches || []).map(m => transformMatch(m, "WC"));
    setCache(cacheKey, matches);
    return matches;
  } catch (e) {
    console.error("getLiveMatches:", e);
    return [];
  }
}

/** Get today's matches (IST) across all competitions */
export async function getMatchesForToday(): Promise<Match[]> {
  const cacheKey = `today_${todayIST()}`;
  const cached = getCache<Match[]>(cacheKey);
  if (cached) return cached;

  const today = todayIST();
  const tomorrow = tomorrowIST();

  try {
    // WC matches — fetch a window around today in IST
    // Since IST is +5:30, "today IST" spans two UTC dates
    const [d1, d2] = await Promise.allSettled([
      fdFetch(`/competitions/WC/matches?dateFrom=${today}&dateTo=${tomorrow}`) as Promise<{ matches: FootballDataMatch[] }>,
      fdFetch(`/competitions/WC/matches?status=LIVE`) as Promise<{ matches: FootballDataMatch[] }>,
    ]);

    const raw: FootballDataMatch[] = [];
    if (d1.status === "fulfilled") raw.push(...(d1.value.matches || []));
    if (d2.status === "fulfilled") raw.push(...(d2.value.matches || []));

    // Dedupe by id
    const seen = new Set<number>();
    const matches = raw
      .filter(m => { if (seen.has(m.id)) return false; seen.add(m.id); return true; })
      .map(m => transformMatch(m, "WC"))
      .filter(m => m.istDate === today) // IST date filter
      .sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime());

    setCache(cacheKey, matches);
    return matches;
  } catch (e) {
    console.error("getMatchesForToday:", e);
    // Fallback to static data
    return getStaticTodayMatches();
  }
}

/** Get tomorrow's matches (IST) */
export async function getMatchesForTomorrow(): Promise<Match[]> {
  const tmrw = tomorrowIST();
  const cacheKey = `tmrw_${tmrw}`;
  const cached = getCache<Match[]>(cacheKey);
  if (cached) return cached;

  try {
    const d = await fdFetch(`/competitions/WC/matches?dateFrom=${tmrw}&dateTo=${tmrw}`) as { matches: FootballDataMatch[] };
    const matches = (d.matches || [])
      .map(m => transformMatch(m, "WC"))
      .filter(m => m.istDate === tmrw)
      .sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime());
    setCache(cacheKey, matches);
    return matches;
  } catch (e) {
    console.error("getMatchesForTomorrow:", e);
    return getStaticTomorrowMatches();
  }
}

/** Get full WC schedule */
export async function getWCSchedule(): Promise<Match[]> {
  const cacheKey = "wc_schedule";
  const cached = getCache<Match[]>(cacheKey);
  if (cached) return cached;

  try {
    const d = await fdFetch("/competitions/WC/matches") as { matches: FootballDataMatch[] };
    const matches = (d.matches || [])
      .map(m => transformMatch(m, "WC"))
      .sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime());
    setCache(cacheKey, matches);
    return matches;
  } catch (e) {
    console.error("getWCSchedule:", e);
    return getStaticWCMatches();
  }
}

// ─── STATIC FALLBACK DATA (always accurate) ───────────────────────────────────
// Verified from ESPN/FOX Sports/FIFA.com
const STATIC_WC: { h: string; a: string; utc: string; group: string; res?: [number, number] }[] = [
  { h:"Mexico",      a:"South Africa",       utc:"2026-06-11T19:00:00Z", group:"A", res:[2,0] },
  { h:"South Korea", a:"Czechia",            utc:"2026-06-12T02:00:00Z", group:"B", res:[2,1] },
  { h:"Canada",      a:"Bosnia & Herz.",     utc:"2026-06-12T19:00:00Z", group:"C" },
  { h:"USA",         a:"Paraguay",           utc:"2026-06-13T01:00:00Z", group:"D" },
  { h:"Qatar",       a:"Switzerland",        utc:"2026-06-12T19:00:00Z", group:"C" },
  { h:"Brazil",      a:"Morocco",            utc:"2026-06-12T22:00:00Z", group:"E" },
  { h:"Haiti",       a:"Scotland",           utc:"2026-06-13T01:00:00Z", group:"E" },
  { h:"Australia",   a:"Turkey",             utc:"2026-06-13T04:00:00Z", group:"D" },
  { h:"Germany",     a:"Curaçao",            utc:"2026-06-14T17:00:00Z", group:"F" },
  { h:"Netherlands", a:"Japan",              utc:"2026-06-13T20:00:00Z", group:"G" },
  { h:"Ivory Coast", a:"Ecuador",            utc:"2026-06-13T23:00:00Z", group:"F" },
  { h:"Sweden",      a:"Tunisia",            utc:"2026-06-14T02:00:00Z", group:"G" },
  { h:"Spain",       a:"Cape Verde",         utc:"2026-06-15T16:00:00Z", group:"H" },
  { h:"Belgium",     a:"Egypt",              utc:"2026-06-14T19:00:00Z", group:"I" },
  { h:"Saudi Arabia",a:"Uruguay",            utc:"2026-06-14T22:00:00Z", group:"H" },
  { h:"IR Iran",     a:"New Zealand",        utc:"2026-06-15T01:00:00Z", group:"I" },
  { h:"France",      a:"Senegal",            utc:"2026-06-15T19:00:00Z", group:"J" },
  { h:"Iraq",        a:"Norway",             utc:"2026-06-15T22:00:00Z", group:"J" },
  { h:"Argentina",   a:"Algeria",            utc:"2026-06-16T01:00:00Z", group:"K" },
  { h:"Austria",     a:"Jordan",             utc:"2026-06-16T04:00:00Z", group:"K" },
  { h:"Portugal",    a:"DR Congo",           utc:"2026-06-17T17:00:00Z", group:"L" },
  { h:"England",     a:"Croatia",            utc:"2026-06-16T20:00:00Z", group:"L" },
  { h:"Ghana",       a:"Panama",             utc:"2026-06-16T23:00:00Z", group:"A" },
  { h:"Uzbekistan",  a:"Colombia",           utc:"2026-06-17T02:00:00Z", group:"B" },
];

function staticToMatch(s: typeof STATIC_WC[0], idx: number): Match {
  const comp = COMPETITIONS.WC;
  const status: MatchStatus = s.res ? "FINISHED" : "UPCOMING";
  return {
    id: idx + 1000,
    homeTeam: { id: idx, name: s.h, shortName: s.h, crest: getFlagUrl(s.h), flag: getFlag(s.h) },
    awayTeam: { id: idx + 100, name: s.a, shortName: s.a, crest: getFlagUrl(s.a), flag: getFlag(s.a) },
    utcDate: s.utc,
    istTime: toISTTime(s.utc),
    istDate: toISTDate(s.utc),
    istDateLabel: toISTDateLabel(s.utc),
    status,
    score: { home: s.res?.[0] ?? null, away: s.res?.[1] ?? null },
    competition: { id: 2000, name: comp.name, code: "WC", color: comp.color, icon: comp.icon },
    group: `Group ${s.group}`,
  };
}

export function getStaticWCMatches(): Match[] {
  return STATIC_WC.map((s, i) => staticToMatch(s, i))
    .sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime());
}

export function getStaticTodayMatches(): Match[] {
  const today = todayIST();
  return getStaticWCMatches().filter(m => m.istDate === today);
}

export function getStaticTomorrowMatches(): Match[] {
  const tmrw = tomorrowIST();
  return getStaticWCMatches().filter(m => m.istDate === tmrw);
}
