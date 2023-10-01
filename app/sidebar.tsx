import Link from "next/link";

export default function SideBar(props: {chapterList: Array<{id: number, name: string}>, currentChapter: string}) {
  if (!props.chapterList) return <div></div> 
  return (
    <div className="p-5 pr-0 hidden md:flex pl-0 w-72 min-w-fit pb-1">
      <div className="font-pixel text-md text-gray-400 border-r-2 border-gray-600 border-dashed pr-5 leading-5 grow">
        <span className="text-3xl text-gray-300 leading-10">Chapters</span>
        <div className="flex flex-col gap-2">
          {props.chapterList.map((chapter) => {
            const chapterName = chapter.name.toLowerCase().split(" ").join("-")
            if (chapterName === props.currentChapter) {
              return <CurrentChapterLink id={chapter.id} name={chapter.name} link={chapterName} key={chapter.id}/>
            }
            return<ChapterLink id={chapter.id} name={chapter.name} link={chapterName} key={chapter.id} />
          })}
        </div>
      </div>
    </div>
  );
}

function ChapterLink(props: { id: number; name: string; link: string }) {
  return (
    <Link href={`/chapter/${props.link}`} className="hover:text-gray-300">
      {props.name}
    </Link>
  );
}
function CurrentChapterLink(props: { id: number; name: string; link: string }) {
  return (
    <Link href={`/chapter/${props.link}`} className="hover:text-gray-100 underline">
      {props.name}
    </Link>
  );
}
