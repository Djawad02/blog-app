import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BlogListing from "./components/BlogListing";

export default function Home() {
  return (
    <main>
      <Navbar />
      <main>
        <BlogListing />
      </main>

      <Footer />
    </main>
  );
}
