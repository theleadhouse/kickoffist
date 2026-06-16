import { NextResponse } from "next/server";
import { getMatchesForToday, getLiveMatches } from "@/lib/api";
import { Match } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const [today, live] = await Promise.all([
      getMatchesForToday(),
      getLiveMatches(),
    ]);

    // Merge and dedupe
    const seen = new Set<number>();
    const all: Match[] = [];
    [...live, ...today].forEach(m => {
      if (!seen.has(m.id)) { seen.add(m.id); all.push(m); }
    });

    return NextResponse.json(
      { matches: all, ts: new Date().toISOString() },
      { headers: { "Cache-Control": "no-store, must-revalidate" } }
    );
  } catch (e) {
    console.error("API /today:", e);
    return NextResponse.json({ matches: [], error: String(e) }, { status: 200 });
  }
}
