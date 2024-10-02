interface PostType {
    id: number;
    title: string;
    content: string; 
    authorId: number;
    createdAt: string;
    updatedAt: string;
    image_path:string
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