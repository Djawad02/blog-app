import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const blogWithCategories = await prisma.blog.findUnique({
      where: { id: parseInt(id) },
      include: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    });

    if (!blogWithCategories) {
      return new Response("Blog not found", { status: 404 });
    }

    const categories = blogWithCategories.categories.map((c) => c.category);
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return new Response("Error fetching categories", { status: 500 });
  }
}

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const categoryId = parseInt(id);
    if (isNaN(categoryId)) {
      return new Response("Invalid ID", { status: 400 });
    }

    // Delete the category from the blog
    await prisma.blogs_categories.deleteMany({
      where: {
        categoryId: categoryId,
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error deleting category:", error);
    return new Response("Error deleting category", { status: 500 });
  }
};
