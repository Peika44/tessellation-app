export default function generateTriangleTiles(canvas, side = 60) {
  const ctx = canvas.getContext("2d");
  const triHeight = Math.sqrt(3) / 2 * side;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const tiles = [];

  for (let y = -triHeight * 2; y < canvas.height + triHeight * 2; y += triHeight) {
    for (let x = -side; x < canvas.width + side; x += side) {
      const row = Math.floor(y / triHeight);
      const shift = row % 2 === 0 ? 0 : side / 2;

      const up = {
        points: [
          [x + shift, y],
          [x + shift + side / 2, y + triHeight],
          [x + shift - side / 2, y + triHeight],
        ],
        cx: x + shift,
        cy: y + triHeight / 2,
      };

      const down = {
        points: [
          [x + shift, y + triHeight * 2],
          [x + shift + side / 2, y + triHeight],
          [x + shift - side / 2, y + triHeight],
        ],
        cx: x + shift,
        cy: y + triHeight * 1.5,
      };

      tiles.push(up, down);
    }
  }

  return tiles;
}
