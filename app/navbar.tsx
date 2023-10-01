import Link from "next/link";
import { useState } from "react";

export default function Navbar(props: {chapterList: Array<{id: number, name: string}>}) {
  const [searchResult, setSearchResult] = useState()
  return (
    <div className="flex w-full border-b-gray-600 text-gray-300 border-b-2 border-dashed py-3 font-normal justify-between">
      <Link className="text-4xl font-pixel" href="/">
        Web Tutor
      </Link>
      <div className="flex flex-col">
        <input className="bg-transparent w-fit placeholder-gray-600 border-b-2 border-b-gray-600 font-pixel outline-none text-gray-400 text-xl p-1 hover:border-b-gray-400 focus:border-b-gray-400" placeholder="Search"></input>
        <div >{searchResult}</div>
      </div>

    </div>
  );
}
