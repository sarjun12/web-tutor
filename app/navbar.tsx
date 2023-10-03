import Link from "next/link";
import React, { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar(props: {
  chapterList: Array<string>;
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [searchResult, setSearchResult] = useState<Array<string>>();
  const [input, setInput] = useState("");
  if (typeof window !== "undefined")
    window.addEventListener("keydown", (e) => {
      if (e.key === "/") {
        document.getElementById("input")?.focus();
        e.preventDefault();
      }
    });
  useEffect(() => {
    if (input !== "") {
      const data = props.chapterList.filter((chapter) =>
        chapter.toLowerCase().includes(input.toLowerCase()),
      );
      setSearchResult(data);
    } else {
      setSearchResult([]);
    }
  }, [input, props.chapterList]);
  function getFilteredData(input: string) {
    if (input !== "")
      return props.chapterList.filter((chapter) =>
        chapter.toLowerCase().includes(input.toLowerCase()),
      );
    return [];
  }
  function changeSideBar() {
    props.setShowSidebar((prev) => {
      const current = !prev;
      if (localStorage !== undefined) {
        if (current) localStorage.setItem("showSidebar", "show");
        else localStorage.setItem("showSidebar", "hide");
      }
      return !prev;
    });
  }
  return (
    <div className="flex w-full border-b-gray-600 text-gray-300 border-b-2 border-dashed py-3 font-normal justify-between">
      <div className="flex gap-3">
        <button
          className="font-pixel font-bold text-3xl border-2 border-gray-400 border-dashed text-gray-400 px-2 rounded-sm"
          onClick={() => changeSideBar()}
        >
          =
        </button>
        <Link className="text-4xl font-pixel hidden md:block" href="/">
          Web Tutor
        </Link>
        <Link className="md:hidden" href="/">
          <Image src="/android-chrome-512x512.png" width={40} height={40} alt="logo"></Image>
        </Link>
      </div>
      <div className="flex flex-col">
        <div
          className="border-b-2 border-b-gray-400 "
          //onBlur={() => setSearchResult([])}
        >
          <input
            id="input"
            className="bg-transparent w-fit placeholder-gray-400 font-pixel outline-none text-gray-200 text-xl p-1 hover:border-b-gray-200 focus:border-b-gray-200 sm:w-32"
            placeholder="Search"
            onChange={(e) => setInput(e.currentTarget.value)}
            onFocus={() => setSearchResult(getFilteredData(input))}
            onKeyDown={(e) => {
              console.log(e.key)
              if (e.key === "Enter") {
                let currentChapter = searchResult ? searchResult[0] : undefined;
                if (currentChapter !== undefined) {
                  currentChapter = currentChapter.toLowerCase().split(" ").join("-");
                  //Router.push(`/chapter/${currentChapter}`)
                  location.href = `/chapter/${currentChapter}`
                }
              }
            }}
          ></input>
          <span
            id="shortcut"
            className="border border-gray-400 px-2 font-pixel text-xl rounded-sm"
          >
            /
          </span>
        </div>
        <div
          id="result-element"
          className="absolute top-12 flex flex-col w-fit"
        >
          {searchResult &&
            searchResult.map((chapter, i) => (
              <ChapterLink key={i} title={chapter} />
            ))}
        </div>
      </div>
    </div>
  );
}

function ChapterLink(props: { title: string }) {
  return (
    <Link
      className="leading-8 bg-black w-full text-gray-100 font-pixel text-xl border border-gray-500 p-1"
      href={`/chapter/${props.title.toLowerCase().split(" ").join("-")}`}
    >
      {props.title}
    </Link>
  );
}
