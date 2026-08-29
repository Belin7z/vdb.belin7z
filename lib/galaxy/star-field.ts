export interface Star {
  angle: number;
  radius: number;
  depth: number;
  size: number;
  twinklePhase: number;
  twinkleSpeed: number;
  color: string;
}

export interface Nebula {
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  driftAngle: number;
  driftSpeed: number;
  driftRadius: number;
}

const SPIRAL_ARMS = 3;
const SPIRAL_TURNS = 1.4;
const BULGE_FRACTION = 0.22;

const ARM_STAR_COLORS = ["#e9d5ff", "#c084fc", "#a855f7", "#f0abfc", "#93c5fd"];
const BULGE_STAR_COLORS = ["#ffffff", "#fef3ff", "#e9d5ff", "#fde68a"];

const NEBULA_COLORS = [
  "rgba(168, 85, 247, 0.22)",
  "rgba(236, 72, 153, 0.16)",
  "rgba(99, 102, 241, 0.18)",
  "rgba(192, 132, 252, 0.16)",
];

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function generateBulgeStar(): Star {
  const radius = Math.pow(Math.random(), 2.2) * 0.22;
  const depth = 0.4 + Math.random() * 0.6;

  return {
    angle: Math.random() * Math.PI * 2,
    radius,
    depth,
    size: 0.7 + depth * 1.6,
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.4 + Math.random() * 1.3,
    color: pickRandom(BULGE_STAR_COLORS),
  };
}

function generateArmStar(index: number): Star {
  const arm = index % SPIRAL_ARMS;
  const t = Math.random();
  const radius = 0.22 + t * 0.78;
  const spiralAngle =
    t * SPIRAL_TURNS * Math.PI * 2 + (arm * (2 * Math.PI)) / SPIRAL_ARMS;
  const jitter = (Math.random() - 0.5) * 0.32;
  const depth = Math.random();

  return {
    angle: spiralAngle + jitter,
    radius,
    depth,
    size: 0.6 + depth * 1.5,
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.4 + Math.random() * 1.3,
    color: pickRandom(ARM_STAR_COLORS),
  };
}

export function generateStars(count: number): Star[] {
  const bulgeCount = Math.round(count * BULGE_FRACTION);
  const stars: Star[] = [];

  for (let i = 0; i < bulgeCount; i++) stars.push(generateBulgeStar());
  for (let i = 0; i < count - bulgeCount; i++) stars.push(generateArmStar(i));

  return stars;
}

export function generateNebulae(count: number): Nebula[] {
  const nebulae: Nebula[] = [];

  for (let i = 0; i < count; i++) {
    nebulae.push({
      baseX: (Math.random() - 0.5) * 0.9,
      baseY: (Math.random() - 0.5) * 0.6,
      radius: 0.26 + Math.random() * 0.2,
      color: pickRandom(NEBULA_COLORS),
      driftAngle: Math.random() * Math.PI * 2,
      driftSpeed: 0.00002 + Math.random() * 0.00002,
      driftRadius: 0.4 + Math.random() * 0.4,
    });
  }

  return nebulae;
}
