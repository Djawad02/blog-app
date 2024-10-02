import {z} from 'zod';

const blogSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title must be 255 characters or less"),
  content: z.string().min(1, "Content is required"),
  authorId: z.number().int().nonnegative("Author ID must be a positive integer"),
  imagePath: z.string().nullable().optional().refine((value) => {
    if (!value) return true; // If the field is null or undefined, it's valid
    const isValidUrl = /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(value);
    const isValidLength = value.length <= 255;
    return isValidUrl && isValidLength;
  }, {
    message: "Image path must be a valid URL and less than or equal to 255 characters",
  }),
});

export default blogSchema;