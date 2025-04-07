export default function generateSquareTiles(canvas, size = 60) {
  const tiles = [];
  const width = canvas.width;
  const height = canvas.height;

  for (let y = 0; y < height; y += size) {
    for (let x = 0; x < width; x += size) {
      tiles.push({
        points: [
          [x, y],
          [x + size, y],
          [x + size, y + size],
          [x, y + size],
        ],
        cx: x + size / 2,
        cy: y + size / 2,
      });
    }
  }

  return tiles;
}

