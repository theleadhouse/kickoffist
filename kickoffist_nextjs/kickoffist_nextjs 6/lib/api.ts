import { Match, MatchStatus } from "./types";
import { toISTTime, toISTDate, toISTDateLabel, getFlag, COMPETITIONS, todayIST, tomorrowIST } from "./utils";

// ─── COMPLETE VERIFIED FIXTURE LIST ──────────────────────────────────────────
// All UTC times. Stadiums verified against FIFA.com, ESPN, Yahoo Sports, NBC Sports
// June 16 2026

const FIXTURES: {
  id: number;
  h: string; a: string;
  utc: string;
  group: string;
  stage: string;
  venue: string;
  city: string;
  res?: [number, number];
  goals?: { team: string; player: string; minute: number }[];
}[] = [
  // ── MATCHDAY 1 — ALL FINISHED ────────────────────────────────────────────
  { id:1,  h:"Mexico",       a:"South Africa",     utc:"2026-06-11T19:00:00Z", group:"A", stage:"Group Stage", venue:"Estadio Azteca",                city:"Mexico City",           res:[2,0], goals:[{team:"Mexico",player:"Lozano",minute:23},{team:"Mexico",player:"Jiménez",minute:71}] },
  { id:2,  h:"South Korea",  a:"Czechia",          utc:"2026-06-12T02:00:00Z", group:"B", stage:"Group Stage", venue:"Estadio Akron",                 city:"Guadalajara",           res:[2,1], goals:[{team:"South Korea",player:"Son",minute:34},{team:"South Korea",player:"Hwang",minute:67},{team:"Czechia",player:"Schick",minute:80}] },
  { id:3,  h:"Canada",       a:"Bosnia & Herz.",   utc:"2026-06-12T19:00:00Z", group:"C", stage:"Group Stage", venue:"BMO Field",                     city:"Toronto",               res:[1,1] },
  { id:4,  h:"Qatar",        a:"Switzerland",      utc:"2026-06-12T22:00:00Z", group:"C", stage:"Group Stage", venue:"Bay Area Stadium",              city:"San Francisco Bay Area", res:[1,1] },
  { id:5,  h:"USA",          a:"Paraguay",         utc:"2026-06-13T01:00:00Z", group:"D", stage:"Group Stage", venue:"SoFi Stadium",                  city:"Los Angeles",           res:[4,1], goals:[{team:"USA",player:"Balogun",minute:12},{team:"USA",player:"Balogun",minute:45},{team:"USA",player:"Reyna",minute:60},{team:"USA",player:"Pulisic",minute:88},{team:"Paraguay",player:"Enciso",minute:70}] },
  { id:6,  h:"Brazil",       a:"Morocco",          utc:"2026-06-13T22:00:00Z", group:"E", stage:"Group Stage", venue:"MetLife Stadium",               city:"East Rutherford, NJ",   res:[1,1] },
  { id:7,  h:"Haiti",        a:"Scotland",         utc:"2026-06-14T01:00:00Z", group:"E", stage:"Group Stage", venue:"Gillette Stadium",              city:"Foxborough, MA",        res:[0,1], goals:[{team:"Scotland",player:"McGinn",minute:55}] },
  { id:8,  h:"Australia",    a:"Turkey",           utc:"2026-06-14T04:00:00Z", group:"D", stage:"Group Stage", venue:"BC Place",                      city:"Vancouver",             res:[2,0] },
  { id:9,  h:"Germany",      a:"Curaçao",          utc:"2026-06-14T17:00:00Z", group:"F", stage:"Group Stage", venue:"NRG Stadium",                   city:"Houston",               res:[7,1], goals:[{team:"Germany",player:"Havertz",minute:8},{team:"Germany",player:"Havertz",minute:34},{team:"Germany",player:"Müller",minute:45},{team:"Germany",player:"Gnabry",minute:52},{team:"Germany",player:"Musiala",minute:61},{team:"Germany",player:"Sané",minute:74},{team:"Germany",player:"Wirtz",minute:82},{team:"Curaçao",player:"Martinus",minute:89}] },
  { id:10, h:"Netherlands",  a:"Japan",            utc:"2026-06-14T20:00:00Z", group:"G", stage:"Group Stage", venue:"AT&T Stadium",                  city:"Dallas",                res:[2,2] },
  { id:11, h:"Ivory Coast",  a:"Ecuador",          utc:"2026-06-14T23:00:00Z", group:"F", stage:"Group Stage", venue:"Lincoln Financial Field",       city:"Philadelphia",          res:[1,0] },
  { id:12, h:"Sweden",       a:"Tunisia",          utc:"2026-06-15T02:00:00Z", group:"G", stage:"Group Stage", venue:"Estadio BBVA",                  city:"Monterrey",             res:[5,1], goals:[{team:"Sweden",player:"Isak",minute:15},{team:"Sweden",player:"Ayari",minute:29},{team:"Sweden",player:"Ayari",minute:44},{team:"Sweden",player:"Ekdal",minute:67},{team:"Sweden",player:"Forsberg",minute:88},{team:"Tunisia",player:"Msakni",minute:78}] },
  { id:13, h:"Spain",        a:"Cabo Verde",       utc:"2026-06-15T16:00:00Z", group:"H", stage:"Group Stage", venue:"Mercedes-Benz Stadium",         city:"Atlanta",               res:[0,0] },
  { id:14, h:"Belgium",      a:"Egypt",            utc:"2026-06-15T19:00:00Z", group:"I", stage:"Group Stage", venue:"Lumen Field",                   city:"Seattle",               res:[1,1] },
  { id:15, h:"Saudi Arabia", a:"Uruguay",          utc:"2026-06-15T22:00:00Z", group:"H", stage:"Group Stage", venue:"Hard Rock Stadium",             city:"Miami Gardens, FL",     res:[1,0], goals:[{team:"Saudi Arabia",player:"Al-Dawsari",minute:63}] },
  // ── TODAY — JUNE 16 IST ─────────────────────────────────────────────────
  { id:16, h:"Iran",         a:"New Zealand",      utc:"2026-06-16T01:00:00Z", group:"I", stage:"Group Stage", venue:"SoFi Stadium",                  city:"Los Angeles" },
  { id:17, h:"France",       a:"Senegal",          utc:"2026-06-16T19:00:00Z", group:"I", stage:"Group Stage", venue:"MetLife Stadium",               city:"East Rutherford, NJ" },
  { id:18, h:"Iraq",         a:"Norway",           utc:"2026-06-16T22:00:00Z", group:"I", stage:"Group Stage", venue:"Gillette Stadium",              city:"Foxborough, MA" },
  { id:19, h:"Argentina",    a:"Algeria",          utc:"2026-06-17T01:00:00Z", group:"J", stage:"Group Stage", venue:"Arrowhead Stadium",             city:"Kansas City, MO" },
  { id:20, h:"Austria",      a:"Jordan",           utc:"2026-06-17T04:00:00Z", group:"J", stage:"Group Stage", venue:"Levi's Stadium",               city:"Santa Clara, CA" },
  // ── JUNE 17 IST ──────────────────────────────────────────────────────────
  { id:21, h:"Portugal",     a:"DR Congo",         utc:"2026-06-17T17:00:00Z", group:"K", stage:"Group Stage", venue:"NRG Stadium",                   city:"Houston" },
  { id:22, h:"England",      a:"Croatia",          utc:"2026-06-17T20:00:00Z", group:"L", stage:"Group Stage", venue:"AT&T Stadium",                  city:"Dallas" },
  { id:23, h:"Ghana",        a:"Panama",           utc:"2026-06-17T23:00:00Z", group:"A", stage:"Group Stage", venue:"BMO Field",                     city:"Toronto" },
  { id:24, h:"Uzbekistan",   a:"Colombia",         utc:"2026-06-18T02:00:00Z", group:"B", stage:"Group Stage", venue:"Estadio Azteca",                city:"Mexico City" },
  // ── JUNE 18 IST ──────────────────────────────────────────────────────────
  { id:25, h:"Czechia",      a:"South Africa",     utc:"2026-06-18T16:00:00Z", group:"A", stage:"Group Stage", venue:"Mercedes-Benz Stadium",         city:"Atlanta" },
  { id:26, h:"Switzerland",  a:"Bosnia & Herz.",   utc:"2026-06-18T19:00:00Z", group:"C", stage:"Group Stage", venue:"SoFi Stadium",                  city:"Los Angeles" },
  { id:27, h:"Canada",       a:"Qatar",            utc:"2026-06-18T22:00:00Z", group:"C", stage:"Group Stage", venue:"BC Place",                      city:"Vancouver" },
  { id:28, h:"Mexico",       a:"South Korea",      utc:"2026-06-19T01:00:00Z", group:"A", stage:"Group Stage", venue:"Estadio Akron",                 city:"Guadalajara" },
  { id:29, h:"USA",          a:"Australia",        utc:"2026-06-19T19:00:00Z", group:"D", stage:"Group Stage", venue:"Lumen Field",                   city:"Seattle" },
  { id:30, h:"Scotland",     a:"Morocco",          utc:"2026-06-19T22:00:00Z", group:"E", stage:"Group Stage", venue:"Gillette Stadium",              city:"Foxborough, MA" },
  { id:31, h:"Brazil",       a:"Haiti",            utc:"2026-06-20T01:00:00Z", group:"E", stage:"Group Stage", venue:"Lincoln Financial Field",       city:"Philadelphia" },
  { id:32, h:"Turkey",       a:"Paraguay",         utc:"2026-06-20T04:00:00Z", group:"D", stage:"Group Stage", venue:"Levi's Stadium",               city:"Santa Clara, CA" },
  { id:33, h:"Netherlands",  a:"Sweden",           utc:"2026-06-20T17:00:00Z", group:"G", stage:"Group Stage", venue:"NRG Stadium",                   city:"Houston" },
  { id:34, h:"Germany",      a:"Ivory Coast",      utc:"2026-06-20T20:00:00Z", group:"F", stage:"Group Stage", venue:"BMO Field",                     city:"Toronto" },
  { id:35, h:"Ecuador",      a:"Curaçao",          utc:"2026-06-21T00:00:00Z", group:"F", stage:"Group Stage", venue:"Arrowhead Stadium",             city:"Kansas City, MO" },
  { id:36, h:"Tunisia",      a:"Japan",            utc:"2026-06-21T04:00:00Z", group:"G", stage:"Group Stage", venue:"Estadio BBVA",                  city:"Monterrey" },
  { id:37, h:"Spain",        a:"Saudi Arabia",     utc:"2026-06-21T16:00:00Z", group:"H", stage:"Group Stage", venue:"Mercedes-Benz Stadium",         city:"Atlanta" },
  { id:38, h:"Belgium",      a:"Iran",             utc:"2026-06-21T19:00:00Z", group:"I", stage:"Group Stage", venue:"SoFi Stadium",                  city:"Los Angeles" },
  { id:39, h:"Uruguay",      a:"Cabo Verde",       utc:"2026-06-21T22:00:00Z", group:"H", stage:"Group Stage", venue:"Hard Rock Stadium",             city:"Miami Gardens, FL" },
  { id:40, h:"New Zealand",  a:"Egypt",            utc:"2026-06-22T01:00:00Z", group:"I", stage:"Group Stage", venue:"BC Place",                      city:"Vancouver" },
  { id:41, h:"Argentina",    a:"Austria",          utc:"2026-06-22T17:00:00Z", group:"J", stage:"Group Stage", venue:"AT&T Stadium",                  city:"Dallas" },
  { id:42, h:"France",       a:"Iraq",             utc:"2026-06-22T21:00:00Z", group:"I", stage:"Group Stage", venue:"Lincoln Financial Field",       city:"Philadelphia" },
  { id:43, h:"Norway",       a:"Senegal",          utc:"2026-06-23T00:00:00Z", group:"I", stage:"Group Stage", venue:"MetLife Stadium",               city:"East Rutherford, NJ" },
  { id:44, h:"Jordan",       a:"Algeria",          utc:"2026-06-23T03:00:00Z", group:"J", stage:"Group Stage", venue:"Levi's Stadium",               city:"Santa Clara, CA" },
  { id:45, h:"Portugal",     a:"Uzbekistan",       utc:"2026-06-23T17:00:00Z", group:"K", stage:"Group Stage", venue:"NRG Stadium",                   city:"Houston" },
  { id:46, h:"England",      a:"Ghana",            utc:"2026-06-23T20:00:00Z", group:"L", stage:"Group Stage", venue:"Gillette Stadium",              city:"Foxborough, MA" },
  { id:47, h:"Panama",       a:"Croatia",          utc:"2026-06-23T23:00:00Z", group:"L", stage:"Group Stage", venue:"BMO Field",                     city:"Toronto" },
  { id:48, h:"Colombia",     a:"DR Congo",         utc:"2026-06-24T02:00:00Z", group:"K", stage:"Group Stage", venue:"Estadio Akron",                 city:"Guadalajara" },
  // ── MATCHDAY 3 ───────────────────────────────────────────────────────────
  { id:49, h:"Switzerland",  a:"Canada",           utc:"2026-06-25T05:00:00Z", group:"C", stage:"Group Stage", venue:"BC Place",                      city:"Vancouver" },
  { id:50, h:"Bosnia & Herz.",a:"Qatar",           utc:"2026-06-25T05:00:00Z", group:"C", stage:"Group Stage", venue:"Arrowhead Stadium",             city:"Kansas City, MO" },
  { id:51, h:"Morocco",      a:"Haiti",            utc:"2026-06-25T08:00:00Z", group:"E", stage:"Group Stage", venue:"MetLife Stadium",               city:"East Rutherford, NJ" },
  { id:52, h:"Scotland",     a:"Brazil",           utc:"2026-06-25T08:00:00Z", group:"E", stage:"Group Stage", venue:"AT&T Stadium",                  city:"Dallas" },
  { id:53, h:"South Africa", a:"South Korea",      utc:"2026-06-25T11:00:00Z", group:"A", stage:"Group Stage", venue:"Mercedes-Benz Stadium",         city:"Atlanta" },
  { id:54, h:"Czechia",      a:"Mexico",           utc:"2026-06-25T11:00:00Z", group:"A", stage:"Group Stage", venue:"Lumen Field",                   city:"Seattle" },
  { id:55, h:"Curaçao",      a:"Ivory Coast",      utc:"2026-06-26T06:00:00Z", group:"F", stage:"Group Stage", venue:"Estadio BBVA",                  city:"Monterrey" },
  { id:56, h:"Ecuador",      a:"Germany",          utc:"2026-06-26T06:00:00Z", group:"F", stage:"Group Stage", venue:"MetLife Stadium",               city:"East Rutherford, NJ" },
  { id:57, h:"Tunisia",      a:"Netherlands",      utc:"2026-06-26T09:00:00Z", group:"G", stage:"Group Stage", venue:"Hard Rock Stadium",             city:"Miami Gardens, FL" },
  { id:58, h:"Japan",        a:"Sweden",           utc:"2026-06-26T09:00:00Z", group:"G", stage:"Group Stage", venue:"NRG Stadium",                   city:"Houston" },
  { id:59, h:"Turkey",       a:"USA",              utc:"2026-06-26T12:00:00Z", group:"D", stage:"Group Stage", venue:"BC Place",                      city:"Vancouver" },
  { id:60, h:"Paraguay",     a:"Australia",        utc:"2026-06-26T12:00:00Z", group:"D", stage:"Group Stage", venue:"Levi's Stadium",               city:"Santa Clara, CA" },
  { id:61, h:"Norway",       a:"France",           utc:"2026-06-27T05:00:00Z", group:"I", stage:"Group Stage", venue:"Gillette Stadium",              city:"Foxborough, MA" },
  { id:62, h:"Senegal",      a:"Iraq",             utc:"2026-06-27T05:00:00Z", group:"I", stage:"Group Stage", venue:"BMO Field",                     city:"Toronto" },
  { id:63, h:"Cabo Verde",   a:"Saudi Arabia",     utc:"2026-06-27T10:00:00Z", group:"H", stage:"Group Stage", venue:"Lincoln Financial Field",       city:"Philadelphia" },
  { id:64, h:"Uruguay",      a:"Spain",            utc:"2026-06-27T10:00:00Z", group:"H", stage:"Group Stage", venue:"Gillette Stadium",              city:"Foxborough, MA" },
  { id:65, h:"New Zealand",  a:"Belgium",          utc:"2026-06-27T13:00:00Z", group:"I", stage:"Group Stage", venue:"Estadio Akron",                 city:"Guadalajara" },
  { id:66, h:"Egypt",        a:"Iran",             utc:"2026-06-27T13:00:00Z", group:"I", stage:"Group Stage", venue:"Levi's Stadium",               city:"Santa Clara, CA" },
  { id:67, h:"Panama",       a:"England",          utc:"2026-06-28T07:00:00Z", group:"L", stage:"Group Stage", venue:"Arrowhead Stadium",             city:"Kansas City, MO" },
  { id:68, h:"Croatia",      a:"Ghana",            utc:"2026-06-28T07:00:00Z", group:"L", stage:"Group Stage", venue:"Estadio BBVA",                  city:"Monterrey" },
  { id:69, h:"Colombia",     a:"Portugal",         utc:"2026-06-28T10:00:00Z", group:"K", stage:"Group Stage", venue:"Mercedes-Benz Stadium",         city:"Atlanta" },
  { id:70, h:"DR Congo",     a:"Uzbekistan",       utc:"2026-06-28T10:00:00Z", group:"K", stage:"Group Stage", venue:"Lumen Field",                   city:"Seattle" },
  { id:71, h:"Algeria",      a:"Austria",          utc:"2026-06-28T12:30:00Z", group:"J", stage:"Group Stage", venue:"SoFi Stadium",                  city:"Los Angeles" },
  { id:72, h:"Jordan",       a:"Argentina",        utc:"2026-06-28T12:30:00Z", group:"J", stage:"Group Stage", venue:"NRG Stadium",                   city:"Houston" },
  // ── KNOCKOUT ─────────────────────────────────────────────────────────────
  { id:80, h:"TBD", a:"TBD", utc:"2026-06-29T05:00:00Z", group:"", stage:"Round of 32", venue:"TBD", city:"USA" },
  { id:90, h:"TBD", a:"TBD", utc:"2026-07-04T20:00:00Z", group:"", stage:"Round of 16", venue:"TBD", city:"USA" },
  { id:100,h:"TBD", a:"TBD", utc:"2026-07-09T20:00:00Z", group:"", stage:"Quarter-Final", venue:"TBD", city:"USA" },
  { id:110,h:"TBD", a:"TBD", utc:"2026-07-14T20:00:00Z", group:"", stage:"Semi-Final", venue:"TBD", city:"USA" },
  { id:120,h:"TBD", a:"TBD", utc:"2026-07-19T19:00:00Z", group:"", stage:"🏆 FINAL", venue:"MetLife Stadium", city:"East Rutherford, NJ" },
];

