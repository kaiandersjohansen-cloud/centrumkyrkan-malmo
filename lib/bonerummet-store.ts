import { timingSafeEqual } from "node:crypto";
import { pipeline, redis } from "@/lib/redis";
import { LIVSLANGD_DAGAR, MAX_NAMN, MAX_TEXT, type Inlagg, type Kategori } from "@/lib/bonerummet";

// Serverdelen av Bönerummet. Varje inlägg är en egen nyckel som Redis raderar
// automatiskt efter LIVSLANGD_DAGAR; ett sorterat index håller ordningen.

const P = "bonerummet:";
const INDEX = `${P}index`;
const LIVSLANGD_MS = LIVSLANGD_DAGAR * 24 * 60 * 60 * 1000;
const MAX_VISADE = 200;

const inlaggKey = (id: string) => `${P}inlagg:${id}`;
const berKey = (id: string) => `${P}ber:${id}`;

type Sparat = Omit<Inlagg, "ber">;

export async function hamtaInlagg(): Promise<Inlagg[]> {
  await redis("ZREMRANGEBYSCORE", INDEX, "-inf", Date.now() - LIVSLANGD_MS);
  const ids = await redis<string[]>("ZRANGE", INDEX, 0, MAX_VISADE - 1, "REV");
  if (!ids.length) return [];

  const [sparade, antal] = (await pipeline([
    ["MGET", ...ids.map(inlaggKey)],
    ["MGET", ...ids.map(berKey)],
  ])) as [(string | null)[], (string | null)[]];

  const inlagg: Inlagg[] = [];
  sparade.forEach((json, i) => {
    if (!json) return;
    const s = JSON.parse(json) as Sparat;
    inlagg.push({ ...s, ber: Number(antal[i] ?? 0) });
  });
  return inlagg;
}

export async function laggTill(kategori: Kategori, text: string, namn: string): Promise<Inlagg> {
  const ts = Date.now();
  const id = `${ts.toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  const sparat: Sparat = {
    id,
    kategori,
    text: text.trim().replace(/\s+/g, " ").slice(0, MAX_TEXT),
    namn: namn.trim().replace(/\s+/g, " ").slice(0, MAX_NAMN),
    ts,
  };
  await pipeline([
    ["SET", inlaggKey(id), JSON.stringify(sparat), "PX", LIVSLANGD_MS],
    ["ZADD", INDEX, ts, id],
  ]);
  return { ...sparat, ber: 0 };
}

// Räknar upp "Jag ber för detta". Räknaren raderas samtidigt som inlägget.
export async function berFor(id: string): Promise<number | null> {
  const kvar = await redis<number>("PTTL", inlaggKey(id));
  if (kvar <= 0) return null;
  const [antal] = (await pipeline([
    ["INCR", berKey(id)],
    ["PEXPIRE", berKey(id), kvar],
  ])) as [number, number];
  return antal;
}

export async function taBort(id: string): Promise<void> {
  await pipeline([
    ["DEL", inlaggKey(id), berKey(id)],
    ["ZREM", INDEX, id],
  ]);
}

export async function rensaTavlan(): Promise<void> {
  const ids = await redis<string[]>("ZRANGE", INDEX, 0, -1);
  const nycklar = ids.flatMap((id) => [inlaggKey(id), berKey(id)]);
  await redis("DEL", INDEX, ...nycklar);
}

// Högst 10 inlägg per tio minuter från samma adress, mot skräpinlägg.
export async function inomGrans(ip: string): Promise<boolean> {
  const key = `${P}grans:${ip}`;
  const [, antal] = (await pipeline([
    ["SET", key, 0, "EX", 600, "NX"],
    ["INCR", key],
  ])) as [unknown, number];
  return antal <= 10;
}

// Koden för att hantera väggen ligger i miljövariabeln BONERUMMET_KOD.
export function ratKod(kod: unknown): boolean {
  const ratt = process.env.BONERUMMET_KOD;
  if (!ratt || typeof kod !== "string") return false;
  const a = Buffer.from(kod.trim());
  const b = Buffer.from(ratt);
  return a.length === b.length && timingSafeEqual(a, b);
}
