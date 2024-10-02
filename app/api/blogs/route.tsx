import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import blogSchema from "./schema";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "9", 10);
  const skip = (page - 1) * limit;

  try {
    // Get total blog count
    const totalBlogs = await prisma.blog.count();

    // Fetch paginated blogs
    const blogs = await prisma.blog.findMany({
      skip: skip,
      take: limit,
      orderBy: {
        createdAt: "desc", // Assuming you have a createdAt field
      },
    });

    return NextResponse.json({
      blogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = blogSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const blog = await prisma.blog.findFirst({
    where: { title: body.title },
  });

  if (blog)
    return NextResponse.json(
      { error: "Blog with this title already exists" },
      { status: 400 }
    );

  const newBlog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: body.authorId,
      imagePath: body.imagePath,
    },
  });

  return NextResponse.json(newBlog, { status: 201 });
}
