"use client";
import React, { useState, useEffect } from "react";
import blogImage from "../../public/coffee.jpg";
import Link from "next/link";
import Image from "next/image";
import Author from "./Author";
import Pagination from "./Pagination";

const BlogListing = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const POSTS_PER_PAGE = 8;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs"); // Adjust the endpoint as necessary
        const data = await response.json();
        setPosts(data); // Assuming your API returns an array of blog posts

        // Set total pages based on the fetched data
        setTotalPages(Math.ceil(data.length / POSTS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentPosts = posts.slice(
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
