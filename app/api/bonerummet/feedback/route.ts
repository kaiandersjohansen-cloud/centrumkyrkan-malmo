import { NextResponse } from "next/server";
import { MAX_FEEDBACK, MAX_NAMN } from "@/lib/bonerummet";
import { inomGrans, sparaFeedback } from "@/lib/bonerummet-store";
import { redisConfigured } from "@/lib/redis";

export async function POST(request: Request) {
  if (!redisConfigured()) return NextResponse.json({ error: "inte_aktiv" }, { status: 503 });
  const body = (await request.json().catch(() => ({}))) as { text?: unknown; namn?: unknown };
  const text = typeof body.text === "string" ? body.text.trim() : "";
  const namn = typeof body.namn === "string" ? body.namn : "";
  if (!text || text.length > MAX_FEEDBACK || namn.length > MAX_NAMN) {
    return NextResponse.json({ error: "fel_format" }, { status: 400 });
  }
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "okand";
    if (!(await inomGrans(`feedback:${ip}`))) return NextResponse.json({ error: "for_manga" }, { status: 429 });
    await sparaFeedback(text, namn);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "lagring" }, { status: 502 });
  }
}
