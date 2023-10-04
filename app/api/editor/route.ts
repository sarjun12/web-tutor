import { Example } from "@/app/types/example"

type Chapter = {
  title: string,
  description: string,
  examples: Array<Example>
}
type Payload = {
  chapter: Chapter
}

export async function POST(r: Request) {
  const data: Promise<Chapter> = r.json();
  console.log(data)
  return Response.json({ hello: "hello"})
} 
