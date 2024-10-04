import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: Request) {
  try {
    const { username } = await req.json();
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (user) {
      return NextResponse.json({ id: user.id });
    } else {
      return NextResponse.json({ id: null });
    }
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return NextResponse.json(
      { error: "Error fetching user ID" },
      { status: 500 }
    );
  }
}
