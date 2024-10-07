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
  { params }: { params: { id: string } } // id refers to blogId here
) => {
  const { id: blogId } = params; // This is the blogId
  const { categoryId } = await req.json(); // Parsing the categoryId from the request body

  try {
    const parsedBlogId = parseInt(blogId);
    const parsedCategoryId = parseInt(categoryId);

    // Validate both blogId and categoryId
    if (isNaN(parsedBlogId) || isNaN(parsedCategoryId)) {
      return new Response("Invalid blogId or categoryId", { status: 400 });
    }

    // Delete the association between the blog and the category
    await prisma.blogs_categories.deleteMany({
      where: {
        blogId: parsedBlogId,
        categoryId: parsedCategoryId,
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error deleting category:", error);
    return new Response("Error deleting category", { status: 500 });
  }
};
