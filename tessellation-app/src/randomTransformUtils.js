function translatePoints(points, dx, dy) {
  return points.map(([x, y]) => [x + dx, y + dy]);
}

function rotatePoints(points, angle) {
  // rotate around bounding box center
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;

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

function glideReflectPoints(points) {
  // reflect across bounding box horizontal mid line, then shift
  const ys = points.map(([, y]) => y);
  const reflectY = (Math.min(...ys) + Math.max(...ys)) / 2;

  // reflect
  const reflected = points.map(([x, y]) => [x, 2 * reflectY - y]);
  // then translate by some dx
  const dx = 30; // random or fixed
  return reflected.map(([x, y]) => [x + dx, y]);
}

export function applyTransform(points, transformType) {
  switch (transformType) {
    case "translation": {
      // simple shift
      return translatePoints(points, 50, 0);
    }
    case "rotation": {
      const angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
      const angle = angles[Math.floor(Math.random() * angles.length)];
      return rotatePoints(points, angle);
    }
    case "glideReflection": {
      return glideReflectPoints(points);
    }
    default:
      return points; // no transform
  }
}
