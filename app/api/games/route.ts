import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Game from "@/database/games.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    let game;

    try {
      game = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json(
        { message: "Invalid JSON data format" },
        { status: 400 }
      );
    }

    const createdGame = await Game.create(game);

    return NextResponse.json(
      { message: "Game created successfully", event: createdGame },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    let errorMessage = "Unknown";
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    return NextResponse.json(
      { message: "Game post failed", error: errorMessage },
      { status: 500 }
    );
  }
}
