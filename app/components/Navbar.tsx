import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="bg-red-300">
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
          <input
            type="text"
            placeholder="Search blogs..."
            className="input-text placeholder:text-gray-600"
          />
        </div>

        {/* Right Side: Navigation links */}
        <div className="flex order-3 space-x-7">
          <Link href="/" className="hover:text-gray-600">
            Home
          </Link>
          <Link href="/blogs/add" className="hover:text-gray-600">
            New Blog
          </Link>
          <Link href="/categories/add" className="hover:text-gray-600">
            New Category
          </Link>
          <Link href="/tags/add" className="hover:text-gray-600">
            New Tag
          </Link>
          <Link href="/" className="font-bold hover:text-gray-600">
            Login{" "}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
