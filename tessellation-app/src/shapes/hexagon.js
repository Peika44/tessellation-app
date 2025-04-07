export default function generateHexagonTiles(width, height, radius = 35) {
  const tiles = [];

  const hexHeight = Math.sqrt(3) * radius;
  const horizSpacing = radius * 3;
  const vertSpacing = hexHeight;
  height = 2 * height;

  for (let row = 0; row * vertSpacing < height + hexHeight; row++) {
    for (let col = -1; col * horizSpacing < width + horizSpacing; col++) {
      const offsetX = row % 2 === 0 ? radius : radius * 2.5;
      const centerX = col * horizSpacing + offsetX;
      const centerY = row * (hexHeight * 0.5);

      const points = [];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        points.push([
          centerX + radius * Math.cos(angle),
          centerY + radius * Math.sin(angle),
        ]);
      }

      tiles.push({ points, cx: centerX, cy: centerY });
    }
  }

  return tiles;
}