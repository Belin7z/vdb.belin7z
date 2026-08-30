interface Point {
  x: number;
  y: number;
}

type FlightMode = "flyby" | "approach" | "depart" | "orbit";

interface TrailSample {
  x: number;
  y: number;
  scale: number;
  angle: number;
  opacity: number;
  time: number;
}

interface BezierPath {
  p0: Point;
  p1: Point;
  p2: Point;
}

interface OrbitPath {
  centerX: number;
  centerY: number;
  radiusX: number;
  radiusY: number;
  startAngle: number;
  direction: 1 | -1;
  revolutions: number;
}

export interface ShipFlight {
  mode: FlightMode;
  startTime: number;
  duration: number;
  path?: BezierPath;
  orbit?: OrbitPath;
  seed: number;
  trail: TrailSample[];
}

const TRAIL_LENGTH = 6;
const TRAIL_SAMPLE_EVERY_MS = 45;
const EDGE_FADE_FRACTION = 0.08;

function bezierPoint(path: BezierPath, t: number): Point {
  const mt = 1 - t;
  return {
    x: mt * mt * path.p0.x + 2 * mt * t * path.p1.x + t * t * path.p2.x,
    y: mt * mt * path.p0.y + 2 * mt * t * path.p1.y + t * t * path.p2.y,
  };
}

function bezierTangent(path: BezierPath, t: number): Point {
  const mt = 1 - t;
  return {
    x: 2 * mt * (path.p1.x - path.p0.x) + 2 * t * (path.p2.x - path.p1.x),
    y: 2 * mt * (path.p1.y - path.p0.y) + 2 * t * (path.p2.y - path.p1.y),
  };
}

function pickMode(): FlightMode {
  const roll = Math.random();
  if (roll < 0.55) return "orbit";
  if (roll < 0.75) return "flyby";
  return roll < 0.875 ? "approach" : "depart";
}

export function createShipFlight(width: number, height: number, now: number): ShipFlight {
  const mode = pickMode();
  const seed = Math.random() * 1000;

  if (mode === "orbit") {
    const revolutions = 1.5 + Math.random() * 1.5;
    const periodMs = 6500 + Math.random() * 3000;
    const orbit: OrbitPath = {
      centerX: width * (0.45 + Math.random() * 0.1),
      centerY: height * (0.42 + Math.random() * 0.1),
      radiusX: width * (0.32 + Math.random() * 0.1),
      radiusY: height * (0.24 + Math.random() * 0.08),
      startAngle: Math.random() * Math.PI * 2,
      direction: Math.random() > 0.5 ? 1 : -1,
      revolutions,
    };
    return { mode, startTime: now, duration: periodMs * revolutions, orbit, seed, trail: [] };
  }

  const flipped = Math.random() > 0.5;
  const edgeY = height * (0.1 + Math.random() * 0.18);
  const farY = height * (0.15 + Math.random() * 0.15);
  let path: BezierPath;
  let duration: number;

  if (mode === "approach") {
    path = {
      p0: { x: width * (0.3 + Math.random() * 0.4), y: farY },
      p1: { x: width * (0.45 + Math.random() * 0.1), y: farY - height * 0.08 },
      p2: flipped
        ? { x: -180, y: height * (0.55 + Math.random() * 0.2) }
        : { x: width + 180, y: height * (0.55 + Math.random() * 0.2) },
    };
    duration = 6500 + Math.random() * 2000;
  } else if (mode === "depart") {
    path = {
      p0: flipped
        ? { x: width + 180, y: height * (0.5 + Math.random() * 0.2) }
        : { x: -180, y: height * (0.5 + Math.random() * 0.2) },
      p1: { x: width * (0.45 + Math.random() * 0.1), y: farY - height * 0.05 },
      p2: { x: width * (0.3 + Math.random() * 0.4), y: farY },
    };
    duration = 6500 + Math.random() * 2000;
  } else {
    const startX = flipped ? width + 160 : -160;
    const endX = flipped ? -160 : width + 160;
    const midY = Math.min(edgeY, farY) - height * (0.06 + Math.random() * 0.08);
    path = { p0: { x: startX, y: edgeY }, p1: { x: width / 2, y: midY }, p2: { x: endX, y: farY } };
    duration = 10000 + Math.random() * 4000;
  }

  return { mode, startTime: now, duration, path, seed, trail: [] };
}

interface Pose {
  x: number;
  y: number;
  angle: number;
  depthCurve: number;
  edgeFade: number;
}

