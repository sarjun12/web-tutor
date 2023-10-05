import { Example } from "@/app/types/example";
import data from "../data.json";
import { writeFile } from "fs";

type Chapter = {
  title: string;
  description: string;
  examples: Array<Example>;
};
type Payload = {
  chapter: Chapter;
};

export async function POST(r: Request) {
  const response: Promise<Payload> = r.json();
  const chapters = data.chapters;
  response
    .then((res) => {
      return res.chapter;
    })
    .then((chapter) => {
      chapters.push({ ...chapter, id: data.chapters.length });
      const writeData = JSON.stringify({ chapters: chapters });
      writeFile("../data.json", writeData, (error) => {
        if (error) {
          console.error(error);
        }
        console.log("Data.json written correctly");
      });
    });
  return Response.json({ hello: "hello" });
}
