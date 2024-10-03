import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const author = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!author)
    return NextResponse.json({ error: "Author not found" }, { status: 404 });

  return NextResponse.json(author, { status: 200 });
}
