"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingScreen from "./loading";
import Navbar from "./navbar";

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
  if (isLoading) return <LoadingScreen />
  if (!chapterList) return <div>Something went wrong</div>;
  return (
    <main className="flex min-h-screen justify-center p-8 font-normal">
      <div className="flex flex-col gap-5">
        <span className="font-medium text-4xl text-gray-300">Web Tutor</span>
        <div className="flex gap-1">
          <span className="text-gray-400 leading-7">
            Web tutor covers basics of javascript with example.
          </span>
          <Link
            href="/chapter/0"
            className="underline underline-offset-4 leading-7 text-purple-400 hover:text-slate-400"
          >
            Start Here
          </Link>
        </div>
        <div className="gap-3">
          <span className="font-medium text-xl leading-8">Chapter List</span>
          <div className="flex flex-col">
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
      href={`/chapter/${props.id}`}
    >
      {props.name}
    </Link>
  );
}
