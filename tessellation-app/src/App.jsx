import { useState } from "react";
import StarfieldIntro from "./StarfieldIntro";
import Canvas from "./Canvas";

export default function App() {
  console.log("App component rendering");
  
  const [showMain, setShowMain] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [shape, setShape] = useState("triangle");

  const handleEnter = () => {
    console.log("handleEnter called, setting showMain to true");
    setShowMain(true);
  };

  console.log("Current state - showMain:", showMain);

  return showMain ? (
    <>
      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}>
        <button
          onClick={() => {
            console.log("Generate Random Shape button clicked");
            const shapes = ["triangle", "square", "hexagon"];
            const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
            console.log("Selected shape:", randomShape);
            setShape(randomShape);
            setTrigger((prev) => prev + 1);
          }}
        >
          Generate Random Shape
        </button>
        <span style={{ marginLeft: "12px" }}>
          Shape: <strong>{shape}</strong>
        </span>
      </div>
      <Canvas shape={shape} trigger={trigger} />
    </>
  ) : (
    <StarfieldIntro onEnter={handleEnter} />
  );
}