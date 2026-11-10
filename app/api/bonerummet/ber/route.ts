import { NextResponse } from "next/server";
import { aktuellPeriod, amneId } from "@/lib/bonerummet";
import { berFor, berForFast, fastaAmnenText } from "@/lib/bonerummet-store";
import { redisConfigured } from "@/lib/redis";

export async function POST(request: Request) {
  if (!redisConfigured()) return NextResponse.json({ error: "inte_aktiv" }, { status: 503 });
  const body = (await request.json().catch(() => ({}))) as { id?: unknown };
  if (typeof body.id !== "string" || !/^[a-z0-9]{6,24}$/.test(body.id)) {
    return NextResponse.json({ error: "fel_format" }, { status: 400 });
  }
  try {
    // Fasta böneämnen har id som börjar med "f" och måste finnas i dagens lista.
    if (body.id.startsWith("f")) {
      const texter = await fastaAmnenText();
      if (!texter.some((t) => amneId(t) === body.id)) return NextResponse.json({ error: "finns_inte" }, { status: 404 });
      return NextResponse.json({ ber: await berForFast(aktuellPeriod(), body.id) });
    }
    const antal = await berFor(body.id);
    if (antal === null) return NextResponse.json({ error: "finns_inte" }, { status: 404 });
    return NextResponse.json({ ber: antal });
  } catch {
    return NextResponse.json({ error: "lagring" }, { status: 502 });
  }
}
