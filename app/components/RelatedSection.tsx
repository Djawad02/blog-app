"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Author from "./Author";
import blogImage from "../../public/images/blog.jpg";
import { getPostsByAuthorId } from "../middleware/apiMiddleware";

interface RelatedSectionProps {
  authorId: number;
  currentPostId: number;
}

const RelatedSection = ({ authorId, currentPostId }: RelatedSectionProps) => {
  const [relatedPosts, setRelatedPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const response = await getPostsByAuthorId(authorId);

        const posts = response.blogs;
        if (Array.isArray(posts)) {
          const filteredPosts = posts.filter(
            (post: PostType) =>
              post.id !== currentPostId && post.authorId === authorId
          );
          // Slice the filtered posts to a maximum of 3
          const limitedPosts = filteredPosts.slice(0, 3);
          setRelatedPosts(limitedPosts);
        } else {
          console.error("Fetched posts is not an array:", posts);
        }
      } catch (error) {
        console.error("Error fetching related posts:", error);
      }
    };

    fetchRelatedPosts();
  }, [authorId, currentPostId]);

  return (
    <section className="pt-20">
      <h1 className="font-bold text-xl py-10">More From Author...</h1>
      <div className="flex flex-col gap-10">
        {relatedPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default RelatedSection;

const Post = ({ post }: { post: PostType }) => {
  return (
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <Link href={`/blogs/${post.id}`}>
          <Image
            src={post.imagePath || blogImage}
            alt="Image"
            className="rounded"
            width={450}
            height={350}
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="cat">
          <Link
            href={`/blogs/${post.id}`}
            className="text-lg font-bold text-gray-800 hover:text-gray-500"
          >
            {post.title}
          </Link>
          <Link href="/" className="text-gray-500 hover:text-gray-800 text-sm">
            {""} - {new Date(post.createdAt).toLocaleDateString()}
          </Link>
        </div>
        {/* <div className="title"></div> */}
        <div className="text-gray-500 py-3 text-sm">
          {post.content.slice(0, 100)}...
          <Author authorId={post.authorId} />
        </div>
      </div>
    </div>
  );
};
