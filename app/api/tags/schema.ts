import prisma from '@/prisma/client';
import { z } from 'zod';

const tagSchema = z.object({
  name: z.string()
    .min(1, "Tag name is required")
    .max(255, "Tag name must be 255 characters or less")
    .refine(async (value) => {
      // Check if the tag name already exists in the database
      const existingTag = await prisma.tag.findUnique({
        where: { name: value },
      });
      return !existingTag; // Return true if no duplicate exists
    }, { message: "Tag name must be unique" }),
  
  authorId: z.number().int().nonnegative("Author ID must be a positive integer").optional(),
});


export default tagSchema;