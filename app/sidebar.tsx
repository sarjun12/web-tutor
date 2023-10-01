import { useEffect, useState } from "react";
import Link from "next/link";

export default function SideBar() {
  const [chapterList, setChapterList] = useState<
    Array<{ id: string; name: string }>
  >([]);
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
  if (isLoading) return <div></div>;
  return (
    <div className="p-5 pr-0 hidden md:flex pl-0 w-72 min-w-fit pb-1">
      <div className="font-pixel text-md text-gray-400 border-r-2 border-gray-600 border-dashed pr-5 leading-5 grow">
        <span className="text-3xl text-gray-300 leading-10">Chapters</span>
        <div className="flex flex-col gap-2">
          {chapterList.map((chapter) => (
            <ChapterLink id={chapter.id} name={chapter.name} key={chapter.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChapterLink(props: { id: string; name: string }) {
  return (
    <Link href={`/chapter/${props.name.toLowerCase().split(" ").join("-")}`} className="hover:text-gray-300">
      {props.name}
    </Link>
  );
}
