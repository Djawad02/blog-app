"use client";
import { DeleteTag, getTags } from "@/app/middleware/apiMiddleware";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DeleteTagPage = () => {
  const [selectedTagId, setSelectedTagId] = useState<number | undefined>(
    undefined
  );
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const router = useRouter();
  // Fetch categories from the database
  const fetchTags = async () => {
    try {
      const data = await getTags();
      setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleDeleteTag = async (tagId: number) => {
    try {
      const deletedTag = await DeleteTag(tagId);
      console.log(deletedTag);
      setTimeout(() => {
        router.push("/tags");
      }, 2000);
    } catch (error) {
      console.error("Error adding tag:");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTagId !== undefined) {
      handleDeleteTag(selectedTagId);
      setSelectedTagId(undefined);
    }
  };

  return (
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
  );
};

export default DeleteTagPage;
