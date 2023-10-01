"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { Chapter } from "@/app/types/chapter";
import type { Example } from "@/app/types/example";
import Navbar from "@/app/navbar";
import { revalidateTag } from "next/cache";

export default function Page({ params }: { params: { id: string } }) {
  const [chapter, setChapter] = useState<Chapter | undefined>(undefined);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/chapter?id=${params.id}`)
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
  }, [params.id]);

  if (isLoading) return <p>Loading...</p>;
  if (!chapter) return <p>Something went wrong</p>;
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Navbar />
      <div className=" flex flex-col font-normal leading-7 p-8 pb-5 justify-between grow">
      <div className="flex flex-col gap-3 border-b-gray-600 pb-8 border-b grow">
        <span className="text-2xl font-semibold leading-10">
          {chapter.title}
        </span>
        <pre className="text-md overflow-x-auto whitespace-pre-wrap break-words text-gray-400">{chapter.description}</pre>
        <div className="flex flex-col gap-8">
          {chapter.examples.map((example, key) => (
            <Example example={example} key={key} />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-between pt-5">
        <div>
          {chapter.prevTitle !== "" && (
            <Link
              href={`/chapter/${chapter.id - 1}`}
              className="flex flex-row text-gray-500 hover:text-gray-300"
            >
              <div className="flex flex-col">
                <span className="text-sm text-end">Previous</span>
                <div className="flex gap-3">
                  <span className="text-lg">{"<"}</span>
                  <span className="text-gray-300 font-medium">
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
              href={`/chapter/${chapter.id + 1}`}
              className="flex flex-row text-gray-500 hover:text-gray-300"
            >
              <div className="flex flex-col">
                <span className="text-sm">Next</span>
                <div className="flex gap-3">
                  <span className="text-gray-300 font-medium">
                    {chapter.nextTitle}
                  </span>
                  <span className="text-lg">{">"}</span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

function Example(props: { example: Example }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-lg leading-10 font-semibold">
        {props.example.title}
      </span>
      {props.example.code &&
        <pre className="p-4 bg-white bg-opacity-10 rounded-sm text-md">
          {props.example.code}
        </pre>
      }
      {props.example.description &&
        <pre className="overflow-x-auto whitespace-pre-wrap break-words text-gray-400">{props.example.description}</pre>
      }
    </div>
  );
}
