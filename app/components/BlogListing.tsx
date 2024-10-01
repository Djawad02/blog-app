"use client";
import React, { useState, useEffect } from "react";
import blogImage from "../../public/coffee.jpg";
import Link from "next/link";
import Image from "next/image";
import Author from "./Author";
import Pagination from "./Pagination";

interface PostType {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
}

interface PostProps {
  post: PostType;
}

const BlogListing = () => {
  const dummyPosts: PostType[] = new Array(20).fill(0).map((_, i) => ({
    id: i,
    title: `Blog Post ${i + 1}`,
    description: "This is a random description for the blog.",
    category: "Web, Design",
    date: "September 30, 2024",
  }));

  const POSTS_PER_PAGE = 9;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setTotalPages(Math.ceil(dummyPosts.length / POSTS_PER_PAGE));
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentPosts = dummyPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <section className="container mx-auto md:px-20">
      <h1 className="font-bold text-3xl py-12 text-center">Latest Blogs</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
        {currentPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

function Post({ post }: PostProps) {
  return (
    <div className="item">
      <div className="images">
        <Link href={`/blogs/${post.id + 1}`}>
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
            {post.category}
          </Link>
          <Link href="/" className="text-gray-500 hover:text-gray-800 text-sm">
            - {post.date}
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
        <p className="text-gray-500 py-3">{post.description}</p>
        <Author />
      </div>
    </div>
  );
}

export default BlogListing;
