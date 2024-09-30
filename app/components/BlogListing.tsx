import Image from "next/image";
import Link from "next/link";
import React from "react";
import blogImage from "../../public/coffee.jpg";
import Author from "./Author";

const BlogListing = () => {
  return (
    <section className="container mx-auto md:px-20">
      <h1 className="font-bold text-3xl py-12 text-center">Latest Blogs</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
        {Post()}
        {Post()}
        {Post()}
        {Post()}
        {Post()}
        {Post()}
        {Post()}
      </div>
    </section>
  );
};

export default BlogListing;

function Post() {
  return (
    <div className="item">
      <div className="images">
        <Link href="/">
          <Image
            src={blogImage}
            width={400}
            height={350}
            alt="blog image"
            className="rounded"
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="cat">
          <Link href="/" className="text-red-500 hover:text-red-800 text-sm">
            Web, Design
          </Link>
          <Link href="/" className="text-gray-500 hover:text-gray-800 text-sm">
            - September 30,2024
          </Link>
        </div>
        <div className="title">
          <Link
            href="/"
            className="text-xl font-bold text-gray-800 hover:text-gray-500"
          >
            Blog Title
          </Link>
        </div>
        <p className="text-gray-500 py3">
          This is a random description for the blog. Just a random piece of text
        </p>
        <Author />
      </div>
    </div>
  );
}
