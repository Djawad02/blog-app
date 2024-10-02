interface FormProps {
    title: string;
    onSubmit: (
      name: string,
      authorId: number,
      createdAt: string,
      updatedAt: string,
      blogId: number | undefined, // Make blogId optional
      content?: string,
      image_path?: string
    ) => void;
  
    authorId: number;
    blogs: { id: number; title: string }[]; // Ensure blogs prop is included
  }