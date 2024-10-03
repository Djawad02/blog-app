"use client";
import { useState, useEffect } from "react";
import blogImage from "../../public/images/blog.jpg";
import Link from "next/link";
import Image from "next/image";
import Author from "./Author";
import { getAuthorById } from "../middleware/apiMiddleware";

interface User {
  name: string;
  designation: string;
}

export function Post({ post }: PostProps) {
  const [author, setAuthor] = useState<User | null>(null); // State to store author details

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date available"; // Fallback for missing date

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const data = await getAuthorById(post.authorId);
        setAuthor(data);
      } catch (error) {
        console.error("Error fetching author details:", error);
      }
    };

    if (post.authorId) {
      fetchAuthor();
    }
  }, [post.authorId]);

  return (
    <div className="item">
      <div className="images">
        <Link href={`/blogs/${post.id}`}>
          <Image
            src={post.imagePath || blogImage}
            width={300}
            height={250}
            alt="blog image"
            className="rounded"
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="cat">
          <Link href="/" className="text-red-500 hover:text-red-800 text-sm">
            {/* {author ? author.name : "Unknown Author"} */}4 min read
          </Link>
          <Link href="/" className="text-gray-500 hover:text-gray-800 text-sm">
            {" - "}
            {formattedDate}
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

        {/* Render categories */}

        {post.categories && post.categories.length > 0 && (
          <div className="categories">
            <strong>Categories: </strong>
            {post.categories.map((category) => (
              <span
                key={category.id}
                className="category-blog text-red-500 hover:text-red-800 text-sm"
              >
                {category.name}
                {", "}
              </span>
            ))}
          </div>
        )}

        {/* Render tags */}

        {post.tags && post.tags.length > 0 && (
          <div className="tags">
            <strong>Tags: </strong>
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="tag-blog text-red-800 hover:text-red-500 text-sm"
              >
                {tag.name}
                {", "}
              </span>
            ))}
          </div>
        )}

        <Author authorId={post.authorId} />
      </div>
    </div>
  );
}
