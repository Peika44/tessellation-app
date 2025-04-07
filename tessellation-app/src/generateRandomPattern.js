import { getBaseShapePoints } from "./ShapeFactory";

// Helper: compute bounding box
function getBounds(points) {
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
  };
}

/**
 * 1) Pick random transform approach
 * 2) Fill canvas with repeated tiles
 */
export default function generateRandomTessellation(canvas, shapeName, tileSize = 60) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  // 1) Choose shape points
  let basePoints = getBaseShapePoints(shapeName, tileSize);
  // shift so bounding box starts near (0,0)
  const { minX, minY, maxX, maxY } = getBounds(basePoints);
  const tileWidth = maxX - minX;
  const tileHeight = maxY - minY;
  // shift so top-left is at (0,0)
  basePoints = basePoints.map(([x, y]) => [x - minX, y - minY]);

  // 2) Randomly pick a transform approach
  const transforms = ["translation", "rotation", "glideReflection"];
  const picked = transforms[Math.floor(Math.random() * transforms.length)];

  // For demonstration, pick random transform params
  let angle = (Math.PI / 2) * Math.floor(Math.random() * 4); // 0, 90, 180, 270
  let dx = tileWidth;
  let dy = 0;
  let reflectLineY = tileHeight / 2;
  let glideX = tileWidth;

  console.log("Using transform:", picked);

  // 3) Fill the plane
  for (let row = 0; row < Math.ceil(height / tileHeight) + 2; row++) {
    for (let col = 0; col < Math.ceil(width / tileWidth) + 2; col++) {
      let curPoints = [...basePoints];

      // shift tile to position
      const startX = col * tileWidth;
      const startY = row * tileHeight;
      curPoints = curPoints.map(([x, y]) => [x + startX, y + startY]);

      // apply the chosen transform x times
      // for a bigger pattern, you might replicate multiple times
      // here we'll just show 1 tile w/ a transform
      switch (picked) {
        case "translation":
          // shift by dx, dy
          curPoints = curPoints.map(([x, y]) => [x + dx, y + dy]);
          break;
        case "rotation": {
          // rotate about tile center
          const b = getBounds(curPoints);
          const cx = (b.minX + b.maxX) / 2;
          const cy = (b.minY + b.maxY) / 2;
          curPoints = rotatePoints(curPoints, angle, cx, cy);
          break;
        }
        case "glideReflection":
          curPoints = glideReflectPoints(curPoints, startY + reflectLineY, glideX);
          break;
      }

      // draw
      ctx.beginPath();
      curPoints.forEach(([px, py], i) => {
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.closePath();
      ctx.fillStyle = `hsl(${Math.random() * 360},60%,70%)`;
      ctx.fill();
    }
  }
}

// Support functions reused from above
function rotatePoints(points, angle, cx, cy) {
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  return points.map(([x, y]) => {
    const dx = x - cx;
    const dy = y - cy;
    return [
      cx + dx * cosA - dy * sinA,
      cy + dx * sinA + dy * cosA,
    ];
  });
}

function glideReflectPoints(points, reflectLineY, glideX) {
  const reflected = points.map(([x, y]) => [x, 2 * reflectLineY - y]);
  return reflected.map(([x, y]) => [x + glideX, y]);
}
