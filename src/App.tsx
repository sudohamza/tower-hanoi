import React, { useState } from "react";
import { blocksData } from "./data";

interface Blocks {
  id: string;
  column: number;
  row: number;
  width: number;
  bgColor: string;
  border: string;
  level: string;
}

const App = () => {
  const [dragId, setDragId] = useState("");
  const [blocks, setBlocks] = useState<Blocks[]>(blocksData);
  const winCondition = blocks.every((block) => block.column === 3);

  const getLevel = (level: string) => {
    if (level === "hard") {
      setBlocks(blocksData);
    } else if (level === "medium") {
      let mediumBlocks = blocksData.filter((block) => block.level !== "hard");
      setBlocks(mediumBlocks);
    } else if (level === "easy") {
      let easyBlocks = blocksData.filter((block) => block.level === "easy");
      setBlocks(easyBlocks);
    }
    return undefined;
  };

  // Drag Handler
  const handleDrag = (ev: React.DragEvent<HTMLElement>) => {
    const dragBlock = blocks.find((block) => block.id === ev.currentTarget.id);
    const topBlock = blocks
      .filter((block) => block.column === dragBlock?.column)
      .sort((a, b) => a.width - b.width)[0];

    if (topBlock && ev.currentTarget.id === topBlock.id) {
      setDragId(ev.currentTarget.id);
    } else {
      ev.preventDefault();
    }
  };

  // Handle Drop
  const handleDrop = (ev: React.DragEvent) => {
    const dragBlock = blocks.find((block) => block.id === dragId);
    const dropColumn = parseInt(ev.currentTarget.id);

    const dropColumnTopBlock = blocks
      .filter((block) => block.column.toString() === dropColumn.toString())
      .sort((a, b) => a.width - b.width)[0];

    let newBlocksState = blocks;

    if (!dropColumnTopBlock || dragBlock!.width < dropColumnTopBlock.width) {
      newBlocksState = blocks.map((block) => {
        if (block.id === dragBlock?.id) {
          block.column = dropColumn;
        }

        return block;
      });
    }

    console.log("Drop Column", dropColumn);
    console.log("Drag ID :", dragId);
    setBlocks(newBlocksState);
  };

  const column1Blocks = blocks.filter((block) => block.column === 1);
  const column2Blocks = blocks.filter((block) => block.column === 2);
  const column3Blocks = blocks.filter((block) => block.column === 3);

  if (winCondition) {
    setTimeout(() => {
      alert("you won");
    }, 100);
  }

  return (
    <div className="fixed inset-0 bg-slate-300">
      <div className="h-full">
        <div className="flex justify-center my-32 gap-5 ">
          <button
            onClick={() => getLevel("easy")}
            className="px-2 py-3 text-xl bg-green-700 w-32 text-white rounded-md"
          >
            Easy
          </button>
          <button
            onClick={() => getLevel("medium")}
            className="px-2 py-3 text-xl bg-blue-700 w-32 text-white rounded-md"
          >
            Medium
          </button>
          <button
            onClick={() => getLevel("hard")}
            className="px-2 py-3 text-xl bg-red-400 w-32 text-white rounded-md"
          >
            Hard
          </button>
        </div>
        <div className="flex gap-4 justify-center items-center">
          <div
            id="1"
            onDragOver={(ev) => ev.preventDefault()}
            onDrop={handleDrop}
            container-name="first"
            className=" flex w-96 h-96 rounded-xl bg-white shadow-md"
          >
            {/* First container  */}
            <div className="mx-auto mt-auto">
              {column1Blocks
                .sort((a, b) => a.width - b.width)
                .map((block) => {
                  let count = 2;
                  const item = {
                    id: block.id,
                    column: block.column,
                    row: block.row,
                    with: block.width,
                  };
                  return (
                    <div
                      {...item}
                      draggable
                      className={`h-10 w-${block.width} border-4 my-1 rounded-xl mx-auto ${block.border} ${block.bgColor}`}
                      key={`column-1-${block.id}`}
                      onDragOver={(ev) => ev.preventDefault()}
                      onDragStart={handleDrag}
                    ></div>
                  );
                })}
            </div>
          </div>
          <div
            id="2"
            onDragOver={(ev) => ev.preventDefault()}
            onDrop={handleDrop}
            container-name="second"
            className="flex w-96 h-96 rounded-xl bg-white shadow-md"
          >
            {/* Second container */}
            <div className="mx-auto mt-auto">
              {column2Blocks
                .sort((a, b) => a.width - b.width)
                .map((block) => {
                  const item = {
                    id: block.id,
                    column: block.column,
                    row: block.row,
                    with: block.width,
                  };
                  return (
                    <div
                      {...item}
                      draggable
                      className={`h-10 w-${block.width} border-4 my-1 rounded-xl mx-auto ${block.border} ${block.bgColor}`}
                      key={`column-1-${block.id}`}
                      onDragOver={(ev) => ev.preventDefault()}
                      onDragStart={handleDrag}
                    ></div>
                  );
                })}
            </div>
          </div>
          <div
            id="3"
            onDragOver={(ev) => ev.preventDefault()}
            onDrop={handleDrop}
            container-name="third"
            className="flex w-96 h-96 rounded-xl bg-white shadow-md"
          >
            {/* Third container */}
            <div className="mx-auto mt-auto">
              {column3Blocks
                .sort((a, b) => a.width - b.width)
                .map((block) => {
                  const item = {
                    id: block.id,
                    column: block.column,
                    row: block.row,
                    with: block.width,
                  };
                  return (
                    <div
                      {...item}
                      draggable
                      className={`h-10 w-${block.width}  border-4 my-1 rounded-xl mx-auto ${block.border} ${block.bgColor}`}
                      key={`column-1-${block.id}`}
                      onDragOver={(ev) => ev.preventDefault()}
                      onDragStart={handleDrag}
                    ></div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
