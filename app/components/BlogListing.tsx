"use client";
import React, { useState, useEffect } from "react";

import Pagination from "./Pagination";
import { Post } from "./Posts";

const BlogListing = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const POSTS_PER_PAGE = 9;
  const Spinner = () => (
    <div className="flex justify-center items-center ">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/blogs?page=${currentPage}&limit=${POSTS_PER_PAGE}`
        );
        const data = await response.json();
        setPosts(data.blogs);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBlogs();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="container mx-auto md:px-20">
      <h1 className="font-bold text-3xl py-12 text-center">Latest Blogs</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
        {loading ? (
          <Spinner />
        ) : (
          posts.map((post) => <Post key={post.id} post={post} />)
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default BlogListing;
