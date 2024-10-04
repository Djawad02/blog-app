"use client";
import CategoryTagForm from "@/app/components/Form";
import {
  AddNewTag,
  fetchUserIdByUsername,
} from "@/app/middleware/apiMiddleware";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const AddTagPage = () => {
  const { data: session } = useSession();
  const [authorId, setAuthorId] = useState<number | null>(null);
  const router = useRouter();
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
  const handleAddTag = async (
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
      const newTag = await AddNewTag(tagData);
      console.log("New Tag Added:", newTag);
      setTimeout(() => {
        router.push("/tags");
      }, 2000);
    } catch (error) {
      console.error("Error adding category:");
    }
  };
  return (
    <CategoryTagForm
      title="Add New Tag"
      onSubmit={handleAddTag}
      authorId={authorId}
    />
  );
};

export default AddTagPage;