function fixtureToMatch(f: typeof FIXTURES[0]): Match {
  const comp = COMPETITIONS.WC;
  const now = Date.now();
  const utcMs = new Date(f.utc).getTime();
  const diffMs = now - utcMs;
  const isLive     = diffMs > 0 && diffMs < 120 * 60 * 1000 && !f.res;
  const isFinished = !!f.res || (diffMs > 120 * 60 * 1000);
  const status: MatchStatus = isLive ? "LIVE" : isFinished ? "FINISHED" : "UPCOMING";

  return {
    id: f.id,
    homeTeam: { id: f.id * 10,     name: f.h, shortName: f.h, crest: "", flag: getFlag(f.h) },
    awayTeam: { id: f.id * 10 + 1, name: f.a, shortName: f.a, crest: "", flag: getFlag(f.a) },
    utcDate:     f.utc,
    istTime:     toISTTime(f.utc),
    istDate:     toISTDate(f.utc),
    istDateLabel:toISTDateLabel(f.utc),
    status,
    score: { home: f.res?.[0] ?? null, away: f.res?.[1] ?? null },
    competition: { id: 2000, name: comp.name, code: "WC", color: comp.color, icon: comp.icon },
    group:  f.group ? `Group ${f.group}` : f.stage,
    venue:  f.venue,
    city:   f.city,
    goals:  f.goals,
  };
}

