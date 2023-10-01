import type {Example } from "./example.ts"
export type Chapter = {
  title: string;
  description: string;
  examples: Array<Example>;
  id: number;
  nextTitle: string;
  prevTitle: string;
};

