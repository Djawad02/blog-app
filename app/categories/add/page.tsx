"use client";
import CategoryTagForm from "@/app/components/Form";
import React from "react";

const AddCategoryPage = () => {
  const handleAddCategory = async (
    name: string,
    authorId: number,
    createdAt: string,
    updatedAt: string,
    blogId: number | undefined // Include blogId
  ) => {
    const tagData = {
      name,
      createdAt,
      updatedAt,
      authorId,
      blogId, // Include blogId in tagData
    };

    // Perform your API call or any other action with tagData here
    console.log("Category Data:", tagData);
  };

  const authorId = 1; // Replace this with the logged-in user's ID from your auth context or state
  const blogs = [
    { id: 1, title: "My First Blog Post" },
    { id: 2, title: "A Day in the Life" },
    { id: 3, title: "Travel Adventures" },
  ];

  return (
    <CategoryTagForm
      title="Add New Category"
      onSubmit={handleAddCategory}
      authorId={authorId}
      blogs={blogs} // Ensure blogs are passed
    />
  );
};

export default AddCategoryPage;
