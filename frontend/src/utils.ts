export function pearson(x: number[], y: number[]): number {
  const n = x.length;
  if (n < 2) return 0;

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
  const sumX2 = x.reduce((a, b) => a + b * b, 0);
  const sumY2 = y.reduce((a, b) => a + b * b, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  if (denominator === 0) return 0;
  return Math.max(-1, Math.min(1, numerator / denominator));
}

export function getStrength(r: number): string {
  const abs = Math.abs(r);
  if (abs >= 0.9) return "极强";
  if (abs >= 0.7) return "强";
  if (abs >= 0.5) return "中等";
  if (abs >= 0.3) return "弱";
  return "极弱";
}

export function getDirection(r: number): string {
  if (r > 0.05) return "正相关";
  if (r < -0.05) return "负相关";
  return "无相关";
}

export function getColor(r: number): string {
  const abs = Math.abs(r);
  if (abs >= 0.9) return "#10b981";
  if (abs >= 0.7) return "#34d399";
  if (abs >= 0.5) return "#fbbf24";
  if (abs >= 0.3) return "#f97316";
  return "#ef4444";
}

export function getEmoji(r: number): string {
  const abs = Math.abs(r);
  if (abs >= 0.9) return "🔥";
  if (abs >= 0.7) return "💪";
  if (abs >= 0.5) return "👍";
  if (abs >= 0.3) return "🤷";
  return "😴";
}

export function linearRegression(x: number[], y: number[]) {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
  const sumX2 = x.reduce((a, b) => a + b * b, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}
