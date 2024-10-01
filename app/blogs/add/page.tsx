"use client";
import Footer from "@/app/components/Footer";
import BlogForm from "@/app/components/BlogForm";
import Navbar from "@/app/components/Navbar";
import React from "react";

const AddBlogPage = () => {
  const handleAddBlog = async (
    name: string,
    authorId: number,
    createdAt: string,
    updatedAt: string,
    content: string,
    image_path?: string
  ) => {
    const blogData = {
      title: name,
      content,
      image_path, // Optional field
      createdAt,
      updatedAt,
      authorId,
    };

    // API call or handling for the blog data
    console.log("Blog Data:", blogData);

    // Example API call
    // await fetch("/api/blogs", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(blogData),
    // });
  };

  const authorId = 1; // Replace with actual logged-in user ID from auth state

  return (
    <>
      <Navbar />
      <BlogForm
        title="Add New Blog Post"
        onSubmit={handleAddBlog}
        authorId={authorId}
      />
      <Footer />
    </>
  );
};

export default AddBlogPage;
