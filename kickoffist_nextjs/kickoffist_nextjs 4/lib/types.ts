// ─── CORE MATCH TYPE ──────────────────────────────────────────────────────────
export interface Match {
  id: string | number;
  homeTeam: Team;
  awayTeam: Team;
  utcDate: string;           // ISO 8601 from API
  istTime: string;           // "03:30 AM" — computed
  istDate: string;           // "2026-06-13" — IST date
  istDateLabel: string;      // "Fri, 13 Jun"
  status: MatchStatus;
  score: Score;
  competition: Competition;
  venue?: string;
  group?: string;
  minute?: number | null;
  note?: string;
}

export type MatchStatus = "LIVE" | "UPCOMING" | "FINISHED" | "POSTPONED";

export interface Team {
  id: number;
  name: string;
  shortName?: string;
  crest?: string;
  flag?: string;             // emoji flag
}

export interface Score {
  home: number | null;
  away: number | null;
  winner?: "HOME_TEAM" | "AWAY_TEAM" | "DRAW" | null;
}

export interface Competition {
  id: number;
  name: string;
  code: string;              // "WC", "PL", "CL", "ISL"
  emblem?: string;
  color: string;             // tailwind color class
  icon: string;              // emoji
}

// ─── API RESPONSE TYPES ──────────────────────────────────────────────────────
export interface FootballDataMatch {
  id: number;
  utcDate: string;
  status: string;
  minute?: number;
  homeTeam: { id: number; name: string; shortName?: string; crest?: string; tla?: string };
  awayTeam: { id: number; name: string; shortName?: string; crest?: string; tla?: string };
  score: {
    fullTime: { home: number | null; away: number | null };
    winner: string | null;
  };
  competition: { id: number; name: string; code: string; emblem?: string };
  group?: string;
  venue?: string;
}

export interface SportsDBEvent {
  idEvent: string;
  strEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  strTimestamp?: string;
  dateEvent: string;
  strTime: string;
  intHomeScore?: string;
  intAwayScore?: string;
  strStatus?: string;
  strVenue?: string;
  strLeague?: string;
  strHomeTeamBadge?: string;
  strAwayTeamBadge?: string;
  idHomeTeam?: string;
  idAwayTeam?: string;
}
