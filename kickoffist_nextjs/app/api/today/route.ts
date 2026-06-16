import { NextResponse } from "next/server";
import { getStaticWCMatches, getLiveMatches } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const all = getStaticWCMatches();
    const live = await getLiveMatches();
    
    const seen = new Set<number>();
    const matches = [...live, ...all].filter(m => {
      const id = Number(m.id);
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });

    return NextResponse.json(
      { matches, ts: new Date().toISOString() },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (e) {
    return NextResponse.json({ matches: [], error: String(e) }, { status: 200 });
  }
}
