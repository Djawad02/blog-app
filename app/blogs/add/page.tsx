"use client";
import BlogForm from "@/app/components/BlogForm";
import {
  AddNewBlog,
  fetchUserIdByUsername,
} from "@/app/middleware/apiMiddleware";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const AddBlogPage = () => {
  const { data: session } = useSession();
  const [authorId, setAuthorId] = useState<number | null>(null);

  const authorUsername = session?.user!.email;

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
  console.log(authorId);

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
