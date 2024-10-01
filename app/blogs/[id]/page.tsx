import Author from "@/app/components/Author";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import React from "react";
import blogImage from "../../../public/nextJs.png";
import Footer from "@/app/components/Footer";
import RelatedSection from "@/app/components/RelatedSection";

const IndividualBlog = () => {
  return (
    <main>
      <Navbar />
      <section className="container mx-auto md:px-2 py-16 w-1/2">
        <div className="flex justify-center">
          <Author />
        </div>
        <div className="blog py-10">
          <h1 className="font-bold text-2xl text-center pb-5">
            NextJS in Town!
          </h1>
          <p className="text-gray-500 text-md text-center">
            These words may be used interchangeably, but they are not the same
            thing. The difference is simple: A category is a broad topic you
            cover in your blog. It acts as the umbrella to a bunch of smaller
            topics. Blog tags are one small idea in an overarching topic.
          </p>
          <div className="py-10">
            <Image src={blogImage} width={900} height={600} alt="Blog image" />
          </div>
          <div className="content text-gray-600 text-md flex flex-col gap-4">
            <p>
              These words may be used interchangeably, but they are not the same
              thing. The difference is simple: A category is a broad topic you
              cover in your blog. It acts as the umbrella to a bunch of smaller
              topics. Blog tags are one small idea in an overarching topic.
            </p>
            <p>
              These words may be used interchangeably, but they are not the same
              thing. The difference is simple: A category is a broad topic you
              cover in your blog. It acts as the umbrella to a bunch of smaller
              topics. Blog tags are one small idea in an overarching topic.
            </p>
            <p>
              These words may be used interchangeably, but they are not the same
              thing. The difference is simple: A category is a broad topic you
              cover in your blog. It acts as the umbrella to a bunch of smaller
              topics. Blog tags are one small idea in an overarching topic.
            </p>
            <p>
              These words may be used interchangeably, but they are not the same
              thing. The difference is simple: A category is a broad topic you
              cover in your blog. It acts as the umbrella to a bunch of smaller
              topics. Blog tags are one small idea in an overarching topic.
            </p>
            <p>
              These words may be used interchangeably, but they are not the same
              thing. The difference is simple: A category is a broad topic you
              cover in your blog. It acts as the umbrella to a bunch of smaller
              topics. Blog tags are one small idea in an overarching topic.
            </p>
          </div>
        </div>
        <RelatedSection />
      </section>
      <Footer />
    </main>
  );
};

export default IndividualBlog;
