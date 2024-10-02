import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import categorySchema from "./schema";

export async function GET(request: NextRequest) {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = await categorySchema.safeParseAsync(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const { name, authorId } = validation.data;
  const category = await prisma.category.findUnique({
    where: { name: name },
  });

  if (category) {
    return NextResponse.json(
      { error: "Category with this name already exists" },
      { status: 400 }
    );
  }
  const newCategory = await prisma.category.create({
    data: {
      name: name,
      authorId: authorId,
    },
  });

  return NextResponse.json(newCategory, { status: 201 });
}
