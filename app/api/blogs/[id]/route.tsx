import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import blogSchema from "../schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const blog = await prisma.blog.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!blog)
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });

  return NextResponse.json(blog, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validation = blogSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    const { title, content, authorId, imagePath } = validation.data;

    const updateData: {
      title?: string;
      content?: string;
      authorId?: number;
      imagePath?: string;
      updatedAt: Date;
    } = {
      updatedAt: new Date(),
    };

    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (authorId) updateData.authorId = authorId;
    if (imagePath) updateData.imagePath = imagePath;

    const updatedBlog = await prisma.blog.update({
      where: { id: parseInt(params.id) },
      data: updateData,
    });

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating blog:", error.message);
      return NextResponse.json(
        { message: "Error updating blog", error: error.message },
        { status: 500 }
      );
    } else {
      console.error("An unknown error occurred:", error);
      return NextResponse.json(
        { message: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const blog = await prisma.blog.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!blog)
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });

  await prisma.blog.delete({
    where: {
      id: blog.id,
    },
  });
  return NextResponse.json("Blog deleted", { status: 200 });
}
