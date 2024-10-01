"use client";
import Footer from "@/app/components/Footer";
import CategoryTagForm from "@/app/components/Form"; // You may want to rename this component if you're using it for tags as well.
import Navbar from "@/app/components/Navbar";
import React from "react";

const AddTagPage = () => {
  const handleAddTag = async (
    name: string,
    authorId: number,
    createdAt: string,
    updatedAt: string,
    blogId: number | undefined // Add blogId to the handler
  ) => {
    const tagData = {
      name,
      createdAt,
      updatedAt,
      authorId,
      blogId, // Include blogId in tagData
    };

    // Perform your API call or any other action with tagData here
    console.log("Tag Data:", tagData);
  };

  const authorId = 1; // Replace this with the logged-in user's ID from your auth context or state

  // Example blogs array
  const blogs = [
    { id: 1, title: "My First Blog Post" },
    { id: 2, title: "A Day in the Life" },
    { id: 3, title: "Travel Adventures" },
  ];

  return (
    <>
      <Navbar />
      <CategoryTagForm
        title="Add New Tag"
        onSubmit={handleAddTag}
        authorId={authorId}
        blogs={blogs} // Pass the blogs array to the form
      />
      <Footer />
    </>
  );
};

export default AddTagPage;
