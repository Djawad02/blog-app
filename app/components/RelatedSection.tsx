import Link from "next/link";
import React from "react";
import Image from "next/image";
import Author from "./Author";
import blogImage from "../../public/images/blog.jpg";

const RelatedSection = () => {
  return (
    <section className="pt-20">
      <h1 className="font-bold text-xl py-10">More From Author...</h1>
      <div className="flex flex-col gap-10">
        {Post()}
        {Post()}
        {Post()}
        {Post()}
      </div>
    </section>
  );
};

export default RelatedSection;

function Post() {
  return (
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <Link href={"/"}>
          <Image
            src={blogImage}
            alt="Image"
            className="rounded"
            width={300}
            height={200}
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
