"use client";
import { DeleteCategory, getCategories } from "@/app/middleware/apiMiddleware";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DeleteCategoryPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(undefined);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const router = useRouter();
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

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      const deletedCategory = await DeleteCategory(categoryId);
      console.log(deletedCategory);
      setTimeout(() => {
        router.push("/categories");
      }, 2000);
    } catch (error) {
      console.error("Error adding category:");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategoryId !== undefined) {
      handleDeleteCategory(selectedCategoryId);
      setSelectedCategoryId(undefined);
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
