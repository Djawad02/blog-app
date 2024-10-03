"use client";
import BlogForm from "@/app/components/BlogForm";
import { AddNewBlog } from "@/app/middleware/apiMiddleware";
import React from "react";

const AddBlogPage = () => {
  const handleAddBlog = async (
    title: string,
    authorId: number,
    createdAt: string,
    updatedAt: string,
    content: string,
    imagePath?: string
  ) => {
    const blogData = {
      title,
      content,
      imagePath, // Optional field
      createdAt,
      updatedAt,
      authorId,
    };

    console.log("Blog Data:", blogData);

    try {
      const newBlog = await AddNewBlog(blogData);
      console.log("New Blog Added:", newBlog);
    } catch (error) {
      console.error("Error adding Blog:");
    }
  };

  const authorId = 2; // Replace with actual logged-in user ID from auth state

  return (
    <>
      <BlogForm
        title="Add New Blog Post"
        onSubmit={handleAddBlog}
        authorId={authorId}
      />
    </>
  );
};

export default AddBlogPage;
