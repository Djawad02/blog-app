"use client";
import React, { useState } from "react";

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

const BlogForm = ({ title, onSubmit, authorId }: BlogFormProps) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePath, setImagePath] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    // Ensure that required fields are present
    if (blogTitle && content) {
      onSubmit(blogTitle, authorId, createdAt, updatedAt, content, imagePath);
      setBlogTitle(""); // Reset the title
      setContent(""); // Reset the content
      setImagePath(""); // Reset the image path
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-xl font-semibold text-center mb-4">{title}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Blog Title"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Blog Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          />
          <input
            type="text"
            placeholder="Image Path (optional)"
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-red-300 text-white py-2 rounded-md hover:bg-red-400 transition duration-200"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
