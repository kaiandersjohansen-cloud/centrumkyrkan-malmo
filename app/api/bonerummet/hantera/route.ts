import { NextResponse } from "next/server";
import { amneId } from "@/lib/bonerummet";
import { doljAmne, fastaAmnenText, hamtaFeedback, ratKod, rensaTavlan, taBort, taBortFeedback } from "@/lib/bonerummet-store";
import { redisConfigured } from "@/lib/redis";

// Kräver koden i BONERUMMET_KOD. "kolla" används för att logga in på väggen.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { kod?: unknown; atgard?: unknown; id?: unknown };
  if (!process.env.BONERUMMET_KOD) return NextResponse.json({ error: "ingen_kod" }, { status: 503 });
  if (!ratKod(body.kod)) return NextResponse.json({ error: "fel_kod" }, { status: 401 });
  if (body.atgard === "kolla") return NextResponse.json({ ok: true });
  if (!redisConfigured()) return NextResponse.json({ error: "inte_aktiv" }, { status: 503 });

  try {
    if (body.atgard === "ta_bort" && typeof body.id === "string" && /^[a-z0-9]{6,24}$/.test(body.id)) {
      await taBort(body.id);
      return NextResponse.json({ ok: true });
    }
    if ((body.atgard === "dolj" || body.atgard === "visa") && typeof body.id === "string") {
      const id = body.id;
      if (!(await fastaAmnenText()).some((t) => amneId(t) === id)) return NextResponse.json({ error: "finns_inte" }, { status: 404 });
      await doljAmne(id, body.atgard === "dolj");
      return NextResponse.json({ ok: true });
    }
    if (body.atgard === "feedback") {
      return NextResponse.json({ feedback: await hamtaFeedback() }, { headers: { "Cache-Control": "no-store" } });
    }
    if (body.atgard === "ta_bort_feedback" && typeof body.id === "string" && /^b[a-z0-9]{6,24}$/.test(body.id)) {
      await taBortFeedback(body.id);
      return NextResponse.json({ ok: true });
    }
    if (body.atgard === "rensa") {
      await rensaTavlan();
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "fel_format" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "lagring" }, { status: 502 });
  }
}
