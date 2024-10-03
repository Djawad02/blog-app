import { useState, useEffect } from "react";
import Image from "next/image";
import authorPlaceholder from "../../public/images/author.jpg"; // Placeholder image for the author
import Link from "next/link";
import { getAuthorById } from "../middleware/apiMiddleware";

interface AuthorProps {
  authorId: number;
}

interface User {
  name: string;
  designation: string;
}

export default function Author({ authorId }: AuthorProps) {
  const [author, setAuthor] = useState<User | null>(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const blogData = await getAuthorById(authorId);
        setAuthor(blogData);
      } catch (error) {
        console.log();
        ("Failed to fetch author.");
      }
    };

    if (authorId) {
      fetchAuthor();
    }
  }, [authorId]);

  return (
    <div className="author flex py-5">
      <Image
        src={authorPlaceholder}
        alt={author?.name || "Author image"}
        className="rounded-full"
        width={50}
        height={50}
      />
      <div className="flex flex-col justify-center px-4">
        <Link
          href="/"
          className="text-md font-bold text-gray-800 hover:text-gray-500"
        >
          {author ? author.name : "Unknown Author"}
        </Link>
        <span className="text-sm text-gray-500">
          {author ? author.designation : "Unknown Designation"}
        </span>
      </div>
    </div>
  );
}
