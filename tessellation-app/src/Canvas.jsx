import { useRef, useEffect } from "react";
import getShapeGenerator from "./ShapeFactory";

export default function Canvas({ trigger, shape = "triangle" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Dark background
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Retrieve shape geometry
    const shapeGenerator = getShapeGenerator(shape);
    const tiles = shapeGenerator(canvas.width, canvas.height);

    // Sort tiles from center outward
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    tiles.sort((a, b) => {
      const da = Math.hypot(a.cx - centerX, a.cy - centerY);
      const db = Math.hypot(b.cx - centerX, b.cy - centerY);
      return da - db;
    });

    // Animate drawing in batches
    let i = 0;
    const drawNext = () => {
      const batch = 10;
      for (let j = 0; j < batch && i < tiles.length; j++, i++) {
        const { points } = tiles[i];
        ctx.beginPath();
        points.forEach(([x, y], idx) => {
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fillStyle = `hsl(${Math.random() * 360}, 60%, 70%)`;
        ctx.fill();
      }
      if (i < tiles.length) {
        requestAnimationFrame(drawNext);
      }
    };
    drawNext();
  }, [trigger, shape]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    />
  );
}
