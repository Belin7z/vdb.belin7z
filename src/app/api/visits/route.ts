import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { getRedis } from "@/lib/redis";

const COOLDOWN_SECONDS = 600; // 10 minutos — mesma pessoa só conta de novo depois disso
const SEEN_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 dias — janela para considerar "visitante que voltou"
const TOTAL_KEY = "visits:total";
const MILESTONES = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];

function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

function getClientIp(request: Request): string | null {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip");
}

export async function POST(request: Request) {
  const redis = getRedis();
  if (!redis) return NextResponse.json({ total: null, isReturning: false, crossedMilestone: null });

  const ip = getClientIp(request);
  let isReturning = false;
  let crossedMilestone: number | null = null;
  let total: number;

  if (!ip) {
    const totalRaw = await redis.get(TOTAL_KEY);
    total = totalRaw === null ? 0 : Number(totalRaw);
    return NextResponse.json({ total, isReturning, crossedMilestone });
  }

  const hash = hashIp(ip);
  const cooldownKey = `visit-cooldown:${hash}`;
  const isNewVisit = await redis.set(cooldownKey, "1", { nx: true, ex: COOLDOWN_SECONDS });

  if (isNewVisit) {
    const seenKey = `visitor-seen:${hash}`;
    const isFirstTimeEver = await redis.set(seenKey, "1", { nx: true, ex: SEEN_TTL_SECONDS });
    isReturning = !isFirstTimeEver;

    total = await redis.incr(TOTAL_KEY);
    const previousTotal = total - 1;
    crossedMilestone = MILESTONES.find((m) => previousTotal < m && total >= m) ?? null;
  } else {
    const totalRaw = await redis.get(TOTAL_KEY);
    total = totalRaw === null ? 0 : Number(totalRaw);
  }

  return NextResponse.json({ total, isReturning, crossedMilestone });
}
