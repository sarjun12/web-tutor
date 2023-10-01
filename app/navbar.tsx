import Link from "next/link";

export default function Navbar() {
  return(
  <div className="w-screen border-b-gray-600 border-b p-3 pl-7 font-normal">
      <Link className="text-2xl font-semibold" href="/">Web Tutor</Link>
    </div>
  )
}
