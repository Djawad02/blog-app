"use client";
import React, { useState } from "react";

const EditCategoryPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(undefined);
  const [categoryName, setCategoryName] = useState<string>("");

  const categories = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Travel" },
    { id: 3, name: "Health" },
  ];

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = Number(e.target.value);
    setSelectedCategoryId(categoryId);

    // Find the selected category and populate the form
    const category = categories.find((category) => category.id === categoryId);
    if (category) {
      setCategoryName(category.name);
    }
  };

  const handleEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategoryId) {
      // Update logic here
      console.log(`Updated category: ${selectedCategoryId}, ${categoryName}`);

      // Example API call to update category in the future
      // await fetch(`/api/categories/${selectedCategoryId}`, {
      //   method: "PUT",
      //   body: JSON.stringify({ name: categoryName }),
      // });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-xl font-semibold text-center mb-4">
          Edit Category
        </h1>
        <form onSubmit={handleEditCategory}>
          <select
            value={selectedCategoryId}
            onChange={handleSelectCategory}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>
              Select a category to edit
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category Name"
            className="w-full mt-4 p-2 border border-gray-300 rounded-md"
            required
          />

          <button
            type="submit"
            className="mt-4 w-full bg-red-400 text-white py-2 rounded-md hover:bg-red-300 transition duration-200"
          >
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryPage;
