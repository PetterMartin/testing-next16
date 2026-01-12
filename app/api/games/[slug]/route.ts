import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Game from "@/database/games.model";

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Connect to database
    await connectDB();

    // Await and extract slug from params
    const { slug } = await params;

    // Validate slug parameter
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        { message: "Invalid or missing slug parameter" },
        { status: 400 }
      );
    }

    // Sanitize slug (remove any potential malicious input)
    const sanitizedSlug = slug.trim().toLowerCase();

    // Query games by slug
    const game = await Game.findOne({ slug: sanitizedSlug }).lean();

    // Handle games not found
    if (!game) {
      return NextResponse.json(
        { message: `Game with slug '${sanitizedSlug}' not found` },
        { status: 404 }
      );
    }

    // Return successful response with games data
    return NextResponse.json(
      { message: "Game fetched successfully", game },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (only in development)
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching games by slug:", error);
    }

    // Handle specific error types
    if (error instanceof Error) {
      // Handle database connection errors
      if (error.message.includes("MONGODB_URI")) {
        return NextResponse.json(
          { message: "Database configuration error" },
          { status: 500 }
        );
      }

      // Return generic error with error message
      return NextResponse.json(
        { message: "Failed to fetch games", error: error.message },
        { status: 500 }
      );
    }

    // Handle unknown errors
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { slug: string } }
) {
  try {
    await connectDB();

    const sanitizedSlug = decodeURIComponent(context.params.slug)
      .trim()
      .toLowerCase();

    const formData = await req.formData();
    const updates: any = Object.fromEntries(formData.entries());

    delete updates.image;

    const file = formData.get("image") as File | null;

    if (file && typeof file !== "string") {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise<any>((resolve, reject) => {
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

      updates.image = uploadResult.secure_url;
    }

    delete updates.slug;

    const updatedGame = await Game.findOneAndUpdate(
      { slug: sanitizedSlug },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedGame) {
      return NextResponse.json(
        { message: `Game with slug '${sanitizedSlug}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Game updated successfully", game: updatedGame },
      { status: 200 }
    );
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { message: "Game update failed", error: e?.message ?? "Unknown" },
      { status: 500 }
    );
  }
}
