"use client";
import blogSchema from "@/app/api/blogs/schema";
import BlogForm from "@/app/components/BlogForm";
import {
  AddNewBlog,
  fetchUserIdByUsername,
} from "@/app/middleware/apiMiddleware";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast

const AddBlogPage = () => {
  const { data: session } = useSession();
  const [authorId, setAuthorId] = useState<number | null>(null);
  const [errors, setErrors] = useState<string | null>(null);
  const authorUsername = session?.user!.email;
  const router = useRouter();
  // Fetch the user ID once the username is available
  useEffect(() => {
    const getUserId = async () => {
      if (authorUsername) {
        const id = await fetchUserIdByUsername(authorUsername);
        setAuthorId(id);
      }
    };
    getUserId();
  }, [authorUsername]);

  // Check if the user is authenticated
  if (!session) {
    return <div>Please wait. Loading...</div>;
  }

  // Check if authorId is set before rendering the form
  if (authorId === null) {
    return <div>Loading...</div>;
  }

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
    const validation = blogSchema.safeParse(blogData);
    if (!validation.success) {
      const errorMessages = validation.error.errors
        .map((err) => err.message)
        .join(", ");
      setErrors(errorMessages);
      toast.error("Error!");
      return;
    }

    console.log("Blog Data:", blogData);

    try {
      const newBlog = await AddNewBlog(blogData);
      console.log("New Blog Added:", newBlog);
      setErrors(null);
      toast.success("Blog added successfully!");
      setTimeout(() => {
        router.push("/blogs");
      }, 2000);
    } catch (error) {
      console.error("Error adding Blog:");
    }
  };

  return (
    <>
      {errors && <div className="text-red-500 mb-4">{errors}</div>}{" "}
      {/* Display errors */}
      <BlogForm
        title="Add New Blog Post"
        onSubmit={handleAddBlog}
        authorId={authorId}
      />
      <ToastContainer />
    </>
  );
};

export default AddBlogPage;
