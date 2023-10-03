import Link from "next/link";

export default function SideBar(props: {chapterList: Array<string>, currentChapter: string, showSideBar: boolean}) {
  if (!props.chapterList) return <div></div> 
  return (
    <div className={`p-5 pr-0 md:flex pl-0 pb-1 ${props.showSideBar ? "md:flex hidden": "md:hidden absolute flex bg-black h-full"} w-64`}>
        <div className="font-pixel text-md text-gray-400 border-r-2 border-gray-600 border-dashed pr-5 leading-5 grow">
          <span className="text-3xl text-gray-300 leading-10">Chapters</span>
          <div className="flex flex-col gap-2">
            {props.chapterList.map((chapter, i) => {
              const chapterName = chapter.toLowerCase().split(" ").join("-")
              if (chapterName === props.currentChapter) {
                return <CurrentChapterLink  name={chapter} link={chapterName} key={i}/>
              }
              return<ChapterLink name={chapter} link={chapterName} key={i} />
            })}
          </div>
      </div>
    </div>
  );
}

function ChapterLink(props: { name: string; link: string }) {
  return (
    <Link href={`/chapter/${props.link}`} className="hover:text-gray-300">
      {props.name}
    </Link>
  );
}
function CurrentChapterLink(props: { name: string; link: string }) {
  return (
    <Link href={`/chapter/${props.link}`} className="hover:text-gray-100 underline">
      {props.name}
    </Link>
  );
}
