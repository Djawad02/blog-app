"use client";
import React from "react";
import CategoryTagForm from "@/app/components/Form";
import { AddNewCategory } from "@/app/middleware/apiMiddleware";

const AddCategoryPage = () => {
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

  const authorId = 1;

  return (
    <CategoryTagForm
      title="Add New Category"
      onSubmit={handleAddCategory}
      authorId={authorId}
    />
  );
};

export default AddCategoryPage;
