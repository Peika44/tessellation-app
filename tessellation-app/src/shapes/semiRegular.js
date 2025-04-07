export default function generateSemiRegular_3_6_3_6(canvas, side = 40) {
  const tiles = [];
  const ctx = canvas.getContext("2d");

  const hexRadius = side / (2 * Math.sin(Math.PI / 6)); // matches triangle side
  const triHeight = Math.sqrt(3) / 2 * side;

  const width = canvas.width;
  const height = canvas.height;

  const horizSpacing = 1.5 * side;
  const vertSpacing = triHeight + side;

  for (let row = -5; row < height / vertSpacing + 10; row++) {
    for (let col = -5; col < width / horizSpacing + 10; col++) {
      const offsetX = (row % 2 === 0) ? 0 : 0.75 * side;
      const x = col * horizSpacing + offsetX;
      const y = row * vertSpacing;

      // Hexagon
      const hexPoints = [];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        hexPoints.push([
          x + side * Math.cos(angle),
          y + side * Math.sin(angle),
        ]);
      }
      tiles.push({ points: hexPoints, cx: x, cy: y, type: 'hexagon' });

      // Top triangle
      const top = [
        [x, y - side],
        [x - side / 2, y - side + triHeight],
        [x + side / 2, y - side + triHeight],
      ];
      tiles.push({ points: top, cx: x, cy: y - side, type: 'triangle' });

      // Bottom triangle
      const bottom = [
        [x, y + side],
        [x - side / 2, y + side - triHeight],
        [x + side / 2, y + side - triHeight],
      ];
      tiles.push({ points: bottom, cx: x, cy: y + side, type: 'triangle' });
    }
  }

  return tiles;
}