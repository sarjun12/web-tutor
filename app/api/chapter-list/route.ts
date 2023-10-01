import data from "../data.json";

export async function GET(_: Request) {
  const chapterList: Array<{ id: number; name: string }> = [];
  for (let i = 0; i < data.chapters.length; i++) {
    chapterList.push({ id: data.chapters[i].id, name: data.chapters[i].title });
  }
  return Response.json({ chapterList })
}
