// Example random transformations:
// translation, rotation, or glide reflection

export function translatePoints(points, dx, dy) {
  return points.map(([x, y]) => [x + dx, y + dy]);
}

export function rotatePoints(points) {
  // rotate around bounding box center by a random angle among 0,90,180,270
  const angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
  const angle = angles[Math.floor(Math.random() * angles.length)];

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

export function glideReflectPoints(points) {
  // reflect across bounding box mid-Y, then translate by some random dx
  const ys = points.map(([, y]) => y);
  const reflectY = (Math.min(...ys) + Math.max(...ys)) / 2;

  const dx = 30; // shift after reflection; you can randomize or keep fixed
  const reflected = points.map(([x, y]) => [x, 2 * reflectY - y]);
  return reflected.map(([x, y]) => [x + dx, y]);
}

export function applyRandomTransform(points) {
  const transforms = ["translation", "rotation", "glideReflection"];
  const picked = transforms[Math.floor(Math.random() * transforms.length)];

  switch (picked) {
    case "translation": {
      // random dx, dy
      const dx = Math.floor(Math.random() * 50) - 25;
      const dy = Math.floor(Math.random() * 50) - 25;
      return translatePoints(points, dx, dy);
    }
    case "rotation": {
      return rotatePoints(points);
    }
    case "glideReflection": {
      return glideReflectPoints(points);
    }
    default:
      return points;
  }
}
