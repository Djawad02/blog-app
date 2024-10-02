"use client";
import React, { useState } from "react";

const EditBlogPage = () => {
  const [selectedBlogId, setSelectedBlogId] = useState<number | undefined>(
    undefined
  );
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [blogContent, setBlogContent] = useState<string>("");
  const [blogImagePath, setBlogImagePath] = useState<string>("");

  const blogs = [
    {
      id: 1,
      title: "My First Blog Post",
      content: "Content 1",
      image_path: "path1.jpg",
    },
    {
      id: 2,
      title: "A Day in the Life",
      content: "Content 2",
      image_path: "path2.jpg",
    },
    {
      id: 3,
      title: "Travel Adventures",
      content: "Content 3",
      image_path: "path3.jpg",
    },
  ];

  const handleSelectBlog = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const blogId = Number(e.target.value);
    setSelectedBlogId(blogId);

    // Find the selected blog and populate the form
    const blog = blogs.find((blog) => blog.id === blogId);
    if (blog) {
      setBlogTitle(blog.title);
      setBlogContent(blog.content);
      setBlogImagePath(blog.image_path);
    }
  };

  const handleEditBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBlogId) {
      // Update logic here
      console.log(
        `Updated blog: ${selectedBlogId}, ${blogTitle}, ${blogContent}, ${blogImagePath}`
      );

      // Example API call to update blog in the future
      // await fetch(`/api/blogs/${selectedBlogId}`, {
      //   method: "PUT",
      //   body: JSON.stringify({ title: blogTitle, content: blogContent, image_path: blogImagePath }),
      // });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-xl font-semibold text-center mb-4">Edit Blog</h1>
        <form onSubmit={handleEditBlog}>
          <select
            value={selectedBlogId}
            onChange={handleSelectBlog}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>
              Select a blog to edit
            </option>
            {blogs.map((blog) => (
              <option key={blog.id} value={blog.id}>
                {blog.title}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            placeholder="Blog Title"
            className="w-full mt-4 p-2 border border-gray-300 rounded-md"
            required
          />

          <textarea
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
            placeholder="Blog Content"
            className="w-full mt-4 p-2 border border-gray-300 rounded-md"
            required
          ></textarea>

          <input
            type="text"
            value={blogImagePath}
            onChange={(e) => setBlogImagePath(e.target.value)}
            placeholder="Image Path"
            className="w-full mt-4 p-2 border border-gray-300 rounded-md"
          />

          <button
            type="submit"
            className="mt-4 w-full bg-red-400 text-white py-2 rounded-md hover:bg-red-300 transition duration-200"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlogPage;
