import prisma from '@/prisma/client';
import { z } from 'zod';

const categorySchema = z.object({
  name: z.string()
    .min(5, "Name must be atleast 5 characters")
    .max(255, "Name must be 255 characters or less")
    .trim()
    .refine(async (value) => {
        // Check if the name already exists in the database
        const existingCategory = await prisma.category.findUnique({
          where: { name: value },
        });
        return !existingCategory; // Return true if no duplicate exists
      }, { message: "Category name must be unique" }),
  authorId: z.number().int().nonnegative("Author ID must be a positive integer").optional(), 
});

export default categorySchema;
