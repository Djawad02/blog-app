"use client";
import { useEffect, useState } from "react";
import {
  addtagToBlog,
  fetchTagsForBlog,
  getTags,
  AddNewTag,
  removeTagFromBlog,
  fetchUserIdByUsername,
} from "@/app/middleware/apiMiddleware";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast
import { useSession } from "next-auth/react";

const ManageTags = () => {
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");

  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTagId, setSelectedTagId] = useState<number | string>("");
  const [associatedtags, setAssociatedTags] = useState<number[]>([]);
  const { data: session } = useSession();
  const [authorId, setAuthorId] = useState<number | null>(null);
  const authorUsername = session?.user?.email; // Ensure to handle the case where user might be null
  const [newTagName, setNewTagName] = useState("");

  // Fetch the user ID once the username is available
  useEffect(() => {
    const getUserId = async () => {
      if (authorUsername) {
        const id = await fetchUserIdByUsername(authorUsername);
        setAuthorId(id);
      }
    };
    getUserId();
  }, [authorUsername]);

  // Check if user is authenticated
  useEffect(() => {
    if (!session) {
      // Redirect or show loading state here
      return;
    }
  }, [session]);

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
        toast.success("Tag added successfully!");
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
        toast.success("Tag removed successfully!");
        fetchAssociatedTags();
      } catch (error) {
        console.error("Error removing tag:", error);
      }
    }
  };

  const handleCreateTag = async () => {
    if (authorId === null) {
      toast.error("Author ID is not available.");
      return; // Exit the function if authorId is null
    }
    try {
      const categoryData = {
        name: newTagName,
        authorId: authorId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await AddNewTag(categoryData);

      toast.success("New category created successfully!");
      setNewTagName(""); // Clear the input field after submission
      fetchTags(); // Fetch updated categories list
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
    }
  };

  // Filter to get tags that are not associated for adding
  const tagsForAdding = allTags.filter((t) => !associatedtags.includes(t.id));

  // Filter to get associated categories for removing
  const tagsForRemoving = allTags.filter((t) => associatedtags.includes(t.id));

  // Render loading states while data is being fetched
  if (
    authorId === null ||
    allTags.length === 0 ||
    associatedtags.length === 0
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-xl font-semibold text-center mb-4">Manage Tags</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-xl font-semibold text-center mb-4">
            Blog ID: {blogId}
          </h1>
          <h2 className="mt-6 font-bold">Currently Associated Tags:</h2>
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
          <div className="mt-4 flex justify-center">
            <button
              type="button" // Prevent default form submission
              onClick={handleAddTag}
              className="mr-2 p-2 bg-red-400 hover:bg-red-300 text-white rounded-md items-center"
            >
              Add Tag
            </button>
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

          {/* New Tag Form */}
          <h2 className="mt-6 font-bold">Create New Tag:</h2>
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            placeholder="Tag Name"
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
            required
          />
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={handleCreateTag}
              className="mr-2 p-2 bg-red-500 hover:bg-red-400 text-white rounded-md"
            >
              Create Tag
            </button>
          </div>

          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default ManageTags;
