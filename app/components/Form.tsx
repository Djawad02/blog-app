"use client";
import React, { useState } from "react";

interface FormProps {
  title: string;
  onSubmit: (
    name: string,
    authorId: number,
    createdAt: string,
    updatedAt: string
  ) => void;
  authorId: number;
}

const CategoryTagForm = ({ title, onSubmit, authorId }: FormProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name) {
      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;

      onSubmit(name, authorId, createdAt, updatedAt);
      setName("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-xl font-semibold text-center mb-4">{title}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-red-300 text-white py-2 rounded-md hover:bg-red-400 transition duration-200"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryTagForm;
