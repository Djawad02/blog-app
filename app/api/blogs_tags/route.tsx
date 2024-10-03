import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { blogId, tagId } = await req.json();
    const newBlogTag = await prisma.blogs_tags.create({
      data: {
        blogId: Number(blogId),
        tagId: Number(tagId),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Tag added to blog successfully",
      data: newBlogTag,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error adding tag to blog", error },
      { status: 500 }
    );
  }
}