function getPose(flight: ShipFlight, t: number): Pose {
  const edgeFade = Math.max(0, Math.min(1, t / EDGE_FADE_FRACTION, (1 - t) / EDGE_FADE_FRACTION));

  if (flight.mode === "orbit" && flight.orbit) {
    const orbit = flight.orbit;
    const angle = orbit.startAngle + orbit.direction * t * orbit.revolutions * Math.PI * 2;
    const x = orbit.centerX + Math.cos(angle) * orbit.radiusX;
    const y = orbit.centerY + Math.sin(angle) * orbit.radiusY;
    const heading = Math.atan2(
      Math.cos(angle) * orbit.radiusY * orbit.direction,
      -Math.sin(angle) * orbit.radiusX * orbit.direction
    );
    const depthCurve = 0.5 + 0.5 * Math.sin(angle);
    return { x, y, angle: heading, depthCurve, edgeFade };
  }

  const path = flight.path!;
  const pos = bezierPoint(path, t);
  const tangent = bezierTangent(path, t);
  const angle = Math.atan2(tangent.y, tangent.x);
  const depthCurve =
    flight.mode === "approach"
      ? Math.pow(t, 1.3)
      : flight.mode === "depart"
        ? Math.pow(1 - t, 1.3)
        : Math.sin(t * Math.PI);

  return { x: pos.x, y: pos.y, angle, depthCurve, edgeFade: flight.mode === "flyby" ? 1 : edgeFade };
}

