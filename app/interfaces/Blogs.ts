interface PostType {
    id: number;
    title: string;
    description: string; // Update this if you get a different field name from your API
    category: string; // Update this if your API uses a different field name
    date: string; // Update this if your API provides a different date format
}
  
interface PostProps {
    post: PostType;
}
  
interface BlogFormProps {
    title: string;
    onSubmit: (
      name: string,
      authorId: number,
      createdAt: string,
      updatedAt: string,
      content: string,
      image_path?: string
    ) => void;
    authorId: number;
}