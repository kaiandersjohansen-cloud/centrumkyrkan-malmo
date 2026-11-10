import { NextResponse } from "next/server";
import { BIBELORD, MAX_NAMN, MAX_TEXT, aktuellPeriod, amneId, svenskDag, type Bibelord, type Kategori, type VaggData } from "@/lib/bonerummet";
import { fastaAmnenText, hamtaFasta, hamtaInlagg, hamtaVanner, inomGrans, laggTill } from "@/lib/bonerummet-store";
import { copyrightShortFor } from "@/lib/bibelvers";
import { redisConfigured } from "@/lib/redis";
import { fetchPassage } from "@/lib/youversion";

export const dynamic = "force-dynamic";

const NUBIBELN = 916;

// Ett nytt bibelord varje dag, räknat på svenskt datum.
async function dagensBibelord(): Promise<Bibelord | null> {
  const result = await fetchPassage(NUBIBELN, BIBELORD[svenskDag() % BIBELORD.length]);
  if (!result.ok) return null;
  return { text: result.text, referens: result.reference, copyright: copyrightShortFor("NUB") ?? "" };
}

export async function GET() {
  const period = aktuellPeriod();
  const [texter, bibelord] = await Promise.all([fastaAmnenText(), dagensBibelord()]);
  if (!redisConfigured()) {
    const data: VaggData = { aktiv: false, inlagg: [], fasta: texter.map((text) => ({ id: amneId(text), text, ber: 0, dold: false })), period, bibelord, vanner: 0 };
    return NextResponse.json(data);
  }
  try {
    const [inlagg, fasta, vanner] = await Promise.all([hamtaInlagg(), hamtaFasta(period, texter), hamtaVanner()]);
    const data: VaggData = { aktiv: true, inlagg, fasta, period, bibelord, vanner };
    return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "lagring" }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!redisConfigured()) return NextResponse.json({ error: "inte_aktiv" }, { status: 503 });

  let body: { kategori?: unknown; text?: unknown; namn?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "fel_format" }, { status: 400 });
  }
  const kategori = body.kategori === "tack" ? "tack" : body.kategori === "bon" ? "bon" : null;
  const text = typeof body.text === "string" ? body.text.trim() : "";
  const namn = typeof body.namn === "string" ? body.namn : "";
  if (!kategori || !text || text.length > MAX_TEXT || namn.length > MAX_NAMN) {
    return NextResponse.json({ error: "fel_format" }, { status: 400 });
  }

  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "okand";
    if (!(await inomGrans(ip))) return NextResponse.json({ error: "for_manga" }, { status: 429 });
    const inlagg = await laggTill(kategori as Kategori, text, namn);
    return NextResponse.json(inlagg, { status: 201 });
  } catch {
    return NextResponse.json({ error: "lagring" }, { status: 502 });
  }
}
