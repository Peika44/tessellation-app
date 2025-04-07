import generateTriangleTiles from "./shapes/triangle";
import generateSquareTiles from "./shapes/square";
import generateHexagonTiles from "./shapes/hexagon";

export default function getShapeGenerator(shape) {
  return function(width, height) {
    switch (shape) {
      case "triangle":
        return generateTriangleTiles(width, height, 60);
      case "square":
        return generateSquareTiles(width, height, 60);
      case "hexagon":
        return generateHexagonTiles(width, height, 35);
      default:
        return generateTriangleTiles(width, height, 60);
    }
  };
}
