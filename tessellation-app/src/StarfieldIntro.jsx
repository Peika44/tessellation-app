import React, { useEffect, useRef, useState } from "react";

const StarfieldIntro = ({ onEnter }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(0);
  const [phase, setPhase] = useState("idle");
  const [startTime, setStartTime] = useState(null);

  const NUM_STARS = 5000;
  const MAX_DEPTH = 1000;
  const STAR_COLORS = ["#ffffff", "#f0ffff", "#d8bfff", "#aaddff"];
  const PERSPECTIVE = 500;

  const initStars = (width, height) => {
    const stars = [];
    for (let i = 0; i < NUM_STARS; i++) {
      stars.push({
        x: Math.random() * width * 2 - width,
        y: Math.random() * height * 2 - height,
        z: Math.random() * MAX_DEPTH + 1,
        size: 0.5 + Math.random() * 2.5,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        prevX: 0,
        prevY: 0,
        prevZ: 0
      });
    }
    return stars;
  };

  const project = (x, y, z, width, height) => {
    const safeZ = Math.max(z, 0.1);
    const factor = PERSPECTIVE / safeZ;
    return {
      x: x * factor + width / 2,
      y: y * factor + height / 2,
      scale: factor,
    };
  };

  const animate = (timestamp) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    const delta = timestamp - (lastTimeRef.current || timestamp);
    lastTimeRef.current = timestamp;

    // Clear with trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 0, width, height);

    let zSpeed = 0;

    if (phase === "accelerating") {
      const elapsed = timestamp - startTime;
      const duration = 4500;
      zSpeed = Math.min(1, elapsed / duration) * 10;

      if (elapsed >= duration) {
        setPhase("done");
        onEnter();
        return;
      }
    }

    starsRef.current.forEach((star) => {
      // store previous 3D pos
      star.prevZ = star.z;
      star.prevX = star.x;
      star.prevY = star.y;

      // Idle drift
      if (phase === "idle") {
        star.x -= 0.02 * delta;
        star.y += 0.01 * delta;
      }

      // After click: move in Z (toward screen)
      if (phase === "accelerating") {
        star.z -= zSpeed * (delta / 16); // simulate frame-speed
      }

      // Reset stars that pass the viewer
      if (star.z <= 1) {
        star.z = MAX_DEPTH;
        star.x = Math.random() * width * 2 - width;
        star.y = Math.random() * height * 2 - height;
      }

      // Project new
      const current = project(star.x, star.y, star.z, width, height);
      const prev = project(star.prevX, star.prevY, star.prevZ, width, height);

      const size = star.size * current.scale;
      const opacity = Math.min(1, (1 - star.z / MAX_DEPTH) * 1.5);

      const r = parseInt(star.color.slice(1, 3), 16);
      const g = parseInt(star.color.slice(3, 5), 16);
      const b = parseInt(star.color.slice(5, 7), 16);
      const color = `rgba(${r},${g},${b},${opacity})`;

      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(current.x, current.y, size, 0, Math.PI * 2);
      ctx.fill();

      if (phase === "accelerating") {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${r},${g},${b},${opacity * 0.6})`;
        ctx.lineWidth = size * 0.8;
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(current.x, current.y);
        ctx.stroke();
      }
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      starsRef.current = initStars(canvas.width, canvas.height);
    };

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleClick = () => {
      if (phase === "idle") {
        setStartTime(performance.now());
        setPhase("accelerating");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("click", handleClick);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("click", handleClick);
    };
  }, [phase, onEnter]);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "black", position: "relative" }}>
      <canvas ref={canvasRef} style={{ display: "block", position: "absolute", top: 0, left: 0 }} />
      {phase === "idle" && (
        <div
          style={{
            position: "absolute",
            top: "72%",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#fff",
            padding: "12px 24px",
            fontSize: "16px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "12px",
            backdropFilter: "blur(6px)",
            cursor: "pointer",
            userSelect: "none",
            zIndex: 1,
          }}
        >
          Click to enter
        </div>
      )}
    </div>
  );
};

export default StarfieldIntro;
