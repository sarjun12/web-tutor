"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingSpinner from "./loadingSpinner";

type ChapterList = Array<{ id: number; name: string }>;

export default function Home() {
  const [chapterList, setChapterList] = useState<ChapterList>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/chapter-list")
      .then((res) => {
        if (!res.ok) throw Error("fetch error");
        return res.json();
      })
      .then((res) => {
        setChapterList(res.chapterList);
        setLoading(false);
      })
      .catch((_) => {
        setLoading(false);
      });
  }, []);
  if (isLoading) return (
    <div className="h-screen w-screen p-4 pb-3 pt-0 flex flex-col">
      <LoadingSpinner />
    </div>
  )
  if (!chapterList) return <div>Something went wrong</div>;
  return (
    <main className="flex min-h-screen justify-center p-8 font-pixel">
      <div className="flex flex-col gap-5">
        <span className="font-medium text-6xl text-gray-300">Web Tutor</span>
          <span className="text-gray-400 text-xl leading-7">
            Web tutor covers basics of javascript with example.&#160;
            <Link
              href="/chapter/comments"
              className="underline underline-offset-4 leading-7 text-purple-400 hover:text-slate-400"
            >
              Start Here
            </Link>
          </span>
        <div className="flex gap-3 flex-col">
          <span className="font-medium text-3xl text-gray-300 leading-10">Chapter List</span>
          <div className="flex flex-col text-xl">
            {chapterList.map((chapter) => (
              <ChapterLink
                id={chapter.id}
                name={chapter.name}
                key={chapter.id}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function ChapterLink(props: { id: number; name: string }) {
  return (
    <Link
      className="underline underline-offset-4 leading-7 text-gray-300 hover:text-slate-400 visited:text-gray-400"
      href={`/chapter/${props.name.toLowerCase().split(" ").join("-")}`}
    >
      {props.name}
    </Link>
  );
}
