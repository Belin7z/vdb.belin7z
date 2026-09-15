import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { getRedis } from "@/lib/redis";

const COOLDOWN_SECONDS = 600; // 10 minutos — mesma pessoa só conta de novo depois disso
const TOTAL_KEY = "visits:total";

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
  if (!redis) return NextResponse.json({ total: null });

  const ip = getClientIp(request);

  if (ip) {
    const cooldownKey = `visit-cooldown:${hashIp(ip)}`;
    const isNewVisit = await redis.set(cooldownKey, "1", { nx: true, ex: COOLDOWN_SECONDS });
    if (isNewVisit) {
      await redis.incr(TOTAL_KEY);
    }
  }

  const totalRaw = await redis.get(TOTAL_KEY);
  const total = totalRaw === null ? 0 : Number(totalRaw);

  return NextResponse.json({ total });
}
