function luminance(color) {
  return [
    [1, 0.2126],
    [3, 0.7152],
    [5, 0.0722],
  ]
    .map(([i, m]) => {
      const c = parseInt(color.slice(i, i + 2), 16) / 255;
      return m * (c > 0.03928 ? ((c + 0.055) / 1.055) ** 2.4 : c / 12.92);
    })
    .reduce((a, b) => a + b, 0);
}

export default function contrast(a, b) {
  const [lhs, rhs] = [a, b].map((x) => luminance(x) + 0.05);
  return lhs > rhs ? lhs / rhs : rhs / lhs;
}
