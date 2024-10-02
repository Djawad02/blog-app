import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import tagSchema from "../schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const tag = await prisma.tag.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!tag)
    return NextResponse.json({ error: "Tag not found" }, { status: 404 });

  return NextResponse.json(tag, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validation = await tagSchema.safeParseAsync(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const { name, authorId } = validation.data;

    const updateData: {
      updatedAt: Date;
      name?: string;
      authorId?: number;
    } = {
      updatedAt: new Date(),
    };
    if (name) updateData.name = name;
    if (authorId) updateData.authorId = authorId;

    const updatedTag = await prisma.tag.update({
      where: { id: parseInt(params.id) },
      data: updateData,
    });

    return NextResponse.json(updatedTag, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating tag:", error.message);
      return NextResponse.json(
        { message: "Error updating tag", error: error.message },
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
  const tag = await prisma.tag.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!tag)
    return NextResponse.json({ error: "Tag not found" }, { status: 404 });

  await prisma.tag.delete({
    where: {
      id: tag.id,
    },
  });
  return NextResponse.json("Tag deleted", { status: 200 });
}
