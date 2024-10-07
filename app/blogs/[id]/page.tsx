"use client";
import Author from "@/app/components/Author";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import blogImagePlaceholder from "../../../public/images/nextJs.jpg";
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

  const formattedDate = blogData.createdAt
    ? new Date(blogData.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date available"; // Fallback for missing date
  const formattedUpdateDate = blogData.updatedAt
    ? new Date(blogData.updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date available"; // Fallback for missing date
  return (
    <main>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
        <div className="flex justify-center">
          <Author authorId={blogData.authorId} />
        </div>
        <div className="flex items-center justify-center">
          <div className="text-gray-500 text-sm flex items-center">
            <span className="text-red-500 hover:text-red-800 mr-2">
              4 min read
            </span>
            <span>- {formattedDate}</span>
          </div>
        </div>
        <div className="flex items-center justify-center text-sm font-bold">
          <br /> Last modified:
          <span className="text-red-800 mr-4 px-1 font-normal">
            <br /> {formattedUpdateDate}
          </span>
        </div>

        <div className="blog py-10">
          <h1 className="font-bold text-2xl text-center pb-5">
            {blogData.title}
          </h1>
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
