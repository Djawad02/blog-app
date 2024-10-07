"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import { Post } from "../../components/Posts";
import { searchBlogsByTitle } from "../../middleware/apiMiddleware";

const BlogSearchResults = () => {
  const searchParams = useSearchParams(); // Use useSearchParams hook
  const title = searchParams.get("title"); // Get title from search params
  const [blogs, setBlogs] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs by title when component mounts or title changes
  useEffect(() => {
    const searchBlogs = async () => {
      if (title) {
        setLoading(true);
        try {
          const data = await searchBlogsByTitle(title);
          setBlogs(data.blogs);
          console.log("Received title:", title);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    searchBlogs();
  }, [title]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto  md:px-20">
      <h1 className="text-2xl font-bold mb-6 py-12 text-center">
        Search Results for{" "}
        <span className="text-red-800">&quot;{title}&quot;</span>
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14 justify-center">
        {blogs.length > 0 ? (
          blogs.map((blog) => <Post key={blog.id} post={blog} />)
        ) : (
          <p>No blogs found for &quot;{title}&quot;.</p>
        )}
      </div>
    </div>
  );
};

export default BlogSearchResults;
