import Image from "next/image";
import author from "../../public/images/author.jpg";
import Link from "next/link";
export default function Author() {
  return (
    <div className="author flex py-5">
      <Image
        src={author}
        alt="author"
        className="rounded-full"
        width={50}
        height={50}
      />
      <div className="flex flex-col justify-center px-4">
        <Link
          href="/"
          className="text-md font-bold text-gray-800 hover:text-gray-500"
        >
          Dania Jawad
        </Link>
        <span className="text-sm text-gray-500">MERN Stack Developer</span>
      </div>
    </div>
  );
}
