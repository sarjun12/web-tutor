import data from "../data.json";

export async function GET(_: Request) {
  const chapterList: Array<string> = [];
  for (let i = 0; i < data.chapters.length; i++) {
    chapterList.push(data.chapters[i].title);
  }
  return Response.json({ chapterList })
}
