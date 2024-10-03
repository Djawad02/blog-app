"use client";
import Author from "@/app/components/Author";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import blogImagePlaceholder from "../../../public/images/nextJs.png";
import RelatedSection from "@/app/components/RelatedSection";
import { useParams } from "next/navigation";
import { getBlogById } from "@/app/middleware/apiMiddleware";

const IndividualBlog = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [blogData, setBlogData] = useState<PostType | null>(null);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const data = await getBlogById(id);
          setBlogData(data);
        } catch (error) {
          console.error("Error fetching blog:", error);
        }
      };

      fetchBlog();
    }
  }, [id]);

  if (!blogData) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
        <div className="flex justify-center">
          <Author authorId={blogData.authorId} />
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
        <RelatedSection
          authorId={blogData.authorId}
          currentPostId={blogData.id}
        />
      </section>
    </main>
  );
};

export default IndividualBlog;
