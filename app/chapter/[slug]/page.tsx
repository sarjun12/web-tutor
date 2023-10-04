"use client";
import { useState, useEffect } from "react";
import type { Chapter } from "@/app/types/chapter";
import type { Example } from "@/app/types/example";
import Navbar from "@/app/navbar";
import LoadingSpinner from "@/app/loadingSpinner";
import Link from "next/link";
import SideBar from "@/app/sidebar";

export default function Page({ params }: { params: { slug: string } }) {
  const [chapter, setChapter] = useState<Chapter | undefined>(undefined);
  const [isLoading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);

  const [chapterList, setChapterList] = useState<Array<string>>([]);
  useEffect(() => {}, [showSidebar]);
  useEffect(() => {
    if (localStorage !== undefined) {
      const show = localStorage.getItem("showSidebar");
      if (show === "show") {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    }
    fetch(`/api/chapter/${params.slug}`)
      .then((res) => {
        if (!res.ok) throw Error("Fetch error");
        return res.json();
      })
      .then((res) => {
        setChapter(res.chapter);
        setLoading(false);
      })
      .catch((_) => {
        setLoading(false);
      });
    fetch("/api/chapter-list")
      .then((res) => {
        if (!res.ok) throw Error("fetch error");
        return res.json();
      })
      .then((res) => {
        setChapterList(res.chapterList);
      });
  }, [params.slug]);

  if (isLoading)
    return (
      <div className="h-screen w-screen p-4 pb-3 pt-0 flex flex-col">
        <Navbar chapterList={chapterList} setShowSidebar={setShowSidebar} />
        <LoadingSpinner />
      </div>
    );
  if (!chapter) return <p>Something went wrong</p>;
  return (
    <>
      <div className="min-h-screen max-w-screen flex flex-col p-4 pt-0 pb-3 selection:text-gray-100 selection:bg-gray-400 selection:bg-opacity-20">
        <Navbar setShowSidebar={setShowSidebar} chapterList={chapterList} />
        <div className="flex grow flex-row">
          <SideBar
            chapterList={chapterList}
            currentChapter={params.slug}
            showSideBar={showSidebar}
          />
          <div className=" flex flex-col font-pixel leading-7 justify-between grow md:pl-4 w-11/12 md:w-full">
            <div className="flex flex-col gap-3 border-b-gray-600 border-b-2 border-dashed grow pt-5 pb-8">
              <span className="text-2xl md:text-3xl font-pixel leading-10 text-gray-300">
                {chapter.title}
              </span>
              <pre className="font-pixel font-light text-lg md:text-xl overflow-x-auto whitespace-pre-wrap break-words text-gray-400 p-1">
                {chapter.description}
              </pre>
              <div className="flex flex-col gap-5">
                {chapter.examples.map((example, key) => (
                  <Example example={example} key={key} />
                ))}
              </div>
            </div>
            <div className="flex flex-row justify-between pt-2">
              <div>
                {chapter.prevTitle !== "" && (
                  <Link
                    href={`/chapter/${chapter.prevTitle
                      .toLowerCase()
                      .split(" ")
                      .join("-")}`}
                    className="flex flex-row text-gray-500 hover:text-gray-300"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm md:text-md text-end">Previous</span>
                      <div className="flex gap-3">
                        <span className="text-md md:text-lg">{"<"}</span>
                        <span className="text-gray-300 font-medium text-lg md:text-xl">
                          {chapter.prevTitle}
                        </span>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
              <div>
                {chapter.nextTitle !== "" && (
                  <Link
                    href={`/chapter/${chapter.nextTitle
                      .toLowerCase()
                      .split(" ")
                      .join("-")}`}
                    className="flex flex-row text-gray-500 hover:text-gray-300"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm md:text-md">Next</span>
                      <div className="flex gap-3">
                        <span className="text-gray-300 text-lg md:text-xl font-medium">
                          {chapter.nextTitle}
                        </span>
                        <span className="text-md md:text-lg">{">"}</span>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Example(props: { example: Example }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="leading-10 font-pixel font-thin text-xl md:text-2xl text-gray-300">
        {props.example.title}
      </span>
      {props.example.code && (
        <pre className="overflow-scroll p-4 bg-gray-400 bg-opacity-10 rounded-sm text-md font-pixel text-lg md:text-xl text-gray-300">
          {props.example.code}
        </pre>
      )}
      {props.example.description && (
        <pre className="overflow-x-auto whitespace-pre-wrap break-words text-gray-400 font-pixel text-lg md:text-xl p-1">
          {props.example.description}
        </pre>
      )}
    </div>
  );
}
