"use client";
import React, { useState } from "react";

const DeleteCategoryPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(undefined);

  const categories = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Travel" },
    { id: 3, name: "Health" },
  ];

  const handleDeleteCategory = async (categoryId: number) => {
    // Perform deletion logic here
    console.log(`Category with ID ${categoryId} deleted`);

    // Example of a future API call:
    // await fetch(`/api/categories/${categoryId}`, {
    //   method: "DELETE",
    // });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategoryId !== undefined) {
      handleDeleteCategory(selectedCategoryId);
      setSelectedCategoryId(undefined); // Reset dropdown after deletion
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-xl font-semibold text-center mb-4">
          Delete Category
        </h1>
        <form onSubmit={handleSubmit}>
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="mt-4 w-full bg-red-400 text-white py-2 rounded-md hover:bg-red-500 transition duration-200"
          >
            Delete Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteCategoryPage;
