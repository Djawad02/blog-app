"use client";
import { useEffect, useState } from "react";
import {
  addtagToBlog,
  fetchTagsForBlog,
  getTags,
  removeTagFromBlog,
} from "@/app/middleware/apiMiddleware";
import { useSearchParams } from "next/navigation";

const ManageTags = () => {
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");
  console.log(blogId);

  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<number | string>("");
  const [associatedtags, setAssociatedTags] = useState<number[]>([]);

  // Fetch all tags from the database
  const fetchTags = async () => {
    try {
      const tagsData = await getTags();
      setAllTags(tagsData);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  // Fetch associated tags for the blog based on blogId
  const fetchAssociatedTags = async () => {
    if (blogId) {
      try {
        const tagsData = await fetchTagsForBlog(blogId);
        setAssociatedTags(tagsData.map((ta: { id: number }) => ta.id)); // Set associated tag IDs
      } catch (error) {
        console.error("Error fetching associated tags:", error);
        setAssociatedTags([]);
      }
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchTags(); // Fetch all tags
    fetchAssociatedTags();
  }, [blogId]);

  const handleAddTag = async () => {
    if (blogId && selectedTagId) {
      try {
        const response = await addtagToBlog(
          Number(blogId),
          Number(selectedTagId)
        );

        if (!response.success) {
          throw new Error("Failed to add tag");
        }

        fetchAssociatedTags();
      } catch (error) {
        console.error("Error adding tag:", error);
      }
    }
  };

  const handleRemoveTag = async () => {
    if (blogId && selectedTagId) {
      try {
        const response = await removeTagFromBlog(Number(blogId), {
          tagId: Number(selectedTagId),
        });

        if (!response.success) {
          throw new Error("Failed to remove tag");
        }

        fetchAssociatedTags();
      } catch (error) {
        console.error("Error removing tag:", error);
      }
    }
  };

  // Filter to get tags that are not associated for adding
  const tagsForAdding = allTags.filter((t) => !associatedtags.includes(t.id));

  // Filter to get associated categories for removing
  const tagsForRemoving = allTags.filter((t) => associatedtags.includes(t.id));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-xl font-semibold text-center mb-4">Manage Tags</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-xl font-semibold text-center mb-4">
            Blog ID: {blogId}
          </h1>
          <h2 className="mt-6 font-bold">Currently Associated Categories:</h2>
          <ul>
            {associatedtags.map((tId) => {
              const tag = allTags.find((tt) => tt.id === tId);
              return tag && <li key={tId}>{tag.name}</li>;
            })}
          </ul>
          {/* Dropdown for selecting tag to add */}
          <select
            value={selectedTagId || ""}
            onChange={(e) => setSelectedTagId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mt-4"
            required
          >
            <option value="" disabled>
              Select a tag to add
            </option>
            {tagsForAdding.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>

          {/* Buttons for adding and removing tags */}
          <div className="mt-4">
            <div className="mt-4 flex justify-center">
              <button
                type="button" // Prevent default form submission
                onClick={handleAddTag}
                className="mr-2 p-2 bg-red-400 hover:bg-red-300 text-white rounded-md items-center"
              >
                Add Tag
              </button>
            </div>
          </div>

          {/* Dropdown for selecting tag to remove */}
          <h2 className="mt-6">Remove Associated Tag:</h2>
          <select
            value={selectedTagId || ""}
            onChange={(e) => setSelectedTagId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mt-4"
            required
          >
            <option value="" disabled>
              Select a tag to remove
            </option>
            {tagsForRemoving.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={handleRemoveTag}
              className="mr-2 p-2 bg-red-400  hover:bg-red-300 text-white rounded-md"
            >
              Remove Tag
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageTags;
