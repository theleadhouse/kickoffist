import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface FDGoal {
  minute: number;
  team: { name: string };
  scorer: { name: string };
  type: string;
}

interface FDMatch {
  id: number;
  homeTeam: { id: number; name: string; shortName?: string; tla?: string };
  awayTeam: { id: number; name: string; shortName?: string; tla?: string };
  utcDate: string;
  status: string;
  minute?: number;
  score: {
    fullTime: { home: number | null; away: number | null };
    halfTime?: { home: number | null; away: number | null };
  };
  goals?: FDGoal[];
  group?: string;
  venue?: string;
}

const FLAGS: Record<string, string> = {
  "Mexico":"🇲🇽","South Africa":"🇿🇦","South Korea":"🇰🇷","Czechia":"🇨🇿",
  "Canada":"🇨🇦","Bosnia-Herzegovina":"🇧🇦","Bosnia and Herzegovina":"🇧🇦",
  "USA":"🇺🇸","United States":"🇺🇸","Paraguay":"🇵🇾","Qatar":"🇶🇦",
  "Switzerland":"🇨🇭","Brazil":"🇧🇷","Morocco":"🇲🇦","Haiti":"🇭🇹",
  "Scotland":"🏴󠁧󠁢󠁳󠁣󠁴󠁿","Australia":"🇦🇺","Turkey":"🇹🇷","Türkiye":"🇹🇷",
  "Germany":"🇩🇪","Curacao":"🇨🇼","Curaçao":"🇨🇼","Netherlands":"🇳🇱",
  "Japan":"🇯🇵","Ivory Coast":"🇨🇮","Ecuador":"🇪🇨","Sweden":"🇸🇪",
  "Tunisia":"🇹🇳","Spain":"🇪🇸","Cape Verde":"🇨🇻","Cabo Verde":"🇨🇻",
  "Belgium":"🇧🇪","Egypt":"🇪🇬","Saudi Arabia":"🇸🇦","Uruguay":"🇺🇾",
  "Iran":"🇮🇷","New Zealand":"🇳🇿","France":"🇫🇷","Senegal":"🇸🇳",
  "Iraq":"🇮🇶","Norway":"🇳🇴","Argentina":"🇦🇷","Algeria":"🇩🇿",
  "Austria":"🇦🇹","Jordan":"🇯🇴","Portugal":"🇵🇹","DR Congo":"🇨🇩",
  "England":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","Croatia":"🇭🇷","Ghana":"🇬🇭","Panama":"🇵🇦",
  "Uzbekistan":"🇺🇿","Colombia":"🇨🇴",
};

function getFlag(name: string): string {
  return FLAGS[name] || "🏳️";
}

function toISTTime(utc: string): string {
  try {
    const d = new Date(new Date(utc).getTime() + 5.5 * 3600000);
    const h = d.getUTCHours();
    const m = d.getUTCMinutes();
    const h12 = h % 12 || 12;
    const ampm = h < 12 ? "AM" : "PM";
    return `${h12}:${String(m).padStart(2,"0")} ${ampm}`;
  } catch { return "--:--"; }
}

function toISTDate(utc: string): string {
  try {
    const d = new Date(new Date(utc).getTime() + 5.5 * 3600000);
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,"0")}-${String(d.getUTCDate()).padStart(2,"0")}`;
  } catch { return ""; }
}

export async function GET() {
  try {
    const key = process.env.FOOTBALL_DATA_API_KEY || "";
    if (!key) {
      return NextResponse.json({ matches: [], source: "no-key" });
    }

    const r = await fetch(
      "https://api.football-data.org/v4/competitions/WC/matches?status=IN_PLAY",
      {
        headers: { "X-Auth-Token": key },
        cache: "no-store",
      }
    );

    if (!r.ok) {
      return NextResponse.json({ matches: [], error: r.status });
    }

    const data = await r.json() as { matches: FDMatch[] };
    
    const matches = (data.matches || []).map((m: FDMatch) => ({
      id: m.id,
      homeTeam: {
        id: m.homeTeam.id,
        name: m.homeTeam.name,
        shortName: m.homeTeam.shortName || m.homeTeam.tla || m.homeTeam.name,
        crest: "",
        flag: getFlag(m.homeTeam.name),
      },
      awayTeam: {
        id: m.awayTeam.id,
        name: m.awayTeam.name,
        shortName: m.awayTeam.shortName || m.awayTeam.tla || m.awayTeam.name,
        crest: "",
        flag: getFlag(m.awayTeam.name),
      },
      utcDate: m.utcDate,
      istTime: toISTTime(m.utcDate),
      istDate: toISTDate(m.utcDate),
      istDateLabel: "Live",
      status: "LIVE",
      score: {
        home: m.score.fullTime?.home ?? 0,
        away: m.score.fullTime?.away ?? 0,
      },
      competition: {
        id: 2000,
        name: "FIFA World Cup",
        code: "WC",
        icon: "🏆",
        color: "amber",
      },
      group: (m.group || "").replace("GROUP_", "Group "),
      venue: m.venue,
      minute: m.minute,
      // Map goalscorers
      goals: (m.goals || []).map((g: FDGoal) => ({
        team: g.team.name,
        player: g.scorer.name,
        minute: g.minute,
      })),
    }));

    return NextResponse.json(
      { matches, ts: new Date().toISOString() },
      { headers: { "Cache-Control": "no-store, no-cache" } }
    );
  } catch (e) {
    return NextResponse.json({ matches: [], error: String(e) }, { status: 200 });
  }
}
