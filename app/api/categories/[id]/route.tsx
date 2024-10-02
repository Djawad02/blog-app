import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import categorySchema from "../schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const category = await prisma.category.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!category)
    return NextResponse.json({ error: "Category not found" }, { status: 404 });

  return NextResponse.json(category, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validation = await categorySchema.safeParseAsync(body);

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

    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(params.id) },
      data: updateData,
    });

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating category:", error.message);
      return NextResponse.json(
        { message: "Error updating category", error: error.message },
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
  const category = await prisma.category.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!category)
    return NextResponse.json({ error: "Category not found" }, { status: 404 });

  await prisma.category.delete({
    where: {
      id: category.id,
    },
  });
  return NextResponse.json("Category deleted", { status: 200 });
}
