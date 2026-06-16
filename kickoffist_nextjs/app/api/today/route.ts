import { NextResponse } from "next/server";
import { getStaticWCMatches } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const matches = getStaticWCMatches();
    return NextResponse.json(
      { matches, ts: new Date().toISOString() },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (e) {
    return NextResponse.json({ matches: [], error: String(e) }, { status: 200 });
  }
}
