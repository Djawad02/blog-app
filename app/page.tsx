import Image from "next/image";
import Navbar from "./components/Navbar";
import BlogListing from "./components/BlogListing";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <BlogListing />
      <Footer />
    </main>
  );
}
