import { getServerSession } from "next-auth";
import BlogListing from "./components/BlogListing";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <h2>
        Welcome{" "}
        {session && <span className="text-red-600">{session.user!.name}</span>}
      </h2>
      <BlogListing />
    </main>
  );
}
