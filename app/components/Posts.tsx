import blogImage from "../../public/coffee.jpg";
import Link from "next/link";
import Image from "next/image";
import Author from "./Author";
export function Post({ post }: PostProps) {
  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date available"; // Fallback for missing date

  return (
    <div className="item">
      <div className="images">
        <Link href={`/blogs/${post.id}`}>
          <Image
            src={blogImage}
            width={400}
            height={350}
            alt="blog image"
            className="rounded"
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="cat">
          <Link href="/" className="text-red-500 hover:text-red-800 text-sm">
            {post.authorId}
          </Link>
          <Link href="/" className="text-gray-500 hover:text-gray-800 text-sm">
            - {formattedDate}
          </Link>
        </div>
        <div className="title">
          <Link
            href={`/blogs/${post.id}`}
            className="text-xl font-bold text-gray-800 hover:text-gray-500"
          >
            {post.title}
          </Link>
        </div>
        <p className="text-gray-500 py-3">
          {post.content.length > 100
            ? `${post.content.slice(0, 100)}...`
            : post.content}
        </p>

        <Author />
      </div>
    </div>
  );
}
