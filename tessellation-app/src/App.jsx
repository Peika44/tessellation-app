import { useState } from "react";
import StarfieldIntro from "./StarfieldIntro";
import Canvas from "./Canvas";

export default function App() {
  const [showMain, setShowMain] = useState(false);
  const [fadeDone, setFadeDone] = useState(false);
  const [trigger, setTrigger] = useState(0);

  // The shape actually used by <Canvas>
  const [shape, setShape] = useState("triangle");
  // The user's current dropdown selection (not applied until "Generate")
  const [pendingShape, setPendingShape] = useState("triangle");

  // When user clicks "Enter" on the starfield intro
  const handleEnter = () => {
    setShowMain(true);
    // Fade the overlay after ~100ms
    setTimeout(() => setFadeDone(true), 100);
  };

  // Only update the tessellation shape + re-render when user hits "Generate"
  const handleGenerate = () => {
    setShape(pendingShape);        // lock in the chosen shape
    setTrigger((prev) => prev + 1); // force re-draw in Canvas
  };

  // If starfield hasn't been entered, render StarfieldIntro
  if (!showMain) {
    return <StarfieldIntro onEnter={handleEnter} />;
  }

  // Otherwise, render the tessellation page
  return (
    <>
      {/* Control Panel: Dropdown + Generate button */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "rgba(255, 255, 255, 0.1)",
          padding: "10px 15px",
          borderRadius: "8px",
          backdropFilter: "blur(4px)",
        }}
      >
        <select
          value={pendingShape}
          onChange={(e) => setPendingShape(e.target.value)}
          style={{
            appearance: "none",
            background: "rgba(0,0,0,0.3)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "4px",
            padding: "6px 8px",
            fontSize: "16px",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="triangle">Triangle</option>
          <option value="square">Square</option>
          <option value="hexagon">Hexagon</option>
        </select>

        <button
          onClick={handleGenerate}
          style={{
            background: "rgba(0,0,0,0.3)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "4px",
            padding: "6px 12px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.2)")}
          onMouseLeave={(e) => (e.target.style.background = "rgba(0,0,0,0.3)")}
        >
          Generate
        </button>
      </div>

      {/* Tessellation Canvas */}
      <Canvas shape={shape} trigger={trigger} />

      {/* Fade-in Overlay (fades out after main page shows) */}
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
  );
}
