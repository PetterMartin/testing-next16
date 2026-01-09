import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
  } catch (e) {
    return NextResponse.json({
      message: "Pokemon failed",
      error: e instanceof Error ? e.message : "Unknown",
    });
  }
}
