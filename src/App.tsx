import React, { useEffect, useState } from "react";
import { blocksData } from "./data";

interface Blocks {
  id: string;
  column: number;
  width: number;
  bgColor: string;
  border: string;
  level: string;
}

const App = () => {
  const [dragId, setDragId] = useState("");
  const [blocks, setBlocks] = useState<Blocks[]>(blocksData);
  const [isOpen, setIsOpen] = useState(false);
  const winCondition = blocks.every((block) => block.column === 3);

  const resetArray = () => {
    blocksData.forEach((block) => {
      block.column = 1;
    });
  };

  const getLevel = (level: string) => {
    if (level === "hard") {
      resetArray();
      setBlocks(blocksData);
    } else if (level === "medium") {
      resetArray();
      let mediumBlocks = blocksData.filter((block) => block.level !== "hard");
      setBlocks(mediumBlocks);
    } else if (level === "easy") {
      resetArray();
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

    // console.log("Drop Column", dropColumn);
    // console.log("Drag ID :", dragId);
    setBlocks(newBlocksState);
  };

  const column1Blocks = blocks.filter((block) => block.column === 1);
  const column2Blocks = blocks.filter((block) => block.column === 2);
  const column3Blocks = blocks.filter((block) => block.column === 3);

  if (winCondition) {
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }

  useEffect(() => {
    console.log("New Version");
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-300">
      {/* Win Modal */}
      {isOpen && (
        <div
          style={{ backgroundColor: "#00000080" }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 mx-4">
            <h3 className="font-bold text-lg mb-4">Congratulations!</h3>
            <div className="flex justify-end">
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="h-full">
        <div className="flex justify-center mt-24 gap-5 ">
          <button
            type="button"
            onClick={() => getLevel("easy")}
            className=" cursor-pointer bg-green-500 hover:bg-green-600 text-white text-xl font-semibold px-4 py-2 rounded-lg transition"
          >
            Easy
          </button>
          <button
            onClick={() => getLevel("medium")}
            className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-semibold px-4 py-2 rounded-lg transition"
          >
            Medium
          </button>
          <button
            onClick={() => getLevel("hard")}
            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white text-xl font-semibold px-4 py-2 rounded-lg transition"
          >
            Hard
          </button>
        </div>
        <div className="flex justify-center my-8">
          <h1 className="text-4xl text-slate-800">
            ------------------------------ Move Here to
            Win----------------------------&gt;
          </h1>
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
                  const item = {
                    id: block.id,
                    column: block.column,
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
        <div className="flex justify-center my-8">
          <h1 className="text-4xl text-red-800">
            ------------------------------ Some simple Rules
            ----------------------------
          </h1>
        </div>
        <div className="flex justify-center">
          <div>
            <li className="text-red-800">
              Only one disc can be moved at a time.
            </li>
            <li className="text-red-800">
              Only the top disc of one stack can be transferred to the top of
              another stack or an empty box.
            </li>
            <li className="text-red-800">
              Larger discs cannot be stacked over smaller ones.
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
