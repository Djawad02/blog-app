import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import tagSchema from "./schema";

export async function GET(request: NextRequest) {
  const tags = await prisma.tag.findMany();
  return NextResponse.json(tags, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = await tagSchema.safeParseAsync(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { name, authorId } = validation.data;
  const tag = await prisma.tag.findFirst({
    where: { name: name },
  });

  if (tag)
    return NextResponse.json(
      { error: "Tag with this name already exists" },
      { status: 400 }
    );

  const newTag = await prisma.tag.create({
    data: {
      name: name,
      authorId: authorId,
    },
  });

  return NextResponse.json(newTag, { status: 201 });
}
