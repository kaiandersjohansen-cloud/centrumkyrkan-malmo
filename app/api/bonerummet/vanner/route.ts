import { NextResponse } from "next/server";
import { MAX_VANNER_PER_PERSON } from "@/lib/bonerummet";
import { inomGrans, sattVanner } from "@/lib/bonerummet-store";
import { redisConfigured } from "@/lib/redis";

// Sparar hur många vänner den här telefonen/datorn ber för (0 = ta bort).
export async function POST(request: Request) {
  if (!redisConfigured()) return NextResponse.json({ error: "inte_aktiv" }, { status: 503 });
  const body = (await request.json().catch(() => ({}))) as { enhet?: unknown; antal?: unknown };
  const enhet = typeof body.enhet === "string" ? body.enhet : "";
  const antal = typeof body.antal === "number" ? body.antal : NaN;
  if (!/^[a-z0-9]{16,40}$/.test(enhet) || !Number.isFinite(antal) || antal < 0 || antal > MAX_VANNER_PER_PERSON) {
    return NextResponse.json({ error: "fel_format" }, { status: 400 });
  }
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "okand";
    if (!(await inomGrans(`vanner:${ip}`))) return NextResponse.json({ error: "for_manga" }, { status: 429 });
    return NextResponse.json({ vanner: await sattVanner(enhet, antal) });
  } catch {
    return NextResponse.json({ error: "lagring" }, { status: 502 });
  }
}
