import { NextResponse } from "next/server";
import { getLiveMatches } from "@/lib/api";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const matches = await getLiveMatches();
    return NextResponse.json(
      { matches, updatedAt: new Date().toISOString() },
      {
        headers: {
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      { matches: [], error: "Failed to fetch live matches" },
      { status: 200 } // Return 200 so client doesn't break
    );
  }
}
