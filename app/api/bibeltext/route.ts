import { NextResponse } from "next/server";
import { TRANSLATIONS } from "@/lib/bibelvers";

// App-nyckeln för YouVersion Platform ligger i miljövariabeln YVP_APP_KEY
// (Vercel → Settings → Environment Variables) och används bara här på servern.
const API_VERSIONS = new Set(TRANSLATIONS.filter((t) => t.api).map((t) => t.id));
const PASSAGE = /^[1-3A-Z]{3}\.\d{1,3}\.\d{1,3}(-\d{1,3})?$/;
const WEEK = 60 * 60 * 24 * 7;

export async function GET(request: Request) {
  const appKey = process.env.YVP_APP_KEY;
  if (!appKey) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const { searchParams } = new URL(request.url);
  const version = Number(searchParams.get("version"));
  const passage = searchParams.get("passage") ?? "";

  if (!API_VERSIONS.has(version) || !PASSAGE.test(passage)) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.youversion.com/v1/bibles/${version}/passages/${passage}?format=text`, {
      headers: { "X-YVP-App-Key": appKey },
      next: { revalidate: WEEK },
    });
    if (res.status === 404) return NextResponse.json({ error: "not_found" }, { status: 404 });
    if (!res.ok) return NextResponse.json({ error: "upstream" }, { status: 502 });

    const data: { content?: string; reference?: string } = await res.json();
    const text = (data.content ?? "").replace(/\s+/g, " ").trim();
    if (!text) return NextResponse.json({ error: "not_found" }, { status: 404 });

    return NextResponse.json(
      { text, reference: data.reference ?? "" },
      { headers: { "Cache-Control": `public, s-maxage=${WEEK}, stale-while-revalidate=86400` } },
    );
  } catch {
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}
