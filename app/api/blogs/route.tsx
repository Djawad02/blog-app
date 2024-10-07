import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import blogSchema from "./schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const category = searchParams.get("category"); // Get category from query params
  const tag = searchParams.get("tag"); // Get tag from query params

  try {
    const whereClause: any = {};

    // Add category filter if a category is selected
    if (category) {
      whereClause.categories = {
        some: {
          category: {
            name: category, // Match category by name
          },
        },
      };
    }

    // Add tag filter if a tag is selected
    if (tag) {
      whereClause.tags = {
        some: {
          tag: {
            name: tag, // Match tag by name
          },
        },
      };
    }

    const blogs = await prisma.blog.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: whereClause, // Apply filters
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        categories: {
          include: {
            category: true, // Include related categories
          },
        },
        tags: {
          include: {
            tag: true, // Include related tags
          },
        },
      },
    });

    const totalBlogs = await prisma.blog.count({
      where: whereClause, // Count filtered blogs
    });

    const formattedBlogs = blogs.map((blog) => ({
      ...blog,
      categories: blog.categories.map((c) => c.category), // Flatten nested categories
      tags: blog.tags.map((t) => t.tag),
    }));

    return NextResponse.json({
      blogs: formattedBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.error(); // Return a 500 error response
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
