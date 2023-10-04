"use client";

import { ChangeEvent, SetStateAction, useState } from "react";

type Example = {
  title: string;
  code: string;
  description: string;
};

type Chapter = {
  title: string;
  description: string;
  examples: Array<Example>;
};

export default function Editor() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [examples, setExamples] = useState<Array<Example>>([]);
  let env = process.env.NODE_ENV;
  if (env === "production") {
    return <div>404 Page Not found</div>;
  }
  function titleHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle((_) => e.target.value);
  }
  function descriptionHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription((_) => e.target.value);
  }
  function addExample(e: any) {
    e.preventDefault();
    setExamples((prev) => [...prev, { title: "", description: "", code: "" }]);
  }
  console.log(examples);
  return (
    <div className="min-h-screen w-screen p-10 text-gray-300">
      <span className="font-pixel text-3xl">Editor</span>
      <form className="p-5 font-pixel text-xl flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-2xl">Title</label>
          <input
            onChange={titleHandler}
            className="bg-transparent outline-none border-2 border-gray-500 hover:border-gray-400 focus:border-gray-400 p-3 border-dashed placeholder-gray-600 rounded-sm"
            placeholder="Title for the topic"
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-2xl">Explanation</label>
          <textarea
            onChange={descriptionHandler}
            rows={6}
            className="overflow-scroll bg-transparent outline-none border-2 border-gray-500 focus:border-gray-400 hover:border-gray-400 p-3 border-dashed placeholder-gray-600 rounded-sm"
            placeholder="Explanation about the topic"
          ></textarea>
        </div>
        <span className="text-2xl">Examples or Sub Topic</span>
        <div className="flex flex-col w-full gap-10">
          {examples.map((_, id) => (
            <ExampleElement key={id} id={id} setExamples={setExamples} />
          ))}
        </div>
        <button onClick={addExample} className="bg-gray-400 bg-opacity-10 p-3">
          Add Example or Sub Topics
        </button>
      </form>
    </div>
  );
}

function ExampleElement(props: {
  id: number;
  setExamples: React.Dispatch<SetStateAction<Array<Example>>>;
}) {
  function titleHandler(e: ChangeEvent<HTMLInputElement>) {
    props.setExamples((examples) =>
      examples.map((example, id) => {
        if (id === props.id) {
          example.title = e.target.value;
        }
        return example;
      }),
    );
  }
  function descriptionHandler(e: ChangeEvent<HTMLTextAreaElement>) {
    props.setExamples((examples) =>
      examples.map((example, id) => {
        if (id === props.id) {
          example.description = e.target.value;
        }
        return example;
      }),
    );
  }
  function codeHandler(e: ChangeEvent<HTMLTextAreaElement>) {
    props.setExamples((examples) =>
      examples.map((example, id) => {
        if (id === props.id) {
          example.code = e.target.value;
        }
        return example;
      }),
    );
  }
  function deleteHandler() {
    props.setExamples((examples) => 
      examples.filter((_, id) => {
        if (id === props.id) {
          return false
        }
        return true
      })
    )
  }
  return (
    <div className="w-full flex flex-col text-xl gap-3 bg-gray-600 bg-opacity-5 p-4 rounded-sm border-2 border-dashed border-gray-700 text-gray-300">
      <div className="flex justify-between text-2xl">
        <span>Example {props.id + 1}</span>
        <button onClick={deleteHandler}>x</button>
      </div>
      <div className="flex flex-col p-3 gap-4">
        <div className="flex flex-col gap-2">
          <label>Title</label>
          <input
            className="border-2 border-gray-700 border-dashed hover:border-gray-500 focus:border-gray-500 outline-none bg-transparent p-2 rounded-sm placeholder-gray-700"
            placeholder="Sub topic or example title"
            onChange={titleHandler}
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label>Code</label>
          <textarea
            rows={4}
            className="border-2 border-gray-700 border-dashed hover:border-gray-500 focus:border-gray-500 outline-none bg-transparent p-2 rounded-sm placeholder-gray-700"
            onChange={codeHandler}
            placeholder="// Example js code"
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label>Description</label>
          <textarea
            rows={3}
            className="border-2 border-gray-700 border-dashed hover:border-gray-500 focus:border-gray-500 outline-none bg-transparent p-2 rounded-sm placeholder-gray-700"
            onChange={descriptionHandler}
            placeholder="explanation of the code"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
