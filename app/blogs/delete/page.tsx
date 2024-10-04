"use client";
import { DeleteBlog, getBlogs } from "@/app/middleware/apiMiddleware";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DeleteBlogPage = () => {
  const [selectedBlogId, setSelectedBlogId] = useState<number | undefined>(
    undefined
  );
  const [blogs, setBlogs] = useState<{ id: number; title: string }[]>([]);
  const router = useRouter();
  // Fetch blogs from the database
  const fetchBlogs = async () => {
    try {
      const data = await getBlogs();
      if (data && Array.isArray(data.blogs)) {
        setBlogs(data.blogs); // Access the 'blogs' array from the response
      } else {
        console.error("Error: Expected an array of blogs but received", data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDeleteBlog = async (blogId: number) => {
    try {
      const deletedBlog = await DeleteBlog(blogId);
      console.log(deletedBlog);
      setTimeout(() => {
        router.push("/blogs");
      }, 2000);
    } catch (error) {
      console.error("Error adding Blog:");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBlogId !== undefined) {
      handleDeleteBlog(selectedBlogId);
      setSelectedBlogId(undefined); // Reset dropdown after deletion
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-96">
          <h1 className="text-xl font-semibold text-center mb-4">
            Delete Blog
          </h1>
          <form onSubmit={handleSubmit}>
            <select
              value={selectedBlogId}
              onChange={(e) => setSelectedBlogId(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled>
                Select a blog
              </option>
              {blogs.map((blog) => (
                <option key={blog.id} value={blog.id}>
                  {blog.title}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="mt-4 w-full bg-red-400 text-white py-2 rounded-md hover:bg-red-500 transition duration-200"
            >
              Delete Blog
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeleteBlogPage;
