"use client";

import React from "react";
import { useRouter } from "next/navigation";

const CrudForm = ({ heading }: { heading: string }) => {
  const router = useRouter();

  // Function to handle navigation
  const handleNavigation = (action: "add" | "edit" | "delete") => {
    // Get the current path (e.g., /blogs or /tags)
    const currentPath = window.location.pathname;
    // Navigate to the appropriate action page (add, edit, delete)
    router.push(`${currentPath}/${action}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-1/2 max-w-md text-center">
        <h1 className="text-3xl font-bold mb-8 text-gray-700">{heading}</h1>

        <ul className="space-y-4">
          <li>
            <button
              onClick={() => handleNavigation("add")}
              className="w-full px-6 py-3 bg-teal-300 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Add
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("edit")}
              className="w-full px-6 py-3 bg-green-300 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
            >
              Edit
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("delete")}
              className="w-full px-6 py-3 bg-red-300 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
            >
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CrudForm;
