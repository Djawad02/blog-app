import {z} from 'zod';

const blogSchema = z.object({
  title: z.string().min(2, "Title must be atleast 2 characters").max(255, "Title must be 255 characters or less"),
  content: z.string().min(5, "Content must be atleast 5 characters"),
  authorId: z.number().int().nonnegative("Author ID must be a positive integer"),
  imagePath: z.string().nullable().optional().refine((value) => {
    if (!value) return true; // If the field is null or undefined, it's valid
  
    // Allow both full URLs and relative paths (e.g., /images/img.png)
    const isValidUrl = /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(value);
    const isRelativePath = /^\/[^\s]*$/.test(value);  // Match relative paths starting with '/'
    const isValidLength = value.length <= 255;
  
    return (isValidUrl || isRelativePath) && isValidLength;
  }, {
    message: "Image path must be a valid URL or relative path, and less than or equal to 255 characters or leave empty",
  }),
});

export default blogSchema;