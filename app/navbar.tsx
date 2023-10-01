import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex w-full border-b-gray-600 text-gray-100 border-b-2 border-dashed py-3 font-normal">
      <Link className="text-4xl font-pixel" href="/">
        Web Tutor
      </Link>
    </div>
  );
}
