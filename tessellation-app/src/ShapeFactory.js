import generateTriangleTiles from './shapes/triangle';
import generateSquareTiles from './shapes/square';
import generateHexagonTiles from './shapes/hexagon';

export default function getShapeGenerator(shapeName) {
  const generators = {
    triangle: generateTriangleTiles,
    square: generateSquareTiles,
    hexagon: generateHexagonTiles,
  };
  return generators[shapeName] || (() => []);
}
