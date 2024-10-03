"use client";
import CategoryTagForm from "@/app/components/Form";
import { AddNewTag } from "@/app/middleware/apiMiddleware";

import React from "react";

const AddTagPage = () => {
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
    } catch (error) {
      console.error("Error adding category:");
    }
  };

  const authorId = 1; // Replace this with the logged-in user's ID from your auth context or state

  return (
    <CategoryTagForm
      title="Add New Tag"
      onSubmit={handleAddTag}
      authorId={authorId}
    />
  );
};

export default AddTagPage;
