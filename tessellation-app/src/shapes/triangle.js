export default function generateTriangleTiles(width, height, side = 60) {
  const tiles = [];
  const triHeight = (Math.sqrt(3) / 2) * side;

  for (let y = -triHeight; y < height + triHeight; y += triHeight) {
    for (let x = 0; x < width + side; x += side) {
      const shift = Math.floor(y / triHeight) % 2 === 0 ? 0 : side / 2;

      // Up triangle
      const upPoints = [
        [x + shift, y],
        [x + shift + side / 2, y + triHeight],
        [x + shift - side / 2, y + triHeight],
      ];
      tiles.push({
        points: upPoints,
        cx: x + shift,
        cy: y + triHeight / 2,
      });

      // Down triangle
      const downPoints = [
        [x + shift, y + triHeight * 2],
        [x + shift + side / 2, y + triHeight],
        [x + shift - side / 2, y + triHeight],
      ];
      tiles.push({
        points: downPoints,
        cx: x + shift,
        cy: y + triHeight * 1.5,
      });
    }
  }

  return tiles;
}