function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, alpha)})`;
}

function drawEngineTrail(ctx: CanvasRenderingContext2D, opacity: number, flicker: number) {
  const engines: Point[] = [
    { x: 0.46, y: 0.8 },
    { x: 0.2, y: 0.9 },
    { x: -0.2, y: 0.9 },
    { x: -0.46, y: 0.8 },
  ];

  for (const engine of engines) {
    const flare = opacity * flicker;
    const trail = ctx.createLinearGradient(engine.x, engine.y, engine.x, engine.y + 2.1);
    trail.addColorStop(0, withAlpha("#c084fc", flare));
    trail.addColorStop(1, withAlpha("#7c3aed", 0));
    ctx.fillStyle = trail;
    ctx.beginPath();
    ctx.moveTo(engine.x - 0.045, engine.y);
    ctx.lineTo(engine.x + 0.045, engine.y);
    ctx.lineTo(engine.x + 0.014, engine.y + 2.1);
    ctx.lineTo(engine.x - 0.014, engine.y + 2.1);
    ctx.closePath();
    ctx.fill();

    const glow = ctx.createRadialGradient(engine.x, engine.y, 0, engine.x, engine.y, 0.1);
    glow.addColorStop(0, withAlpha("#ffffff", flare));
    glow.addColorStop(1, withAlpha("#c084fc", 0));
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(engine.x, engine.y, 0.1, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawNavLights(ctx: CanvasRenderingContext2D, now: number, seed: number) {
  const blinkA = Math.sin(now * 0.006 + seed) > 0.85;
  const blinkB = Math.sin(now * 0.006 + seed + Math.PI) > 0.85;

  ctx.fillStyle = blinkA ? "#67e8f9" : "rgba(103, 232, 249, 0.15)";
  ctx.beginPath();
  ctx.arc(0.56, 0.55, 0.03, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = blinkB ? "#f0abfc" : "rgba(240, 171, 252, 0.15)";
  ctx.beginPath();
  ctx.arc(-0.56, 0.55, 0.03, 0, Math.PI * 2);
  ctx.fill();
}

function drawGreebles(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "rgba(10, 6, 20, 0.6)";
  const vents: [number, number, number, number][] = [
    [-0.12, -0.05, 0.05, 0.02],
    [0.07, -0.05, 0.05, 0.02],
    [-0.1, 0.68, 0.04, 0.06],
    [0.06, 0.68, 0.04, 0.06],
  ];
  for (const [x, y, w, h] of vents) ctx.fillRect(x, y, w, h);

  ctx.fillStyle = "rgba(233, 213, 255, 0.5)";
  for (const x of [0.44, 0.28, -0.28, -0.44]) {
    ctx.beginPath();
    ctx.arc(x, 0.35, 0.012, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawHull(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.moveTo(0, -1);
  ctx.lineTo(0.16, -0.62);
  ctx.lineTo(0.2, -0.2);
  ctx.lineTo(0.5, 0.1);
  ctx.lineTo(0.58, 0.5);
  ctx.lineTo(0.34, 0.42);
  ctx.lineTo(0.3, 0.1);
  ctx.lineTo(0.24, 0.55);
  ctx.lineTo(0.34, 0.9);
  ctx.lineTo(0.16, 0.85);
  ctx.lineTo(0.08, 0.95);
  ctx.lineTo(-0.08, 0.95);
  ctx.lineTo(-0.16, 0.85);
  ctx.lineTo(-0.34, 0.9);
  ctx.lineTo(-0.24, 0.55);
  ctx.lineTo(-0.3, 0.1);
  ctx.lineTo(-0.34, 0.42);
  ctx.lineTo(-0.58, 0.5);
  ctx.lineTo(-0.5, 0.1);
  ctx.lineTo(-0.2, -0.2);
  ctx.lineTo(-0.16, -0.62);
  ctx.closePath();

  const sideGradient = ctx.createLinearGradient(-0.58, 0, 0.58, 0);
  sideGradient.addColorStop(0, "#17151f");
  sideGradient.addColorStop(0.5, "#68627f");
  sideGradient.addColorStop(1, "#17151f");
  ctx.fillStyle = sideGradient;
  ctx.fill();

  ctx.save();
  ctx.clip();
  const toneGradient = ctx.createLinearGradient(0, -1, 0, 0.95);
  toneGradient.addColorStop(0, "rgba(255, 255, 255, 0.16)");
  toneGradient.addColorStop(0.45, "rgba(255, 255, 255, 0)");
  toneGradient.addColorStop(1, "rgba(0, 0, 0, 0.35)");
  ctx.fillStyle = toneGradient;
  ctx.fillRect(-0.6, -1, 1.2, 2);
  drawGreebles(ctx);
  ctx.restore();

  ctx.strokeStyle = "rgba(233, 213, 255, 0.4)";
  ctx.lineWidth = 0.018;
  ctx.stroke();

  ctx.strokeStyle = "rgba(103, 232, 249, 0.55)";
  ctx.lineWidth = 0.014;
  ctx.beginPath();
  ctx.moveTo(-0.16, -0.62);
  ctx.lineTo(-0.2, -0.2);
  ctx.lineTo(-0.5, 0.1);
  ctx.lineTo(-0.58, 0.5);
  ctx.stroke();

  ctx.strokeStyle = "rgba(15, 10, 30, 0.55)";
  ctx.lineWidth = 0.012;
  ctx.beginPath();
  ctx.moveTo(0.08, -0.4);
  ctx.lineTo(0.14, 0.3);
  ctx.moveTo(-0.08, -0.4);
  ctx.lineTo(-0.14, 0.3);
  ctx.moveTo(0.22, 0.15);
  ctx.lineTo(0.28, 0.62);
  ctx.moveTo(-0.22, 0.15);
  ctx.lineTo(-0.28, 0.62);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
  ctx.lineWidth = 0.01;
  ctx.beginPath();
  ctx.moveTo(0.03, -0.9);
  ctx.lineTo(0.05, 0.2);
  ctx.stroke();

  const canopyGradient = ctx.createLinearGradient(0, -0.55, 0, -0.1);
  canopyGradient.addColorStop(0, "rgba(233, 213, 255, 0.9)");
  canopyGradient.addColorStop(1, "rgba(124, 58, 237, 0.6)");
  ctx.beginPath();
  ctx.ellipse(0, -0.34, 0.09, 0.24, 0, 0, Math.PI * 2);
  ctx.fillStyle = canopyGradient;
  ctx.fill();
  ctx.strokeStyle = "rgba(15, 10, 30, 0.65)";
  ctx.lineWidth = 0.012;
  ctx.stroke();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = 0.006;
  ctx.beginPath();
  ctx.moveTo(0, -0.56);
  ctx.lineTo(0, -0.12);
  ctx.stroke();
}

function renderTrail(ctx: CanvasRenderingContext2D, trail: TrailSample[]) {
  trail.forEach((sample, index) => {
    const fade = ((index + 1) / (TRAIL_LENGTH + 1)) * 0.35;
    ctx.save();
    ctx.translate(sample.x, sample.y);
    ctx.rotate(sample.angle + Math.PI / 2);
    ctx.scale(sample.scale, sample.scale);
    ctx.globalAlpha = sample.opacity * fade;
    ctx.fillStyle = "#a855f7";
    ctx.beginPath();
    ctx.ellipse(0, 0.3, 0.35, 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

/** Returns false once the flight has finished. */
export function drawShip(ctx: CanvasRenderingContext2D, flight: ShipFlight, now: number): boolean {
  const t = (now - flight.startTime) / flight.duration;
  if (t < 0 || t > 1) return false;

  const pose = getPose(flight, t);
  const scale = 20 * (0.3 + pose.depthCurve * 2.3);
  const opacity = Math.min(1, 0.3 + pose.depthCurve * 1.3) * pose.edgeFade;

  renderTrail(ctx, flight.trail);

  const lastSample = flight.trail[flight.trail.length - 1];
  if (!lastSample || now - lastSample.time >= TRAIL_SAMPLE_EVERY_MS) {
    flight.trail.push({ x: pose.x, y: pose.y, scale, angle: pose.angle, opacity, time: now });
    if (flight.trail.length > TRAIL_LENGTH) flight.trail.shift();
  }

  const flicker = 0.75 + 0.25 * Math.sin(now * 0.02 + flight.seed * 7);

  ctx.save();
  ctx.translate(pose.x, pose.y);
  ctx.rotate(pose.angle + Math.PI / 2);
  ctx.scale(scale, scale);
  ctx.globalAlpha = opacity;

  drawEngineTrail(ctx, opacity, flicker);
  drawHull(ctx);
  drawNavLights(ctx, now, flight.seed);

  ctx.restore();
  return true;
}
