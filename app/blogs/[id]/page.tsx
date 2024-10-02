"use client";
import Author from "@/app/components/Author";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import blogImagePlaceholder from "../../../public/images/nextJs.png";
import RelatedSection from "@/app/components/RelatedSection";
import { useParams } from "next/navigation";

const IndividualBlog = () => {
  const { id } = useParams(); // Extract the blog ID from the URL

  const [blogData, setBlogData] = useState<PostType | null>(null);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const response = await fetch(`/api/blogs/${id}`);
          if (response.ok) {
            const data = await response.json();
            setBlogData(data);
          } else {
            console.error("Error fetching blog:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching blog:", error);
        }
      };

      fetchBlog();
    }
  }, [id]);

  if (!blogData) {
    return <p>Loading...</p>; // Show loading while the data is being fetched
  }

  return (
    <main>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
        <div className="flex justify-center">
          <Author />
        </div>
        <div className="blog py-10">
          <h1 className="font-bold text-2xl text-center pb-5">
            {blogData.title}
          </h1>
          <p className="text-gray-500 text-md text-center">
            {blogData.content.slice(0, 100)}...
          </p>
          <div className="py-10">
            <Image
              src={blogData.imagePath || blogImagePlaceholder}
              width={600}
              height={300}
              alt="Blog image"
            />
          </div>
          <div className="content text-gray-600 text-md flex flex-col gap-4">
            <p>{blogData.content}</p>
          </div>
        </div>
        <RelatedSection />
      </section>
    </main>
  );
};

export default IndividualBlog;
