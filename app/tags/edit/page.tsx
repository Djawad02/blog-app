"use client";
import React, { useState } from "react";

const EditTagPage = () => {
  const [selectedTagId, setSelectedTagId] = useState<number | undefined>(
    undefined
  );
  const [tagName, setTagName] = useState<string>("");

  const tags = [
    { id: 1, name: "JavaScript" },
    { id: 2, name: "React" },
    { id: 3, name: "Node.js" },
  ];

  const handleSelectTag = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tagId = Number(e.target.value);
    setSelectedTagId(tagId);

    // Find the selected tag and populate the form
    const tag = tags.find((tag) => tag.id === tagId);
    if (tag) {
      setTagName(tag.name);
    }
  };

  const handleEditTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTagId) {
      // Update logic here
      console.log(`Updated tag: ${selectedTagId}, ${tagName}`);

      // Example API call to update tag in the future
      // await fetch(`/api/tags/${selectedTagId}`, {
      //   method: "PUT",
      //   body: JSON.stringify({ name: tagName }),
      // });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-xl font-semibold text-center mb-4">Edit Tag</h1>
        <form onSubmit={handleEditTag}>
          <select
            value={selectedTagId}
            onChange={handleSelectTag}
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
