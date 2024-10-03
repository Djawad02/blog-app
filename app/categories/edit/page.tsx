"use client";
import { getCategories, UpdateCategory } from "@/app/middleware/apiMiddleware";
import React, { useEffect, useState } from "react";

const EditCategoryPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(undefined);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [categoryName, setCategoryName] = useState<string>("");

  // Fetch categories from the database
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setSelectedCategoryId(id);
    const selectedCategory = categories.find((category) => category.id === id);
    setCategoryName(selectedCategory ? selectedCategory.name : "");
  };

  const handleEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategoryId) {
      try {
        const updatedCategory = await UpdateCategory(selectedCategoryId, {
          name: categoryName,
        });
        console.log("Updated category:", updatedCategory);
      } catch (error) {
        console.error("Error updating category:", error);
      }
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
            onChange={handleCategoryChange}
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
