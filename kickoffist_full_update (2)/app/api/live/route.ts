import { NextResponse } from "next/server";
import { getLiveMatches } from "@/lib/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const matches = await getLiveMatches();
    return NextResponse.json(
      { matches, ts: new Date().toISOString() },
      { headers: { "Cache-Control": "no-store, must-revalidate" } }
    );
  } catch (e) {
    return NextResponse.json({ matches: [], error: String(e) }, { status: 200 });
  }
}
