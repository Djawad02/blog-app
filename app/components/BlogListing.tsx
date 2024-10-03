"use client";
import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { Post } from "./Posts";
import {
  fetchBlogsWithLimit,
  getCategories,
  getTags,
} from "../middleware/apiMiddleware";

const BlogListing = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const POSTS_PER_PAGE = 9;

  const Spinner = () => (
    <div className="flex justify-center items-center ">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );

  // Fetch blogs based on selected filters (category and tag)
  const fetchData = async (category?: string, tag?: string) => {
    setLoading(true);
    try {
      const data = await fetchBlogsWithLimit(
        currentPage,
        POSTS_PER_PAGE,
        category,
        tag
      );
      setPosts(data.blogs);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories and tags on component mount
  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const categoriesData = await getCategories();
        const tagsData = await getTags();
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (error) {
        console.error("Error fetching categories or tags:", error);
      }
    };

    fetchCategoriesAndTags();
  }, []);

  // Fetch blogs when the current page, category, or tag changes
  useEffect(() => {
    fetchData(selectedCategory, selectedTag);
  }, [currentPage, selectedCategory, selectedTag]);

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value || undefined);
    setCurrentPage(1); // Reset to first page when category is changed
  };

  // Handle tag change
  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(e.target.value || undefined);
    setCurrentPage(1); // Reset to first page when tag is changed
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="container mx-auto md:px-20">
      <h1 className="font-bold text-3xl py-12 text-center">Latest Blogs</h1>

      {/* Dropdown for Category */}
      <div className="flex justify-center space-x-4 mb-6 ">
        <select
          value={selectedCategory || ""}
          onChange={handleCategoryChange}
          className="p-2 border border-gray-300 rounded-md bg-red-400 hover:bg-red-300"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Dropdown for Tag */}
        <select
          value={selectedTag || ""}
          onChange={handleTagChange}
          className="p-2 border border-gray-300 rounded-md  bg-red-400 hover:bg-red-300"
        >
          <option value="">Select Tag</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
        {loading ? (
          <Spinner />
        ) : (
          posts.map((post) => <Post key={post.id} post={post} />)
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default BlogListing;
