import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

const PRESENCE_KEY = "presence";
const ALL_VISITORS_KEY = "visitors:all";
const ACTIVE_WINDOW_MS = 30_000;
const VISITOR_ID_RE = /^[0-9a-f-]{36}$/i;

export async function POST(request: Request) {
  const redis = getRedis();
  if (!redis) return NextResponse.json({ live: null, total: null });

  const body = await request.json().catch(() => null);
  const visitorId = body?.visitorId;
  if (typeof visitorId !== "string" || !VISITOR_ID_RE.test(visitorId)) {
    return NextResponse.json({ live: null, total: null }, { status: 400 });
  }

  const now = Date.now();
  await redis.zadd(PRESENCE_KEY, { score: now, member: visitorId });
  await redis.zremrangebyscore(PRESENCE_KEY, 0, now - ACTIVE_WINDOW_MS);
  await redis.sadd(ALL_VISITORS_KEY, visitorId);

  const [live, total] = await Promise.all([
    redis.zcard(PRESENCE_KEY),
    redis.scard(ALL_VISITORS_KEY),
  ]);

  return NextResponse.json({ live, total });
}
