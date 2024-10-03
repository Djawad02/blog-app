import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const blogWithTags = await prisma.blog.findUnique({
      where: { id: parseInt(id) },
      include: {
        tags: {
          select: {
            tag: true,
          },
        },
      },
    });

    if (!blogWithTags) {
      return new Response("Blog not found", { status: 404 });
    }

    const tags = blogWithTags.tags.map((t) => t.tag);
    return new Response(JSON.stringify(tags), { status: 200 });
  } catch (error) {
    return new Response("Error fetching tags", { status: 500 });
  }
}

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const tagId = parseInt(id);
    if (isNaN(tagId)) {
      return new Response("Invalid ID", { status: 400 });
    }

    // Delete the tag from the blog
    await prisma.blogs_tags.deleteMany({
      where: {
        tagId: tagId,
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error deleting tag:", error);
    return new Response("Error deleting tag", { status: 500 });
  }
};
