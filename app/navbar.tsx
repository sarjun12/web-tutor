import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex w-screen border-b-gray-600 border-b p-3 pl-7 font-normal">
      <Link className="text-4xl font-pixel" href="/">
        Web Tutor
      </Link>
    </div>
  );
}
