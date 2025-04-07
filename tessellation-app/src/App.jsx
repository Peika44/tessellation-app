import { useState, useEffect } from "react";
import StarfieldIntro from "./StarfieldIntro";
import Canvas from "./Canvas";

export default function App() {
  const [showMain, setShowMain] = useState(false); // triggers tessellation view
  const [fadeDone, setFadeDone] = useState(false); // controls fade-out
  const [trigger, setTrigger] = useState(0); // triggers Canvas re-render
  const [shape, setShape] = useState("triangle");

  const handleEnter = () => {
    setShowMain(true);

    // Start fade-out a short moment after switching to main
    setTimeout(() => {
      setFadeDone(true);
    }, 100); // wait 100ms before starting fade
  };

  return showMain ? (
    <>
      {/* Shape Selector Button */}
      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}>
        <button
          onClick={() => {
            const shapes = ["triangle", "square", "hexagon"];
            const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
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

      {/* Tessellation Canvas */}
      <Canvas shape={shape} trigger={trigger} />

      {/* Fade-in Overlay (fades out after transition) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          pointerEvents: "none",
          opacity: fadeDone ? 0 : 1,
          transition: "opacity 1s ease-out",
          zIndex: 999,
        }}
      />
    </>
  ) : (
    <StarfieldIntro onEnter={handleEnter} />
  );
}
