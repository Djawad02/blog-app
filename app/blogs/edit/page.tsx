"use client";
import blogSchema from "@/app/api/blogs/schema";
import {
  fetchUserIdByUsername,
  getBlogs,
  UpdateBlog,
} from "@/app/middleware/apiMiddleware";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast
const EditBlogPage = () => {
  const router = useRouter();
  const [selectedBlogId, setSelectedBlogId] = useState<number | undefined>(
    undefined
  );
  const [blogs, setBlogs] = useState<
    {
      id: number;
      authorId: number;
      title: string;
      content?: string;
      imagePath?: string;
    }[]
  >([]);
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [blogContent, setBlogContent] = useState<string>("");
  const [blogImagePath, setBlogImagePath] = useState<string>("");
  const { data: session } = useSession();
  const authorUsername = session?.user!.email;
  const [authorId, setAuthorId] = useState<number | null>(null);
  const [errors, setErrors] = useState<string | null>(null);
  // Fetch blogs from the database
  const fetchBlogs = async () => {
    try {
      const data = await getBlogs();
      if (data && Array.isArray(data.blogs)) {
        setBlogs(data.blogs);
      } else {
        console.error("Error: Expected an array of blogs but received", data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  useEffect(() => {
    const fetchAuthorId = async () => {
      if (authorUsername) {
        const id = await fetchUserIdByUsername(authorUsername);
        if (id !== null) {
          setAuthorId(id);
        } else {
          console.error("Author ID not found for username:", authorUsername);
        }
      }
    };

    fetchAuthorId();
  }, [authorUsername]);
  const handleBlogChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setSelectedBlogId(id);

    const selectedBlog = blogs.find((blog) => blog.id === id);
    if (selectedBlog) {
      setBlogTitle(selectedBlog.title || "");
      setBlogContent(selectedBlog.content || "");
      setBlogImagePath(selectedBlog.imagePath || "");
    }
  };
  if (!session) {
    return <div>Please wait. Loading...</div>;
  }

  // Check if authorId is set before rendering the form
  if (authorId === null) {
    return <div>Loading...</div>;
  }
  console.log(authorId);

  const handleEditBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null); // Reset errors
    const blogData = {
      title: blogTitle,
      content: blogContent,
      authorId: authorId ?? 1,
      imagePath: blogImagePath,
    };

    // Validate blogData using blogSchema
    const validation = blogSchema.safeParse(blogData);
    if (!validation.success) {
      const errorMessages = validation.error.errors
        .map((err) => err.message)
        .join(", ");
      setErrors(errorMessages);
      toast.error("Error!");
      return;
    }
    if (selectedBlogId) {
      try {
        const updatedBlog = await UpdateBlog(selectedBlogId, {
          authorId: authorId,
          title: blogTitle,
          content: blogContent,
          imagePath: blogImagePath,
        });
        console.log("Updated blog:", updatedBlog);
        setErrors(null);
        toast.success("Blog updated successfully!");
        setTimeout(() => {
          router.push("/blogs");
        }, 2000);
      } catch (error) {
        console.error("Error updating blog:", error);
      }
    }
  };

  const openManageCategories = () => {
    if (selectedBlogId) {
      window.open(`/categories/manage?id=${selectedBlogId}`, "_blank");
    }
  };

  const openManageTags = () => {
    if (selectedBlogId) {
      window.open(`/tags/manage?id=${selectedBlogId}`, "_blank");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-xl font-semibold text-center mb-4">Edit Blog</h1>
        <form onSubmit={handleEditBlog}>
          <select
            value={selectedBlogId || ""}
            onChange={handleBlogChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>
              Select a blog to edit
            </option>
            {blogs.map((blog) => (
              <option key={blog.id} value={blog.id}>
                {blog.title}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            placeholder="Blog Title"
            className="w-full mt-4 p-2 border border-gray-300 rounded-md"
            required
          />

          <textarea
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
            placeholder="Blog Content"
            className="w-full mt-4 p-2 border border-gray-300 rounded-md"
            required
          ></textarea>

          <input
            type="text"
            value={blogImagePath}
            onChange={(e) => setBlogImagePath(e.target.value)}
            placeholder="Image Path"
            className="w-full mt-4 p-2 border border-gray-300 rounded-md"
          />
          {errors && <p className="text-red-500 mt-2">{errors}</p>}
          <button
            type="submit"
            className="mt-4 w-full bg-red-400 text-white py-2 rounded-md hover:bg-red-300 transition duration-200"
          >
            Update Blog
          </button>
          <button
            type="button"
            onClick={openManageCategories}
            className="mt-4 w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-300 transition duration-200"
          >
            Manage Categories
          </button>
          <button
            type="button"
            onClick={openManageTags}
            className="mt-4 w-full bg-green-400 text-white py-2 rounded-md hover:bg-green-300 transition duration-200"
          >
            Manage Tags
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditBlogPage;
