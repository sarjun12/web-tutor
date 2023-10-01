import data from "../data.json";
import type { Chapter } from "@/app/types/chapter";

export async function GET(request: Request) {
  let id = 0;
  try {
    id = parseInt(request.url.split("?").join().split("=")[1]);
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
  const chapter: Chapter = {
    ...data.chapters[id],
    nextTitle: nextTitle,
    prevTitle: prevTitle,
  };
  return Response.json({ chapter });
}
