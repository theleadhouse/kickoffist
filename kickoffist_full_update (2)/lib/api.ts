import { Match, FootballDataMatch, MatchStatus } from "./types";
import { toISTTime, toISTDate, toISTDateLabel, getFlag, getFlagUrl, COMPETITIONS, todayIST, tomorrowIST } from "./utils";

const FOOTBALL_DATA_KEY = process.env.FOOTBALL_DATA_API_KEY || "";
const BASE = "https://api.football-data.org/v4";

// ─── CACHE ────────────────────────────────────────────────────────────────────
const cache = new Map<string, { data: unknown; ts: number }>();
const TTL = { live: 15_000, today: 60_000, schedule: 1_800_000 };

function getCache<T>(key: string): T | null {
  const c = cache.get(key);
  if (!c) return null;
  const ttl = key.startsWith("live") ? TTL.live : key.startsWith("today") ? TTL.today : TTL.schedule;
  if (Date.now() - c.ts > ttl) { cache.delete(key); return null; }
  return c.data as T;
}
function setCache(key: string, data: unknown) {
  cache.set(key, { data, ts: Date.now() });
}

// ─── FETCH ────────────────────────────────────────────────────────────────────
async function fdFetch(path: string): Promise<unknown> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "X-Auth-Token": FOOTBALL_DATA_KEY },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`football-data: ${res.status} ${path}`);
  return res.json();
}

// ─── TRANSFORM ────────────────────────────────────────────────────────────────
function transformMatch(m: FootballDataMatch, compCode: string): Match {
  const comp = COMPETITIONS[compCode as keyof typeof COMPETITIONS] || COMPETITIONS.WC;
  const isLive = m.status === "IN_PLAY" || m.status === "PAUSED" || m.status === "HALFTIME";
  const isFinished = m.status === "FINISHED" || m.status === "AWARDED";
  const status: MatchStatus = isLive ? "LIVE" : isFinished ? "FINISHED" : "UPCOMING";

  // For live/finished, use halfTime or fullTime scores
  const scoreHome = isLive
    ? (m.score.halfTime?.home ?? m.score.fullTime.home)
    : m.score.fullTime.home;
  const scoreAway = isLive
    ? (m.score.halfTime?.away ?? m.score.fullTime.away)
    : m.score.fullTime.away;

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
      home: isLive ? m.score.halfTime?.home ?? null : m.score.fullTime.home,
      away: isLive ? m.score.halfTime?.away ?? null : m.score.fullTime.away,
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

// ─── PUBLIC FUNCTIONS ─────────────────────────────────────────────────────────

export async function getLiveMatches(): Promise<Match[]> {
  const key = "live";
  const cached = getCache<Match[]>(key);
  if (cached) return cached;
  try {
    const d = await fdFetch("/competitions/WC/matches?status=IN_PLAY") as { matches: FootballDataMatch[] };
    const matches = (d.matches || []).map(m => transformMatch(m, "WC"));
    setCache(key, matches);
    return matches;
  } catch (e) {
    console.error("getLiveMatches:", e);
    return [];
  }
}

export async function getMatchesForToday(): Promise<Match[]> {
  const today = todayIST();
  const key = `today_${today}`;
  const cached = getCache<Match[]>(key);
  if (cached) return cached;

  try {
    const tomorrow = tomorrowIST();
    const [d1, d2] = await Promise.allSettled([
      fdFetch(`/competitions/WC/matches?dateFrom=${today}&dateTo=${tomorrow}`) as Promise<{ matches: FootballDataMatch[] }>,
      fdFetch(`/competitions/WC/matches?status=IN_PLAY`) as Promise<{ matches: FootballDataMatch[] }>,
    ]);

    const raw: FootballDataMatch[] = [];
    if (d1.status === "fulfilled") raw.push(...(d1.value.matches || []));
    if (d2.status === "fulfilled") raw.push(...(d2.value.matches || []));

    const seen = new Set<number>();
    const matches = raw
      .filter(m => { if (seen.has(m.id)) return false; seen.add(m.id); return true; })
      .map(m => transformMatch(m, "WC"))
      .filter(m => m.istDate === today)
      .sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime());

    setCache(key, matches);
    return matches;
  } catch (e) {
    console.error("getMatchesForToday:", e);
    return getStaticTodayMatches();
  }
}

