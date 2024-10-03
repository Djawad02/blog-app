import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { blogId, categoryId } = await req.json();
    const newBlogCategory = await prisma.blogs_categories.create({
      data: {
        blogId: Number(blogId),
        categoryId: Number(categoryId),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Category added to blog successfully",
      data: newBlogCategory,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error adding category to blog", error },
      { status: 500 }
    );
  }
}
