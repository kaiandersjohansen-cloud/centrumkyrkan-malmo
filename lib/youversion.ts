// Hämtar bibeltext från YouVersion Platform. App-nyckeln ligger i miljövariabeln
// YVP_APP_KEY (Vercel → Settings → Environment Variables) och används bara på servern.

const WEEK = 60 * 60 * 24 * 7;

export type PassageResult =
  | { ok: true; text: string; reference: string }
  | { ok: false; error: "not_configured" | "not_found" | "upstream" };

export async function fetchPassage(versionId: number, passage: string): Promise<PassageResult> {
  const appKey = process.env.YVP_APP_KEY;
  if (!appKey) return { ok: false, error: "not_configured" };

  try {
    const res = await fetch(`https://api.youversion.com/v1/bibles/${versionId}/passages/${passage}?format=text`, {
      headers: { "X-YVP-App-Key": appKey },
      next: { revalidate: WEEK },
    });
    if (res.status === 404) return { ok: false, error: "not_found" };
    if (!res.ok) return { ok: false, error: "upstream" };

    const data: { content?: string; reference?: string } = await res.json();
    const text = (data.content ?? "").replace(/\s+/g, " ").trim();
    if (!text) return { ok: false, error: "not_found" };
    return { ok: true, text, reference: data.reference ?? "" };
  } catch {
    return { ok: false, error: "upstream" };
  }
}
