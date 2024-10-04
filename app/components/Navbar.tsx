"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Use router to redirect on search

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search input
  const router = useRouter(); // Router for navigation

  // Function to handle search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to the search results page
      router.push(`/blogs/search?title=${searchQuery}`);
    }
  };

  return (
    <div className="bg-red-300">
      <div className="xl:container xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between text-center py-3">
        {/* Left Side: Logo */}
        <div className="flex order-1">
          <Link
            href="/"
            className="font-bold uppercase text-2xl hover:text-gray-600"
          >
            The Blogs
          </Link>
        </div>

        {/* Center: Search bar */}
        <div className="flex md:flex-none w-full sm:w-auto justify-center order-2 py-4 sm:py-0">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search blogs by title..."
              className="input-text placeholder:text-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
            />
            <button
              type="submit"
              className="ml-2 p-2 text-white rounded-xl  bg-red-400 hover:bg-red-700"
            >
              Search
            </button>
          </form>
        </div>

        {/* Right Side: Navigation links */}
        <div className="flex order-3 space-x-7">
          <Link href="/" className="hover:text-gray-600">
            Home
          </Link>
          <Link href="/blogs" className="hover:text-gray-600">
            Blogs
          </Link>
          <Link href="/categories" className="hover:text-gray-600">
            Categories
          </Link>
          <Link href="/tags" className="hover:text-gray-600">
            Tags
          </Link>
          <Link href="/" className="font-bold hover:text-gray-600">
            Login{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
