"use client";
import React, { useState } from "react";

const CategoryTagForm = ({ title, onSubmit, authorId, blogs }: FormProps) => {
  const [name, setName] = useState("");
  const [selectedBlogId, setSelectedBlogId] = useState<number | undefined>(
    undefined
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name && selectedBlogId) {
      // Ensure a blog is selected
      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;
      console.log(name, authorId, createdAt, updatedAt, selectedBlogId);

      onSubmit(name, authorId, createdAt, updatedAt, selectedBlogId);
      setSelectedBlogId(undefined); // Reset the dropdown
      setName("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-xl font-semibold text-center mb-4">{title}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={selectedBlogId}
            onChange={(e) => setSelectedBlogId(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md mt-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="" disabled>
              Select a blog
            </option>
            {blogs && blogs.length > 0 ? ( // Check if blogs is defined and has items
              blogs.map((blog) => (
                <option key={blog.id} value={blog.id}>
                  {blog.title}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No blogs available
              </option>
            )}
          </select>
          <button
            type="submit"
            className="mt-4 w-full bg-red-300 text-white py-2 rounded-md hover:bg-red-400 transition duration-200"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryTagForm;
