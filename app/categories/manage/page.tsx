"use client";
import { useEffect, useState } from "react";
import {
  addCategoryToBlog,
  fetchCategoriesForBlog,
  getCategories,
  removeCategoryFromBlog,
} from "@/app/middleware/apiMiddleware";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast
const ManageCategories = () => {
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | string>(
    ""
  );
  const [associatedCategories, setAssociatedCategories] = useState<number[]>(
    []
  );

  // Fetch all categories from the database
  const fetchCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setAllCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch associated categories for the blog based on blogId
  const fetchAssociatedCategories = async () => {
    if (blogId) {
      try {
        const categoriesData = await fetchCategoriesForBlog(blogId);
        setAssociatedCategories(
          categoriesData.map((cat: { id: number }) => cat.id)
        ); // Set associated category IDs
      } catch (error) {
        console.error("Error fetching associated categories:", error);
        setAssociatedCategories([]);
      }
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchCategories(); // Fetch all categories
    fetchAssociatedCategories();
  }, [blogId]);

  const handleAddCategory = async () => {
    if (blogId && selectedCategoryId) {
      try {
        const response = await addCategoryToBlog(
          Number(blogId),
          Number(selectedCategoryId)
        );

        if (!response.success) {
          throw new Error("Failed to add category");
        }
        toast.success("Category added successfully!");
        fetchAssociatedCategories();
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  const handleRemoveCategory = async () => {
    if (blogId && selectedCategoryId) {
      try {
        const response = await removeCategoryFromBlog(Number(blogId), {
          categoryId: Number(selectedCategoryId),
        });

        if (!response.success) {
          throw new Error("Failed to remove category");
        }
        toast.success("Category removed successfully!");
        fetchAssociatedCategories();
      } catch (error) {
        console.error("Error removing category:", error);
      }
    }
  };

  // Filter to get categories that are not associated for adding
  const categoriesForAdding = allCategories.filter(
    (cat) => !associatedCategories.includes(cat.id)
  );

  // Filter to get associated categories for removing
  const categoriesForRemoving = allCategories.filter((cat) =>
    associatedCategories.includes(cat.id)
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-xl font-semibold text-center mb-4">
          Manage Categories
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-xl font-semibold text-center mb-4">
            Blog ID: {blogId}
          </h1>
          <h2 className="mt-6 font-bold">Currently Associated Categories:</h2>
          <ul>
            {associatedCategories.map((catId) => {
              const category = allCategories.find((cat) => cat.id === catId);
              return category && <li key={catId}>{category.name}</li>;
            })}
          </ul>
          {/* Dropdown for selecting category to add */}
          <select
            value={selectedCategoryId || ""}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mt-4"
            required
          >
            <option value="" disabled>
              Select a category to add
            </option>
            {categoriesForAdding.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Buttons for adding and removing categories */}
          <div className="mt-4">
            <div className="mt-4 flex justify-center">
              <button
                type="button" // Prevent default form submission
                onClick={handleAddCategory}
                className="mr-2 p-2 bg-red-400 hover:bg-red-300 text-white rounded-md items-center"
              >
                Add Category
              </button>
            </div>
          </div>

          {/* Dropdown for selecting category to remove */}
          <h2 className="mt-6">Remove Associated Category:</h2>
          <select
            value={selectedCategoryId || ""}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mt-4"
            required
          >
            <option value="" disabled>
              Select a category to remove
            </option>
            {categoriesForRemoving.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={handleRemoveCategory}
              className="mr-2 p-2 bg-red-400  hover:bg-red-300 text-white rounded-md"
            >
              Remove Category
            </button>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default ManageCategories;
