"use client";
import React, { useEffect, useState } from "react";
import CategoryTagForm from "@/app/components/Form";
import {
  AddNewCategory,
  fetchUserIdByUsername,
} from "@/app/middleware/apiMiddleware";
import { useSession } from "next-auth/react";

const AddCategoryPage = () => {
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

  const handleAddCategory = async (
    name: string,
    authorId: number,
    createdAt: string,
    updatedAt: string
  ) => {
    const tagData = {
      name,
      createdAt,
      updatedAt,
      authorId,
    };

    try {
      const newCategory = await AddNewCategory(tagData);
      console.log("New Category Added:", newCategory);
    } catch (error) {
      console.error("Error adding category:");
    }
  };

  return (
    <CategoryTagForm
      title="Add New Category"
      onSubmit={handleAddCategory}
      authorId={authorId}
    />
  );
};

export default AddCategoryPage;
