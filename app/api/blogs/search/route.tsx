import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  if (!title) {
    return NextResponse.json(
      { error: "Title query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const blogs = await prisma.blog.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs by title:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
