import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import blogSchema from "./schema";

export async function GET(request: NextRequest) {
  const blogs = await prisma.blog.findMany();
  return NextResponse.json(blogs, { status: 200 });
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
