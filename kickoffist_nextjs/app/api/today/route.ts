import { NextResponse } from "next/server";
import { getMatchesForToday } from "@/lib/api";

export const runtime = "edge";

export async function GET() {
  try {
    const matches = await getMatchesForToday();
    return NextResponse.json(
      { matches, updatedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=30" } }
    );
  } catch {
    return NextResponse.json({ matches: [], error: "Failed" }, { status: 200 });
  }
}
