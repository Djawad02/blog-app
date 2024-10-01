"use client";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import React, { useState } from "react";

const DeleteTagPage = () => {
  const [selectedTagId, setSelectedTagId] = useState<number | undefined>(
    undefined
  );

  const tags = [
    { id: 1, name: "JavaScript" },
    { id: 2, name: "React" },
    { id: 3, name: "Node.js" },
  ];

  const handleDeleteTag = async (tagId: number) => {
    // Perform deletion logic here
    console.log(`Tag with ID ${tagId} deleted`);

    // Example of a future API call:
    // await fetch(`/api/tags/${tagId}`, {
    //   method: "DELETE",
    // });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTagId !== undefined) {
      handleDeleteTag(selectedTagId);
      setSelectedTagId(undefined); // Reset dropdown after deletion
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-96">
          <h1 className="text-xl font-semibold text-center mb-4">Delete Tag</h1>
          <form onSubmit={handleSubmit}>
            <select
              value={selectedTagId}
              onChange={(e) => setSelectedTagId(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled>
                Select a tag
              </option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="mt-4 w-full bg-red-400 text-white py-2 rounded-md hover:bg-red-500 transition duration-200"
            >
              Delete Tag
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DeleteTagPage;
