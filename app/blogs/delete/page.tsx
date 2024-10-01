"use client";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import React, { useState } from "react";

const DeleteBlogPage = () => {
  const [selectedBlogId, setSelectedBlogId] = useState<number | undefined>(
    undefined
  );

  const blogs = [
    { id: 1, title: "My First Blog Post" },
    { id: 2, title: "A Day in the Life" },
    { id: 3, title: "Travel Adventures" },
  ];

  const handleDeleteBlog = async (blogId: number) => {
    // Perform deletion logic here
    console.log(`Blog with ID ${blogId} deleted`);

    // Example of a future API call:
    // await fetch(`/api/blogs/${blogId}`, {
    //   method: "DELETE",
    // });
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
      <Navbar />
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
      <Footer />
    </>
  );
};

export default DeleteBlogPage;
