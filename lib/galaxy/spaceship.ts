interface Point {
  x: number;
  y: number;
}

export interface ShipFlight {
  startTime: number;
  duration: number;
  p0: Point;
  p1: Point;
  p2: Point;
}

function bezierPoint(p0: Point, p1: Point, p2: Point, t: number): Point {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  };
}

function bezierTangent(p0: Point, p1: Point, p2: Point, t: number): Point {
  const mt = 1 - t;
  return {
    x: 2 * mt * (p1.x - p0.x) + 2 * t * (p2.x - p1.x),
    y: 2 * mt * (p1.y - p0.y) + 2 * t * (p2.y - p1.y),
  };
}

export function createShipFlight(width: number, height: number, now: number): ShipFlight {
  const flipped = Math.random() > 0.5;
  const startX = flipped ? width + 160 : -160;
  const endX = flipped ? -160 : width + 160;
  const y0 = height * (0.1 + Math.random() * 0.18);
  const y2 = height * (0.1 + Math.random() * 0.2);
  const midY = Math.min(y0, y2) - height * (0.06 + Math.random() * 0.08);

  return {
    startTime: now,
    duration: 10000 + Math.random() * 4000,
    p0: { x: startX, y: y0 },
    p1: { x: width / 2, y: midY },
    p2: { x: endX, y: y2 },
  };
}

function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function drawEngineTrail(ctx: CanvasRenderingContext2D, opacity: number) {
  const engines: Point[] = [
    { x: 0.42, y: 0.82 },
    { x: -0.42, y: 0.82 },
  ];

  for (const engine of engines) {
    const trail = ctx.createLinearGradient(engine.x, engine.y, engine.x, engine.y + 2.4);
    trail.addColorStop(0, withAlpha("#c084fc", opacity));
    trail.addColorStop(1, withAlpha("#7c3aed", 0));
    ctx.fillStyle = trail;
    ctx.beginPath();
    ctx.moveTo(engine.x - 0.05, engine.y);
    ctx.lineTo(engine.x + 0.05, engine.y);
    ctx.lineTo(engine.x + 0.015, engine.y + 2.4);
    ctx.lineTo(engine.x - 0.015, engine.y + 2.4);
    ctx.closePath();
    ctx.fill();

    const glow = ctx.createRadialGradient(engine.x, engine.y, 0, engine.x, engine.y, 0.14);
    glow.addColorStop(0, withAlpha("#ffffff", opacity));
    glow.addColorStop(1, withAlpha("#c084fc", 0));
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(engine.x, engine.y, 0.14, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawHull(ctx: CanvasRenderingContext2D) {
  const gradient = ctx.createLinearGradient(-0.55, 0, 0.55, 0);
  gradient.addColorStop(0, "#211d33");
  gradient.addColorStop(0.5, "#54506e");
  gradient.addColorStop(1, "#211d33");

  ctx.beginPath();
  ctx.moveTo(0, -1);
  ctx.lineTo(0.22, -0.5);
  ctx.lineTo(0.3, 0.05);
  ctx.lineTo(0.55, 0.78);
  ctx.lineTo(0.3, 0.88);
  ctx.lineTo(0.14, 0.52);
  ctx.lineTo(0.08, 0.9);
  ctx.lineTo(-0.08, 0.9);
  ctx.lineTo(-0.14, 0.52);
  ctx.lineTo(-0.3, 0.88);
  ctx.lineTo(-0.55, 0.78);
  ctx.lineTo(-0.3, 0.05);
  ctx.lineTo(-0.22, -0.5);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.strokeStyle = "rgba(233, 213, 255, 0.45)";
  ctx.lineWidth = 0.02;
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(0, -0.35, 0.1, 0.22, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(168, 85, 247, 0.55)";
  ctx.fill();

  ctx.fillStyle = "#e9d5ff";
  ctx.beginPath();
  ctx.arc(0.5, 0.72, 0.035, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(-0.5, 0.72, 0.035, 0, Math.PI * 2);
  ctx.fill();
}

/** Returns false once the flight has finished. */
export function drawShip(ctx: CanvasRenderingContext2D, flight: ShipFlight, now: number): boolean {
  const t = (now - flight.startTime) / flight.duration;
  if (t < 0 || t > 1) return false;

  const pos = bezierPoint(flight.p0, flight.p1, flight.p2, t);
  const tangent = bezierTangent(flight.p0, flight.p1, flight.p2, t);
  const angle = Math.atan2(tangent.y, tangent.x);
  const depthCurve = Math.sin(Math.min(t, 1) * Math.PI);
  const scale = 24 * (0.55 + depthCurve * 0.85);
  const opacity = 0.35 + depthCurve * 0.65;

  ctx.save();
  ctx.translate(pos.x, pos.y);
  ctx.rotate(angle + Math.PI / 2);
  ctx.scale(scale, scale);
  ctx.globalAlpha = opacity;

  drawEngineTrail(ctx, opacity);
  drawHull(ctx);

  ctx.restore();
  return true;
}