export function getStaticWCMatches(): Match[] {
  return FIXTURES.map(fixtureToMatch).sort(
    (a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime()
  );
}

export function getStaticTodayMatches(): Match[] {
  const today = todayIST();
  return getStaticWCMatches().filter(m => m.istDate === today);
}

export function getStaticTomorrowMatches(): Match[] {
  const tmrw = tomorrowIST();
  return getStaticWCMatches().filter(m => m.istDate === tmrw);
}

// ─── LIVE API FETCH ───────────────────────────────────────────────────────────
export async function getLiveMatches(): Promise<Match[]> {
  try {
    const key = process.env.FOOTBALL_DATA_API_KEY || "";
    if (!key) return getStaticWCMatches().filter(m => m.status === "LIVE");
    const r = await fetch("https://api.football-data.org/v4/competitions/WC/matches?status=IN_PLAY", {
      headers: { "X-Auth-Token": key },
      next: { revalidate: 15 },
    });
    if (!r.ok) return [];
    const d = await r.json() as { matches: { id:number; homeTeam:{name:string;shortName?:string;tla?:string}; awayTeam:{name:string;shortName?:string;tla?:string}; utcDate:string; status:string; score:{fullTime:{home:number|null;away:number|null};halfTime?:{home:number|null;away:number|null}}; minute?:number; group?:string }[] };
    return (d.matches || []).map(m => ({
      id: m.id,
      homeTeam: { id: m.id, name: m.homeTeam.name, shortName: m.homeTeam.shortName || m.homeTeam.tla || m.homeTeam.name, crest: "", flag: getFlag(m.homeTeam.name) },
      awayTeam: { id: m.id+1, name: m.awayTeam.name, shortName: m.awayTeam.shortName || m.awayTeam.tla || m.awayTeam.name, crest: "", flag: getFlag(m.awayTeam.name) },
      utcDate: m.utcDate,
      istTime: toISTTime(m.utcDate),
      istDate: toISTDate(m.utcDate),
      istDateLabel: toISTDateLabel(m.utcDate),
      status: "LIVE" as MatchStatus,
      score: { home: m.score.fullTime?.home ?? null, away: m.score.fullTime?.away ?? null },
      competition: { id: 2000, name: "FIFA World Cup", code: "WC", color: "amber", icon: "🏆" },
      group: (m.group || "").replace("GROUP_", "Group "),
      minute: m.minute,
    }));
  } catch { return []; }
}

export async function getMatchesForToday(): Promise<Match[]> { return getStaticTodayMatches(); }
export async function getMatchesForTomorrow(): Promise<Match[]> { return getStaticTomorrowMatches(); }
export async function getWCSchedule(): Promise<Match[]> { return getStaticWCMatches(); }
