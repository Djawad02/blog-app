import Link from "next/link";
import React from "react";
const Navbar = () => {
  return (
    <header className="bg-red-300">
      <div className="xl:container xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between text-center py-3">
        <div className="shrink w-80 sm:order-3">
          <Link href="/">Create New Blog</Link>
        </div>
        <div className="md:flex-none w-96 order-3 sm:order-2 flex justify-center py-4 sm:py-0">
          <input
            type="text"
            placeholder="Search blogs..."
            className="input-text"
          />
        </div>
        <div className="w-96 order-2 flex justify-center">
          <Link href="/">Home</Link>
        </div>
        <div className="flex order-1">
          <Link href="/" className="font-bold uppercase text-2xl">
            The Blogs{" "}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
