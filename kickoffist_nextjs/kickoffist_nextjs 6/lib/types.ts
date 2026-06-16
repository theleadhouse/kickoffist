export type MatchStatus = "LIVE" | "FINISHED" | "UPCOMING";

export interface Team {
  id: number;
  name: string;
  shortName: string;
  crest: string;
  flag: string;
}

export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  utcDate: string;
  istTime: string;
  istDate: string;
  istDateLabel: string;
  status: MatchStatus;
  score: {
    home: number | null;
    away: number | null;
    winner?: string | null;
  };
  competition: {
    id: number;
    name: string;
    code: string;
    color?: string;
    icon?: string;
    emblem?: string;
  };
  group?: string;
  venue?: string;
  city?: string;
  minute?: number;
  goals?: { team: string; player: string; minute: number }[];
}

export interface FootballDataMatch {
  id: number;
  homeTeam: { id:number; name:string; shortName?:string; tla?:string; crest?:string };
  awayTeam: { id:number; name:string; shortName?:string; tla?:string; crest?:string };
  utcDate: string;
  status: string;
  minute?: number;
  score: {
    fullTime: { home: number | null; away: number | null };
    halfTime?: { home: number | null; away: number | null };
    winner?: string | null;
  };
  competition: { id:number; name:string; code:string; emblem?:string };
  group?: string;
  venue?: string;
}
