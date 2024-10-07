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
  { params }: { params: { id: string } } // id refers to blogId here
) => {
  const { id: blogId } = params; // This is the blogId
  const { tagId } = await req.json(); // Parsing the tagId from the request body

  try {
    const parsedBlogId = parseInt(blogId);
    const parsedTagId = parseInt(tagId);

    // Validate both blogId and tagId
    if (isNaN(parsedBlogId) || isNaN(parsedTagId)) {
      return new Response("Invalid blogId or tagId", { status: 400 });
    }

    // Delete the association between the blog and the tag
    await prisma.blogs_tags.deleteMany({
      where: {
        blogId: parsedBlogId,
        tagId: parsedTagId,
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error deleting tag:", error);
    return new Response("Error deleting tag", { status: 500 });
  }
};
