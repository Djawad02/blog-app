import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";
export async function GET(request: NextRequest) {
  const authors = await prisma.user.findMany();
  return NextResponse.json(authors, { status: 200 });
}

const schema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string().min(6),
  designation: z.string().optional(),
  description: z.string().optional(),
});
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { username: body.username },
  });

  if (user)
    return NextResponse.json({ error: "User already exits" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      username: body.username,
      password: hashedPassword,
      designation: body.designation,
      description: body.description,
    },
  });
  return NextResponse.json(
    {
      name: newUser.name,
      username: newUser.username,
      designation: newUser.designation,
      description: newUser.description,
    },
    { status: 201 }
  );
}