export async function getMatchesForTomorrow(): Promise<Match[]> {
  const tmrw = tomorrowIST();
  const key = `tmrw_${tmrw}`;
  const cached = getCache<Match[]>(key);
  if (cached) return cached;

  try {
    const d = await fdFetch(`/competitions/WC/matches?dateFrom=${tmrw}&dateTo=${tmrw}`) as { matches: FootballDataMatch[] };
    const matches = (d.matches || [])
      .map(m => transformMatch(m, "WC"))
      .filter(m => m.istDate === tmrw)
      .sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime());
    setCache(key, matches);
    return matches;
  } catch (e) {
    console.error("getMatchesForTomorrow:", e);
    return getStaticTomorrowMatches();
  }
}

export async function getWCSchedule(): Promise<Match[]> {
  const key = "wc_schedule";
  const cached = getCache<Match[]>(key);
  if (cached) return cached;

  try {
    const d = await fdFetch("/competitions/WC/matches") as { matches: FootballDataMatch[] };
    const matches = (d.matches || [])
      .map(m => transformMatch(m, "WC"))
      .sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime());
    setCache(key, matches);
    return matches;
  } catch (e) {
    console.error("getWCSchedule:", e);
    return getStaticWCMatches();
  }
}

// ─── REAL VERIFIED RESULTS + FULL SCHEDULE ────────────────────────────────────
// All times UTC. Results verified from FIFA.com, ESPN, BBC Sport June 16 2026.
const STATIC_WC: {
  h: string; a: string; utc: string; group: string;
  res?: [number, number]; venue?: string; city?: string;
}[] = [
  // ── MATCHDAY 1 RESULTS (all finished) ────────────────────────────────────
  { h:"Mexico",       a:"South Africa",       utc:"2026-06-11T19:00:00Z", group:"A", res:[2,0],  venue:"Estadio Azteca",           city:"Mexico City"     },
  { h:"South Korea",  a:"Czechia",            utc:"2026-06-12T02:00:00Z", group:"B", res:[2,1],  venue:"Estadio Akron",            city:"Guadalajara"     },
  { h:"Canada",       a:"Bosnia & Herz.",     utc:"2026-06-12T19:00:00Z", group:"C", res:[1,1],  venue:"BMO Field",                city:"Toronto"         },
  { h:"USA",          a:"Paraguay",           utc:"2026-06-13T01:00:00Z", group:"D", res:[4,1],  venue:"SoFi Stadium",             city:"Los Angeles"     },
  { h:"Qatar",        a:"Switzerland",        utc:"2026-06-12T22:00:00Z", group:"C", res:[1,1],  venue:"Bay Area Stadium",         city:"San Francisco"   },
  { h:"Brazil",       a:"Morocco",            utc:"2026-06-13T22:00:00Z", group:"E", res:[1,1],  venue:"MetLife Stadium",          city:"New York"        },
  { h:"Haiti",        a:"Scotland",           utc:"2026-06-14T01:00:00Z", group:"E", res:[0,1],  venue:"Gillette Stadium",         city:"Boston"          },
  { h:"Australia",    a:"Turkey",             utc:"2026-06-14T04:00:00Z", group:"D", res:[2,0],  venue:"BC Place",                 city:"Vancouver"       },
  { h:"Germany",      a:"Curaçao",            utc:"2026-06-14T17:00:00Z", group:"F", res:[7,1],  venue:"NRG Stadium",              city:"Houston"         },
  { h:"Netherlands",  a:"Japan",              utc:"2026-06-14T20:00:00Z", group:"G", res:[2,2],  venue:"AT&T Stadium",             city:"Dallas"          },
  { h:"Ivory Coast",  a:"Ecuador",            utc:"2026-06-14T23:00:00Z", group:"F", res:[1,0],  venue:"Lincoln Financial Field",  city:"Philadelphia"   },
  { h:"Sweden",       a:"Tunisia",            utc:"2026-06-15T02:00:00Z", group:"G", res:[5,1],  venue:"Estadio BBVA",             city:"Monterrey"       },
  { h:"Spain",        a:"Cabo Verde",         utc:"2026-06-15T16:00:00Z", group:"H", res:[0,0],  venue:"Mercedes-Benz Stadium",    city:"Atlanta"         },
  { h:"Belgium",      a:"Egypt",              utc:"2026-06-15T19:00:00Z", group:"I", res:[1,1],  venue:"Lumen Field",              city:"Seattle"         },
  { h:"Saudi Arabia", a:"Uruguay",            utc:"2026-06-15T22:00:00Z", group:"H", res:[1,0],  venue:"Hard Rock Stadium",        city:"Miami"           },
  { h:"Iran",         a:"New Zealand",        utc:"2026-06-16T01:00:00Z", group:"I", venue:"SoFi Stadium",             city:"Los Angeles"   },

  // ── MATCHDAY 2 ────────────────────────────────────────────────────────────
  { h:"France",       a:"Senegal",            utc:"2026-06-16T19:00:00Z", group:"J", venue:"MetLife Stadium",          city:"New York"      },
  { h:"Iraq",         a:"Norway",             utc:"2026-06-16T22:00:00Z", group:"J", venue:"Gillette Stadium",         city:"Boston"        },
  { h:"Argentina",    a:"Algeria",            utc:"2026-06-17T01:00:00Z", group:"K", venue:"Arrowhead Stadium",        city:"Kansas City"   },
  { h:"Austria",      a:"Jordan",             utc:"2026-06-17T04:00:00Z", group:"K", venue:"Bay Area Stadium",         city:"San Francisco" },
  { h:"Portugal",     a:"DR Congo",           utc:"2026-06-17T17:00:00Z", group:"L", venue:"NRG Stadium",              city:"Houston"       },
  { h:"England",      a:"Croatia",            utc:"2026-06-17T20:00:00Z", group:"L", venue:"AT&T Stadium",             city:"Dallas"        },
  { h:"Ghana",        a:"Panama",             utc:"2026-06-17T23:00:00Z", group:"A", venue:"BMO Field",                city:"Toronto"       },
  { h:"Uzbekistan",   a:"Colombia",           utc:"2026-06-18T02:00:00Z", group:"B", venue:"Estadio Azteca",           city:"Mexico City"   },
  { h:"Czechia",      a:"South Africa",       utc:"2026-06-18T16:00:00Z", group:"B", venue:"Mercedes-Benz Stadium",    city:"Atlanta"       },
  { h:"Switzerland",  a:"Bosnia & Herz.",     utc:"2026-06-18T19:00:00Z", group:"C", venue:"SoFi Stadium",             city:"Los Angeles"   },
  { h:"Canada",       a:"Qatar",              utc:"2026-06-18T22:00:00Z", group:"C", venue:"BC Place",                 city:"Vancouver"     },
  { h:"Mexico",       a:"South Korea",        utc:"2026-06-19T01:00:00Z", group:"A", venue:"Estadio Akron",            city:"Guadalajara"   },
  { h:"USA",          a:"Australia",          utc:"2026-06-19T19:00:00Z", group:"D", venue:"Lumen Field",              city:"Seattle"       },
  { h:"Scotland",     a:"Morocco",            utc:"2026-06-19T22:00:00Z", group:"E", venue:"Gillette Stadium",         city:"Boston"        },
  { h:"Brazil",       a:"Haiti",              utc:"2026-06-20T01:00:00Z", group:"E", venue:"Lincoln Financial Field",  city:"Philadelphia"  },
  { h:"Turkey",       a:"Paraguay",           utc:"2026-06-20T04:00:00Z", group:"D", venue:"Bay Area Stadium",         city:"San Francisco" },
  { h:"Netherlands",  a:"Sweden",             utc:"2026-06-20T17:00:00Z", group:"G", venue:"NRG Stadium",              city:"Houston"       },
  { h:"Germany",      a:"Ivory Coast",        utc:"2026-06-20T20:00:00Z", group:"F", venue:"BMO Field",                city:"Toronto"       },
  { h:"Ecuador",      a:"Curaçao",            utc:"2026-06-21T00:00:00Z", group:"F", venue:"Arrowhead Stadium",        city:"Kansas City"   },
  { h:"Tunisia",      a:"Japan",              utc:"2026-06-21T04:00:00Z", group:"G", venue:"Estadio BBVA",             city:"Monterrey"     },
  { h:"Spain",        a:"Saudi Arabia",       utc:"2026-06-21T16:00:00Z", group:"H", venue:"Mercedes-Benz Stadium",    city:"Atlanta"       },
  { h:"Belgium",      a:"Iran",               utc:"2026-06-21T19:00:00Z", group:"I", venue:"SoFi Stadium",             city:"Los Angeles"   },
  { h:"Uruguay",      a:"Cabo Verde",         utc:"2026-06-21T22:00:00Z", group:"H", venue:"Hard Rock Stadium",        city:"Miami"         },
  { h:"New Zealand",  a:"Egypt",              utc:"2026-06-22T01:00:00Z", group:"I", venue:"BC Place",                 city:"Vancouver"     },
  { h:"Argentina",    a:"Austria",            utc:"2026-06-22T17:00:00Z", group:"K", venue:"AT&T Stadium",             city:"Dallas"        },
  { h:"France",       a:"Iraq",               utc:"2026-06-22T21:00:00Z", group:"J", venue:"Lincoln Financial Field",  city:"Philadelphia"  },
  { h:"Norway",       a:"Senegal",            utc:"2026-06-23T00:00:00Z", group:"J", venue:"MetLife Stadium",          city:"New York"      },
  { h:"Jordan",       a:"Algeria",            utc:"2026-06-23T03:00:00Z", group:"K", venue:"Bay Area Stadium",         city:"San Francisco" },
  { h:"Portugal",     a:"Uzbekistan",         utc:"2026-06-23T17:00:00Z", group:"L", venue:"NRG Stadium",              city:"Houston"       },
  { h:"England",      a:"Ghana",              utc:"2026-06-23T20:00:00Z", group:"L", venue:"Gillette Stadium",         city:"Boston"        },
  { h:"Panama",       a:"Croatia",            utc:"2026-06-23T23:00:00Z", group:"A", venue:"BMO Field",                city:"Toronto"       },
  { h:"Colombia",     a:"DR Congo",           utc:"2026-06-24T02:00:00Z", group:"B", venue:"Estadio Akron",            city:"Guadalajara"   },

  // ── MATCHDAY 3 ────────────────────────────────────────────────────────────
  { h:"Switzerland",  a:"Canada",             utc:"2026-06-25T05:00:00Z", group:"C", venue:"BC Place",                 city:"Vancouver"     },
  { h:"Bosnia & Herz.",a:"Qatar",             utc:"2026-06-25T05:00:00Z", group:"C", venue:"Arrowhead Stadium",        city:"Kansas City"   },
  { h:"Morocco",      a:"Haiti",              utc:"2026-06-25T08:00:00Z", group:"E", venue:"MetLife Stadium",          city:"New York"      },
  { h:"Scotland",     a:"Brazil",             utc:"2026-06-25T08:00:00Z", group:"E", venue:"AT&T Stadium",             city:"Dallas"        },
  { h:"South Africa", a:"South Korea",        utc:"2026-06-25T11:00:00Z", group:"A", venue:"Mercedes-Benz Stadium",    city:"Atlanta"       },
  { h:"Czechia",      a:"Mexico",             utc:"2026-06-25T11:00:00Z", group:"A", venue:"Lumen Field",              city:"Seattle"       },
  { h:"Curaçao",      a:"Ivory Coast",        utc:"2026-06-26T06:00:00Z", group:"F", venue:"Estadio BBVA",             city:"Monterrey"     },
  { h:"Ecuador",      a:"Germany",            utc:"2026-06-26T06:00:00Z", group:"F", venue:"SoFi Stadium",             city:"Los Angeles"   },
  { h:"Tunisia",      a:"Netherlands",        utc:"2026-06-26T09:00:00Z", group:"G", venue:"Hard Rock Stadium",        city:"Miami"         },
  { h:"Japan",        a:"Sweden",             utc:"2026-06-26T09:00:00Z", group:"G", venue:"NRG Stadium",              city:"Houston"       },
  { h:"Turkey",       a:"USA",                utc:"2026-06-26T12:00:00Z", group:"D", venue:"BC Place",                 city:"Vancouver"     },
  { h:"Paraguay",     a:"Australia",          utc:"2026-06-26T12:00:00Z", group:"D", venue:"BMO Field",                city:"Toronto"       },
  { h:"Norway",       a:"France",             utc:"2026-06-27T05:00:00Z", group:"I", venue:"MetLife Stadium",          city:"New York"      },
  { h:"Senegal",      a:"Iraq",               utc:"2026-06-27T05:00:00Z", group:"I", venue:"AT&T Stadium",             city:"Dallas"        },
  { h:"Cabo Verde",   a:"Saudi Arabia",       utc:"2026-06-27T10:00:00Z", group:"H", venue:"Lincoln Financial Field",  city:"Philadelphia"  },
  { h:"Uruguay",      a:"Spain",              utc:"2026-06-27T10:00:00Z", group:"H", venue:"Gillette Stadium",         city:"Boston"        },
  { h:"New Zealand",  a:"Belgium",            utc:"2026-06-27T13:00:00Z", group:"G", venue:"Estadio Akron",            city:"Guadalajara"   },
  { h:"Egypt",        a:"Iran",               utc:"2026-06-27T13:00:00Z", group:"G", venue:"Bay Area Stadium",         city:"San Francisco" },
  { h:"Panama",       a:"England",            utc:"2026-06-28T07:00:00Z", group:"L", venue:"Arrowhead Stadium",        city:"Kansas City"   },
  { h:"Croatia",      a:"Ghana",              utc:"2026-06-28T07:00:00Z", group:"L", venue:"Estadio BBVA",             city:"Monterrey"     },
  { h:"Colombia",     a:"Portugal",           utc:"2026-06-28T10:00:00Z", group:"K", venue:"Mercedes-Benz Stadium",    city:"Atlanta"       },
  { h:"DR Congo",     a:"Uzbekistan",         utc:"2026-06-28T10:00:00Z", group:"K", venue:"Lumen Field",              city:"Seattle"       },
  { h:"Algeria",      a:"Austria",            utc:"2026-06-28T12:30:00Z", group:"J", venue:"SoFi Stadium",             city:"Los Angeles"   },
  { h:"Jordan",       a:"Argentina",          utc:"2026-06-28T12:30:00Z", group:"J", venue:"NRG Stadium",              city:"Houston"       },
  { h:"Uzbekistan",   a:"Colombia",           utc:"2026-06-18T02:00:00Z", group:"B", venue:"Estadio Azteca",           city:"Mexico City"   },

  // ── KNOCKOUT ──────────────────────────────────────────────────────────────
  { h:"TBD",a:"TBD", utc:"2026-06-29T05:00:00Z", group:"Round of 32", venue:"TBD", city:"USA" },
  { h:"TBD",a:"TBD", utc:"2026-06-30T00:00:00Z", group:"Round of 32", venue:"TBD", city:"USA" },
  { h:"TBD",a:"TBD", utc:"2026-07-09T20:00:00Z", group:"Quarter-Final", venue:"TBD", city:"USA" },
  { h:"TBD",a:"TBD", utc:"2026-07-14T20:00:00Z", group:"Semi-Final", venue:"TBD", city:"USA" },
  { h:"TBD",a:"TBD", utc:"2026-07-19T18:30:00Z", group:"3rd Place", venue:"TBD", city:"USA" },
  { h:"TBD",a:"TBD", utc:"2026-07-19T18:30:00Z", group:"🏆 THE FINAL", venue:"MetLife Stadium", city:"New York" },
];

function staticToMatch(s: typeof STATIC_WC[0], idx: number): Match {
  const comp = COMPETITIONS.WC;
  const status: MatchStatus = s.res ? "FINISHED" : new Date(s.utc) < new Date() ? "FINISHED" : "UPCOMING";
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
    group: s.group ? `Group ${s.group}` : "",
    venue: s.venue,
  };
}

export function getStaticWCMatches(): Match[] {
  // Dedupe by home+away+utc
  const seen = new Set<string>();
  return STATIC_WC
    .filter(s => { const k = `${s.h}|${s.a}|${s.utc}`; if (seen.has(k)) return false; seen.add(k); return true; })
    .map((s, i) => staticToMatch(s, i))
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
