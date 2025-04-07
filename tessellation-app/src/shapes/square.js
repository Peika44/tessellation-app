export default function generateSquareTiles(width, height, side = 60) {
  const tiles = [];

  for (let y = 0; y < height; y += side) {
    for (let x = 0; x < width; x += side) {
      const points = [
        [x, y],
        [x + side, y],
        [x + side, y + side],
        [x, y + side],
      ];
      const cx = x + side / 2;
      const cy = y + side / 2;
      tiles.push({ points, cx, cy });
    }
  }

  return tiles;
}
