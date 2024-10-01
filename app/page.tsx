import Image from "next/image";
import Navbar from "./components/Navbar";
import BlogListing from "./components/BlogListing";

export default function Home() {
  return (
    <main>
      <Navbar />
      <BlogListing />
    </main>
  );
}
