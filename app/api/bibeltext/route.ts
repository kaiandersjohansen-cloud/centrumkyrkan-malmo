import { NextResponse } from "next/server";
import { TRANSLATIONS } from "@/lib/bibelvers";
import { fetchPassage } from "@/lib/youversion";

const API_VERSIONS = new Set(TRANSLATIONS.filter((t) => t.api).map((t) => t.id));
const PASSAGE = /^[1-3A-Z]{3}\.\d{1,3}\.\d{1,3}(-\d{1,3})?$/;
const WEEK = 60 * 60 * 24 * 7;
const STATUS = { not_configured: 503, not_found: 404, upstream: 502 } as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const version = Number(searchParams.get("version"));
  const passage = searchParams.get("passage") ?? "";

  if (!API_VERSIONS.has(version) || !PASSAGE.test(passage)) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const result = await fetchPassage(version, passage);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: STATUS[result.error] });

  return NextResponse.json(
    { text: result.text, reference: result.reference },
    { headers: { "Cache-Control": `public, s-maxage=${WEEK}, stale-while-revalidate=86400` } },
  );
}
