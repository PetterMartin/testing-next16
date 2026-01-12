import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/mongodb";
import Game from "@/database/games.model";

export async function GET() {
  try {
    await connectDB();

    const games = await Game.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Games fetched successfully", games },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Games fetching failed", error: e },
      { status: 500 }
    );
  }
}

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

    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "DevEvent" },
          (error, results) => {
            if (error) return reject(error);

            resolve(results);
          }
        )
        .end(buffer);
    });

    game.image = (uploadResult as { secure_url: string }).secure_url;

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
