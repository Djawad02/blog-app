"use client";
import { getTags, UpdateTag } from "@/app/middleware/apiMiddleware";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditTagPage = () => {
  const [selectedTagId, setSelectedTagId] = useState<number | undefined>(
    undefined
  );
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const [tagName, setTagName] = useState<string>("");
  const router = useRouter();
  // Fetch tags from the database
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

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setSelectedTagId(id);
    const selectedTag = tags.find((tag) => tag.id === id);
    setTagName(selectedTag ? selectedTag.name : "");
  };
  const handleEditTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTagId) {
      try {
        const updatedTag = await UpdateTag(selectedTagId, {
          name: tagName,
        });
        console.log("Updated tag:", updatedTag);
        setTimeout(() => {
          router.push("/tags");
        }, 2000);
      } catch (error) {
        console.error("Error updating tag:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-xl font-semibold text-center mb-4">Edit Tag</h1>
        <form onSubmit={handleEditTag}>
          <select
            value={selectedTagId}
            onChange={handleTagChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>
              Select a tag to edit
            </option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            placeholder="Tag Name"
            className="w-full mt-4 p-2 border border-gray-300 rounded-md"
            required
          />

          <button
            type="submit"
            className="mt-4 w-full bg-red-400 text-white py-2 rounded-md hover:bg-red-300 transition duration-200"
          >
            Update Tag
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTagPage;
