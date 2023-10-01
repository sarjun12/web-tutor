import data from "../../data.json";
import type { Chapter } from "@/app/types/chapter";

export async function GET(request: Request, {params}: {params: {slug: string}}) {
  let id = 0;
  try {
    id = parseInt(params.slug);
  } catch {}
  let nextTitle = "",
    prevTitle = "";
  if (id === undefined) {
    id = 0;
  }
  if (id > 0) {
    prevTitle = data.chapters[id - 1].title;
  }
  if (id < data.chapters.length - 1) {
    nextTitle = data.chapters[id + 1].title;
  }
  const currentChapter = data.chapters[id]
  const chapter: Chapter = {
    id: currentChapter.id,
    description: currentChapter.description,
    title: currentChapter.title,
    examples: currentChapter.examples,
    nextTitle: nextTitle,
    prevTitle: prevTitle,
  };
  return Response.json({ chapter });
}
